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
    return result.length < 1
      ? null
      : result[0];
  }
  getElementsByClass(vnode, className) {
    return this.getElements(vnode, "." + className);
  }
  async patch(vnode, selector, newNode) {
    let nodes = this.getElements(vnode, selector);
    alert("aaaa-------------"+selector+"/"+(typeof nodes)+"/"+Array.isArray(nodes)+"/"+JSON.stringify(nodes)+"/"+vnode);
    for(let node of nodes){
      let newOne = await ObjectUtil.deepClone(newNode);
      let re = patch(node , newOne);
      alert(re);
    }
    // nothing to do
    return nodes;
    // remove and replace
  }
  getElements(vnode, selector, isEnd = false) {
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
        result = result.concat(this.getElements(child, selector, isNextEnd));
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
