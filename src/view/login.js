import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import BaseView from './baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Login extends BaseView {
  constructor(service) {
    super(service, 'Login','Login');
  }

  crateVnode(viewState) {

    console.log('Login.crateVnode');
    let newVnode = h('div', {
      style: {
        color: '#000'
      }
    }, [
      h('h1', 'i am Login'),
      h('div', 'sign in!'),
      h('div#signinInputArea', {}, [
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
        h('div', {}, [
          h('button', {
            props: {},
            on: {
              click: self.signin()
            }
          }, "SignIn！")
        ], 'cccc')
      ])
    ]);
    return newVnode;
  }
  async login(userId,Password){
    await ECIDBEMfunc.signin(userId,Password);
    return await ECIDBEMfunc,isLogiedIn();
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
