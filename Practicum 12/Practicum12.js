
// 1. Learn More Buttons
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



// 3. Consultation Form Validation

let consultationForm = document.getElementById("consultation-form");

let notification = document.getElementById("notification");

let formError = document.getElementById("form-error");

let nameInput = document.getElementById("name");

let emailInput = document.getElementById("email");

let phoneInput = document.getElementById("phoneno");

let serviceInput = document.getElementById("service");

let budgetInput = document.getElementById("budget");

let detailsInput = document.getElementById("details");


// Custom Name Validation
nameInput.addEventListener("input", function() {

    nameInput.setCustomValidity("");

    if (!nameInput.validity.valid) {
        nameInput.setCustomValidity(
            "Name must contain 3 to 40 letters and spaces."
        );
    }

});


// Custom Phone Validation
phoneInput.addEventListener("input", function() {

    phoneInput.setCustomValidity("");

    if (!phoneInput.validity.valid) {
        phoneInput.setCustomValidity(
            "Please enter exactly 10 digits."
        );
    }

});


// Custom Budget Validation
budgetInput.addEventListener("input", function() {

    budgetInput.setCustomValidity("");

    if (budgetInput.value !== "" && !budgetInput.validity.valid) {
        budgetInput.setCustomValidity(
            "Budget must be between ₹1,000 and ₹10,00,000."
        );
    }

});


// Custom Project Details Validation
detailsInput.addEventListener("input", function() {

    detailsInput.setCustomValidity("");

    if (!detailsInput.validity.valid) {
        detailsInput.setCustomValidity(
            "Project details must contain at least 10 characters."
        );
    }

});


// Form Submission
consultationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Clear old error messages
    formError.textContent = "";

    // Check all form fields
    if (consultationForm.checkValidity()) {

        notification.classList.add("show");

        formError.textContent = "";

        consultationForm.reset();

        setTimeout(function() {

            notification.classList.remove("show");

        }, 3000);

    } else {

        formError.textContent =
            "Please correct the errors in the form.";

        consultationForm.reportValidity();

    }

});


// Reset Form
consultationForm.addEventListener("reset", function() {

    formError.textContent = "";

    notification.classList.remove("show");

    nameInput.setCustomValidity("");
    phoneInput.setCustomValidity("");
    budgetInput.setCustomValidity("");
    detailsInput.setCustomValidity("");

});


// 4. QA BUG REPORT MANAGER

let bugTitle = document.getElementById("bug-title");
let bugDescription = document.getElementById("bug-description");
let bugPriority = document.getElementById("bug-priority");

let addButton = document.getElementById("add-bug");
let bugList = document.getElementById("bug-list");
let bugMessage = document.getElementById("bug-message");

let bugs = [];
let editingIndex = -1;


// Add or Update Bug
addButton.addEventListener("click", function() {

    let title = bugTitle.value.trim();
    let description = bugDescription.value.trim();
    let priority = bugPriority.value;

    if (title === "" || description === "") {
        bugMessage.textContent = "Please enter all bug details.";
        return;
    }

    if (editingIndex === -1) {

        let newBug = {
            title: title,
            description: description,
            priority: priority
        };

        bugs.push(newBug);

        bugMessage.textContent = "Bug report added successfully!";

    } else {

        bugs[editingIndex].title = title;
        bugs[editingIndex].description = description;
        bugs[editingIndex].priority = priority;

        bugMessage.textContent = "Bug report updated successfully!";

        editingIndex = -1;

        addButton.textContent = "Add Bug Report";

    }

    bugTitle.value = "";
    bugDescription.value = "";
    bugPriority.value = "Critical";

    displayBugs();

});


// Display Bug Reports
function displayBugs() {

    bugList.innerHTML = "";

    if (bugs.length === 0) {

        let emptyItem = document.createElement("li");

        emptyItem.textContent = "No bug reports added yet.";

        bugList.appendChild(emptyItem);

        return;
    }

    bugs.forEach(function(bug, index) {

        let listItem = document.createElement("li");

        listItem.setAttribute("data-index", index);

        let title = document.createElement("span");

        title.classList.add("bug-title");
        title.textContent = bug.title;

        let description = document.createElement("p");

        description.classList.add("bug-description");
        description.textContent = bug.description;

        let priority = document.createElement("span");

        priority.classList.add("bug-priority");
        priority.textContent = "Priority: " + bug.priority;

        let editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");

        let removeButton = document.createElement("button");

        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");


        // Edit Bug
        editButton.addEventListener("click", function() {

            bugTitle.value = bug.title;
            bugDescription.value = bug.description;
            bugPriority.value = bug.priority;

            editingIndex = index;

            addButton.textContent = "Update Bug";

            bugMessage.textContent = "Edit the details and click Update Bug.";

        });


        // Remove Bug
        removeButton.addEventListener("click", function() {

            bugs.splice(index, 1);

            listItem.remove();

            bugMessage.textContent = "Bug report removed successfully!";

            displayBugs();

            if (editingIndex !== -1) {
                editingIndex = -1;
                addButton.textContent = "Add Bug Report";
            }

        });


        listItem.appendChild(title);
        listItem.appendChild(description);
        listItem.appendChild(priority);
        listItem.appendChild(editButton);
        listItem.appendChild(removeButton);

        bugList.appendChild(listItem);

    });

}
// Get HTML elements

const loadButton = document.getElementById("load-api-btn");
const loading = document.getElementById("api-loading");
const errorMessage = document.getElementById("api-error");
const tableBody = document.getElementById("api-data");


// Function to fetch API data

async function loadTasks() {

    loading.textContent = "Loading testing tasks...";
    errorMessage.textContent = "";
    loadButton.disabled = true;

    tableBody.textContent = "";

    try {

        // Fetch data from API

        const response = await fetch(
            "https://dummyjson.com/todos?limit=10"
        );

        if (!response.ok) {
            throw new Error("Unable to retrieve data");
        }

        // Convert response into JSON

        const data = await response.json();

        // Display each task

        data.todos.forEach(function(task) {

            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            const taskCell = document.createElement("td");
            const statusCell = document.createElement("td");
            const userCell = document.createElement("td");

            idCell.textContent = task.id;
            taskCell.textContent = task.todo;

            if (task.completed) {
                statusCell.textContent = "Completed";
            } else {
                statusCell.textContent = "Pending";
            }

            userCell.textContent = task.userId;

            row.appendChild(idCell);
            row.appendChild(taskCell);
            row.appendChild(statusCell);
            row.appendChild(userCell);

            tableBody.appendChild(row);

        });

    }

    catch (error) {

        errorMessage.textContent =
            "Error: Unable to load testing tasks. Please try again.";

    }

    finally {

        loading.textContent = "";
        loadButton.disabled = false;

    }

}


// Button click event

loadButton.addEventListener("click", loadTasks);