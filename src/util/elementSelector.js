export default class ElementSelector {
  constructor() {
    this.selectorMap = new Map();

  }
  getElementById(vnode, id) {}
  getElements(vnode, selector) {
    let result = [];
    let selectors = selector.split(/ |>/);
    let nextSelector = selector;
    if (selectors.length >= 1) {
      let firstOne = selectors.pop();
      if (vnode.sel) {}
      nextSelector = selectors
    }

    for (let child of vnode.children) {
      result = result.concat(this.getElements(child, selector));
    }
    vnode.
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
      if (selector.indexof("#" + token) >= 0) {
        id = token;
      } else if (selector.indexof("." + token) >= 0) {
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
  getElementsByClass(vnode, class) {}
}
