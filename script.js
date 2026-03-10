$(document).ready(function () {
  function addTask() {
    const taskText = $("#todoInput").val().trim();

    if (!taskText) {
      return;
    }

    const dateLabel = new Date().toLocaleDateString([], {
      dateStyle: "medium",
    });

    const listItem = $(`
      <li>
        <div class="task-content">
          <span class="task-text"></span>
          <small class="task-date"></small>
        </div>
        <div class="task-actions">
          <label class="complete-toggle" aria-label="Mark task complete">
            <input class="complete-checkbox" type="checkbox" />
          </label>
          <button class="delete-btn" type="button" aria-label="Delete task">
            <svg class="delete-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"></path>
            </svg>
          </button>
        </div>
      </li>
    `);

    listItem.find(".task-text").text(taskText);
    listItem.find(".task-date").text(dateLabel);
    $("#todoList").append(listItem);
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
    const taskText = listItem.find(".task-text");
    taskText.toggleClass("done", $(this).is(":checked"));
  });

  $("#todoList").on("click", ".delete-btn", function () {
    $(this).closest("li").remove();
  });
});
