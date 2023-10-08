let index = 0
let timer = setInterval(autoPlay, 5000)
const slideBox = document.querySelectorAll(".slides")
const slides = document.querySelectorAll(".slide")
const arrowLeft = document.querySelector(".arrow-left")
const arrowRight = document.querySelector(".arrow-right")
const dots = document.querySelectorAll(".dot")
arrowRight.addEventListener("click", nextSlide)
arrowLeft.addEventListener("click", prevSlide)

showSlide()

function showSlide() {
    if (index > slides.length - 1) {
        index = 0
    }
    if (index < 0) {
        index = slides.length - 1
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
        dots[i].classList.remove("active")
    }
    slides[index].style.display = "block"
    dots[index].classList.add("active")
}

function nextSlide() {
    resetInterval()
    index++
    if (index > slides.length - 1) {
        index = 0
    }
    showSlide()
}

function prevSlide() {
    resetInterval()
    index--
    showSlide()
}

function autoPlay() {
    nextSlide()
}

function resetInterval() {
    clearInterval(timer)
    timer = setInterval(autoPlay, 5000)
}


