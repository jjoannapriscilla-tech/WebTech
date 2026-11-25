
// 1. Learn More buttons
let learnButtons = document.querySelectorAll(".learn-btn[data-target]");

learnButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let targetId = button.getAttribute("data-target");
        let information = document.getElementById(targetId);

        information.classList.toggle("show");

        if (information.classList.contains("show")) {
            button.textContent = "Show Less";
        } else {
            button.textContent = "Learn More";
        }

    });

});


// 2. Show and Hide QA Process
let processButton = document.getElementById("process-btn");
let processContent = document.getElementById("process-content");

processButton.addEventListener("click", function() {

    processContent.classList.toggle("show");

    if (processContent.classList.contains("show")) {
        processButton.textContent = "Hide QA Process";
    } else {
        processButton.textContent = "Show QA Process";
    }

});


// 3. Consultation Form Notification
let consultationForm = document.getElementById("consultation-form");
let notification = document.getElementById("notification");

consultationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    notification.classList.add("show");

    consultationForm.reset();

    setTimeout(function() {

        notification.classList.remove("show");

    }, 3000);

});
