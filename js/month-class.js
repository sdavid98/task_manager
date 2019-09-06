export default class Month {
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
        /*
        let startDate;
        let endDate;

        this.firstDayNum != 1 ? 
        startDate = `${this.year}-${this.monthId-1}-${this.prevLength - this.firstDay + 2}` 
        : 
        startDate = `${this.year}-${this.monthId}-01`;

        this.length + this.firstDay -1 != this.rowNum * 7 ? 
        endDate = `${this.year}-${this.monthId+1}-${this.rowNum * 7 - this.length - this.firstDay + 1}` 
        : 
        endDate = `${this.year}-${this.monthId}-${this.length}`;
*/
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
                const year = new Date();
                if((year.getFullYear() % 4 == 0) && (year.getFullYear() % 100 != 0)) {
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