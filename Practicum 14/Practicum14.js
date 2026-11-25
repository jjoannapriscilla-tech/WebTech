
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

// QA TEST CASE EXPLORER
// Test Case Information

const testCases = [

    {
        id: 1,
        title: "Login Functionality Testing",
        category: "Manual Testing",
        description: "Verify login using valid and invalid credentials.",
        image: "C:/1st year/web technology/module 1/Manual Testing.png",
        steps: [
            "Open the login page.",
            "Enter valid credentials.",
            "Click the Login button.",
            "Verify successful login."
        ]
    },

    {
        id: 2,
        title: "Automated Registration Testing",
        category: "Automation Testing",
        description: "Automate user registration and form validation.",
        image: "C:/1st year/web technology/module 1/Automation Testing.png",
        steps: [
            "Launch the browser.",
            "Open the registration form.",
            "Enter user details.",
            "Verify registration."
        ]
    },

    {
        id: 3,
        title: "Application Load Testing",
        category: "Performance Testing",
        description: "Measure application response under multiple requests.",
        image: "C:/1st year/web technology/module 1/Performance Testing.png",
        steps: [
            "Start the application.",
            "Simulate multiple users.",
            "Measure response time.",
            "Record performance."
        ]
    },

    {
        id: 4,
        title: "Website Security Testing",
        category: "Security Testing",
        description: "Check the website for common security vulnerabilities.",
        image: "C:/1st year/web technology/module 1/Security Testing.png",
        steps: [
            "Open the website.",
            "Check input validation.",
            "Test authentication.",
            "Record security issues."
        ]
    },

    {
        id: 5,
        title: "Password Validation Testing",
        category: "Manual Testing",
        description: "Verify password length and validation rules.",
        image: "C:/1st year/web technology/module 1/Manual Testing.png",
        steps: [
            "Open the password form.",
            "Enter a short password.",
            "Enter a valid password.",
            "Verify validation messages."
        ]
    },

    {
        id: 6,
        title: "Automated Browser Testing",
        category: "Automation Testing",
        description: "Verify browser navigation using automation.",
        image: "C:/1st year/web technology/module 1/Automation Testing.png",
        steps: [
            "Launch browser automation.",
            "Open the website.",
            "Perform navigation.",
            "Verify the result."
        ]
    }

];



// Select HTML Elements

const searchInput = document.querySelector("#case-search");
const categoryFilter = document.querySelector("#category-filter");
const clearButton = document.querySelector("#clear-filter");
const caseContainer = document.querySelector("#case-container");
const caseCount = document.querySelector("#case-count");
const noCases = document.querySelector("#no-cases");


// Display Test Cases

function displayCases(cases) {

    caseContainer.textContent = "";

    cases.forEach(function(testCase) {

        const card = document.createElement("div");
        card.classList.add("case-card");

        const image = document.createElement("img");
        image.src = testCase.image;
        image.alt = testCase.category;

        const heading = document.createElement("h3");
        heading.textContent = testCase.title;

        const category = document.createElement("span");
        category.classList.add("case-category");
        category.textContent = testCase.category;

        const description = document.createElement("p");
        description.textContent = testCase.description;

        // Expandable Testing Steps

        const details = document.createElement("details");

        const summary = document.createElement("summary");
        summary.textContent = "View Testing Steps";

        const stepList = document.createElement("ul");

        testCase.steps.forEach(function(step) {

            const listItem = document.createElement("li");
            listItem.textContent = step;

            stepList.appendChild(listItem);

        });

        details.appendChild(summary);
        details.appendChild(stepList);

        details.addEventListener("toggle", function() {

            card.classList.toggle("active", details.open);

        });

        card.appendChild(image);
        card.appendChild(heading);
        card.appendChild(category);
        card.appendChild(description);
        card.appendChild(details);

        caseContainer.appendChild(card);

    });

    caseCount.textContent =
        "Total Test Cases Found: " + cases.length;

    if (cases.length === 0) {

        noCases.style.display = "block";
        noCases.classList.add("show");

    } else {

        noCases.style.display = "none";
        noCases.classList.remove("show");

    }

}


// Search and Filter

function filterCases() {

    const searchValue = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const filteredCases = testCases.filter(function(testCase) {

        const matchesSearch =
            testCase.title.toLowerCase().includes(searchValue) ||
            testCase.description.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            testCase.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayCases(filteredCases);

}


// Search Event

searchInput.addEventListener("input", function() {

    filterCases();

});


// Category Filter Event

categoryFilter.addEventListener("change", function() {

    filterCases();

});


// Clear Filters

clearButton.addEventListener("click", function() {

    searchInput.value = "";
    categoryFilter.value = "All";

    filterCases();

});


// Find a Specific Test Case

const selectedCase = testCases.find(function(testCase) {

    return testCase.id === 1;

});

console.log("Selected Test Case:", selectedCase);


// Display All Test Cases Initially

displayCases(testCases);
