import Task from './event_minimal-class.js';

export default function getTaskData(monthId) {
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
            data = JSON.parse(data);// [['id1','6', '11', 'length', 'title', 'state'], ['id2','7', '2', 'length', 'title', 'state'], ['id3','6', '22', 'length', 'title', 'state']];
            //console.log(data);
            //console.log(data[0]);
            //console.log(data[0][1]);
            fillCalendar(data);
        }
    });
}

let tasks = {};
let newTasks = [];

function fillCalendar(taskData) {
    for (let i = 0; i < taskData.length; i++) {
        //console.log(taskData[i]);
        tasks[taskData[i]] = new Task(taskData[i]);
        //console.log(tasks[taskData[i]]);
        newTasks.push(tasks[taskData[i]].id);
        document.getElementById(`#${tasks[taskData[i]].month}-${tasks[taskData[i]].startDay}`).innerHTML = `<div id="${tasks[taskData[i]].id}">${i}</div>`;
    }

    for (let i = 0; i < newTasks.length; i++) {
        document.getElementById(newTasks[i]).addEventListener("click", function() {
            tasks[this.id].open([1,2,3,4,5,6,7]);
            console.log(tasks[this.id]);
        })
    }
}