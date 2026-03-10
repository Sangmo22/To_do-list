$(document).ready(function () {
  function addTask() {
    const taskText = $("#todoInput").val().trim();

    if (!taskText) {
      return;
    }

    const listItem = $(`
      <li>
        <span class="task-text"></span>
        <div class="task-actions">
          <button class="complete-btn" type="button">Complete</button>
          <button class="delete-btn" type="button">Delete</button>
        </div>
      </li>
    `);

    listItem.find(".task-text").text(taskText);
    $("#todoList").append(listItem);
    $("#todoInput").val("").focus();
  }

  $("#addBtn").on("click", addTask);

  $("#todoInput").on("keypress", function (event) {
    if (event.which === 13) {
      addTask();
    }
  });

  $("#todoList").on("click", ".complete-btn", function () {
    const listItem = $(this).closest("li");
    const taskText = listItem.find(".task-text");
    const isCompleted = taskText.hasClass("done");

    taskText.toggleClass("done", !isCompleted);
    $(this).text(isCompleted ? "Complete" : "Undo");
  });

  $("#todoList").on("click", ".delete-btn", function () {
    $(this).closest("li").remove();
  });
});
