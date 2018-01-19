import Service from './service/mainService'

const serviceInst = Service.getInstance();
console.log('logger.js is now loaded...');
window.onload = () => {
  serviceInst.start();
  //全てはここから始まる。
}
