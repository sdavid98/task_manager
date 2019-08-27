import Task from './event_minimal-class.js';

 function getTaskData(monthId) {
    var newFormData = new FormData();
    newFormData.append("month", monthId);


    $.ajax({
        url: "./php/get-task.php",
        method: "POST",
        data: newFormData,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function() {
            //loader activate
        },
        success: function(data) {
            data = JSON.parse(data);
            fillCalendar(data);
        }
    });
}

let tasks = {};
let newTasks = [];

export default function fillCalendar(taskData) {
    for (let i = 0; i < taskData.length; i++) {
        tasks[taskData[i].id] = new Task(taskData[i]);
        let currentTask = tasks[taskData[i].id];
        console.log(tasks);
        newTasks.push(currentTask.id);
        console.log(`#${currentTask.month}-${currentTask.startDay}`);
        document.getElementById(`#${currentTask.month}-${currentTask.startDay}`).innerHTML = `<div id="${currentTask.id}">${i}</div>`;
    }

    for (let i = 0; i < newTasks.length; i++) {
        document.getElementById(newTasks[i]).addEventListener("click", function() {
            tasks[this.id].open([1,2,3,4,5,6,7]);
            console.log(tasks[this.id]);
        })
    }
}