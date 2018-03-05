import {
  patch,
  h
} from 'encrypt-indexeddb-entity-manager/src/view/preLoader'
import ObjectUtil from './objectUtil'
export default class ElementSelector {
  constructor() {
    this.selectorMap = new Map();

  }
  getElementById(vnode, id) {
    let result = this.getElements(vnode, "#" + id);
    return result.length < 1 ?
      null :
      result[0];
  }
  getElementsByClass(vnode, className) {
    return this.getElements(vnode, "." + className);
  }
  async patch(vnode, selector, newNode) {
    let clonNode = ObjectUtil.deepVnodeClone(vnode);
    console.log('patch01');
    const parentMap = new Map();
        console.log('patch01aa:'+JSON.stringify(vnode));
    //let newVnode =  ObjectUtil.simpleDeepClone(vnode);
        console.log('patch01ab');
    let nodes = this.getElements(cloneNode, selector, false, parentMap, null);
    alert("aaaa-------------" + selector + "/" + (typeof nodes) + "/" + Array.isArray(nodes) + "/" + JSON.stringify(nodes) + "/" + vnode);
    for (let node of nodes) {
      console.log('patch01a');
      //let newOne = await ObjectUtil.deepClone(newNode);
      let newOne = newNodeCreator();
      console.log('patch01b');
      console.log(re);
      for (let [key, parentNode] of parentMap) {
        if (key === node.key) {
          for (let index in parentNode.children) {
            let target = parentNode.children[index];
            if (target.key === node.key) {
              parentNode.children[index] = newOne;
              break;
            }
          }
          break;
        }
      }
    }

    let re = patch(vnode, clonNode);
    console.log('patch02');
    // nothing to do
    return vnode;
    // remove and replace
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
            parentMap.set(vnode.key, parentVnode);
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
