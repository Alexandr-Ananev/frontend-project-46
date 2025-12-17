#!/usr/bin/env node

import { program } from 'commander'
import genDiff from './gendiff.js'
import { parseFile } from './parsers.js'

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const data1 = parseFile(filepath1)
    const data2 = parseFile(filepath2)
    console.log(genDiff(data1, data2, options.format))
  })

program.parse(process.argv)
