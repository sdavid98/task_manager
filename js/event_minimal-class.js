export default class Task{
    constructor(obj) {
        let task_id, start_month, start_day, length, title, state, rest;
        ({task_id, start_month, start_day, length, title, state, ...rest} = obj);
        this.id = task_id;
        this.start_month = start_month;
        this.start_day = start_day;
        this.length = length;
        this.title = title;
        this.state = state;
    }

    open(remaining) {
        this.desc = remaining[0];
        this.start_year = remaining[1];
        this.comments = remaining[2];
    }
}