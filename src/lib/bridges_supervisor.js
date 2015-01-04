import {Supervisor, Process} from 'domain-supervisor'
import * as Promise          from 'bluebird'
var requireAll = require('require-all-to-camel')

class BridgesSupervisor {

  constructor(options) {
    this._supervisor = new Supervisor()
    this.processes   = requireAll(options.directory)
    this.inject      = options.inject || []

    this.onError = function(error, restart, crash) {
      if (true) {
        console.log('bridges:supervisor:error', error.stack);
        console.log('bridges:supervisor:restart')
        restart();
      } else {
        // never crash the unix process, but it is an option
        crash(error);
      }
    }
  }

  start() {
    var _this = this
    return new Promise(function(resolve, reject) {
      var processes = []
      try {
        Object.keys(_this.processes).forEach(function(name) {
          var proc  = new Process(function() {
            _this.processes[name].call(this, _this.inject)
          })
          processes.push(_this._supervisor.run(proc, _this.onError))
        })
      } catch (error) {
        return reject(error)
      }
      resolve(processes)
    })
  }
}

module.exports = BridgesSupervisor

