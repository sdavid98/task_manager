import Task from './event_minimal-class.js';
import callAjax from './callAjax.js';
import {endPoints} from './drawCalendar.js';

let tasks = {};

let currentDay;

let firstRequest = true;

export default function fillCalendar(taskData) {
    tasks = {}
    
    let currentTasks = [];
    let currentYears = [];
    for (let i = 0; i < taskData.length; i++) {
        const taskDate = 'Y'+taskData[i].start_year+'-M'+taskData[i].start_month+'-D'+taskData[i].start_day;
        if (!tasks[taskDate]) tasks[taskDate] = {};
        tasks[taskDate][taskData[i].task_id] = new Task(taskData[i]);

        if (currentTasks.indexOf('M'+taskData[i].start_month+'-D'+taskData[i].start_day) < 0) currentTasks.push('M'+taskData[i].start_month+'-D'+taskData[i].start_day);
        if (currentYears.indexOf(taskData[i].start_year) < 0) currentYears.push(taskData[i].start_year);

    }
    if (refresh) document.getElementById(currentDay).click();
    refresh = false;

    for (let i = 0; i < currentTasks.length; i++) {
        document.getElementById(currentTasks[i]).innerHTML += '<span class="line-holder">';
        /*document.getElementById(currentTasks[i]).addEventListener('click', function() {
            for (let j = 0; j < currentYears.length; j++) {
                //console.log(tasks['Y'+currentYears+'-'+currentTasks[i]]); 
                listOutDay(tasks['Y'+currentYears+'-'+currentTasks[i]], currentTasks[i]);
            }
        });*/
    }
    for (let i = 0; i < 12; i++) {
        for (let j = 1; j < 32; j++) {
            if (document.getElementById('M'+i+'-D'+j)) {
                document.getElementById('M'+i+'-D'+j).addEventListener('click', function() {
                    listOutDay(tasks['Y'+currentYears+'-'+this.id], this.id);
                    currentDay = this.id;
                });
            }
            
        }
    }

    if (firstRequest) {
        let d = new Date();
        document.getElementById('M'+d.getMonth()+'-D'+(d.getDay()+1)).click();
        currentDay = 'M'+d.getMonth()+'-D'+(d.getDay()+1);
        firstRequest = false;
    }


}
    document.getElementById('create').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'block';
        document.getElementById('done').addEventListener('click', function() {
            let list = document.getElementById(currentDay).classList;
            let year;
            for (let i = 0; i<list.length; i++) {
                if (list[i].indexOf('y-') == 0) year = list[i].split('-')[1];
            }

            callAjax({'title': document.getElementById('title').value, 'desc': document.getElementById('desc').value, 'year': year, 'month': currentDay.split('-')[0].substring(1), 'day': currentDay.split('-')[1].substring(1), 'endPoints': endPoints}, './php/create-task', fillCalendar);
            document.getElementById('title').value = '';
            document.getElementById('desc').value = '';
            document.getElementById('modal').style.display = 'none';
        })
    });
