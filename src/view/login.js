import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './parts/baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Login extends BaseView {
  constructor(service) {
    super(service, 'Login', 'Login');
  }

  createVnode(viewState) {
    let self = this;
    console.log('Login.createVnode');
    let newVnode = h('div', {
      style: {
        color: '#000'
      }
    }, [
      h('h1', 'i am Login'),
      h('div', 'sign in!'),
      h('h1#signinInputArea', 'ok!')
    ]);
    return newVnode;
  }
  onPageShow(newNode, viewState, data) {
    const state = this.getCurrentState();
    //  alert(viewState+'/state.isLogedIn:'+state.isLogedIn+'/state.isActivated:'+state.isActivated);
    if (state && state.isActivated === true) {
      this.prePatch(newNode, "#signupInputArea", this.createResultVnode());
    } else {
      this.prePatch(newNode, "#signupInputArea", this.createFormVnode());
    }
  }
  async login(userId, Password) {
    await ECIDBEMfunc.signin(userId, Password);
    return await ECIDBEMfunc,
      isLogiedIn();
  }
  signin() {
    let self = this;
    return (event) => {
      //alert('ok!');
      let pwNode = this.es.getElementById(this.currentVnode, "signinPasswd");
      let idNode = this.es.getElementById(this.currentVnode, "signinId");
      let signinId = idNode.elm.value;
      let signinPasswd = pwNode.elm.value;
      alert('ok! pwNode:' + signinPasswd + '/idNode:' + signinId);
      if (!!signinId && !!signinPasswd) {
        this.executeSignin(signinId, signinPasswd);
      } else {
        alert("not empty!");
      }
      event.stopPropagation();
      return false;
    }
  }
  async executeSignin(userId, passwd) {
    let isActivated = await ECIDBEMfunc.signin(userId, passwd);
    console.log("executeSignin isActivated:" + isActivated);
    if (isActivated) {
      this.showResult();
      this.goToAnotherPage('Activate', {
        isNotActivated: !isActivated
      });
    } else {
      alert('not regsterd');
    }
  }
  createFormVnode() {
    let self = this;
    return h('div#signinInputArea', {}, [
      h('div', {}, [
        h('span', "id"),
        h('input#signinId', {
          props: {
            type: 'text',
            name: 'ID',
            value: "aaaaz"
          }
        }, 'bbbb')
      ]),
      h('div', {}, [
        h('span', "password"),
        h('input#signinPasswd', {
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
          click: self.signin()
        }
      }, "SignIn！")], 'cccc')
    ]);
  }
  createResultVnode() {
    return h('h1#signinInputArea', 'ok!');
  }
  showResult() {
    this.currentVnode = this.patch(this.currentVnode, "#signinInputArea", this.createResultVnode());
  }
}
