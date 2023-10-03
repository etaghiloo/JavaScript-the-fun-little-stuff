let toDos = []
let filter = {
    text: "",
    hideCompleted: false,
}
const toDosJSON = localStorage.getItem("toDos")
if (toDosJSON !== null) {
    toDos = JSON.parse(toDosJSON)
}
const toDoInput = document.querySelector("#to-do-input")
const addButton = document.querySelector("#add-button")
const filterInput = document.querySelector("#filter-to-do-input")
const hideCompletedcheckbox = document.querySelector("#hideCompleted")

const renderToDos = function(toDos, filter) {
    const filteredToDos = toDos.filter(function(toDo) {
        const filteredMatch = toDo.title.toLowerCase().includes(filter.text.toLowerCase())
        const incompletedMatch = !filter.hideCompleted || !toDo.completed

        return filteredMatch && incompletedMatch
    })

    document.querySelector("#to-do-list").innerHTML = ""
    filteredToDos.forEach(function(toDo) {
        const singleToDo = document.createElement("li")
        document.querySelector("#to-do-list").appendChild(singleToDo)
        const mark = document.createElement("span")
        singleToDo.appendChild(mark)
        const toDoElement = document.createElement("h2")
        toDoElement.textContent = toDo.title
        singleToDo.appendChild(toDoElement)

        singleToDo.addEventListener("click", function() {
            singleToDo.classList.toggle("completed")
            toggleToDoComplete(toDo.id)
            localStorage.setItem("toDos", JSON.stringify(toDos))
        })

        singleToDo.addEventListener("dblclick", function() {
            removeToDo(toDo.id)
            renderToDos(toDos, filter)
            localStorage.setItem("toDos", JSON.stringify(toDos))
        })
        
        if (toDo.completed) {
            singleToDo.classList.add("completed")
        } else {
            singleToDo.classList.remove("completed")
        }
    })
}
renderToDos(toDos, filter)

const addNewToDo = function() {
    if (toDoInput.value.trim() !== "") {
        toDos.push ({
        id: uuidv4(),
        title: toDoInput.value,
        completed: false,
    })
    toDoInput.value = ""
    renderToDos(toDos, filter)
    localStorage.setItem("toDos", JSON.stringify(toDos))
    } else {
        alert("Doing Nothing Can Also Be Fun :) But Please Enter A Character At Least To Be Added To The List.")
    }
}
const AddOnEnter = function(event) {
    if (event.key === "Enter") {
        addNewToDo()
    }
}

const filterToDos = function(e) {
    filter.text = e.target.value
    renderToDos(toDos, filter)
}

const toggleToDoComplete = function(id) {
    const toDo = toDos.find(function(toDo) {
        return toDo.id === id
    })
    if (toDo !== undefined) {
        toDo.completed = !toDo.completed
    }
}

const removeToDo = function(id) {
    const toDoIndex = toDos.findIndex(function(toDo) {
        return toDo.id === id
    })
    if (toDoIndex > -1) {
        toDos.splice(toDoIndex, 1)
    }
}

const hideCompleted = function(e) {
    filter.hideCompleted = e.target.checked
    renderToDos(toDos, filter)
}

toDoInput.addEventListener("keypress", AddOnEnter)
addButton.addEventListener("click", addNewToDo)
filterInput.addEventListener("input", filterToDos)
hideCompletedcheckbox.addEventListener("change", hideCompleted)