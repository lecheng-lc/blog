import shortid from 'shortid'
import moment from 'moment'

// 校验合法ID
global.checkCurrentId = (ids:string) => {
  if (!ids) return false
  let idState = true
  const idsArr = ids.split(',')
  if (typeof idsArr === 'object' && idsArr.length > 0) {
    for (let i = 0; i < idsArr.length; i++) {
      if (!shortid.isValid(idsArr[i])) {
        idState = false
        break
      }
    }
  } else {
    idState = false
  }
  return idState
}

// 获取字符串长度
global.getStrLength = (str:string) => {
  let charCode = -1
  const len = str.length
  let realLength = 0
  let zhChar = 0,
    enChar = 0
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
      enChar++
    } else {
      realLength += 2
      zhChar++
    }
  }
  return {
    length: realLength,
    enChar,
    zhChar
  }
}
// 获取日期
global.getDateStr = (addDayCount: number) => {
  const dd = new Date()
  dd.setDate(dd.getDate() + addDayCount) // 获取AddDayCount天后的日期
  const y = dd.getFullYear()
  const m =
    dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
  const endDate = moment().format('YYYY-MM-DD')
  return {
    startTime: y + '-' + m + '-' + d + ' 23:59:59',
    endTime: endDate + ' 23:59:59'
  }
}

// 获取用户认证字段
global.getAuthUserFields = (type = '') => {
  let fieldStr = 'id userName category group logo date enable state'
  if (type === 'login') {
    fieldStr =
      'id userName category group logo date enable state phoneNum countryCode email comments position loginActive birth password'
  } else if (type === 'base') {
    fieldStr =
      'id userName category group logo date enable state phoneNum countryCode email watchers followers comments favorites favoriteCommunityContent despises comments profession experience industry introduction birth creativeRight gender'
  } else if (type === 'session') {
    fieldStr =
      'id userName name category group logo date enable state phoneNum countryCode email watchers followers praiseContents praiseMessages praiseCommunityContent watchSpecials watchCommunity watchTags favorites favoriteCommunityContent despises despiseMessage despiseCommunityContent comments position gender vip'
  }
  return fieldStr
}

// 获取文章内容字段
global.getContentListFields = (type = '') => {
  let files = ''
  if (type === 'normal') {
    files =
      '_id url keywords source title stitle sImg uAuthor date updateDate discription clickNum roofPlacement type videoImg state dismissReason categories isTop'
  } else if (type === 'simple') {
    files =
      '_id url keywords source title stitle sImg stitle date updateDate clickNum roofPlacement type videoImg state dismissReason'
  } else if (type === 'stage1') {
    files =
      '_id url keywords source title stitle sImg uAuthor date updateDate discription comments clickNum roofPlacement type videoImg state dismissReason categories isTop'
  } else {
    files =
      '_id url keywords source title stitle sImg uAuthor date discription clickNum roofPlacement type appShowType imageArr videoArr duration simpleComments comments videoImg state dismissReason categories isTop'
  }
  return files
}
