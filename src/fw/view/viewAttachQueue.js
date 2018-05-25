//viewAttachQueue.js

const avtiveViews = {};
const activeViewList = [];
export default class ViewAttachQueue {
  constructor() {
    this.queue = [];
  }
  addActiveView(parentView, view, lastTree) {
    const parentKey = parentView.key;
    const currentKey = view.key;
    let resultParent = this.findActivViews(avtiveViews, parentKey);
    if (resultParent && resultParent.primaryView) {

      let currentTree = resultParent[currentKey];
      if (currentTree && currentTree.primaryView) {
        currentTree.primaryView = view;
        currentTree.parent = resultParent;
      } else {
        if (lastTree) {
          lastTree.parent = resultParent;
          resultParent[currentKey] = lastTree;
        } else {
          resultParent[currentKey] = {
            primaryView: view,
            parent: resultParent
          };
        }
      }
    } else {
      avtiveViews[currentKey] = lastTree ? lastTree : {
        primaryView: view,
        parent: null
      };
    }
  }
  changeActiveView(currentView, nextView, nextViewTree) {
    const currentKey = currentView.key;
    let resultCurrent = this.findActivViews(avtiveViews, currentKey);
    if (!resultCurrent) {
      return;
    }
    const parent = resultCurrent.parent;
    delete parent[currentKey];
    const nextKey = nextView.key;
    if (nextViewTree && nextViewTree.primaryView) {
      parent[nextKey] = nextViewTree;
      nextViewTree.primaryView = nextView;
      nextViewTree.parent = parent;
    } else {
      parent[nextKey] = {
        primaryView: nextView,
        parent: parent
      };
    }
    return resultCurrent;
  }
  removeActiveView(view) {
    const currentKey = view.key;
    let resultCurrent = this.findActivViews(avtiveViews, currentKey);
    if (!resultCurrent) {
      return;
    }
    const parent = resultCurrent.parent;
    delete parent[currentKey];
    return resultCurrent;
  }

  findActivViews(activeViewsTree, key, callback) {
    let retView = null;
    if (activeViewsTree) {
      for (let viewKey in activeViewsTree) {
        let current = activeViewsTree[viewKey];
        if (callback) {
          callback(current);
        }
        if (viewKey === key) {
          retView = current;
        } else if(current&&viewKey!=='view'){

          console.log('current:'+current+'/viewKey:'+viewKey);
          //retView = this.findActivViews(current, key, callback);
        }
      }
    }
    return retView;
  }
  loadAllActiveViews() {
    const resultList = [];
    const firstView = avtiveViews.primaryView;
    if (firstView && firstView.key) {
      const key = firstView.key;
      this.findActivViews(avtiveViews, key, (current) => {
        resultList.push(current)
      })
    }
    activeViewList.clear();
    for (let i of resultList) {
      activeViewList.push(i);
    }
    activeViewList
  }
  getActiveViewList() {
    return activeViewList;
  }
  // ---------------------------------------------------------------------------
  add(view, selector) {
    this.queue.unshift({
      view: view,
      selector: selector
    });
  }
  poll() {
    return this.queue.pop();
  }
  hasItem() {
    return this.queue.length > 0;
  }
}
