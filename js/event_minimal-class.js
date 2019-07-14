export default class Task{
    constructor(array) {
        this.id = array[0];
        this.month = array[1];
        this.startDay = array[2];
        this.length = array[3];
        this.title = array[4];
        this.state = array[5];
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