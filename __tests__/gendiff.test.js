import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { genDiff } from '../gendiff.js'
import { test, expect } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('compare flat JSON files', () => {
  const file1 = path.join(__dirname, '../__fixtures__/file1.json')
  const file2 = path.join(__dirname, '../__fixtures__/file2.json')

  const data1 = JSON.parse(fs.readFileSync(file1, 'utf-8'))
  const data2 = JSON.parse(fs.readFileSync(file2, 'utf-8'))

  const result = genDiff(data1, data2)

  const expected = `{
  key1: value1
  key2: value2
}`

  expect(result).toBe(expected)
})
