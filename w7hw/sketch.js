let plants = []
let water = []
let rainSlider
let rainLabel
let soilSize = 40

function setup() {
  let canvas = createCanvas(800, 550)
  canvas.parent("garden")
  frameRate(60)

  rainLabel = createSpan("Rain: 3 ")
  rainLabel.parent("controls")

  rainSlider = createSlider(0, 10, 3, 1)
  rainSlider.parent("controls")
  rainSlider.style("width", "150px")

  for (let i = 0; i < width / soilSize; i++) {
    water.push(60)
  }
}

function draw() {
  background(244, 241, 229)

  let rain = rainSlider.value()
  rainLabel.html("Rain: " + rain + " ")

  noStroke()
  fill(65, 80, 60)
  textSize(14)
  text("Click the soil to plant", 20, 30)

  for (let i = 0; i < water.length; i++) {
    water[i] += rain * 0.025
    water[i] -= 0.015
    water[i] = constrain(water[i], 0, 100)

    let soilColor = map(water[i], 0, 100, 205, 135)

    fill(soilColor, soilColor - 25, soilColor - 45)
    rect(i * soilSize, 350, soilSize, 200)
  }

  stroke(155, 185, 195)
  strokeWeight(2)

  for (let i = 0; i < rain * 8; i++) {
    let rainX = (i * 73) % width
    let rainY = (frameCount * 4 + i * 47) % 350

    line(rainX, rainY, rainX - 3, rainY + 9)
  }

  for (let i = 0; i < water.length; i++) {
    let count = 0

    for (let j = 0; j < plants.length; j++) {
      if (plants[j].soil === i) {
        count++
      }
    }

    if (count > 0) {
      let drink = min(water[i], count * 0.08)
      water[i] -= drink

      for (let j = 0; j < plants.length; j++) {
        if (plants[j].soil === i) {
          plants[j].grow(drink / count)
        }
      }
    }
  }

  for (let i = 0; i < plants.length; i++) {
    plants[i].display()
  }
}

function mousePressed(event) {
  if (event.target.tagName !== "CANVAS") {
    return
  }

  if (
    mouseX > 15 &&
    mouseX < width - 15 &&
    mouseY > 365 &&
    mouseY < height - 15
  ) {
    plants.push(new Plant(mouseX, mouseY))
  }
}

function keyPressed() {
  if (key === "c" || key === "C") {
    plants = []

    for (let i = 0; i < water.length; i++) {
      water[i] = 60
    }
  }
}

class Plant {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.height = 10
    this.maxHeight = random(65, 110)
    this.soil = floor(x / soilSize)
    this.health = 100

    this.flowerColor = random([
      "#D9919B",
      "#E6BD64",
      "#B5A0CC",
      "#E5A17D"
    ])
  }

  grow(amount) {
    if (amount > 0.04) {
      this.height += amount * 0.5
      this.health += 0.15
    } else {
      this.health -= 0.08
    }

    this.height = constrain(this.height, 10, this.maxHeight)
    this.health = constrain(this.health, 0, 100)
  }

  display() {
    let topY = this.y - this.height
    let green = map(this.health, 0, 100, 115, 155)

    stroke(105, green, 85)
    strokeWeight(3)
    line(this.x, this.y, this.x, topY)

    noStroke()
    fill(105, green, 85)

    ellipse(
      this.x - 8,
      this.y - this.height * 0.4,
      19,
      8
    )

    ellipse(
      this.x + 8,
      this.y - this.height * 0.65,
      19,
      8
    )

    if (this.height > 35) {
      let flowerSize = map(
        this.height,
        35,
        this.maxHeight,
        5,
        15
      )

      let flowerTint = lerpColor(
        color("#B8AD95"),
        color(this.flowerColor),
        this.health / 100
      )

      fill(flowerTint)

      ellipse(
        this.x - flowerSize / 2,
        topY,
        flowerSize,
        flowerSize
      )

      ellipse(
        this.x + flowerSize / 2,
        topY,
        flowerSize,
        flowerSize
      )

      ellipse(
        this.x,
        topY - flowerSize / 2,
        flowerSize,
        flowerSize
      )

      ellipse(
        this.x,
        topY + flowerSize / 2,
        flowerSize,
        flowerSize
      )

      fill(244, 215, 125)

      ellipse(
        this.x,
        topY,
        flowerSize * 0.65,
        flowerSize * 0.65
      )
    }
  }
}