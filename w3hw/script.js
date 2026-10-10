let imgBtn1 = document.getElementById("imgButton1")
let imgBtn2 = document.getElementById("imgButton2")
let imgBtn3 = document.getElementById("imgButton3")
let imgBtn4 = document.getElementById("imgButton4")

let imgToToggle = document.getElementById("imgToToggle")

let changingImage1 = () => {
    imgToToggle.src = "images/dog1.jpg"
    imgToToggle.alt = "Cookie photo 1"
}

let changingImage2 = () => {
    imgToToggle.src = "images/dog2.jpg"
    imgToToggle.alt = "Cookie photo 2"
}

let changingImage3 = () => {
    imgToToggle.src = "images/dog3.jpg"
    imgToToggle.alt = "Cookie photo 3"
}

let changingImage4 = () => {
    imgToToggle.src = "images/dog4.jpg"
    imgToToggle.alt = "Cookie photo 4"
}

imgBtn1.addEventListener("click", changingImage1)
imgBtn2.addEventListener("click", changingImage2)
imgBtn3.addEventListener("click", changingImage3)
imgBtn4.addEventListener("click", changingImage4)