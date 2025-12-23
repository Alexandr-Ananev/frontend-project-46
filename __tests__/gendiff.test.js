import path from 'path'
import { readFileSync } from 'fs'
import genDiff from '../src/gendiff.js'
import { test, expect } from '@jest/globals'

const getFixturePath = filename => path.join('__fixtures__', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8').trim()

test('gendiff json files with stylish format', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = readFile('expected.txt')

  const result = genDiff(filepath1, filepath2, 'stylish')
  expect(result).toBe(expected)
})

test('gendiff yaml files with stylish format', () => {
  const filepath1 = getFixturePath('file1.yml')
  const filepath2 = getFixturePath('file2.yml')
  const expected = readFile('expected.txt')

  const result = genDiff(filepath1, filepath2, 'stylish')
  expect(result).toBe(expected)
})

test('gendiff json files with plain format', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = readFile('expectedPlain.txt')

  const result = genDiff(filepath1, filepath2, 'plain')
  expect(result).toBe(expected)
})

test('gendiff json files with json format', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  const result = genDiff(filepath1, filepath2, 'json')
  const parsed = JSON.parse(result)

  expect(parsed).toBeInstanceOf(Array)
  expect(parsed.length).toBeGreaterThan(0)
})
