

// defining selectedslot aswell as giving it a defualt value

let selectedSlot = null;

// function genereateCalendar()

function generateCalendar() {

// - define an array of all days in the week
// - define an array of times within each day
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const times = ["12:00", "14:00", "16:00", "18:00", "20:00"];

// linking the elements
    const header = document.querySelector(".calendar-header");
    const grid = document.querySelector(".calendar-grid");

// - loop through days and add to header
    days.forEach(day => {
        const div = document.createElement("div");
        div.textContent = day;
        header.appendChild(div);
    });

// - for each day: create a slot div for each time
    for (let t of times) {
        for (let d of days) {
            const slot = document.createElement("div");
            slot.classList.add("slot");
            slot.textContent = t;

            slot.addEventListener("click", () => selectSlot(slot));
            grid.appendChild(slot);
        }
    }
}


// function selectSlot()
function selectSlot(slot) {

// - if slot is available
//  - remove "selected" from previously chosen slot
//  - add "selected" to current slot
//  - update selectSlot variable
    if (slot.classList.contains("unavailable")) return;

    if (selectedSlot) {
        selectedSlot.classList.remove("selected");
    }
    slot.classList.add("selected");
    selectedSlot = slot;
}


// function handleSubmit()
// - prevent default form submission
// - show confirmation message

document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
});
