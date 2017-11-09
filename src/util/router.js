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
  getPage(state,key) {
    return this.filter(state, key);
  }
}
