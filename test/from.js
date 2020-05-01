const resolve = require('path').posix.resolve

// remove node binary and filename from argv
const argv = process.argv.slice(2)

const path = resolve(argv.shift())

console.log('TEST node', __filename, path)

process.on('exit', code => { console.log('CODE', code) })

const sources = require('..')

const setTestTimeout = (ms = 1000) => setTimeout(() => {
  console.log(`FAIL should run in les than ${ms} seconds`)
  process.exit(124)
}, ms)

const timeout = setTestTimeout()

Promise.resolve()
  .then(() => {
    console.log('INFO resume stdin')
    process.stdin.resume()
  })
  .then(() => sources.from(path))
  .then(result => {
  // every case example has 4 files
    if (result.length !== 4) {
      console.error('result:', result)
      console.error('path:', path)
      console.log('FAIL sources() should detect 4 files')
      process.exit(1)
    } else {
      console.log('PASS sources() detects 4 files for', path)
    }
  })
  .catch(err => {
    console.error('path:', path)
    console.error(err.stack)
    console.log('FAIL sources.from(path).then() should not fail')
    process.exit(1)
  })
  .finally(() => {
    clearTimeout(timeout)

    console.log('TODO abc.sources.from(reference, callback)')
    console.log('TODO abc.sources.stream(reference) => stream files')

    console.log('INFO pause stdin')
    process.stdin.pause()
  })

/* vim: set expandtab: */
/* vim: set filetype=javascript ts=2 shiftwidth=2: */
