import Authoricator from 'encrypt-indexeddb-entity-manager/src/core/auth/authoricator'
export default class Servicess {
  constructor() {
    this.authoricator = new Authoricator();
    this.DBSyncronizer = new DBSyncronizer(this.authoricator);
  }
  show(){

  }
  async activste(){

  }
}
