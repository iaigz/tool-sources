// remove node binary and filename from argv
const argv = process.argv.slice(2)

const path = argv.shift()

console.log('TEST node', __filename, path)

process.on('exit', code => { console.log('CODE', code) })

const sources = require('..')

console.log(path)

let mod = null
try {
  require(path)
  mod = require.cache[require.resolve(path)]
} catch (err) {
  console.error(err.stack)
  console.log('FAIL cant populate require.cache with', path)
  process.exit(1)
}
console.log('PASS require.cache populated with', path)

let result = null
try {
  result = sources(mod)
} catch (err) {
  console.error('path:', path)
  console.error('mod:', mod)
  console.error(err.stack)
  console.log('FAIL sources() should not throw an error')
  process.exit(1)
}

// every case example has 4 files
if (result.length !== 4) {
  console.error('result:', result)
  console.error('path:', path)
  console.error('mod:', mod)
  console.log('FAIL sources() should detect 4 files')
  process.exit(1)
} else {
  console.log('PASS sources() detects 4 files for', path)
}

/* vim: set expandtab: */
/* vim: set filetype=javascript ts=2 shiftwidth=2: */
