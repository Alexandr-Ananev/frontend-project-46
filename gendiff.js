#!/usr/bin/env node

import { Command } from 'commander'
import { parseFile } from './parser.js'

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

      console.log('File1 data:', data1)
      console.log('File2 data:', data2)
    }
    catch (error) {
      console.error(error.message)
      process.exit(1)
    }
  })

program.parse(process.argv)
