$(document).ready(function () {
  const STORAGE_KEY = "todoTasks";
  let tasks = [];

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function loadTasks() {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      tasks = savedTasks ? JSON.parse(savedTasks) : [];
      if (!Array.isArray(tasks)) {
        tasks = [];
      }
    } catch (error) {
      tasks = [];
    }
  }

  function renderTasks() {
    const todoList = $("#todoList");
    todoList.empty();

    tasks.forEach(function (task, index) {
      const listItem = $(`
        <li data-index="${index}">
          <div class="task-content">
            <span class="task-text"></span>
            <small class="task-date"></small>
          </div>
          <div class="task-actions">
            <label class="complete-toggle" aria-label="Mark task complete">
              <input class="complete-checkbox" type="checkbox" />
            </label>
            <button class="edit-btn" type="button" aria-label="Edit task">
              <svg class="edit-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.96 1.96 3.75 3.75 2.13-1.79z"></path>
              </svg>
            </button>
            <button class="delete-btn" type="button" aria-label="Delete task">
              <svg class="delete-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"></path>
              </svg>
            </button>
          </div>
        </li>
      `);

      listItem
        .find(".task-text")
        .text(task.text)
        .toggleClass("done", task.completed);
      listItem.find(".task-date").text(task.date);
      listItem.find(".complete-checkbox").prop("checked", task.completed);
      todoList.append(listItem);
    });
  }

  function addTask() {
    const taskText = $("#todoInput").val().trim();

    if (!taskText) {
      return;
    }

    const dateLabel = new Date().toLocaleDateString([], {
      dateStyle: "medium",
    });

    tasks.push({
      text: taskText,
      date: dateLabel,
      completed: false,
    });

    saveTasks();
    renderTasks();
    $("#todoInput").val("");
    $("#todoInput").focus();
  }

  $("#addBtn").on("click", addTask);

  $("#todoInput").on("keypress", function (event) {
    if (event.which === 13) {
      addTask();
    }
  });

  $("#todoList").on("change", ".complete-checkbox", function () {
    const listItem = $(this).closest("li");
    const taskIndex = Number(listItem.data("index"));

    if (Number.isNaN(taskIndex) || !tasks[taskIndex]) {
      return;
    }

    tasks[taskIndex].completed = $(this).is(":checked");
    saveTasks();
    renderTasks();
  });

  $("#todoList").on("click", ".delete-btn", function () {
    const listItem = $(this).closest("li");
    const taskIndex = Number(listItem.data("index"));

    if (Number.isNaN(taskIndex) || !tasks[taskIndex]) {
      return;
    }

    tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();
  });

  $("#todoList").on("click", ".edit-btn", function () {
    const listItem = $(this).closest("li");
    const taskIndex = Number(listItem.data("index"));

    if (Number.isNaN(taskIndex) || !tasks[taskIndex]) {
      return;
    }

    const taskText = listItem.find(".task-text");
    if (!taskText.length) {
      return;
    }

    const editInput = $("<input>", {
      type: "text",
      class: "edit-input",
      value: tasks[taskIndex].text,
      "aria-label": "Edit task text",
    });

    taskText.replaceWith(editInput);
    editInput.focus().select();
  });

  $("#todoList").on("keydown", ".edit-input", function (event) {
    const listItem = $(this).closest("li");
    const taskIndex = Number(listItem.data("index"));

    if (Number.isNaN(taskIndex) || !tasks[taskIndex]) {
      return;
    }

    if (event.key === "Enter") {
      const updatedText = $(this).val().trim();
      if (!updatedText) {
        return;
      }

      tasks[taskIndex].text = updatedText;
      saveTasks();
      renderTasks();
    }

    if (event.key === "Escape") {
      renderTasks();
    }
  });

  $("#todoList").on("blur", ".edit-input", function () {
    const listItem = $(this).closest("li");
    const taskIndex = Number(listItem.data("index"));

    if (Number.isNaN(taskIndex) || !tasks[taskIndex]) {
      return;
    }

    const updatedText = $(this).val().trim();
    if (updatedText) {
      tasks[taskIndex].text = updatedText;
      saveTasks();
    }

    renderTasks();
  });

  loadTasks();
  renderTasks();
});
