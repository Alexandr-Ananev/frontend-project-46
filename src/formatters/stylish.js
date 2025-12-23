import _ from 'lodash'

const indent = depth => ' '.repeat(depth * 4 - 2)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const entries = Object.entries(value)
  const lines = entries.map(
    ([key, val]) => `${' '.repeat(depth * 4)}${key}: ${stringify(val, depth + 1)}`,
  )

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`
}

const stylish = (diff) => {
  const iter = (tree, depth) => {
    const lines = tree.map((node) => {
      const { key, type } = node

      switch (type) {
        case 'added':
          return `${indent(depth)}+ ${key}: ${stringify(node.value, depth + 1)}`
        case 'removed':
          return `${indent(depth)}- ${key}: ${stringify(node.value, depth + 1)}`
        case 'unchanged':
          return `${indent(depth)}  ${key}: ${stringify(node.value, depth + 1)}`
        case 'updated':
          return [
            `${indent(depth)}- ${key}: ${stringify(node.value1, depth + 1)}`,
            `${indent(depth)}+ ${key}: ${stringify(node.value2, depth + 1)}`,
          ].join('\n')
        case 'nested':
          return `${indent(depth)}  ${key}: {\n${iter(node.children, depth + 1)}\n${' '.repeat(depth * 4)}}`
        default:
          throw new Error(`Unknown type: ${type}`)
      }
    })

    return lines.join('\n')
  }

  return `{\n${iter(diff, 1)}\n}`
}

export default stylish
