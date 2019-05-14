const Path = require('path')
const Config = require('./index.config')
const Tools = require('./tools')

const Admin = Config.modules.admin
const Plugin = Config.modules.plugins
const Mount = Admin.mount


let css = [],
    js  = [],
    html = [],
    page = []


init();

// 初始化整体项目构造
function init () {
    Tools.deleteFolder(__dirname + '/dist/');
    Tools.go();
}

// 开始配置信息处理
function run () {
    let module_path = __dirname + '/dist/Application/Admin/',
        view_path   = module_path + 'View/';

    for (let name in Admin.page) {
        let page_config = Admin.page[name]
        
        if (!/^\w+\/\w+$/.test(page_config.url)) {
            console.log(name + "页面生成失败，请将url参数设置为aaa/bbb形式并重新执行命令");
            return false;
        }

        let action_view_path = view_path + page_config.url + '.html'
        
        // 写入文件到指定目录，内容为以下

        
    }
}