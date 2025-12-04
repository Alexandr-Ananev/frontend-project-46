import fs from 'fs'
import path from 'path'

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const ext = path.extname(absolutePath)

  switch (ext) {
    case '.json':
      return JSON.parse(content)

    default:
      throw new Error(`Unknown file format: ${ext}`)
  }
}
