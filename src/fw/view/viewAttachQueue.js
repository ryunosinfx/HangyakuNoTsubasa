//viewAttachQueue.js
export default class ViewAttachQueue {
  constructor() {
    this.queue = [];

  }
  add(view, selector) {
    this.queue.unshift({
      view: view,
      selector: selector
    });
  }
  poll() {
    return this.queue.pop();
  }
  hasItem() {
    return this.queue.length > 0;
  }
}
