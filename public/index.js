const formName = document.querySelector("#name-field");
const formGroupSize = document.querySelector("#group-size");
const room1 = document.querySelector("#room1");
const room2 = document.querySelector("#room2");
const room3 = document.querySelector("#room3");
const queue = document.querySelector("#queue");
const formRooms = document.querySelectorAll(".checked");
const submitBtn = document.querySelector("#submit");

function validateForm() {
    if (formName == "") {
        alert("Name must be filled out.");
        return false;
    } else
        if (formGroupNo < 1) {
        alert("Group Size must be at least 1.")
        return false;
    } else
    if (!room1.classList.contains("checked") && !room2.classList.contains("checked") && !room3.classList.contains("checked")) {
        alert("Must select at least one room.")
        return false;
    } else
    return true;
}

const addToQueue = (groupName, groupSize, groupRooms) => {
    let li = document.createElement("li");
    li.classList.add("group-name");
    li.textContent = `${groupName} (${groupSize})`;
    let p = document.createElement("p");
    p.classList.add("group-rooms");
    p.textContent = `${groupRooms}`;
    li.appendChild(p);
}

  submitBtn.addEventListener("submit", () => {
    if (validateForm() == true) {
        queue.appendChild(addToQueue(formName, formGroupSize, groupRooms))
    }
});