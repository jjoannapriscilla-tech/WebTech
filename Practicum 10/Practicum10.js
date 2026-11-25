
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
