import { readFileSync } from 'fs'
import path from 'path'
import genDiff from '../gendiff.js'
import { parseFile } from '../parsers.js'
import { test, expect, describe } from '@jest/globals'

const getFixturePath = (filename) => {
  if (path.isAbsolute(filename)) return filename
  return path.join('__fixtures__', filename)
}

const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff json files with stylish', () => {
  const data1 = parseFile(getFixturePath('file1.json'))
  const data2 = parseFile(getFixturePath('file2.json'))

  const result = genDiff(data1, data2, 'stylish')
  const expected = readFile('expected.txt')

  expect(result).toBe(expected.trim())
})

test('gendiff yaml files with stylish', () => {
  const data1 = parseFile(getFixturePath('file1.yml'))
  const data2 = parseFile(getFixturePath('file2.yml'))

  const result = genDiff(data1, data2, 'stylish')
  const expected = readFile('expected.txt')

  expect(result).toBe(expected.trim())
})

test('gendiff json files with plain format', () => {
  const data1 = parseFile(getFixturePath('file1.json'))
  const data2 = parseFile(getFixturePath('file2.json'))

  const result = genDiff(data1, data2, 'plain')
  const expected = readFile('expectedPlain.txt')

  expect(result).toBe(expected.trim())
})

describe('gendiff JSON format', () => {
  test('should return valid JSON string', () => {
    const data1 = parseFile(getFixturePath('file1.json'))
    const data2 = parseFile(getFixturePath('file2.json'))

    const result = genDiff(data1, data2, 'json')

    const parsed = JSON.parse(result)
    expect(parsed).toBeInstanceOf(Array)
    expect(parsed.length).toBeGreaterThan(0)

    const first = parsed[0]
    expect(first).toHaveProperty('key')
    expect(first).toHaveProperty('type')
    expect(['added', 'removed', 'updated', 'unchanged', 'nested']).toContain(first.type)
  })
})
