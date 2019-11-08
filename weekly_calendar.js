import {Month, Task, handleTaskClick, handleTaskModal, deleteTaskFromCalendar, createTaskListener} from './script.js';

//FONTOS
//start_time és end_time legyen az első két adat!
const fillData = [
    {
        start_time: '08:00',
        end_time: '12:00',
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

    weekNum = 0; //első hívásra = Math.floor((super.firstDay + new Date().getDay()) / 7);
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

const week = new Week(2019, 10);
//week.weekNum = Math.floor((week.firstDay + new Date().getDay()) / 7);
//week.weekNum = 4;

console.log(week.firstDay);
drawWeekView('week_wrapper');

function drawWeekView(DOMId) {
    let newMonthNumbering = 1;
    let cal = '<div class="week-container" id="week"><div class="time-interval">Idő</div>';
    for (let i = 0; i < 7; i++) {
        if (week.prevMonthIsVisible && week.firstWeekDay + i <= week.prevLength) {
            cal += `<div class="prev-month-week">
            <span class="week-days">${week.firstWeekDay + i}</span>
            </div>`;
        }
        else if (week.prevMonthIsVisible) {
            cal += `<div class="current-month-week">
            <span class="week-days">${newMonthNumbering}</span></span>
            </div>`;
            newMonthNumbering++;
        }
        else if (!week.prevMonthIsVisible && !week.nextMonthIsVidible && week.firstWeekDay + i <= week.length) {
            cal += `<div class="current-month-week">
            <span class="week-days">${week.firstWeekDay + i}</span></span>
            </div>`;
        }
        else {
            cal += `<div class="next-month-week">
            <span class="week-days">${newMonthNumbering}</span>
            </div>`;
            newMonthNumbering++;
        }
    }
    cal += '</div>';

    document.getElementById(DOMId).innerHTML = cal;

    writeTimeIntervals();
}

function writeTimeIntervals() {
    const diff = timeDiff(scheduleStartTime, scheduleEndTime);
    const rows = diff.hours * 4 + Math.floor(diff.minutes / 15) - 1;
    const interval = 15;

    let hours = Number(scheduleStartTime.split(':')[0]);
    let minutes = Number(scheduleStartTime.split(':')[1]);
    let timeStrings = `<div class="time-interval">${scheduleStartTime}</div>`;

    for (let i = 0; i < rows; i++) {
        if (minutes + interval == 60) {
            hours == 24 ? 0 : hours++;
            minutes = 0;
        }
        else {
            minutes += interval;
        }

        timeStrings += `<div class="time-interval">${(hours <= 9 ? "0" : "") + hours}:${(minutes <= 9 ? "0" : "") + minutes}</div>`;
    }
    document.getElementById('week').innerHTML += timeStrings;
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