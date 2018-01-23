import ECIDBEMfunc from 'encrypt-indexeddb-entity-manager/src/functions'
import Activate from '../view/activate'
import Editor from '../view/editor'
import Login from '../view/login'
import Manage from '../view/manage'
import Search from '../view/searcher'
import Viewer from '../view/viewer'
import Register from '../view/register'
import Router from '../util/router'
import Layout from '../view/parts/layout'
import ServiceImpl from './serviceImpl'
import State from './state'

const state = new State();
const serviceImpl = new ServiceImpl(state);
export default class Service {
  constructor(name, key) {
  }
  static getInstance(){
    return serviceImpl;
  }
  static getRouter(){
    return serviceImpl.getRouter();
  }
}