function listOutDay(dayTasks, date) {
    //console.log(dayTasks, date);
    let suffix = ['st', 'nd', 'rd'][date.charAt(date.length-1)-1] || 'th';
    let shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.split('-')[0].substring(1)];
    let titleDate = `${date.split('-')[1].substring(1)}<sup>${suffix}</sup> ${shortMonth}`;
    if (!dayTasks) {
        document.getElementById('taskList').innerHTML = `<h1 class="details__date">No tasks for ${titleDate}</h1>`;
    }
    else {
        let title = Object.keys(dayTasks).length > 1 ? 's' : '';
        
        let activeListeners = [];
        document.getElementById('taskList').innerHTML = `<h1 class="details__date">Task${title} for ${titleDate}</h1>`;
        for (let key in dayTasks) {
            if (dayTasks.hasOwnProperty(key)) {
                let doneTask = dayTasks[key].state == 1 ? 'details__mini__title--edit--done' : '';
                document.getElementById('taskList').innerHTML += `
                <div class="details__mini">
                    <div class="details__mini__header">
                        <h2 class="details__mini__title"><span  class="details__mini__title__icon"><a class="fas" id="open-${dayTasks[key].id}" onclick="this.classList.toggle('fas--active')">&#xf107;</a></span>
                            <span class="details__mini__title--edit ${doneTask}" id="title-${dayTasks[key].id}">${dayTasks[key].title}</span>
                            <div class="dropdown" style="float:right;">
                                <a class="dropdown__button">&#x205D;</a>
                                <div class="dropdown__content">
                                    <a id="edit-${dayTasks[key].id}" href="#">Edit</a>
                                    <a id="done-${dayTasks[key].id}" href="#">Done</a>
                                    <a id="delete-${dayTasks[key].id}" href="#">Delete</a>
                                </div>
                          </div></h2>
                    </div>
                    <div class="details__mini__content" id="${dayTasks[key].id}">
                    <p>${dayTasks[key].description}</p> 
                    </div>
                </div>`;
                activeListeners.push(dayTasks[key].id);
            }
        }
        //console.log(activeListeners);
        showContent(activeListeners);
        editContent(activeListeners);
        markAsDone(activeListeners);
        deleteTask(activeListeners);
    }
}
let refresh;
function deleteTask(plainIds) {
    const readyToDelete = plainIds.map(val => 'delete-'+val);
    for (let i = 0; i < readyToDelete.length; i++) {
        document.getElementById(readyToDelete[i]).addEventListener('click', function() {
            let deleteIt = plainIds[i];
            refresh = true;
            callAjax({'id': deleteIt, 'endPoints': endPoints}, './php/delete-task.php', fillCalendar);
            let lineHolder = document.getElementById(currentDay).getElementsByClassName('line-holder')[0];
            lineHolder.parentElement.removeChild(lineHolder);
        });
    }
}

function markAsDone(plainIds) {
    const readyToMark = plainIds.map(val => 'done-'+val);
    for (let i = 0; i < readyToMark.length; i++) {
        document.getElementById(readyToMark[i]).addEventListener('click', function() {
            document.getElementById('title-'+plainIds[i]).classList.toggle('details__mini__title--edit--done');
            let state = document.getElementById('title-'+plainIds[i]).classList.contains('details__mini__title--edit--done') ? 1 : 0;
            callAjax({'id': plainIds[i], 'state': state, 'endPoints': endPoints}, './php/mark-done', fillCalendar);
        });
    }
}

function editContent(plainIds) {
    const editable = plainIds.map(val => 'edit-'+val);
    let title;
    let description;
    let prevTitle;
    let prevDesc;

    for (let i = 0; i < editable.length; i++) {
        document.getElementById(editable[i]).addEventListener('click', function() {
            title = document.getElementById('title-'+editable[i].split('-')[1]);
            description = document.getElementById(plainIds[i]).getElementsByTagName('p')[0];
            prevTitle = title.innerHTML;
            prevDesc = description.innerHTML;
            [title, description].forEach((item) => item.setAttribute('contenteditable', 'true'));
            [title, description].forEach((item) => item.style.borderColor = 'white');
            if (!document.getElementById(plainIds[i]).classList.contains('active')) document.getElementById('open-'+plainIds[i]).click();
        });
    }
    document.addEventListener('click', function(e) {
        //console.log(title, description, e.target);
        if (title && description) {
            if (e.target != title && e.target != description && !e.target.id.substring('edit')) {
                [title, description].forEach((item) => item.setAttribute('contenteditable', 'false'));
                [title, description].forEach((item) => item.style.borderColor = 'transparent');
                if(title.innerHTML != prevTitle || description.innerHTML != prevDesc) {
                    //console.log({'id': description.parentElement.id, 'title': title.innerHTML, 'description': description.innerHTML});
                    callAjax({'id': description.parentElement.id, 'title': title.innerHTML, 'description': description.innerHTML, 'endPoints': endPoints}, './php/update-task.php', fillCalendar);
                    prevTitle = title.innerHTML;
                    prevDesc = description.innerHTML;
                }
            }
        }
        
    })
}

function showContent(plainIds) {
    const iconIds = plainIds.map(val => 'open-'+val);
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