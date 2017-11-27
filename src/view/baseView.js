import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'

export default class BaseView {
  constructor(name) {
    this.name = name;
    this.filter = (state)=>{return true}
  }
  show(data){

  }
  isEquals(baseView){
    return baseView,name ===  this,name;
  }
  getKey(){
    return this.name;
  }
  getFilter(){
    return this.filter;
  }
  getName(){
    this.name;
  }
}
