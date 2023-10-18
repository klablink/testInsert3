// We need to import the "mocha.js" file specifically because that is the browser entry point.
import mocha from 'mocha/mocha.js'

/* global __meteor_runtime_config__ */

// This defines "describe", "it", etc.
let options = {
  ui: 'bdd'
}

// Attempt to load config from .mocharc file
try {
  const config = JSON.parse(__meteor_runtime_config__['meteortesting:mocha-core_config'])
  options = { ...options, ...config }
} catch (e) {
  console.error(e)
}

mocha.setup(options)

export { mocha }
