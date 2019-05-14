const fs = require('fs')
var path = require('path')

function copyFile (srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function(err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })

    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function(err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
    ws.on('close', function(ex) {
        cb && cb(ex)
    })

    rs.pipe(ws)
}

function copyFolder (srcDir, tarDir, cb) {
    fs.readdir(srcDir, function(err, files) {
        var count = 0
        var checkEnd = function() {
            ++count == files.length && cb && cb()
        }

        if (err) {
            checkEnd()
            return
        }

        files.forEach(function(file) {
            var srcPath = path.join(srcDir, file)
            var tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function(err, stats) {
                if (stats.isDirectory()) {
                    fs.mkdirSync(tarPath);
                    copyFolder(srcPath, tarPath, checkEnd)
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })

        //为空时直接回调
        files.length === 0 && cb && cb()
    })
}

function write (string, path) {

    let writeStream = fs.createWriteStream(path, {
        flags: 'a+'
    });

    writeStream.on('finish', function () {
        console.log('写入组件'+string+'完成')
    })

    writeStream.write(string + '\n')
}

function deleteFolder(src) {
    var files = [];
    if( fs.existsSync(src) ) {
        files = fs.readdirSync(src);
        files.forEach(function(file,index){
            var curPath = src + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(src);
    }
}


module.exports = {
    copyFile: copyFile,
    copyFolder: copyFolder,
    write: write,
    deleteFolder: deleteFolder,
    go: function() {
        var copy_path = __dirname + '/dist/'
        try {
            fs.mkdirSync(copy_path);
        } catch(e) {
            console.log('floder ' + copy_path + ' has exists')
            return false
        }
        console.log('wpage is starting...')
        copyFolder(__dirname + '/cli/', copy_path, function(err) {
            if (err) {
            throw err
            }
            console.log('All files created successfully!')
        })
    }
  }