import Month from './month-class.js';
import fillCalendar from './task.js';
import callAjax from './callAjax.js';
/*const Months = ["Január", "Február", "Március", "Április", 
                "Május", "Június", "Július", "Augusztus", 
                "Szeptember", "Október", "November", "December"];*/
let endPoints;

function drawCalendar(_year, _month) {
    const calBody = document.getElementById("cal-body");

    const currentMonth = new Month(_year, _month);
    const nextMonth = new Month(_year, _month+1);
    const prevId = currentMonth.monthId -1 < 0 ? 11 : currentMonth.monthId-1;
    const nextId = currentMonth.monthId +1 > 10 ? 0 : currentMonth.monthId+1;

    let dateNum = 1;
    let cellNum = 1;
    let current = true;

    let table = `<table class="calendar-table" id="calendar">`;
    for (let i = 0; i < currentMonth.rowNum; i++) {
        table += `<tr class="calendar-row">`;
        for (let j = 0; j < 7; j++) {
            if(cellNum < currentMonth.firstDay) {
                table += `<td id="M${prevId}-D${currentMonth.prevLength + cellNum - currentMonth.firstDay + 1}" class="prev-month y-${_year}">
                <span class="calendar-days">${currentMonth.prevLength + cellNum - currentMonth.firstDay + 1}</span>
                </td>`;
                if(cellNum == currentMonth.firstDay - 1) dateNum = 0;
            }
            else if(cellNum >= currentMonth.firstDay && dateNum <= currentMonth.length && current) {
                table += `<td id="M${currentMonth.monthId}-D${dateNum}" class="current-month y-${_year}">
                <span class="calendar-days">${dateNum}</span></span>
                </td>`;
                if(dateNum == currentMonth.length) {
                    dateNum = 0; 
                    current = false;
                }
            }
            else {
                table += `<td id="M${nextId}-D${dateNum}" class="next-month y-${_year}">
                <span class="calendar-days">${dateNum}</span>
                </td>`;
            }
            cellNum++;
            dateNum++;
        }
        table += `</tr>`;
    }
    table += `</table>`;

    calBody.innerHTML = table;
    
    for (let i = 0; i < document.getElementsByClassName('calendar-row').length; i++) {
        document.getElementsByClassName('calendar-row')[i].style.height = (100 / document.getElementsByClassName('calendar-row').length)+'%';
    }

    if (document.getElementById('M'+new Date().getMonth()+'-D'+new Date().getDate())) document.getElementById('M'+_month+'-D'+new Date().getDate()).classList.add('today');
    
    

    //getTaskData(_month);
    
    endPoints = currentMonth.calendarEndPoints;
    callAjax(currentMonth.calendarEndPoints, './php/get-task.php', fillCalendar);
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

export default drawCalendar;
export {endPoints};