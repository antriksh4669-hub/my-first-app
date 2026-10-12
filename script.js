const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("myTasks") || "[]");

function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = task.text;

        if (task.completed) {
            text.style.textDecoration = "line-through";
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.style.marginLeft = "10px";

        completeBtn.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "8px";
        deleteBtn.style.background = "#ef4444";

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        li.appendChild(text);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();