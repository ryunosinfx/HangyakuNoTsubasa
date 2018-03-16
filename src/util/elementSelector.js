import {patch, h} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import ObjectUtil from './objectUtil'
export default class ElementSelector {
  constructor() {
    this.selectorMap = new Map();

  }
  getElementById(vnode, id) {
    let result = this.getElements(vnode, "#" + id);
    return result.length < 1
      ? null
      : result[0];
  }
  getElementsByClass(vnode, className) {
    return this.getElements(vnode, "." + className);
  }
  patch(vnode, selector, newNode) {
    // console.log('patch00 START of Patch');
    // if (!newNode) {
    //   let re = patch(vnode, selector);
    //   console.log('patch01  END of Patch');
    //   return selector;
    // }
    // let cloneNode = ObjectUtil.deepVnodeClone(vnode);
    // const parentMap = new Map();
    // console.log('patch01aa:' + JSON.stringify(vnode));
    // let nodes = this.getElements(cloneNode, selector, false, parentMap, null);
    // for (let node of nodes) {
    //   console.log('patch01a');
    //   let newOne = ObjectUtil.deepVnodeClone(newNode);
    //   console.log('patch01b');
    //
    //   for (let [key, parentNode] of parentMap) {
    //     if (key === node) {
    //       for (let index in parentNode.children) {
    //         let target = parentNode.children[index];
    //         if (target === node) {
    //           parentNode.children[index] = newOne;
    //           console.log('★patch01c AS REPLACE!');
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //   }
    // }
    console.log('patch00 START of Patch');
    if (!newNode) {
      const re = patch(vnode, selector);
      return selector;
    }
    const cloneNode = this.prePatch(ObjectUtil.deepVnodeClone(vnode), selector, newNode);
    const re = patch(vnode, cloneNode);
    //console.log(re);
    console.log('patch02 END of Patch');
    return cloneNode;
  }
  // Not cloneNode
  prePatch(vnode, selector, newNode) {
    const parentMap = new Map();
    console.log('prepatch01aa:' + JSON.stringify(vnode));
    let nodes = this.getElements(vnode, selector, false, parentMap, null);
    for (let node of nodes) {
      console.log('prepatch01a');
      let newOne = ObjectUtil.deepVnodeClone(newNode);
      console.log('prepatch01b');

      for (let [key, parentNode] of parentMap) {
        if (key === node) {
          for (let index in parentNode.children) {
            let target = parentNode.children[index];
            if (target === node) {
              parentNode.children[index] = newOne;
              console.log('★patch01c AS REPLACE!');
              break;
            }
          }
          break;
        }
      }
    }
    console.log('patch02 END of prePatch');
    return vnode;
  }
  getElements(vnode, selector, isEnd = false, parentMap = new Map(), parentVnode) {
    let result = [];
    let selectors = selector.split(/ |>/);
    let nextSelector = selector;
    if (selectors.length >= 1) {
      let firstOne = selectors.pop();
      if (!firstOne) {
        return result;
      }
      if (this.isMatch(vnode.sel, firstOne)) {
        if (selectors.length < 1) {
          result.push(vnode);
          if (parentVnode) {
            parentMap.set(vnode, parentVnode);
          }
          return result;
        }
        nextSelector = selector.substring(firstOne.length + 1, selector.length);
      } else if (isEnd) {
        return result;
      } else {
        nextSelector = selector;
      }

      if (!vnode.children) {
        return result;
      }
      let delimiter = selector.substring(firstOne.length, firstOne.length + 1);
      let isNextEnd = delimiter === '>';

      for (let child of vnode.children) {
        result = result.concat(this.getElements(child, selector, isNextEnd, parentMap, vnode));
      }
    }
    return result;
  }

  getSelectorMap(selector) {
    let map = this.selectorMap.get(selector);
    if (map) {
      return map;
    }
    map = new Map();
    if(!selector){
      return map;
    }
    let tokens = selector.split(/\.|#/g);
    let classes = [];
    let id = "";
    let tag = "";
    for (let token of tokens) {
      if (selector.indexOf("#" + token) >= 0) {
        id = token;
      } else if (selector.indexOf("." + token) >= 0) {
        classes.push(token);
      } else {
        tag = token;
      }
    }
    map.set("id", id);
    map.set("class", classes);
    map.set("tag", tag);
    this.selectorMap.set(selector, map);
    return map;
  }
  isMatch(sel, selector) {
    //console.log("sel:" + sel + "/selector:" + selector);
    let mapA = this.getSelectorMap(sel);
    let mapB = this.getSelectorMap(selector);
    let tagName = mapB.get("tag");
    let id = mapB.get("id");
    if (tagName !== "" && mapA.get("tag") !== tagName) {
      return false;
    }
    if (id !== "" && mapA.get("id") !== id) {
      return false;
    }

    let classesA = mapA.get("class");
    let classesB = mapB.get("class");
    for (let classB of classesB) {
      let isMatched = false;
      for (let classA of classesA) {
        if (classB === classA) {
          isMatched = true;
        }
      }
      if (isMatched === false) {
        return false;
      }
    }
    if (selector === "") {
      return false;
    }
    return true;
  }
}
