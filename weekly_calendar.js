import {Month, Task, handleTaskClick} from './script.js';

//FONTOS
//start_time és end_time legyen az első két adat!
const fillData = [
    {
        start_time: '11:45',
        end_time: '16:30',
        task_id: 'asdasd',
        start_year: 2019,
        start_month: 10,
        start_day: 22,
        end_year: 2019,
        end_month: 10,
        end_day: 22,
        length: 21,
        title: 'November 5 - 25',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 1
    },
    {
        start_time: '08:15',
        end_time: '12:00',
        task_id: 'ghrthr',
        start_year: 2019,
        start_month: 10,
        start_day: 20,
        end_year: 2019,
        end_month: 10,
        end_day: 21,
        length: 21,
        title: 'November 5 - 25',
        description: 'Valami random leírás a taskról mert miért ne',
        state: 1
    }
];

const scheduleStartTime = '06:00';
const scheduleEndTime = '18:00';

class Worktime extends Task {
    constructor(obj) {
        let start_time, end_time, taskData;
        ({start_time, end_time, ...taskData} = obj);

        super(taskData);
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

class Week extends Month {
    constructor(year, month) {
        super(year, month);
    }

    weekNum = Math.ceil((super.firstDay + new Date().getDate() - 1) / 7);
    weekLength = this.rowNum;
    get firstWeekDay() {
        return this.getFirstWeekDay();
    }
    get prevMonthIsVisible() {
        return this.isPrevMonthVisible();
    }
    get nextMonthIsVisible() {
        return this.isNextMonthVisible();
    }
    get weekEndPoints() {
        return this.getWeekEndPoints();
    }

    getFirstWeekDay() {
        let num = 0;
        this.weekNum == 1 ? num = this.prevLength - this.firstDay + 2 : num = (this.weekNum - 2) * 7 + 7 - this.firstDay + 2;
        return num;
    }
    isPrevMonthVisible() {
        if (this.weekNum == 1 && this.firstDay != 1) return true;
        return false;
    }
    isNextMonthVisible() {
        //if (this.weekNum == this.weekLength && (7 - this.firstDay + 1) + (this.weekLength - 1) * 7 % 7 != 0) return true;
        if (this.weekNum == this.weekLength && (this.length - this.firstWeekDay) < 7) return true;
        return false;
    }
    getWeekEndPoints() {
        let calendarStart = {};
        let calendarEnd = {};

        if (this.prevMonthIsVisible) {
            calendarStart.year = this.monthId == 0 ? this.year - 1 : this.year;
            calendarStart.month = this.monthId == 0 ? 11 : this.monthId - 1;
            calendarStart.day = this.prevLength - this.firstDay + 2;
            calendarEnd.year = this.year;
            calendarEnd.month = this.monthId;
            calendarEnd.day = 7 - (this.prevLength - calendarStart.day) - 1;
        }
        else if (this.nextMonthIsVisible) {
            calendarStart.year = this.year;
            calendarStart.month = this.monthId;
            calendarStart.day = this.firstWeekDay;
            calendarEnd.year = this.monthId == 11 ? this.year + 1 : this.year;
            calendarEnd.month = this.monthId == 11 ? 0 : this.monthId + 1;
            calendarEnd.day = 7 - (this.length - this.firstWeekDay) - 1;
        }
        else {
            calendarStart.year = this.year;
            calendarStart.month = this.monthId;
            calendarStart.day = this.firstWeekDay;
            calendarEnd.year = this.year;
            calendarEnd.month = this.monthId;
            calendarEnd.day = this.firstWeekDay + 6;
        }

        return {
            "calendarStart" : calendarStart,
            "calendarEnd": calendarEnd
            }
    }
}

let tasks = {};
let weekNums = [];
const timeInterval = 60;

let week = new Week(2019, 11);

drawWeekView('week_wrapper');

const date = new Date();
let monthPos = date.getMonth();
let yearPos = date.getFullYear();

document.getElementById('prev').addEventListener('click', moveBack);
document.getElementById('next').addEventListener('click', moveFwd);
function moveBack() {
    if (week.weekNum == 1) {
        if (monthPos == 0) {
            monthPos = 11;
            yearPos--;
        }
        else {
            monthPos--;
        }
        week = new Week(yearPos, monthPos);
        week.weekNum = week.weekLength - 1;
    }
    else {
        week.weekNum--;
    }
    drawWeekView('week_wrapper');
}

function moveFwd() {
    if (week.weekNum == week.weekLength && week.nextMonthIsVisible) {
        if (monthPos == 11) {
            monthPos = 0;
            yearPos++;
        }
        else {
            monthPos++;
        }
        week = new Week(yearPos, monthPos);
        week.weekNum = 2;
    }
    else {
        week.weekNum++;
    }
    drawWeekView('week_wrapper');
}

function drawWeekView(DOMId) {
    weekNums = [];
    let newMonthNumbering = 1;
    let cal = '<div class="week-container"><div id="week"><div class="time-interval">Idő</div>';
    for (let i = 0; i < 7; i++) {
        if (week.prevMonthIsVisible && week.firstWeekDay + i <= week.prevLength) {
            cal += `<div class="prev-month-week">
            <span class="week-days">${week.firstWeekDay + i}</span>
            </div>`;
            weekNums.push(week.firstWeekDay + i);
        }
        else if (!week.prevMonthIsVisible && !week.nextMonthIsVisible && week.firstWeekDay + i <= week.length) {
            cal += `<div class="current-month-week">
            <span class="week-days">${week.firstWeekDay + i}</span></span>
            </div>`;
            weekNums.push(week.firstWeekDay + i);
        }
        else if (week.nextMonthIsVisible && week.firstWeekDay + i <= week.length) {
            cal += `<div class="current-month-week">
            <span class="week-days">${week.firstWeekDay + i}</span></span>
            </div>`;
            weekNums.push(week.firstWeekDay + i);
        }
        else {
            cal += `<div class="next-month-week">
            <span class="week-days">${newMonthNumbering}</span>
            </div>`;
            weekNums.push(newMonthNumbering);
            newMonthNumbering++;
        }
    }
    cal += '</div><div id="week_scheduling"></div></div>';

    document.getElementById(DOMId).innerHTML = cal;
    document.getElementById('time').innerHTML = `${week.weekEndPoints.calendarStart.year}.  
        ${week.weekEndPoints.calendarStart.month + 1}. ${week.weekEndPoints.calendarStart.day}. - ${week.weekEndPoints.calendarEnd.year}.  
        ${week.weekEndPoints.calendarEnd.month + 1}. ${week.weekEndPoints.calendarEnd.day}`;

    writeTimeIntervals();
    fillCalendar(fillData);
}

function writeTimeIntervals() {
    const diff = timeDiff(scheduleStartTime, scheduleEndTime);
    const rows = diff.hours * 4 + Math.floor(diff.minutes / 15) - 1;

    let hours = Number(scheduleStartTime.split(':')[0]);
    let minutes = Number(scheduleStartTime.split(':')[1]);
    let timeStrings = `<div class="time-interval">${scheduleStartTime}</div>`;

    for (let i = 0; i < rows; i+=4) {
        if (minutes + timeInterval == 60) {
            hours == 24 ? 0 : hours++;
            minutes = 0;
        }
        else {
            minutes += timeInterval;
        }

        timeStrings += `<div class="time-interval">${(hours <= 9 ? "0" : "") + hours}:${(minutes <= 9 ? "0" : "") + minutes}</div>`;
    }
    document.getElementById('week_scheduling').innerHTML += timeStrings;
}

function fillCalendar(taskData) {
    tasks = {};

    for (let i = 0; i < taskData.length; i++) {
        tasks[taskData[i].task_id] = new Worktime(taskData[i]);
    }

    writeOutTasksToWeekCalendar(tasks);
}

function writeOutTasksToWeekCalendar(taskObj) {
    console.log(taskObj);
    let htmlBody = '';
    for (let key in taskObj) {
        if (taskObj.hasOwnProperty(key)) {
            const current = taskObj[key];
            const columnStart = weekNums.indexOf(current['start_day']) + 2;
            if (columnStart >= 2) {
                htmlBody = '';
                if (current['start_day'] == current['end_day'] && current['start_month'] == current['end_month']) {
                    const rowStart = (Number(current['start_time'].split(':')[0]) - Number(scheduleStartTime.split(':')[0])) * 4 + Math.floor((Number(current['start_time'].split(':')[1]) - Number(scheduleStartTime.split(':')[1])) / 15) + 1;
                    const diff = timeDiff(current['start_time'], current['end_time']);
                    const rowSpan = diff.hours * 4 + Math.floor(diff.minutes / 15);
                    htmlBody += `<div class="schedule-item task" data-task-id="${current['id']}" style="grid-column:${columnStart}; grid-row: ${rowStart} / span ${rowSpan}">
                        ${current['start_time']} - ${current['end_time']}</div>`;
                }
                else {
                    let columnEnd = weekNums.indexOf(current['end_day']) + 2;
                    let hasVisibleEnd = true;
                    if (columnEnd < 2) {
                        columnEnd = weekNums.length + 2;
                        hasVisibleEnd = false;
                    }

                    for (let i = columnStart; i <= columnEnd; i++) {
                        let rowStart = 1;
                        if (i == columnStart) {
                            rowStart = (Number(current['start_time'].split(':')[0]) - Number(scheduleStartTime.split(':')[0])) * 4 + Math.floor((Number(current['start_time'].split(':')[1]) - Number(scheduleStartTime.split(':')[1])) / 15) + 1;
                            const diff = timeDiff(current['start_time'], scheduleEndTime);
                            const rowSpan = diff.hours * 4 + Math.floor(diff.minutes / 15);
                            htmlBody += `<div class="schedule-item task" data-task-id="${current['id']}" style="grid-column:${columnStart}; grid-row: ${rowStart} / span ${rowSpan}">
                                ${current['start_time']} - ${scheduleEndTime}</div>`;
                        }
                        else if (i == columnEnd && hasVisibleEnd) {
                            const diff = timeDiff(scheduleStartTime, current['end_time']);
                            const rowSpan = diff.hours * 4 + Math.floor(diff.minutes / 15);
                            htmlBody += `<div class="schedule-item task" data-task-id="${current['id']}" style="grid-column:${columnEnd}; grid-row: ${rowStart} / span ${rowSpan}">
                                ${scheduleStartTime} - ${current['end_time']}</div>`;
                        }
                        else {
                            const diff = timeDiff(scheduleStartTime, scheduleEndTime);
                            const rowSpan = diff.hours * 4 + Math.floor(diff.minutes / 15);
                            htmlBody += `<div class="schedule-item task" data-task-id="${current['id']}" style="grid-column:${i}; grid-row: ${rowStart} / span ${rowSpan}">
                                ${scheduleStartTime} - ${scheduleEndTime}</div>`;
                        }
                    }
                }

                document.getElementById('week_scheduling').innerHTML += htmlBody;
            }
            
        }
    }
    handleTaskClick(writeOutTasksToWeekCalendar, tasks);
}

function timeDiff(start, end) {
    start = start.split(":");
    end = end.split(":");
    const startDate = new Date(0, 0, 0, start[0], start[1], 0);
    const endDate = new Date(0, 0, 0, end[0], end[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);

    return {hours, minutes};
    //return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
}