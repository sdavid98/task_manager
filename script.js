const fillData = [
    {
        task_id: 'asdasd',
        start_year: 2019,
        start_month: 10,
        start_day: 5,
        end_year: 2019,
        end_month: 10,
        end_day: 25,
        length: 21,
        title: 'November 5 - 25',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 1
    },
    {
        task_id: 'dfgdfg',
        start_year: 2019,
        start_month: 10,
        start_day: 1,
        end_year: 2019,
        end_month: 10,
        end_day: 9,
        length: 9,
        title: 'November 1 - 9',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'sdfsdf',
        start_year: 2019,
        start_month: 9,
        start_day: 16,
        end_year: 2019,
        end_month: 10,
        end_day: 24,
        length: 40,
        title: 'Október 16 - November 24',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'cvdfg',
        start_year: 2019,
        start_month: 8,
        start_day: 30,
        end_year: 2019,
        end_month: 10,
        end_day: 8,
        length: 9,
        title: 'Szeptember 30 - Október 8',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'kghfbdf',
        start_year: 2019,
        start_month: 10,
        start_day: 7,
        end_year: 2019,
        end_month: 10,
        end_day: 12,
        length: 5,
        title: 'November 7 - 12',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'bnnvf',
        start_year: 2019,
        start_month: 10,
        start_day: 7,
        end_year: 2019,
        end_month: 10,
        end_day: 16,
        length: 10,
        title: 'November 7 - 16',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'iuztgh',
        start_year: 2019,
        start_month: 10,
        start_day: 7,
        end_year: 2019,
        end_month: 10,
        end_day: 14,
        length: 8,
        title: 'November 7 - 14',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'vbnrfdtz',
        start_year: 2019,
        start_month: 10,
        start_day: 8,
        end_year: 2019,
        end_month: 10,
        end_day: 29,
        length: 22,
        title: 'November 8 - 29',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    },
    {
        task_id: 'xcbnhfg',
        start_year: 2019,
        start_month: 10,
        start_day: 9,
        end_year: 2019,
        end_month: 10,
        end_day: 10,
        length: 2,
        title: 'November 9 - 10',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 0
    }
];

class Task{
    constructor(obj) {
        let task_id, start_year, start_month, start_day, end_year, end_month, end_day, length, title, description, state;
        ({task_id, start_year, start_month, start_day, end_year, end_month, end_day, length, title, description, state} = obj);
        this.id = task_id;
        this.start_year = Number(start_year);
        this.start_month = Number(start_month);
        this.start_day = Number(start_day);
        this.end_year = Number(end_year);
        this.end_month = Number(end_month);
        this.end_day = Number(end_day);
        this.length = Number(length);
        this.title = title;
        this.description = description;
        this.state = state;
    }
}

class Month {
    constructor(year, monthId) {
        this.year = year;
        this.monthId = monthId;
    }

    get calendarEndPoints() {
        return this.getCalendarEndPoints();
    }

    get length() {
        return this.getMonthLength(this.monthId);
    }

    get firstDay() {
        return this.getFirstDayOfMonth(this.year, this.monthId);
    }

    get rowNum() {
        return this.defineRowNum(this.length, this.firstDay);
    }

    get prevLength() {
        return this.getMonthLength(this.monthId-1);
    }

    getCalendarEndPoints() {
        let calendarStart = {};
        let calendarEnd = {};

        if (this.firstDay != 1) {
            calendarStart.year = this.monthId == 0 ? this.year - 1 : this.year;
            calendarStart.month = this.monthId == 0 ? 11 : this.monthId - 1;
            calendarStart.day = this.prevLength - this.firstDay + 2;
        }
        else {
            calendarStart.year = this.year;
            calendarStart.month = this.monthId;
            calendarStart.day = 1;
        }

        if (this.length + this.firstDay - 1 != this.rowNum * 7) {
            calendarEnd.year = this.monthId == 11 ? this.year + 1 : this.year;
            calendarEnd.month = this.monthId == 11 ? 0 : this.monthId + 1;
            calendarEnd.day = this.rowNum * 7 - this.length - this.firstDay + 1;
        }
        else {
            calendarEnd.year = this.year;
            calendarEnd.month = this.monthId;
            calendarEnd.day = this.length;
        }

        return {
                "calendarStart" : calendarStart,
                "calendarEnd": calendarEnd
                };
    }

