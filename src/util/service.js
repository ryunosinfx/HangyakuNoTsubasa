import Authoricator from 'encrypt-indexeddb-entity-manager/src/core/auth/authoricator'
import DBScanner from 'encrypt-indexeddb-entity-manager/src/core/dbScanner'
import Query from 'encrypt-indexeddb-entity-manager/src/entity/query/query'
import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/functions'

export default class Servicess {
  constructor() {
  }
  async registerUser(userId, password) {
    await ECIDBEMfunc.signup(userId, password);
  }
  async login(userId, password) {
    return await ECIDBEMfunc.signin(userId, password);
  }
  async activste() {
    await ECIDBEMfunc.activate(userId, password);
  }
  /*
   */
  async isLogiedIn() {
    return await ECIDBEMfunc.isLogedIn();
  }
  async createEntityManager() {
    if (await this.isLogiedIn()) {
      return new Query(isOnTranzaction, this.dbScanner);
    }
    return null;
  }
}
