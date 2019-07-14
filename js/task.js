import Task from './event_minimal-class.js';

export default function getTaskData(monthId) {
    var newFormData = new FormData();
    newFormData.append("month", monthId);

/*
    $.ajax({
        url: "./php/get-task.php",
        method: "POST",
        data: newFormData,
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function() {
            //loader activate
        },*/
       // success: function(data) {
            let data = /*JSON.parse(data);*/ [['id1','6', '11', 'length', 'title', 'state'], ['id2','7', '2', 'length', 'title', 'state'], ['id3','6', '22', 'length', 'title', 'state']];
            console.log(data);
            fillCalendar(data);
        //}
    //});
}

let tasks = {};
let newTasks = [];

function fillCalendar(taskData) {
    for (let i = 0; i < taskData.length; i++) {
        tasks[taskData[i][0]] = new Task(taskData[i]);
        newTasks.push(tasks[taskData[i][0]].id);
        document.getElementById(`#${tasks[taskData[i][0]].month}-${tasks[taskData[i][0]].startDay}`).innerHTML = `<div id="${tasks[taskData[i][0]].id}">${i}</div>`;
    }

    for (let i = 0; i < newTasks.length; i++) {
        document.getElementById(newTasks[i]).addEventListener("click", function() {
            tasks[this.id].open([1,2,3,4,5,6,7]);
            console.log(tasks[this.id]);
        })
    }
}