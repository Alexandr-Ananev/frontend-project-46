#!/usr/bin/env node

import { program } from 'commander'
import { parseFile } from './parsers.js'
import genDiff from './gendiff.js'
import path from 'path'

const resolveFixturePath = filename => path.join('__fixtures__', filename)

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const data1 = parseFile(resolveFixturePath(filepath1))
    const data2 = parseFile(resolveFixturePath(filepath2))

    const diff = genDiff(data1, data2, options.format)
    console.log(diff)
  })

program.parse(process.argv)
