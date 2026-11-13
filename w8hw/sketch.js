let handPose;
let video;
let hands = [];

let stars = [];
let selectedStar = -1;

async function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  handPose = await ml5.handPose({ flipped: true });
  handPose.detectStart(video, gotHands);

  stars = [
    { x: 200, y: 150, size: 12 },
    { x: 400, y: 100, size: 16 },
    { x: 300, y: 300, size: 10 },
    { x: 500, y: 350, size: 14 },
    { x: 100, y: 400, size: 8 }
  ];
}

function draw() {
  background(8, 13, 37);

  if (hands.length > 0) {
    let finger = hands[0].index_finger_tip;
    let thumb = hands[0].thumb_tip;

    let d = dist(finger.x, finger.y, thumb.x, thumb.y);
    let pinching = d < 30;

    if (pinching) {
      if (selectedStar == -1) {
        for (let i = 0; i < stars.length; i++) {
          let starDistance = dist(
            finger.x, finger.y,
            stars[i].x, stars[i].y
          );

          if (starDistance < 65) {
            selectedStar = i;
            break;
          }
        }
      }

      if (selectedStar != -1) {
        stars[selectedStar].x = finger.x;
        stars[selectedStar].y = finger.y;
      }
      else{
        stars.push({ x: finger.x, y: finger.y, size: random(4, 20) })
      }
    } else {
      selectedStar = -1;
    }

  } else {
    selectedStar = -1;
  }

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      let d = dist(
        stars[i].x, stars[i].y,
        stars[j].x, stars[j].y
      );

      if (d < 180) {
        stroke(200, 220, 255, map(d, 0, 180, 150, 0));
        strokeWeight(1);

        line(
          stars[i].x, stars[i].y,
          stars[j].x, stars[j].y
        );
      }
    }
  }

  noStroke();

  for (let i = 0; i < stars.length; i++) {
    drawStar(stars[i].x, stars[i].y, stars[i].size);
  }

  if (hands.length > 0) {
    let finger = hands[0].index_finger_tip;
    let thumb = hands[0].thumb_tip;

    let d = dist(finger.x, finger.y, thumb.x, thumb.y);
    let pinching = d < 30;

    noStroke();

    if (pinching) {
      fill(255, 235, 160, 25);
      circle(finger.x, finger.y, 48);

      fill(255, 235, 160, 70);
      circle(finger.x, finger.y, 26);

      fill(255, 245, 200);
      circle(finger.x, finger.y, 8);
    } else {
      fill(220, 235, 255, 20);
      circle(finger.x, finger.y, 42);

      fill(220, 235, 255, 60);
      circle(finger.x, finger.y, 24);

      fill(255);
      circle(finger.x, finger.y, 6);
    }
  }

  image(video, 480, 10, 150, 112);

  noFill();
  stroke(255, 100);
  strokeWeight(1);
  rect(480, 10, 150, 112);
}

function drawStar(x, y, size) {
  noStroke();

  fill(255, 240, 160, 15);
  circle(x, y, size * 4);

  fill(255, 240, 160, 35);
  circle(x, y, size * 2.5);

  fill(255, 245, 190);

  beginShape();

  for (let i = 0; i < 10; i++) {
    let angle = TWO_PI / 10 * i - HALF_PI;
    let r;

    if (i % 2 == 0) {
      r = size;
    } else {
      r = size * 0.45;
    }

    let sx = x + cos(angle) * r;
    let sy = y + sin(angle) * r;

    vertex(sx, sy);
  }

  endShape(CLOSE);
}

function gotHands(results) {
  hands = results;
}
