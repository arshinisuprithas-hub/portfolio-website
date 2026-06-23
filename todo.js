let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span onclick="toggleTask(${index})">
                ${task.text}
            </span>

            <div>
                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {

    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed: false
    });

    saveTasks();

    renderTasks();

    input.value = "";
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}

function editTask(index) {

    const newText = prompt(
        "Edit Task",
        tasks[index].text
    );

    if (newText) {

        tasks[index].text = newText;

        saveTasks();

        renderTasks();
    }
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function filterTasks(type) {

    renderTasks(type);
}

renderTasks();