    getMonthLength(monthNum) {
        let monthLength = 0;
        if(monthNum>11) monthNum = 0;
        if (monthNum < 0) monthNum = 11;
        switch (monthNum) {
            case 0: case 2: case 4: case 6: case 7: case 9: case 11:
                monthLength = 31;
                break;
            case 3: case 5: case 8: case 10:
                monthLength = 30;
                break;
            case 1:
                if((this.year % 4 == 0) && (this.year % 100 != 0)) {
                    monthLength = 29;
                }
                else {monthLength = 28}
                break;
            //no default    
        }
        return monthLength;
    }

    getFirstDayOfMonth(year, month) {
        let firstDayNum = new Date(year, month, 1).getDay();
        if(firstDayNum == 0) firstDayNum = 7;
        return firstDayNum;
    }

    defineRowNum(monthLength, firstDay) {
        let rowNum = 5;
        if ((monthLength == 30 && firstDay > 5) || (monthLength == 31 && firstDay > 4)) {
            rowNum = 6;
        }
        return rowNum;
    }
}
let tasks = {};
let currentMonth = new Month(new Date().getFullYear(), new Date().getMonth());
let currentMonthId;
let prevMonthId;
let nextMonthId;
let prevMonthLength;
let currentFirstDay;
let prevCellsNum;
let nextCellsNum;

if (localStorage['calendar_type'] == 'month') {
    drawCalendar(2019, 10, 'grid');
}

//let currentMonth = new Month(new Date().getFullYear(), new Date().getMonth());

function drawCalendar(_year, _month, DOMId) {
    const calBody = document.getElementById(DOMId);

    currentMonth = new Month(_year, _month);

    currentMonthId = _month;
    prevMonthId = currentMonthId - 1 < 0 ? 12 : currentMonthId - 1;
    nextMonthId = currentMonthId + 1 > 12 ? 0 : currentMonthId + 1;
    prevMonthLength = currentMonth.prevLength;
    currentFirstDay = currentMonth.firstDay;

    let dateNum = 1;
    let cellNum = 1;
    let current = true;
    prevCellsNum = 0;
    nextCellsNum = 0;

    let cal = currentMonth.rowNum == 5 ? `<div class="calendar" id="calendar">` : `<div class="calendar row-6" id="calendar">`;
    for (let i = 0; i < currentMonth.rowNum; i++) {
        cal += `<div class="calendar__row">`;
        for (let j = 0; j < 7; j++) {
           
        if(cellNum < currentMonth.firstDay) {
            cal += `<div class="prev-month">
            <span class="calendar-days">${currentMonth.prevLength + cellNum - currentMonth.firstDay + 1}</span>
            </div>`;
            prevCellsNum++;
            if(cellNum == currentMonth.firstDay - 1) dateNum = 0;
        }
        else if(cellNum >= currentMonth.firstDay && dateNum <= currentMonth.length && current) {
            cal += `<div class="current-month">
            <span class="calendar-days">${dateNum}</span></span>
            </div>`;
            if(dateNum == currentMonth.length) {
                dateNum = 0; 
                current = false;
            }
        }
        else {
            cal += `<div class="next-month">
            <span class="calendar-days">${dateNum}</span>
            </div>`;
            nextCellsNum++;
        }
        cellNum++;
        dateNum++;
        }
        
        cal += `</div>`;
    }
    cal += `</div>`;

    calBody.innerHTML = cal;

    const currentDays = Array.from(document.getElementsByClassName('current-month'));

    if (new Date().getMonth() == _month) currentDays[new Date().getDate()-1].classList.add('today');
    
    
    const endPoints = currentMonth.calendarEndPoints;

    /*
    AJAX: 
        currentMonth.calendarEndPoints => a látszó naptár 2 végpontja, a köztes dátumokkal rendelkező feladatokat kell lekérni számold hozzá a feladat hosszát is, ne csak a start időt nézd (struktúra a Month Class-ban)
        fillCalendar => az ajax ezt hívja meg a lekérés eredményével
    */
    fillCalendar(fillData);
    document.getElementById('time').innerHTML = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentMonth.monthId] + ' ' + _year;
    document.getElementById('prev').addEventListener('click', moveBack);
    document.getElementById('next').addEventListener('click', moveFwd);
}

