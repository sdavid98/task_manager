import Month from './month-class.js';
import fillCalendar from './task.js';
import callAjax from './callAjax.js';
/*const Months = ["Január", "Február", "Március", "Április", 
                "Május", "Június", "Július", "Augusztus", 
                "Szeptember", "Október", "November", "December"];*/


function drawCalendar(_year, _month) {
    const calBody = document.getElementById("cal-body");

    const currentMonth = new Month(_year, _month);
    const prevMonth = new Month(_year, _month-1);
    const nextMonth = new Month(_year, _month+1);

    let dateNum = 1;
    let cellNum = 1;
    let current = true;

    let table = `<table class="calendar-table" id="calendar">`;
    for (let i = 0; i < currentMonth.rowNum; i++) {
        table += `<tr class="calendar-row">`;
        for (let j = 0; j < 7; j++) {
            if(cellNum < currentMonth.firstDay) {
                table += `<td id="#${prevMonth.monthId}-${prevMonth.length + cellNum - currentMonth.firstDay + 1}" class="prev-month">
                <span>${prevMonth.length + cellNum - currentMonth.firstDay + 1}</span>
                </td>`;
                if(cellNum == currentMonth.firstDay - 1) dateNum = 0;
            }
            else if(cellNum >= currentMonth.firstDay && dateNum <= currentMonth.length && current) {
                table += `<td id="#${currentMonth.monthId}-${dateNum}" class="current-month">
                <span>${dateNum}</span>
                </td>`;
                if(dateNum == currentMonth.length) {
                    dateNum = 0; 
                    current = false;
                }
            }
            else {
                table += `<td id="#${nextMonth.monthId}-${dateNum}" class="next-month">
                <span>${dateNum}</span>
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

    
    

    //getTaskData(_month);
    callAjax(currentMonth.calendarEndPoints, './php/get-task.php', fillCalendar);
}

export default drawCalendar;