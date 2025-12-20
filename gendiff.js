import _ from 'lodash'
import { parseFile } from './parsers.js'
import format from './formatters/index.js'

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])])

  return keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] }
    }

    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] }
    }

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) }
    }

    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 }
    }

    return { key, type: 'updated', value1, value2 }
  })
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const tree = buildDiff(data1, data2)
  return format(tree, formatName)
}

export default genDiff
