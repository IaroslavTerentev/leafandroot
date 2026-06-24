const em_form = document.getElementById("emergency-form");
const non_em_form = document.getElementById("non-emergency-form");
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-btn");

const nameField = document.getElementById("name");
const contactField = document.getElementById("contact");

const checkbox_sick = document.querySelector('input[value="sick"]');

/* Fill Emergency page fields from saved data */
if (em_form && nameField && contactField) {
    nameField.value = localStorage.getItem("savedName") || "";
    contactField.value = localStorage.getItem("savedContact") || "";
}

/* Home page form */
if (non_em_form) {
    

    non_em_form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!non_em_form.checkValidity()) {
        non_em_form.reportValidity();
        return;
    }

    if (checkbox_sick.checked) {
        localStorage.setItem("savedName", nameField.value);
        localStorage.setItem("savedContact", contactField.value);

        window.location.href = "Emergency room.html";
    } else {
        if (popup) {
        popup.style.display = "block";
        }
    }
});
}

/* Emergency page form */
if (em_form) {
    em_form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!em_form.checkValidity()) {
        em_form.reportValidity();
        return;
    }

    if (popup) {
    popup.style.display = "block";
    }

    localStorage.removeItem("savedName");
    localStorage.removeItem("savedContact");
});
}

/* Close popup */
if (closeBtn) {
    closeBtn.addEventListener("click", function() {
        popup.style.display = "none";
    });
}

const textInputs = document.querySelectorAll('.plant-form input[type="text"]');

textInputs.forEach(function(input) {
    input.addEventListener("input", function() {
        input.classList.add("touched");
    });

    input.addEventListener("blur", function() {
        input.classList.add("touched");
    });
});

const nonEmergencyForm = document.getElementById("non-emergency-form");
if (nonEmergencyForm) {
nonEmergencyForm.addEventListener("submit", function(e) {
    const selectedServices = [...document.querySelectorAll('input[name="interest"]:checked')]
    .map(box => box.value)
    .join(", ");

    if (!checkbox_sick.checked) {

        e.preventDefault();

        fetch("http://localhost:3000/consultations", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customer_name: document.getElementById("name").value,
                contact: document.getElementById("contact").value,
                service_need: "Non-emergency",
                plant_problem: selectedServices
            })
        });

    }

})};
const EmergencyForm = document.getElementById("emergency-form");
if (EmergencyForm) {
EmergencyForm.addEventListener("submit", function(e){
    const selectedServices = [...document.querySelectorAll('input[name="service"]:checked')]
    .map(box => box.value)
    .join(", ");

    e.preventDefault();

    fetch("http://localhost:3000/consultations", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

         body: JSON.stringify({
                customer_name: document.getElementById("name").value,
                contact: document.getElementById("contact").value,
                service_need: "Emergency",
                plant_problem: selectedServices
            })

    });

})};