const date = new Date();
let monthPos = date.getMonth();
let yearPos = date.getFullYear();

function moveBack() {
    moveCalendar(-1);
}

function moveFwd() {
    moveCalendar(1);
}

function moveCalendar(num) {
    monthPos += num;
    if (monthPos > 0 && (monthPos+1) == 13) {
        yearPos++;
        monthPos = 0;
    }
    else if (monthPos < 0) {
        yearPos--;
        monthPos = 11;
    }
    drawCalendar(yearPos, monthPos);
}

function fillCalendar(taskData) {
    tasks = {};

    for (let i = 0; i < taskData.length; i++) {
        tasks[taskData[i].task_id] = new Task(taskData[i]);
    }

    writeOutTasksToMonthCalendar(tasks);
}

function createTaskContainer(taskId, colStart, colEnd, title) {
    return `<div class="task" data-task-id="${taskId}" style="grid-column: ${colStart} / ${colEnd}"><div class="task__inner">${title}</div></div>`;
}

function handleTaskClick(writerFunc, taskObject) {
    const taskContainers = document.getElementsByClassName('task');
    for (let i = 0; i < taskContainers.length; i++) {
        taskContainers[i].addEventListener('click', function() {
            handleTaskModal(taskObject[this.getAttribute('data-task-id')], writerFunc, taskObject);
        })
    }
}

function modalFormItemsForWeekView(start = '', end = '')  {
    return `<div class="task__duration">
        <label for="durationStart">Kezdés</label><input id="taskModalDurationStart" value="${start}" name="durationStart" type="text" placeholder="HH:MM">
        <label for="durationEnd">Befejezés</label><input id="taskModalDurationEnd" value="${end}" name="durationEnd" type="text" placeholder="HH:MM">
    </div>`;
}

function  getModalDisplayItemForWeekView(start, end) {
    return `<p>${start} - ${end}</p>`;
}

