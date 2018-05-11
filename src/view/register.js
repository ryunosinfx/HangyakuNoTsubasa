import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Router from '../util/router'
import BaseView from '../fw/view/baseView'
import css from './parts/css'
export default class Register extends BaseView {
  constructor(service) {
    super(service, 'Register', 'Register');
  }
  render(viewState) {
    let self = this;
    let newVnode = h('div', {
      style: {
        color: '#909'
      }
    }, [
      h('h1', 'i am Register!'),
      h('div', 'SugnUP！'),
      h('div#signupInputArea', {}, [
        h('div', {}, [
          h('span', "id"),
          h('input#signupId', {
            props: {
              type: 'text',
              name: 'ID',
              value: "aaaaz"
            }
          }, 'bbbb')
        ]),
        h('div', {}, [
          h('span', "password"),
          h('input#signupPasswd', {
            props: {
              type: 'password',
              name: 'passwd',
              value: "aaaa"
            }
          }, '')
        ], 'aaaa'),
        h('div', {}, [h('button', {
            props: {},
            on: {
              click: self.signup()
            }
          }, "SugnUP！")], 'cccc')
      ])
    ]);
    return newVnode;
  }
  onViewShow(viewState, data) {
    const state = this.getCurrentState();
    //  alert(viewState+'/state.isLogedIn:'+state.isLogedIn+'/state.isActivated:'+state.isActivated);
    if (state && state.isActivated) {
      let resultNode = h('h1#signupInputArea', 'ok! you are logedin!');
      this.prePatch("#signupInputArea", resultNode);
    }
  }
  isAccessable(state){
    return !(state && state.isLogedIn);
  }
  signup() {
    let self = this;
    return(event) => {
      //alert('ok!');
      let pwNode = this.es.getElementById(this.currentVnode, "signupPasswd");
      let idNode = this.es.getElementById(this.currentVnode, "signupId");
      let signupId = idNode.elm.value;
      let signupPasswd = pwNode.elm.value;
      alert('ok! pwNode:' + signupPasswd + '/idNode:' + signupId);
      if (!!signupId && !!signupPasswd) {
        this.registerSignUp(signupId, signupPasswd);
      } else {
        alert("not empty!");
      }
      event.stopPropagation();
      return false;
    }
  }
  async registerSignUp(userId, passwd) {
    let isNotActivated = await this.service.registerUser(userId, passwd);
    console.log("registerSignUp isNotActivated:" + isNotActivated);
    if (isNotActivated) {
      this.showResult();
      this.goToAnotherView('Activate', {isNotActivated: isNotActivated});
    }
  }
  showResult() {
    let resultNode = h('h1#signupInputArea', 'ok!');
    this.patch("#signupInputArea", resultNode);
  }
}
