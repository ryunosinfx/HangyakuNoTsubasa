import Service from './service/service'

const serviceInst = new Service();
console.log('logger.js is now loaded...');
window.onload = () => {
  serviceInst.start();
  //全てはここから始まる。
}
