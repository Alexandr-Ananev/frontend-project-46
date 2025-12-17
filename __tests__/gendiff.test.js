import { readFileSync } from 'fs'
import path from 'path'
import gendDiff from '../gendiff.js'
import { parseFile } from '../parsers.js'
import stylish from '../formatters/stylish.js'
import { test, expect } from '@jest/globals'

const readFile = filename => readFileSync(path.join('__fixtures__', filename), 'utf-8')

test('gendiff json files', () => {
  const data1 = parseFile('__fixtures__/file1.json')
  const data2 = parseFile('__fixtures__/file2.json')

  const diff = gendDiff(data1, data2)
  const result = stylish(diff)

  const expected = readFile('expected.txt')

  expect(result).toBe(expected.trim())
})

test('gendiff yaml files', () => {
  const data1 = parseFile('__fixtures__/file1.yml')
  const data2 = parseFile('__fixtures__/file2.yml')

  const diff = gendDiff(data1, data2)
  const result = stylish(diff)

  const expected = readFile('expected.txt')

  expect(result).toBe(expected.trim())
})
