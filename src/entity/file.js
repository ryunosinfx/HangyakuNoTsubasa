import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Entity from 'encrypt-indexeddb-entity-manager/src/entity/entity'
export default class File {
  constructor(key, data = null, pkHash = null) {
    super(key,data,pkHash);
  }
  // 何にしましょうか。
  set fileName(fileName){
    super.set("fileName",fileName);
  }
  get fileName(){
    return super.get("fileName");
  }
  set fileData(fileData){
    super.set("fileData",fileData);
  }
  get fileData(){
    return super.get("fileData");
  }
  set fileType(fileType){
    super.set("fileType",fileType);
  }
  get fileType(){
    return super.get("fileType");
  }
}
