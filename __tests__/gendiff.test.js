import { readFileSync } from 'fs'
import path from 'path'
import genDiff from '../gendiff.js'
import { parseFile } from '../parsers.js'
import { test, expect } from '@jest/globals'

const readFile = filename => readFileSync(path.join('__fixtures__', filename), 'utf-8')

test('gendiff json files with stylish', () => {
  const data1 = parseFile('__fixtures__/file1.json')
  const data2 = parseFile('__fixtures__/file2.json')

  const result = genDiff(data1, data2, 'stylish')
  const expected = readFile('expected.txt')

  expect(result).toBe(expected.trim())
})

test('gendiff yaml files with stylish', () => {
  const data1 = parseFile('__fixtures__/file1.yml')
  const data2 = parseFile('__fixtures__/file2.yml')

  const result = genDiff(data1, data2, 'stylish')
  const expected = readFile('expected.txt')

  expect(result).toBe(expected.trim())
})

test('gendiff json files with plain format', () => {
  const data1 = parseFile('__fixtures__/file1.json')
  const data2 = parseFile('__fixtures__/file2.json')

  const result = genDiff(data1, data2, 'plain')
  const expected = readFile('expectedPlain.txt')

  expect(result).toBe(expected.trim())
})
