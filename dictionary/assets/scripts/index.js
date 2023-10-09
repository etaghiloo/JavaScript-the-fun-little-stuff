const input = document.querySelector("#input")
const audioIcon = document.querySelector(".pronunciation-icon")
const phonetic = document.querySelector("#phonetic")
const meanings = document.querySelector("#meanings")
let result = []
let audio = ""

input.value = ""

input.addEventListener("keyup", function(e) {
    if (e.target.value.trim() !== "" && e.key === "Enter") {
        const word = e.target.value
        audioIcon.style.display = "none"
        audioIcon.style.color = "#404fd7"
        audio = ""
        phonetic.innerHTML = ""
        meanings.innerHTML = ""
        getApi(word)
    }
})

async function getApi(search) {
    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
        const response = await fetch(url)
        result = await response.json()
        console.log(response)
        if (response.status === 200) {
            renderResult()
        }
        if (response.status === 404) {
            meanings.innerHTML = "Looks like you invented a word that is not in our database. :)) try something else."
        }
    } catch (error) {
        console.log(error)
    }
}

function renderResult() {
    audioIcon.style.display = "block"
    if (result[0].phonetics[0]?.audio) {
        audio = new Audio(`${result[0].phonetics[0]?.audio}`);
        audioIcon.addEventListener("click", function() {
            audio.play()
        })
    } else {
        audioIcon.style.color = "rgba(0, 0, 0, 0.3)"
    }

    phonetic.textContent = result[0].phonetic

    for (let i = 0; i < result[0].meanings.length; i++) {
        const partOfSpeechMeaning = document.createElement("div")
        partOfSpeechMeaning.classList.add("part-of-speech-meanings")
        meanings.appendChild(partOfSpeechMeaning)
        partOfSpeechMeaning.innerHTML = `
            <i class="partOfSpeech">${result[0].meanings[i].partOfSpeech}</i>
        `
        for (let j = 0; j < result[0].meanings[i].definitions.length; j++ ) {
            const singlepartOfSpeechMeaning = document.createElement("p")
            singlepartOfSpeechMeaning.classList.add("definition")
            partOfSpeechMeaning.appendChild(singlepartOfSpeechMeaning)
            singlepartOfSpeechMeaning.innerHTML = `
                ${[j+1]}. ${result[0].meanings[i].definitions[j].definition}
            `
            if (result[0].meanings[i].definitions[j].example) {
                const singlepartOfSpeechExample = document.createElement("p")
                singlepartOfSpeechExample.classList.add("example")
                singlepartOfSpeechMeaning.appendChild(singlepartOfSpeechExample)
                singlepartOfSpeechExample.innerHTML = `
                    "${result[0].meanings[i].definitions[j].example}"
                `
            }
        }
    }
}