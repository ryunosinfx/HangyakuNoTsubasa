import constants from './constants'

const viewList = [];
const viewKeyMap = {};
export default class Router {
  constructor(layoutView) {
    this.layoutView = layoutView;
  }
  add(view, filter) {
    let key = view.getKey();
    viewKeyMap[key] = {
      view: view,
      filter: filter
    };
    viewList.push(key);
  }
  init(state) {
    let search = (location.search + "").relpace(/\?/, '');
    return this.filter(state, search);
  }
  filter(state, search) {
    // TODO state ni izon
    let targetRoute = viewKeyMap[search];
    if (targetRoute) {
      if (targetRoute && targetRoute.filter && targetRoute.filter(state)) {
        return targetRoute.view;
      }
    }
    let defaultRouteKey = viewList[0];
    let defaultRoute = viewKeyMap[defaultRouteKey];
    if (defaultRoute && defaultRoute.filter && defaultRoute.filter(state)) {
      return defaultRoute.view;
    }
    for (let key of viewList) {
      let route = viewKeyMap[key];
      if (route && route.filter && route.filter(state)) {
        //return route.view;
      }
    }
    return defaultRoute.view;
  }
  getView(state, key) {
    return this.filter(state, key);
  }
  getMenuList() {
    let menuViewList = [];
    for (let key of viewList) {
      let route = viewKeyMap[key];
      menuViewList.push(route.view);
    }
    return menuViewList;
  }
  getGoNextEventhandler(view){
    let self = this;
    return (event) => {
      console.log("I am getGoNextEventhandler! here we are!"+ event+'/'+view.getHref());
      self.layoutView.show(view);
      event.stopPropagation();
      return false;
    }
  }
}
