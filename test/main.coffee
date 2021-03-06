should = require('should')
{exec} = require('child_process')
path = require('path')
fs = require('fs')

describe 'initial', ->
  @timeout(30000)

  execCmd = path.join(__dirname, '../bin/initial')
  repos = 'repos'

  before (done) ->
    process.chdir(__dirname)
    exec("rm -rf #{repos}", done)

  it 'should copy all files in assets to target directory', (done) ->

    child = exec "#{execCmd} #{repos}", (err, stdout, stderr) ->
      files = fs.readdirSync(path.resolve(repos))
      files.should.containEql 'README.md'
      pkg = require(path.resolve(repos + '/package.json'))
      pkg.should.have.properties 'name', 'repository', 'description'
      done(err)

    child.stdout.on 'data', (data) -> process.stdout.write(data)
    child.stderr.on 'data', (data) -> process.stderr.write(data)

  after (done) ->
    process.chdir(__dirname)
    exec("rm -rf #{repos}", done)
