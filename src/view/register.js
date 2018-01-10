import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Router from '../util/router'
import BaseView from './baseView'
import css from './parts/css'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
export default class Register extends BaseView {
  constructor() {
    super('Register', 'Register');
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
      h('div', {}, [
        h('div',{},  [
          h('span', "id"),
          h('input#signupId', {
            props: {
              type: 'text',
              name: 'ID',
              value:"aaaaz"
            }
          }, 'bbbb')
        ]),
        h('div',{}, [
          h('span', "password"),
          h('input#signupPasswd', {
            props: {
              type: 'password',
              name: 'passwd',
              value:"aaaa"
            }
          }, '')
        ], 'aaaa'),
        h('div',{}, [
            h('button', {props:{},
            on: {
                click: self.signup()
              }},"SugnUP！")
        ], 'cccc')
      ])
    ]);
    return newVnode;
  }
  async activste() {}
  signup(){
    let self = this;
    return (event)=>{
      alert('ok!');
      let pwNode =this.es.getElementById(this.currentVnode,"signupPasswd");
      let idNode =this.es.getElementById(this.currentVnode,"signupId");
        alert('ok! pwNode:'+pwNode.elm.value+'/idNode:'+idNode.elm.value);
      event.stopPropagation();
      return false;
    }
  }
}
