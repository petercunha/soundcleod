'use strict'

const { Application } = require('spectron')
const assert = require('assert')

describe('Application launch', function() {

  beforeEach(function() {
    this.timeout(60000)

    this.app = new Application({
      args: [
        'app/main.js' ,
        '--profile=test',
        '--no-auto-updater',
        '--developer-tools',
        '--quit-after-last-window'
      ],
      env: {
        SPECTRON: true
      },
      path: require('electron'),
      waitTimeout: 10000
    })
    return this.app.start()
  })

  afterEach(function() {
    if (this.app && this.app.isRunning())
      return this.app.stop()
  })

  it('shows main window', function() {
    return this.app.client.getWindowCount().then((count) => {
      assert.equal(count, 1)
    })
  })

})