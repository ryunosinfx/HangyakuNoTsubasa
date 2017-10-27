import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import Entity from 'encrypt-indexeddb-entity-manager/src/entity/entity'
export default class File {
  constructor(key, data = null, pkHash = null) {
    super(key,data,pkHash);
  }
}
