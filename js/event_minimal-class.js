export default class Task{
    constructor(obj) {
        let task_id, start_year, start_month, start_day, length, title, description, state;
        ({task_id, start_year, start_month, start_day, length, title, description, state} = obj);
        this.id = task_id;
        this.start_year = start_year;
        this.start_month = start_month;
        this.start_day = start_day;
        this.length = length;
        this.title = title;
        this.description = description;
        this.state = state;
    }
}