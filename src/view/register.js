import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Router from '../util/router'
import BaseView from './baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Register extends BaseView {
  constructor(service) {
    super(service, 'Register', 'Register');
  }
  crateVnode(viewState) {
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
        h('div', {}, [
          h('button', {
            props: {},
            on: {
              click: self.signup()
            }
          }, "SugnUP！")
        ], 'cccc')
      ])
    ]);
    return newVnode;
  }
  signup() {
    let self = this;
    return (event) => {
      //alert('ok!');
      let pwNode = this.es.getElementById(this.currentVnode, "signupPasswd");
      let idNode = this.es.getElementById(this.currentVnode, "signupId");
      let signupId = idNode.elm.value;
      let signupPasswd = pwNode.elm.value;
      alert('ok! pwNode:' + signupPasswd + '/idNode:' + signupId);
      if (!!signupId && !!signupPasswd) {
        this.registerSignUp(signupId, signupPasswd);
      }else{
        alert("not empty!");
      }
      event.stopPropagation();
      return false;
    }
  }
  async registerSignUp(userId, passwd) {
    let isNotActivated = await ECIDBEMfunc.signup(userId, passwd);
      console.log("registerSignUp isNotActivated:"+isNotActivated);
    if(isNotActivated){
      this.showResult();
      this.geToAnotherPage('Activate',{isNotActivated:isNotActivated});
    }
  }
  showResult() {
    let resultNode = h('h1#signupInputArea', 'ok!');
    let signupInputArea = this.es.getElementById(this.currentVnode, "signupInputArea");
    this.patch(signupInputArea,resultNode);
  }
}
