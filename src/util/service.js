import Authoricator from 'encrypt-indexeddb-entity-manager/src/core/auth/authoricator'
import DBScanner from 'encrypt-indexeddb-entity-manager/src/core/dbScanner'

export default class Servicess {
  constructor() {
    this.authoricator = new Authoricator();
    this.DBSyncronizer = new DBScanner(this.authoricator);
  }
  async registerUser(userId,password)){
    await this.authoricator.signup(userId,password);
  }
  async login(userId,password)){
    await this.authoricator.signin(userId,password);
  }
  async activste(){
    await this.authoricator.activate(userId,password);
  }
  /*
  */
  async isLogiedIn(){
    return await this.authoricator.isLogedIn();
  }
  async getQuery(){
    
  }
}
