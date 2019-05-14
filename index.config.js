var config = {
    "modules": {
        "admin": {
            "mount": {
                "top": [],
                "top_search": [],
                "sidebar": [
                    {
                        "title": "活动中心",
                        "icon": "table",
                        "control": {
                            "title": "活动列表",
                            "icon": "table",
                            "control": "page.active_list"
                        }
                    }
                ],
                "bottom": [],
            },
            "page": {
                "active_list": {
                    "url": "Active/index",
                    "layout": [
                        [
                            {
                                "component": "form.button",  // 组件类型，前往components文件夹寻找，路径由.符号分隔
                                "options": {
                                    "title": "新增",
                                    "color": "success"
                                }, // 当前type类型组件适用的配置参数，不同组件的配置项不相同
                                "control": "page.active_update", // 组件控制操作，直接写字符串page.为跳转此页面，action.为执行功能，否则为对象，设置详细操作方案
                            },
                            {
                                "title": "删除",
                                "color": "danger",
                                "control": {
                                    type: ""
                                }
                            }
                        ]
                    ],
                }
            }
        },
        "mobile": {
            "module_name": "M", // 手机端模块名，以下路由均不填写模块名
            "page": { // 所有页面配置
                "main": {
                    "url": "Index/index",
                    "layout": [ // 页面构成组件，按照先后顺序生成页面
                        {
                            "component": "layout.header", // 组件名称，按照第一个.拆分的文件夹里找。手机端和电脑端的组件不同，分别在不同的文件夹中，文件夹名为模块名（区分大小写）
                            "options": {
                                "cover": "https://demo.jpg", // 组件中需要的变量及值，值可以是任意类型，可以配置动态数据，但数组对象不能超过两级
                            },
                            "control": { // 组件的控制途径。如果是字符串，组件的关键dom将会跳转到这个页面或链接，否则是具体配置
                                "music": { // 按照控制dom单独配置

                                }
                            }
                        }
                    ]
                }
            },
            "enter_page": "main", // 默认入口文件，page中配置的页面名
        }
    },
    "plugins": [ // 插件。插件将作为独立的功能使用

    ]
}

module.exports = {
    modules: config.modules,
    plugins: config.plugins
}