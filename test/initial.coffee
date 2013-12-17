should = require('should')
{exec} = require('child_process')
path = require('path')
fs = require('fs')

describe 'initial', ->
  execCmd = path.join(__dirname, '../bin/initial')
  repos = 'repos'

  before (done) ->
    process.chdir(__dirname)
    exec("rm -rf #{repos}", done)

  it 'should copy all files in assets to target directory', (done) ->
    exec "#{execCmd} #{repos}", (err, stdout, stderr) ->
      fs.readdir "#{__dirname}/../assets", (err, files) ->
        fs.readdir "#{__dirname}/#{repos}", (err, _files) ->
          _files.should.be.eql(files)
          done(err)

  after (done) ->
    process.chdir(__dirname)
    exec("rm -rf #{repos}", done)
