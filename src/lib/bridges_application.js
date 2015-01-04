var path              = require('path')
var BridgesSupervisor = require(path.join(__dirname, 'bridges_supervisor'))
var fs                = require('fs')

class BridgesApplication {

  constructor(options) {
    if (fs.existsSync(!options.directory)) {
      throw new Error('options.directory must be a valid directory'); 
    }
    if (!options.processes) {
      options.processes = {
        inject: []
      }
    }
    options.processes.directory = path.join(options.directory, 'processes')

    this.supervisor = new BridgesSupervisor(options.processes)
  }
}

module.exports = BridgesApplication

