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
    console.log('-G----------------------------------------------------------activeViewsTree:' + avtiveViews + '/lastTree:' + lastTree);
    let resultParent = this.findActivViews(avtiveViews, parentKey);
    if (resultParent && resultParent.primaryView) {
      console.log('-G1----------------------------------------------------------activeViewsTree:' + avtiveViews + '/lastTree:' + lastTree);
      let currentTree = resultParent[currentKey];
      if (currentTree && currentTree.primaryView) {
        console.log('-G2----------------------------------------------------------activeViewsTree:' + avtiveViews + '/lastTree:' + lastTree);
        currentTree.primaryView = view;
        currentTree.parent = resultParent;
      } else {
        console.log('-G3----------------------------------------------------------activeViewsTree:' + avtiveViews + '/lastTree:' + lastTree);
        if (lastTree) {
          console.log('-G4----------------------------------------------------------activeViewsTree:' + avtiveViews + '/lastTree:' + lastTree);
          lastTree.parent = resultParent;
          resultParent[currentKey] = lastTree;
        } else {
          console.log('-G5----------------------------------------------------------activeViewsTree:' + avtiveViews + '/lastTree:' + lastTree);
          resultParent[currentKey] = {
            primaryView: view,
            parent: resultParent
          };
        }
      }
    } else {
      console.log('-G6----------------------------------------------------------activeViewsTree:' + avtiveViews + '/lastTree:' + lastTree + '/currentKey:' + currentKey);
      avtiveViews[currentKey] = lastTree ? lastTree : {
        primaryView: view,
        parent: avtiveViews
      };
    }
    this.loadAllActiveViews();
  }
  changeActiveView(currentView, nextView, nextViewTree) {
    const currentKey = currentView.key;
    console.log('-F----------------------------------------------------------activeViewsTree:' + avtiveViews);
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
    this.loadAllActiveViews();
    return resultCurrent;
  }
  removeActiveView(view) {
    const currentKey = view.key;
    console.log('-E----------------------------------------------------------activeViewsTree:' + avtiveViews);
    let resultCurrent = this.findActivViews(avtiveViews, currentKey);
    if (!resultCurrent) {
      return;
    }
    const parent = resultCurrent.parent;
    delete parent[currentKey];

    this.loadAllActiveViews();
    return resultCurrent;
  }

  findActivViews(activeViewsTree, key, callback) {
    //console.log('-A----------------------------------------------------------activeViewsTree:' + activeViewsTree);
    //console.log('-A01----------------------------------------------------------');
    //console.log('-A01----------------------------------------------------------');
    //console.log(JSON.stringify(activeViewsTree));
    //console.log('-A01----------------------------------------------------------');
    let retView = null;
    //console.log('-A01----------------------------------------------------------');
    if (activeViewsTree) {
      //console.log('-A02----------------------------------------------------------');
      for (let viewKey in activeViewsTree) {
        if (viewKey === undefined || viewKey === 'undefined') {
          continue;
        }
        //console.log('-A03----------------------------------------------------------viewKey:' + viewKey + '/typeof:' + typeof viewKey);
        let current = activeViewsTree[viewKey];
        if (!current.primaryView || !current.parent) {
          //console.log('-C----------------------------------------------------------current:'+current);
          continue;
        }
        //console.log('-B----------------------------------------------------------current:'+current);
        //console.log(JSON.stringify(activeViewsTree));
        if (callback) {
          callback(current);
        }
        if (viewKey === key) {
          console.log('-B01----------------------------------------------------------key:' + key);
          retView = current;
        } else if (current && viewKey !== 'view' && viewKey !== '0') {
          console.log('-B02---current:' + current + '/viewKey:' + viewKey);
          retView = this.findActivViews(current, key, callback);
        }
      }
    }

    //console.log('-A09----------------------------------------------------------retView:' + retView);
    return retView;
  }
  loadAllActiveViews() {
    const resultList = [];
    //console.log('-H----------------------------------------------------------activeViewsTree:' + avtiveViews);
    this.findActivViews(avtiveViews, 'all', (current) => {
      resultList.push(current)
    });
    const currentLength = activeViewList.length;
    for (let i = 0; i < currentLength; i++) {
      activeViewList.pop();
    }
    for (let i of resultList) {
      if (!i.primaryView || !i.parent) {
        //console.log('-C----------------------------------------------------------current:'+current);
        continue;
      }
      activeViewList.push(i.primaryView);
    }
    console.log('-H02----------------------------------------------------------activeViewList:' + activeViewList.length + '/' + currentLength);
    console.log(activeViewList);
    return activeViewList;
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
