export default class Task{
    constructor(obj) {
        let id, month, start_day, length, title, state_fk, rest;
        ({id, month, start_day, length, title, state_fk, ...rest} = obj);
        this.id = id;
        this.month = month;
        this.startDay = start_day;
        this.length = length;
        this.title = title;
        this.state = state_fk;
       /* this.id = array[0];
        this.month = array[1];
        this.startDay = array[2];
        this.length = array[3];
        this.title = array[4];
        this.state = array[5];*/
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