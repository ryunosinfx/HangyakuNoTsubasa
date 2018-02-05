import constants from './constants'

const pageList = [];
const pageKeyMap = {};
export default class Router {
  constructor(layoutView) {
    this.layoutView = layoutView;
  }
  add(page, filter) {
    let key = page.getKey();
    pageKeyMap[key] = {
      page: page,
      filter: filter
    };
    pageList.push(key);
  }
  init(state) {
    let search = (location.search + "").relpace(/\?/, '');
    return this.filter(state, search);
  }
  filter(state, search) {
    // TODO state ni izon
    let targetRoute = pageKeyMap[search];
    if (targetRoute) {
      if (targetRoute && targetRoute.filter && targetRoute.filter(state)) {
        return targetRoute.page;
      }
    }
    let defaultRouteKey = pageList[0];
    let defaultRoute = pageKeyMap[defaultRouteKey];
    if (defaultRoute && defaultRoute.filter && defaultRoute.filter(state)) {
      return defaultRoute.page;
    }
    for (let key of pageList) {
      let route = pageKeyMap[key];
      if (route && route.filter && route.filter(state)) {
        //return route.page;
      }
    }
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
      console.log("here we are!"+ event+'/'+page.getHref());
      self.layoutView.show(page);
      event.stopPropagation();
      return false;
    }
  }
}