function handleTaskModal(task, calendarWriterFunc, taskCollection) {
    const startMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][task['start_month']];
    const endMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][task['end_month']];

    let contentDependentOnCalType = '';
    let inputDependentOnCalType = '';
    let markAsDoneButtonHTML = '<div id="markTaskDone">Task Done</div>';

    if (localStorage['calendar_type'] == 'week') {
        contentDependentOnCalType = getModalDisplayItemForWeekView(task['start_time'], task['end_time']);
        inputDependentOnCalType = modalFormItemsForWeekView(task['start_time'], task['end_time']);
        markAsDoneButtonHTML = '';
    }

    document.getElementById('modal').innerHTML = 
    `<div class="task__container">
        <div id="editTaskModal">Edit</div>
        ${markAsDoneButtonHTML}
        <div id="deleteTask">Delete</div>
        <div id="closeTaskModal">Close</div>
        <div class="task__display-only">
            <div class="task__interval">
                <p>${startMonth} ${task['start_day']} - ${endMonth} ${task['end_day']}</p>
                ${contentDependentOnCalType}
            </div>
            <div class="task__title">
                <p>${task['title']}</p>
            </div>
            <div class="task__description">
                <p>${task['description']}</p>
            </div>
        </div>

        <div class="task__edit">
            <div class="task__interval">
                <label for="start">Kezdés</label><input id="taskModalStart" name="start" value="${task['start_year']}-${task['start_month']}-${task['start_day']}" type="text" placeholder="YYYY-(M)M-DD">
                <label for="finish">Befejezés</label><input id="taskModalEnd" name="finish" value="${task['end_year']}-${task['end_month']}-${task['end_day']}" type="text" placeholder="YYYY-(M)M-DD">
                ${inputDependentOnCalType}
            </div>
            
            <div class="task__title">
                <label for="title">Cím</label>
                <input id="taskModalTitle" type="text" name="title" value="${task['title']}">
            </div>
            <div class="task__description">
                <label for="descr">Leírás</label>
                <input id="taskModalDesc" type="text" name="descr" value="${task['description']}">
            </div>
            <div id="saveTaskChange">Save</div>
        </div>
        
    </div>`;

    document.getElementById('modal').style.display = 'block';
    document.getElementById('closeTaskModal').addEventListener('click', () => document.getElementById('modal').style.display = 'none');

    if (localStorage['calendar_type'] == 'month') {
        document.getElementById('markTaskDone').addEventListener('click', () => {
            task['state'] = task['state'] == 0 ? 1 : 0; 
            //AJAX UPDATE!
        });
    }

    document.getElementById('deleteTask').addEventListener('click', () => {
        deleteTaskFromCalendar(task);
        delete taskCollection[task['id']];
        document.getElementById('modal').style.display = 'none';
        //AJAX
    })

    const editBtn = document.getElementById('editTaskModal');

    editBtn.addEventListener('click', () => {
        editBtn.innerHTML = editBtn.innerHTML == 'Edit' ? 'Cancel' : 'Edit';
        document.getElementsByClassName('task__edit')[0].classList.toggle('task__edit--visible');
        document.getElementsByClassName('task__display-only')[0].classList.toggle('task__display-only--hidden');

        let originDurStart = '';
        let originDurEnd = '';
        if (localStorage['calendar_type'] == 'week') {
            originDurStart = document.getElementById('taskModalDurationStart').value;
            originDurEnd = document.getElementById('taskModalDurationEnd').value;
        }

        let originStart = document.getElementById('taskModalStart').value;
        let originEnd = document.getElementById('taskModalEnd').value;
        let originTitle = document.getElementById('taskModalTitle').value;
        let originDesc = document.getElementById('taskModalDesc').value;

        document.getElementById('saveTaskChange').addEventListener('click', () => {
            let curStart = document.getElementById('taskModalStart').value;
            let curEnd = document.getElementById('taskModalEnd').value;
            let curTitle = document.getElementById('taskModalTitle').value;
            let curDesc = document.getElementById('taskModalDesc').value;

            let changes = false;
            if (localStorage['calendar_type'] == 'week') {
                let curDurStart = document.getElementById('taskModalDurationStart').value;
                let curDurEnd = document.getElementById('taskModalDurationEnd').value;

                if (originDurStart != curDurStart) {
                    task['start_time'] = curDurStart;
                    changes = true;
                }
                if (originDurEnd != curDurEnd) {
                    task['end_time'] = curDurEnd;
                    changes = true;
                }
            }
            if (originStart != curStart) {
                task['start_year'] = curStart.split('-')[0];
                task['start_month'] = Number(curStart.split('-')[1]);
                task['start_day'] = Number(curStart.split('-')[2]);
                task['length'] = calculateTaskLength(task);
                changes = true;
            }
            if (originEnd != curEnd) {
                task['end_year'] = curEnd.split('-')[0];
                task['end_month'] = curEnd.split('-')[1];
                task['end_day'] = curEnd.split('-')[2];
                task['length'] = calculateTaskLength(task);
                changes = true;
            }
            if (originTitle != curTitle) {
                task['title'] = curTitle;
                changes = true;
            }
            if (originDesc != curDesc) {
                task['description'] = curDesc;
                changes = true;
            }
            if (changes) {
                console.log('saved');
                originStart = curStart;
                originEnd = curEnd;
                originTitle = curTitle;
                originDesc = curDesc;
                deleteTaskFromCalendar(task);
                const wrapperObj = {};
                wrapperObj[task['id']] = task;
                calendarWriterFunc(wrapperObj);
                //AJAX: 
            }
        })
    })
}

function calculateTaskLength(task) {
    const date1 = new Date(task['start_year'], task['start_month'], task['start_day']);
    const date2 = new Date(task['end_year'], task['end_month'], task['end_day']);
    const diffTime = Math.abs(date2 - date1) + 1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
}

function deleteTaskFromCalendar(task) {
    const taskElemsInCalendar = document.querySelectorAll(`div[data-task-id="${task.id}"]`);
    for (let i = 0; i < taskElemsInCalendar.length; i++) {
        taskElemsInCalendar[i].parentNode.removeChild(taskElemsInCalendar[i]);
    }
}

