/* global Package Npm */

Package.describe({
  name: 'meteortesting:mocha-core',
  summary: 'Fibers aware mocha server side wrappers. Internal package used by meteortesting:mocha.',
  version: '8.1.3',
  testOnly: true,
  git: 'https://github.com/meteortesting/meteor-mocha-core.git'
})

Npm.depends({
  mocha: '10.2.0'
})

Package.onUse(function (api) {
  api.use('ecmascript')

  api.mainModule('client.js', 'client')
  api.mainModule('server.js', 'server')

  api.export(['mochaInstance', 'setupGlobals'], 'server')
})
