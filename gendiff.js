#!/usr/bin/env node

import { Command } from 'commander'
import { parseFile } from './parser.js'
import _ from 'lodash'

const getSortedKeys = (obj1, obj2) => _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])])

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

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const program = new Command()

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')

  program
    .argument('<filepath1>', 'path to first file')
    .argument('<filepath2>', 'path to second file')
    .action((filepath1, filepath2) => {
      try {
        const data1 = parseFile(filepath1)
        const data2 = parseFile(filepath2)

        const diff = genDiff(data1, data2)
        console.log(diff)
      }
      catch (error) {
        console.error(error.message)
        process.exit(1)
      }
    })

  program.parse(process.argv)
}
