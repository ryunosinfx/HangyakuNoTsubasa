import Activate from '../view/activate'
import Editor from '../view/editor'
import Login from '../view/login'
import Manage from '../view/manage'
import Search from '../view/search'
import Viewer from '../view/viewer'

const pageList = [];
const pageKeyMap = [];
export default class Router extends BaseView {
  constructor(pageBase) {
    super.constructor();
  }
  static add(key, page, filter) {
    pageMap[key]={page:page,filter:filter};
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
