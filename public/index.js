// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'a87425010ca44ef1a23980299e68854e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
//
const formName = document.querySelector("#name-field");
const formGroupSize = document.querySelector("#group-size");
const room1 = document.querySelector("#room1");
const room1Label = document.querySelector("#room-1-label").textContent;
const room2 = document.querySelector("#room2");
const room2Label = document.querySelector("#room-2-label").textContent;
const room3 = document.querySelector("#room3");
const room3Label = document.querySelector("#room-3-label").textContent;
const queue = document.querySelector("#queue-list");
const submitBtn = document.querySelector("#submit");

let formRooms = [];

room1.addEventListener("change", () => {
    if(room1.checked == true){
        formRooms.push(room1Label)
    }else if(room1.checked == false){
        formRooms = [];
        room1.checked = false;
        room2.checked = false;
        room3.checked = false;
    }
});

room2.addEventListener("change", () => {
    if(room2.checked == true){
        formRooms.push(room2Label)
    }else if(room2.checked == false){
        formRooms = [];
        room1.checked = false;
        room2.checked = false;
        room3.checked = false;
    }
});

room3.addEventListener("change", () => {
    if(room3.checked == true){
        formRooms.push(room3Label)
    }else if(room3.checked == false){
        formRooms = [];
        room1.checked = false;
        room2.checked = false;
        room3.checked = false;
    }
});

function submitHandler() {
    if (formName.value == "") {
        alert("Name must be filled out.");
        rollbar.error("nameless form");
        return false;
    } else
        if (formGroupSize.value < 1) {
        alert("Group Size must be at least 1.");
        rollbar.error("group size too small on form");
        return false;
    } else
    if (!room1.checked && !room2.checked && !room3.checked) {
        alert("Must select at least one room.");
        rollbar.error("no rooms selected");
        return false;
    } else
    return true;
}

const addToQueue = (groupName, groupSize, groupRooms) => {
    let li = document.createElement("li");
    li.classList.add("group-name");
    li.textContent = `- ${groupName.value} (${groupSize.value})`;
    queue.appendChild(li)
    let p = document.createElement("p");
    p.classList.add("group-rooms");
    p.textContent = `--|`
    for(let i = 0; i < (formRooms.length); i++){ 
        p.textContent +=` ${groupRooms[i]} |`;
    }
    li.appendChild(p);
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault;
    if (submitHandler() == true) {
        addToQueue(formName, formGroupSize, formRooms);
        rollbar.log("group added to queue")
    }
});