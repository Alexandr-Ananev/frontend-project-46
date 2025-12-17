#!/usr/bin/env node

import { program } from 'commander'
import { parseFile } from './parsers.js'
import genDiff from './gendiff.js'
import stylish from './formatters/stylish.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const data1 = parseFile(filepath1)
    const data2 = parseFile(filepath2)

    const diff = genDiff(data1, data2)

    if (options.format !== 'stylish') {
      throw new Error(`Unknown format: ${options.format}`)
    }

    console.log(stylish(diff))
  })

program.parse(process.argv)
