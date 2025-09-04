

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



// function validateForm()

function validateForm() {

// get name from form; remove space
// get email from form; remove space
// get number of guests-value
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const guests = parseInt(document.getElementById("guests").value);

// name + email + numbere of guests more no less than 1 + choice of slot: required
    if (!name || !email || !guests || !selectedSlot) {
        return false;
    }
    if (guests < 1) return false;

// correct emailadress-format required
    if (!/\S+@\S+\.\S+/.test(email)) return false;

    return true;
}


// function handleSubmit()

function handleSubmit(event) {

// - prevent default form submission
    event.preventDefault();

// link element
    const message = document.getElementById("confirmation-message");

// - show confirmation message
    if (validateForm()) {

// get name from form
        const name = document.getElementById("name").value.trim();

// get number of guests from form
        const guests = document.getElementById("guests").value;

// get chosen time
        const time = selectedSlot.textContent;
// get chosen day
        const day = document.querySelector(".calendar-header").children[
            Array.from(document.querySelector(".calendar-grid").children).indexOf(selectedSlot) % 7
        ].textContent;

// confirmation message
        message.textContent = `booking confirmed for ${name}, ${guests} guests on ${day} at ${time}.`;

// reset booking form + calendar slot selection
        document.getElementById("booking-form").reset();
        selectedSlot.classList.remove("selected");
        selectedSlot = null;

// if information not validated then show error-message and do nothing
    } else {
        message.textContent = "please fill in all fields correctly and select a time slot";
    }
}


// run function handleSubmit() on submitting the form
document.getElementById("booking-form").addEventListener("submit", handleSubmit);
// start on webpage load
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
});
