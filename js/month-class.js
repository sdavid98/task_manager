export default class Month {
    constructor(year, monthId) {
        this.year = year;
        this.monthId = monthId;
        this.prevLength = getMonthLength(monthId-1);
    }

    getCalendarEndPoints() {
        let startDate;
        let endDate;

        this.firstDayNum != 1 ? 
        startDate = `${this.year}-${this.monthId-1}-${this.prevLength - this.firstDayNum + 2}` 
        : 
        startDate = `${this.year}-${this.monthId}-01`;

        this.monthLength + this.firstDayNum -1 != this.rowNum * 7 ? 
        endDate = `${this.year}-${this.monthId+1}-${this.rowNum * 7 - this.monthLength - this.firstDayNum + 1}` 
        : 
        endDate = `${this.year}-${this.monthId}-${this.monthLength}`;

        return {
                "startDate" : startDate,
                "endDate": endDate
                };
    }

    get calendarEndPoints() {
        return getCalendarEndPoints(this.firstDayNum, this.monthLength, this.prevLength);
    }

    get length() {
        return this.getMonthLength(this.monthId);
    }

    get firstDay() {
        return this.getFirstDayOfMonth(this.year, this.monthId);
    }

    get rowNum() {
        return this.defineRowNum(this.monthLength, this.firstDay);
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
                const year = new Date().getFullYear();
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