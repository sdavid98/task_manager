import Task from './event_minimal-class.js';
import callAjax from './callAjax.js';
/*
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
}*/

let tasks = {};
let newTasks = [];

export default function fillCalendar(taskData) {
    for (let i = 0; i < taskData.length; i++) {
        console.log();
        tasks[taskData[i].task_id] = new Task(taskData[i]);
        let currentTask = tasks[taskData[i].task_id];
        newTasks.push(currentTask.id);

        console.log(`#${currentTask.start_month}-${currentTask.start_day}`);
        if (screen.width < 992) {
            document.getElementById(`#${currentTask.start_month}-${currentTask.start_day}`).innerHTML += '<span class="line-holder">';
        }
        //document.getElementById(`#${currentTask.start_month}-${currentTask.start_day}`).innerHTML += `<div id="${currentTask.id}">${i}</div>`;
       // document.getElementById(currentTask.shortStart).innerHTML = `<div id="${currentTask.id}">${i}</div>`;
    }

    document.getElementById('asd').addEventListener('click', function() {
        const elem = document.getElementById('dsa');
        let interval;
        let height;
        let goal;

        if(!elem.classList.contains('active')) {
            elem.style.height = 'auto';
            const h = elem.offsetHeight;
            elem.style.height = '0';
            height = h;
            goal = h;
            interval = setInterval(frame, 3);
            elem.classList.add('active');
        }
        else {
            const h = elem.offsetHeight;
            height = -h;
            goal = 0;
            interval = setInterval(frame, 3);
            elem.classList.remove('active');
        }
        function frame() {
                if (elem.style.height.substring(0, elem.style.height.length-2) == goal) {
                clearInterval(interval);
                } else {
                    elem.style.height = Number(elem.style.height.substring(0, elem.style.height.length-2))+height/100+'px';
                
                }
            }
        
        //document.getElementById('dsa').classList.toggle('details__mini__content--active')
    });
    /*for (let key in tasks) {
        if (tasks.hasOwnProperty(key)) {
            document.getElementById(tasks[key].addEventListener('click', function() {
                callAjax(tasks[this.id], './get-task.php', tasks[this.id].open)
            }))
        }
    }*/

    /*for (let i = 0; i < newTasks.length; i++) {
        document.getElementById(newTasks[i]).addEventListener("click", function() {
            console.log(tasks);
            tasks[this.id].open([1,2,3]);
            console.log(tasks[this.id]);
        })
    }*/
}

