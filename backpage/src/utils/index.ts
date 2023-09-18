import _ from 'lodash'
function parseTime(time: Date | number | string | Object, cFormat: string) {
  if (arguments.length === 0) {
    return null;
  }
 const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date;

  if (typeof time === 'object') {
    date = time as Date;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time as number);
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };

  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key: keyof typeof formatObj) => {
    const value: number = formatObj[key as keyof typeof formatObj];
    let finalValue = '';

    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }

    if (result.length > 0 && value < 10) {
      finalValue = '0' + value;
    } else {
      finalValue = value.toString();
    }

    return finalValue;
  });

  return time_str;
}
export function formatTime(time: string , option: string): string {
  let newTime = 0
  if (('' + time).length === 10) {
    newTime = parseInt(time) * 1000;
  } else {
    newTime = +time;
  }

  const d: any = +new Date(newTime);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less than 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }

  if (option) {
    return parseTime(time, option)!;
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}


/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url:string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}

interface TreeItem {
  _id: string; // 根据实际情况修改 ID 的类型
  parentId: string; // 根据实际情况修改 parentId 的类型
  children?: TreeItem[]; // 添加 children 属性
  // 其他属性根据实际情况添加
}

interface TreeDataResult {
  docs: TreeItem[];
}

export function renderTreeData(result: TreeDataResult): TreeDataResult {
  const newResult: TreeDataResult = { docs: [] };
  const treeData: TreeItem[] = newResult.docs;
  const childArr: TreeItem[] = _.filter(treeData, (doc) => {
    return doc.parentId !== '0';
  });

  for (let i = 0; i < childArr.length; i++) {
    const child: TreeItem = childArr[i];
    for (let j = 0; j < treeData.length; j++) {
      const treeItem: TreeItem = treeData[j];
      if (treeItem._id === child.parentId || treeItem.parentId === child.parentId) {
        if (!treeItem.children) treeItem.children = [];
        treeItem.children.push(child);
        break;
      }
    }
  }
  return newResult;
}
