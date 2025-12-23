const formatValue = (value) => {
  if (value !== null && typeof value === 'object') {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const plain = (tree) => {
  const iter = (nodes, parentPath) =>
    nodes.flatMap((node) => {
      const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key

      switch (node.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`
        case 'removed':
          return `Property '${currentPath}' was removed`
        case 'updated':
          return `Property '${currentPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`
        case 'nested':
          return iter(node.children, currentPath)
        case 'unchanged':
          return []
        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })

  return iter(tree, '').join('\n')
}

export default plain
