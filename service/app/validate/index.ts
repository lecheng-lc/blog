
import fs from 'fs'
import path from 'path'
const rulePath = path.resolve(__dirname, './')
fs.readdirSync(rulePath).forEach(function(name) {
  if (path.extname(name) !== '') {
    name = path.basename(name, '.js')
    if (name !== 'index') {
      const currentName = name + 'Rule'
      exports[currentName] = require(path.resolve(rulePath, name))
    }
  }
})
