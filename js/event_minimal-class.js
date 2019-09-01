export default class Task{
    constructor(obj) {
        let id, start_year, start_month, start_day, length, title, state_fk, rest;
        ({id, start_year, start_month, start_day, length, title, state_fk, ...rest} = obj);
        this.id = id;
        this.start_year = start_year;
        this.start_month = start_month;
        this.start_day = start_day;
        this.length = length;
        this.title = title;
        this.state = state_fk;
    }

    open(remaining) {
        this.user = remaining[0];
        this.desc = remaining[1];
        this.tag = remaining[2];
        this.duration = remaining[3];
        this.watchers = remaining[4];
        this.public = remaining[5];
        this.comments = remaining[6];
    }
}