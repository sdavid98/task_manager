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

let firstRequest = true;

export default function fillCalendar(taskData) {
    let currentTasks = [];
    let currentYears = [];
    for (let i = 0; i < taskData.length; i++) {
        const taskDate = 'Y'+taskData[i].start_year+'-M'+taskData[i].start_month+'-D'+taskData[i].start_day;
        if (!tasks[taskDate]) tasks[taskDate] = {};
        tasks[taskDate][taskData[i].task_id] = new Task(taskData[i]);
        if (currentTasks.indexOf('M'+taskData[i].start_month+'-D'+taskData[i].start_day) < 0) currentTasks.push('M'+taskData[i].start_month+'-D'+taskData[i].start_day);
        if (currentYears.indexOf(taskData[i].start_year) < 0) currentYears.push(taskData[i].start_year);
        /*
        tasks[taskData[i].task_id] = new Task(taskData[i]);
        let currentTask = tasks[taskData[i].task_id];
        newTasks.push(currentTask.id);

        console.log(`#${currentTask.start_month}-${currentTask.start_day}`);
        if (screen.width < 992) {
            document.getElementById(`d${currentTask.start_month}-${currentTask.start_day}`).innerHTML += '<span class="line-holder">';
        }
        //document.getElementById(`#${currentTask.start_month}-${currentTask.start_day}`).innerHTML += `<div id="${currentTask.id}">${i}</div>`;
       // document.getElementById(currentTask.shortStart).innerHTML = `<div id="${currentTask.id}">${i}</div>`;
       */
    }

    for (let i = 0; i < currentTasks.length; i++) {
        document.getElementById(currentTasks[i]).innerHTML += '<span class="line-holder">';
        document.getElementById(currentTasks[i]).addEventListener('click', function() {
            for (let j = 0; j < currentYears.length; j++) {
                //console.log(tasks['Y'+currentYears+'-'+currentTasks[i]]); 
                listOutDay(tasks['Y'+currentYears+'-'+currentTasks[i]], currentTasks[i]);
            }
        });
    }

    if (firstRequest) {
        let d = new Date();
        document.getElementById('M'+d.getMonth()+'-D'+(d.getDay()+1)).click();
        firstRequest = false;
    }
  
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

function listOutDay(dayTasks, date) {
    if (dayTasks.length == 0) {
        document.getElementById('taskList').innerHTML += '<h1 class="details__date">No tasks for today</h1>';
    }
    else {
        let title = dayTasks.length > 1 ? 's' : '';
        console.log(date.charAt(date.length-1)-1);
        let suffix = ['st', 'nd', 'rd'][date.charAt(date.length-1)-1] || 'th';
        let shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.split('-')[0].substring(1)];
        let activeListeners = [];
        document.getElementById('taskList').innerHTML = `<h1 class="details__date">Task${title} for ${date.split('-')[1].substring(1)}<sup>${suffix}</sup> ${shortMonth}</h1>`;
        for (let key in dayTasks) {
            if (dayTasks.hasOwnProperty(key)) {
                let doneTask = dayTasks[key].state == 1 ? 'details__mini__title--done' : '';
                document.getElementById('taskList').innerHTML += `
                <div class="details__mini">
                    <div class="details__mini__header">
                        <h2 class="details__mini__title ${doneTask}"><span  class="details__mini__title__icon"><a class="fas" id="open-${dayTasks[key].id}" onclick="this.classList.toggle('fas--active')">&#xf107;</a></span>${dayTasks[key].title}</h2>
                    </div>
                    <div class="details__mini__content" id="${dayTasks[key].id}">
                    <p>${dayTasks[key].description}</p> 
                    </div>
                </div>`;
                activeListeners.push("open-"+dayTasks[key].id);
            }
        }
        console.log(activeListeners);
        showContent(activeListeners);
    }
}

function showContent(iconIds) {
    for (let i = 0; i < iconIds.length; i++) {
        document.getElementById(iconIds[i]).addEventListener('click', function() {
            const elem = document.getElementById(iconIds[i].split('-')[1]);
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
        });
    }
}