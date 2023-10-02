const firework = function() {
    document.getElementById("firework").style="display:block"
}
let releaseDate = new Date("Dec 8, 2023 00:00:00").getTime()

let countdown = setInterval(function() {
    let now = new Date().getTime()
    let distance = releaseDate - now
    let days = Math.floor(distance / (24 * 60 * 60 * 1000))
    let hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    let minutes = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000))
    let seconds = Math.floor((distance % (60 * 1000)) / 1000)

    document.getElementById("days").innerText = days
    document.getElementById("hours").innerText = hours
    document.getElementById("minutes").innerText = minutes
    document.getElementById("seconds").innerText = seconds

    if (distance < 0) {
        clearInterval(countdown)
        let end = 0
        document.getElementById("days").innerText = end
        document.getElementById("hours").innerText = end
        document.getElementById("minutes").innerText = end
        document.getElementById("seconds").innerText = end
        firework()
    }
}, 0)