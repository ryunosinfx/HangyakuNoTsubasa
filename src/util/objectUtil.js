export default class ObjectUtil {
  static deepClone(obj) {
    const channel = new MessageChannel();
    const inPort = channel.port1;
    const outPort = channel.port2;

    return new Promise(resolve => {
      inPort.onmessage = data => {
        resolve(data.data);
      }
      outPort.postMessage(obj);
    });
  }
  static simpleDeepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  static deepVnodeClone(target) {
    const obj = {
      sel: target.sel,
      data: ObjectUtil.simpleDeepClone(target.data),
      children: undefined,
      text: target.text,
      elm: target.elm,
      key: target.key
    };
    const key = 'on';
    if (target.data[key]) {
      obj.data[key] = target.data[key];
    }
    if (target.children && target.children.length > 0) {
      obj.children = [];
      for (let childTarget of target.children) {
        obj.children.push(ObjectUtil.deepVnodeClone(childTarget));
      }
    }
    return obj;
  }

}
