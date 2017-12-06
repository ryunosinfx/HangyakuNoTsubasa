import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'

export default class BaseView {
  constructor(name, key) {
    this.name = name;
      this.vss = key;
    this.filter = (state)=>{return true}
  }
  show(data){

  }
  isEquals(baseView){
    return baseView,name ===  this,name;
  }
  getKey(){
    return this.key;
  }
  getFilter(){
    return this.filter;
  }
  getName(){
    return this.name;
  }
  getHref(){
    return this.name;
  }
}
