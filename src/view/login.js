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
      h('h1#signinInputArea', 'initial')
    ]);
    return newVnode;
  }
  onPageShow(viewState, data) {
    const state = this.getCurrentState();
    if (state && state.isActivated === true) {
      alert(viewState + '/state.isLogedIn:' + state.isLogedIn + '/state.isActivated:' + state.isActivated);
      this.prePatch( "#signinInputArea", this.createResultVnode());
    } else {
      this.prePatch( "#signinInputArea", this.createFormVnode());
    }
  }
  isAccessable(state){
    return !(state && state.isLogedIn);
  }
  signin() {
    let self = this;
    return (event)=> {
      //alert('ok!');
      let pwNode = self.es.getElementById(self.currentVnode, "signinPasswd");
      let signinPasswd = pwNode.elm.value;
      let idNode = self.es.getElementById(self.currentVnode, "signinId");
      let signinId = idNode.elm.value;
      alert('ok! pwNode:' + signinPasswd + '/idNode:' + signinId);
      if (!!signinId && !!signinPasswd) {
        self.executeSignin(signinId, signinPasswd);
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
    //alert("self.signin():"+self.signin()+"/(typeof on[nameA]):"+(typeof self.signin()));
    const button = h('button', {
      on: {
        click: self.signin()
      },
      props: {
        "data-aa": "aaaaAzA"
      }

    }, "SignIn！");
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
      h('div', {}, [button], 'cccc')
    ]);
  }
  createResultVnode() {
    return h('h1#signinInputArea', 'ok!');
  }
  showResult() {
    this.patch("#signinInputArea", this.createResultVnode());
  }
}
