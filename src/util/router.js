const pageList = [];
const pageKeyMap = {};
export default class Router extends BaseView {
  constructor(pageBase) {
    super.constructor();
  }
  static add(key, page, filter) {
    pageKeyMap[key] = {
      page: page,
      filter: filter
    };
    pageList.push(key);
  }
  init(href) {

  }
  filter() {
    let search = location.search;

    for(let key of pageList){
      let route = pageKeyMap[key];


    }
  }
  goto(page) {

  }
}
