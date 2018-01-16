import Service from './service/service'

const serviceInst = Service.getInctance();
console.log('logger.js is now loaded...');
window.onload = () => {
  serviceInst.start();
  //全てはここから始まる。
}
