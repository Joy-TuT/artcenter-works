let angle = 0

function setup() {
  createCanvas(600, 600)
  noiseSeed(10)
}

function draw() {
  background(245, 242, 235)

  push()
  translate(240, 280)
  rotate(angle)

  noStroke()
  fill(220, 170, 185)

  for (let i = 0; i < 6; i++) {
    ellipse(0, -55, 45, 85)
    rotate(TWO_PI / 6)
  }

  fill(235, 207, 135)
  circle(0, 0, 38)
  pop()

  push()
  translate(400, 160)
  rotate(-angle * 0.7)

  noStroke()
  fill(185, 175, 205)

  for (let i = 0; i < 5; i++) {
    ellipse(0, -30, 28, 48)
    rotate(TWO_PI / 5)
  }

  fill(235, 207, 135)
  circle(0, 0, 24)
  pop()

  let leafY = 350 + sin(millis() * 0.002) * 60

  push()
  translate(420, leafY)
  rotate(-0.5 + sin(millis() * 0.003) * 0.4)

  noStroke()
  fill(150, 175, 145)

  beginShape()

  for (let a = 0; a < TWO_PI; a += 0.1) {
    let n = noise(cos(a) + 1, sin(a) + 1)
    let r = map(n, 0, 1, 0.7, 1.3)

    let x = cos(a) * 25 * r
    let y = sin(a) * 50 * r

    vertex(x, y)
  }

  endShape(CLOSE)

  stroke(105, 135, 100)
  strokeWeight(2)
  line(0, -35, 0, 35)
  pop()

  let smallLeafY = 440 + sin(millis() * 0.0015 + PI) * 35

  push()
  translate(170, smallLeafY)
  rotate(0.6 + sin(millis() * 0.0025 + PI) * 0.3)

  noStroke()
  fill(175, 190, 155)

  beginShape()

  for (let a = 0; a < TWO_PI; a += 0.1) {
    let n = noise(cos(a) + 5, sin(a) + 5)
    let r = map(n, 0, 1, 0.7, 1.3)

    let x = cos(a) * 18 * r
    let y = sin(a) * 35 * r

    vertex(x, y)
  }

  endShape(CLOSE)

  stroke(120, 145, 105)
  strokeWeight(2)
  line(0, -24, 0, 24)
  pop()

  angle += 0.01
}