import _ from 'lodash'

const getSortedKeys = (obj1, obj2) =>
  _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])])

export const genDiff = (data1, data2) => {
  const keys = getSortedKeys(data1, data2)

  const lines = keys.flatMap((key) => {
    if (!Object.prototype.hasOwnProperty.call(data2, key)) {
      return [`- ${key}: ${data1[key]}`]
    }
    if (!Object.prototype.hasOwnProperty.call(data1, key)) {
      return [`+ ${key}: ${data2[key]}`]
    }
    if (_.isEqual(data1[key], data2[key])) {
      return [`  ${key}: ${data1[key]}`]
    }
    return [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`]
  })

  return `{\n${lines.join('\n')}\n}`
}
