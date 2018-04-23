import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from '../../fw/view/baseView'
import Header from './header'
import Footer from './footer'
import Menue from './menu'
import css from './css'
export default class Layout extends BaseView {
  constructor(service) {
    super(service);
  }
  initialize() {
    this.router = this.service.getRouter();
    this.header = new Header(this.service, this);
    this.footer = new Footer(this.service, this);
    this.menu = new Menue(this.service, this);
    this.baseFrame = null;
    this.view = '';
  }
  setMenuList(menuViewList = []) {
    this.menu.init(menuViewList);
  }
  init(view, state) {
    //alert(currentVnode);
    this.view = view;
    // build frme
    this.createBsaeFrame();
  }
  // from service
  show(view, viewState, data) {
    alert('layout show?'+view);
    if(!view.name){

      return;
    }
    let oldView = this.view;
    this.view = view;
    oldView.goAnotherView(view, viewState, data);
  }

  onViewShow(viewState, data){
    const state = this.getCurrentState();
  //  alert(viewState+'/state.isLogedIn:'+state.isLogedIn+'/state.isActivated:'+state.isActivated);
    if(state && state.isActivated){
      let resultNode = h('h1#activateInputArea', 'ok! you are logedin!');
      this.prePatch("#activateInputArea", resultNode);
    }
    this.header.attach(this.currentVnode,'#header');
    this.footer.attach(this.currentVnode,'#footer');
    this.menu.attach(this.currentVnode,'#menu');
    this.view.attach(this.currentVnode,'#content');
  }
  add(view) {}
  rendarer(viewState) {
    let newVnode = h('body', {}, [
      h('header#header', {
        style: {
          color: '#000'
        }
      }, [

      ], 'hellow!!'),
      h('div#menu', {
        style: {
          color: '#000'
        }
      }, [

      ], 'menu!!'),
      h('div#container', {
        style: {
          color: '#000'
        }
      }, [
        h('div#content', {
          style: {
            color: '#000'
          }
        }, [

        ], 'content!!')
      ], 'container!!'),
      h('div#footer', {
        style: {
          color: '#000'
        }
      }, [

      ], 'footer!!')
    ]);
    return newVnode;
  }
  createBsaeFrame() {
    let elements = document.getElementsByTagName("body");
    elements[0].innerHTML = '<div id="root"></div>';
    let layout = document.getElementById('root');
    //this.attach();

    this.patchFromOtherVnode(layout,null,this.rendarer());
    //return '<header id="header">Hellow!</header><div id="menu"></div><div id="container"><div id="content"></div></div><footer id="footer"></footer>';
  }
}
