import constants from './constants'

const pageList = [];
const pageKeyMap = {};
export default class Router {
  constructor(layoutView) {
    this.layoutView = layoutView;
    this.layoutView.setRouter(this);
  }
  add(page, filter) {
    let key = page.getKey();
    pageKeyMap[key] = {
      page: page,
      filter: filter
    };
    page.setRouter(this);
    pageList.push(key);
  }
  init(state) {
    let search = (location.search + "").relpace(/\?/, '');
    return this.filter(state, search);
  }
  filter(state, search) {

    for (let key of pageList) {
      let route = pageKeyMap[key];
      if (route && route.filter && route.filter(state)) {
        return route.page;
      }
    }
    let targetRoute = pageKeyMap[search];
    if (targetRoute) {
      return targetRoute.page;
    }
    let defaultRouteKey = pageList[pageList.length - 1];
    let defaultRoute = pageKeyMap[defaultRouteKey];
    return defaultRoute.page;
  }
  getPage(state, key) {
    return this.filter(state, key);
  }
  getMenuList() {
    let menuPageList = [];
    for (let key of pageList) {
      let route = pageKeyMap[key];
      menuPageList.push(route.page);
    }
    return menuPageList;
  }
  getGoNextEventhandler(page){
    let self = this;
    return (event) => {
      alert("here we are!"+ event+'/'+page.getHref());
      self.layoutView.show(page);
      event.stopPropagation();
      return false;
    }
  }
}
