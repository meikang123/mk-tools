cli(脚手架)  工具
======

安装方式
```shell
# global
npm install giant-tools -g

# local
npm install giant-tools -D
```


帮助说明
```shell
giant --help
```

显示可用的脚手架列表
```shell
giant list
```

项目根目录下执行，根据脚手架初始化项目
```shell
# 项目初始化
giant init
```
项目根目录下执行，同步公用到业务项目
```shell
# 同步指定公用代码
giant download
```
业务项目中公用代码指定方式

package.json
```javascript
...
"framework": {
  "name": "spa-vue-admin",
  "branch": "dev"
}
...
```

项目根目录下执行，发布项目到资源包
```shell
# 发布项目到资源包
giant release
```
业务项目中发布代码指定方式

package.json
```javascript
...
{
  "scripts": {
    "build:test": "giant-cli-service build --mode st",
    "release:test": "giant release test"
  },
  "publish": {
    "address": "qqdz@192.168.39.184:tools/release_package.git",
    "dirname": "dist"
  }
}
...
```

公用代码项目根目录下执行，Clone 业务项目到公用代码项目进行联调开发
```shell
# 同步指定业务代码
giant clone
```
公用代码项目中指定业务代码的方式

settings.json //根目录下
```javascript
{
  "address": "git@xxdd/xxdd.git",
  "branch": "xx"
}
```

注意：

> 不推荐的使用环境
1. nvm

> 推荐的使用环境:

1. windows下： vscode->terminal->bash 或 cmd
2. mac下： bash
5. gitbash （giant init 仅选脚手架功能不支持）