function writeOutTasksToMonthCalendar(taskObj) {
    for (let key in taskObj) {
        if (taskObj.hasOwnProperty(key)) {
            const rows = document.getElementsByClassName('calendar__row');
            // && utáni rész élesben nem kell már, azt a szűrést php végezze
            if (taskObj[key]['start_month'] == prevMonthId && taskObj[key]['start_day'] + taskObj[key]['length'] >= prevMonthLength) {
                if (taskObj[key]['start_day'] <= prevMonthLength - prevCellsNum) {
                    //nem látszódik a start -> 0.tól length-ig
                    let visibleDaysNum = taskObj[key]['length'] - (prevMonthLength-prevCellsNum - taskObj[key]['start_day']) - 1 <= rows.length * 7 ? taskObj[key]['length'] - (prevMonthLength-prevCellsNum - taskObj[key]['start_day']) - 1 : rows.length * 7;
                    const rowsItTakes = Math.ceil(visibleDaysNum / 7);
                    let i = 0;
                    do {
                        if (rows[i]) {
                            if (i + 1 >= rowsItTakes) {
                            rows[i].innerHTML += createTaskContainer(taskObj[key]['id'], 1, 'span ' + visibleDaysNum, taskObj[key]['title']);
                            }
                            else {
                                rows[i].innerHTML += createTaskContainer(taskObj[key]['id'], 1, 8, taskObj[key]['title']);
                            }
                        }
                        i++;
                        visibleDaysNum -= 7;
                    } while (i < rowsItTakes);
                }
                else {
                    //előző hónap, de látszódik a kezdés
                    const taskStart = prevCellsNum - prevMonthLength + taskObj[key]['start_day'];
                    let visibleDaysNum = taskObj[key]['length'] >= rows.length * 7 ? rows.length * 7 - taskStart + 1 : taskObj[key]['length'];
                    const rowsItTakes = Math.ceil(visibleDaysNum / 7);
                    const gridColSpan = visibleDaysNum > 7 ? 8 : visibleDaysNum;
                    let i = 0;
                    do {
                        if (i == 0) {
                            rows[i].innerHTML += createTaskContainer(taskObj[key]['id'], taskStart, 'span ' + gridColSpan, taskObj[key]['title']);
                            visibleDaysNum -= (7 - taskStart + 1);
                        }
                        else if (rows[i] && visibleDaysNum > 0) {
                            if (i + 1 >= rowsItTakes) {
                                rows[i].innerHTML += createTaskContainer(taskObj[key]['id'], 1, 'span ' + visibleDaysNum, taskObj[key]['title']);
                            }
                            else {
                                rows[i].innerHTML += createTaskContainer(taskObj[key]['id'], 1, 8, taskObj[key]['title']);
                            }
                            visibleDaysNum -= 7;
                        }
                        i++;
                    } while (visibleDaysNum > 0);
                }
            }
            else if (taskObj[key]['start_month'] == currentMonthId) {
                const taskStart = prevCellsNum + taskObj[key]['start_day'];
                let visibleDaysNum = taskObj[key]['length'] >= rows.length * 7 ? rows.length * 7 - taskStart + 1 : taskObj[key]['length'];
                const startingRow = taskStart % 7 == 0 ? Math.floor(taskStart / 7) - 1 : Math.floor(taskStart / 7);//  (taskStart / 7) == 1 ? 0 : Math.floor(taskStart / 7);
                const gridColSpan = 8 - (taskStart % 7 == 0 ? 7 : taskStart % 7);
                let startOfCol = taskStart < 8 ? 1 : (taskStart % 7 == 0 ? 7 : taskStart % 7);
                let i = startingRow;
                do {
                    if (i != startingRow) startOfCol = 1;
                    if (i == 0) {
                        rows[i].innerHTML += createTaskContainer(taskObj[key]['id'], taskStart, 'span ' + gridColSpan, taskObj[key]['title']);
                    }
                    else if (rows[i] && visibleDaysNum > 0) {
                        if (visibleDaysNum < 8) {
                            rows[i].innerHTML += createTaskContainer(taskObj[key]['id'], startOfCol, 'span ' + visibleDaysNum, taskObj[key]['title']);
                        }
                        else {
                            rows[i].innerHTML += createTaskContainer(taskObj[key]['id'], startOfCol, 8, taskObj[key]['title']);
                        }
                    }
                     visibleDaysNum -= i == startingRow ? Math.abs(8 - (taskStart % 7 == 0 ? 7 : taskStart % 7)) : 7;
                    i++;
                } while (visibleDaysNum > 0);
            }
            // && utáni csak azért van benne mert most nyilván nem adatb szűri a taskokat, ez élesben nem fog kelleni --> else if --> else
            else if (taskObj[key]['start_month'] == nextMonthId && taskObj[key]['start_day'] <= nextCellsNum) {
                const taskStart = (rows.length * 7 - nextCellsNum + taskObj[key]['start_day']) % 7 == 0 ? 7 : (rows.length * 7 - nextCellsNum + taskObj[key]['start_day']) % 7;
                let visibleDaysNum = taskObj[key]['length'] > nextCellsNum ? nextCellsNum : taskObj[key]['length'];
                rows[rows.length - 1].innerHTML += createTaskContainer(taskObj[key]['id'], taskStart, 'span ' + visibleDaysNum, taskObj[key]['title']);
            }
        }
    }
    handleTaskClick(writeOutTasksToMonthCalendar, tasks);
}

