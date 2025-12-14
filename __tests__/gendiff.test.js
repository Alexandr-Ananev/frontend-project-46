import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { genDiff } from '../gendiff.js'
import { parseFile } from '../parsers.js'
import { test, expect } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff json files', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  const data1 = parseFile(file1)
  const data2 = parseFile(file2)

  const result = genDiff(data1, data2)
  const expected = readFile('expected.txt')

  expect(result).toBe(expected.trim())
})

test('gendiff yaml files', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')

  const data1 = parseFile(file1)
  const data2 = parseFile(file2)

  const result = genDiff(data1, data2)
  const expected = readFile('expected.txt')

  expect(result).toBe(expected.trim())
})
