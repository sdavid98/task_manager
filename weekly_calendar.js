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

    weekNum = Math.ceil((super.firstDay + new Date().getDate() - 1) / 7) - 1;
    weekLength = this.rowNum;
    get firstWeekDay() {
        return this.getFirstWeekDay();
    }
    get prevMonthIsVisible() {
        return this.isPrevMonthVisible();
    }
    get nextMonthIsVidible() {
        return this.isNextMonthVisible();
    }

    getFirstWeekDay() {
        let num = 0;
        this.weekNum == 0 ? num = this.prevLength - 7 + this.firstDay - 1 : num = this.weekNum * 7 - 7 + this.firstDay - 1;
        return num;
    }
    isPrevMonthVisible() {
        if (this.weekNum == 0 && this.firstDay != 1) return true;
        return false;
    }
    isNextMonthVisible() {
        if (this.weekNum == this.weekLength && (7 - this.firstDay + 1) + (this.weekLength - 1) * 7 % 7 != 0) return true;
        return false;
    }
}

let tasks = {};
let weekNums = [];
const timeInterval = 60;

const week = new Week(2019, 10);

drawWeekView('week_wrapper');

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
        else if (week.prevMonthIsVisible) {
            cal += `<div class="current-month-week">
            <span class="week-days">${newMonthNumbering}</span></span>
            </div>`;
            weekNums.push(newMonthNumbering);
            newMonthNumbering++;
        }
        else if (!week.prevMonthIsVisible && !week.nextMonthIsVidible && week.firstWeekDay + i <= week.length) {
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
                        htmlBody += `<div class="schedule-item task" data-task-id="${current['id']}" style="grid-column:${columnStart + i}; grid-row: ${rowStart} / span ${rowSpan}">
                            ${scheduleStartTime} - ${scheduleEndTime}</div>`;
                    }
                }
            }

            document.getElementById('week_scheduling').innerHTML += htmlBody;
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