function createTaskListener() {
    let inputDependentOnCalType = '';
    let inputDescription = `<div class="task__description">
                                <label for="descr">Leírás</label>
                                <input id="taskModalDesc" type="text" name="descr">
                            </div>`;
    let now = [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()].join('-');
    if (currentMonth) now = [currentMonth.year, currentMonth.monthId+1, 1].join('-');
    
    if (localStorage['calendar_type'] == 'week') {
        inputDependentOnCalType = modalFormItemsForWeekView();
        inputDescription = '';
    }

    document.getElementById('create').addEventListener('click', () => {
        document.getElementById('modal').innerHTML = 
        `<div class="task__container">
            <div id="closeTaskModal">Close</div>
            <div class="task__create">
                <div class="task__interval">
                    <label for="start">Kezdés</label><input id="taskModalStart" name="start" value=${now} type="text" placeholder="YYYY-MM-DD">
                    <label for="finish">Befejezés</label><input id="taskModalEnd" name="finish" value=${now} type="text" placeholder="YYYY-MM-DD">
                    ${inputDependentOnCalType}
                </div>
                <div class="task__title">
                    <label for="title">Cím</label>
                    <input id="taskModalTitle" type="text" name="title">
                </div>
                    ${inputDescription}
                <div id="createNewTask">Save</div>
            </div>
        </div>`;

        document.getElementById('modal').style.display = 'block';
        document.getElementById('closeTaskModal').addEventListener('click', () => document.getElementById('modal').style.display = 'none');

        document.getElementById('createNewTask').addEventListener('click', () => {
            const newTaskStartInput = document.getElementById('taskModalStart').value;
            const newTaskEndInput = document.getElementById('taskModalEnd').value;
            const newTaskTitleInput = document.getElementById('taskModalTitle').value;
            

            const newTask = {
                'start_year': newTaskStartInput.split('-')[0],
                'start_month': Number(newTaskStartInput.split('-')[1]),
                'start_day': Number(newTaskStartInput.split('-')[2]),
                'end_year': newTaskEndInput.split('-')[0],
                'end_month': newTaskEndInput.split('-')[1],
                'end_day': newTaskEndInput.split('-')[2],
                'title': newTaskTitleInput
            }

            if (localStorage['calendar_type'] == 'week') {
                const newTaskDurStartInput = document.getElementById('taskModalDurationStart').value;
                const newTaskDurEndInput = document.getElementById('taskModalDurationEnd').value;

                newTask['start_time'] = newTaskDurStartInput;
                newTask['end_time'] = newTaskDurEndInput;
            }

            if (localStorage['calendar_type'] == 'month') {
                newTask['length'] = calculateTaskLength(newTask);
                const newTaskDescInput = document.getElementById('taskModalDesc').value;
                newTask['description'] = newTaskDescInput;
            }

            console.log(newTask);
            //AJAX: newTask, return newTask és a hozzá tartozó ID, writeOutTasksToMonthCalendar()-ba kerüljön!
        })
    });
}
createTaskListener();

export {Month, Task, handleTaskClick, handleTaskModal, deleteTaskFromCalendar, createTaskListener};