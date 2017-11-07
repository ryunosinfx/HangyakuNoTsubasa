import Entity from 'encrypt-indexeddb-entity-manager/src/entity/entity'
export default class User extends Entity {
  constructor(key, data = null, pkHash = null) {
    super(key,data,pkHash);
  }
  // 何にしましょうか。
  set setName(name){
    super.set("name",name);
  }
  get getName(){
    return super.get("name");
  }
}
