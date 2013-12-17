{exec} = require('child_process')
path = require('path')
chdir = path.join(__dirname, '/..')

initial = ->

  child = exec "#{chdir}/scripts/initial.sh #{process.argv[2]}", (err, stdout, stderr) ->
    console.log 'finish'

  child.stdout.on 'data', (data) ->
    console.log data

module.exports = initial
