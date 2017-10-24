import constant from 'encrypt-indexeddb-entity-manager/src/core/constant'
import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import WebcryptTest from 'encrypt-indexeddb-entity-manager/src/view/test/webcryptTest'
import AuthoricatorTest from 'encrypt-indexeddb-entity-manager/src/view/test/autoricatorTest'
console.log('logger.js is now loaded...');
let testOne = new WebcryptTest();
let testTwo = new AuthoricatorTest();
let vnode = h('div', {
  style: {
    color: '#000'
  }
}, [
  h('h1', 'Headline'),
  h('p', 'A paragraph')
]);
window.onload = () => {

  let elements = document.getElementsByTagName("body");
  elements[0].innerHTML = '<h1>Hellow!OKOKOK</h1><div id="c2"></div><div id="container"></div>';
  let containerNode = document.getElementById("container");
  let containerNode2 = document.getElementById("c2");
//  testOne.test(containerNode);
  testTwo.test(containerNode2);
  // patch(elements[0], vnode);
  // let newVnode = h('div#container.two.classes', {
  //   on: {
  //     click: ()=>{alert("here we are!"); return false;}
  //   }
  // }, [
  //   h('span', {
  //     style: {
  //       fontWeight: 'normal',
  //       fontStyle: 'italic'
  //     }
  //   }, 'This is now italic type'),
  //   ' and this is still just normal text',
  //   h('a', {
  //     props: {
  //       href: '/'
  //     }
  //   }, 'I\'ll take you places!')
  // ]);
  // patch(vnode, newVnode);
};
