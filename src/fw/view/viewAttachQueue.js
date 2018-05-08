//viewAttachQueue.js
export default class ViewAttachQueue {
  constructor() {
    this.queue = [];

  }
  add(value){
    this.queue.unshift(value);
  }
  poll(){
    return this.queue.pop();
  }
}
