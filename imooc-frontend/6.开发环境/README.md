# 1. 常用 git 命令

1. `git add .`
2. `git checkout <branch-name>`
3. `git checkout -b <branch-name>` 创建新的分支
4. `git commit -m '<commit message>'`
5. `git push origin master`
6. `git pull origin master`
7. `git branch`
8. `git merge <branch-name>` merge <branch-name> 到当前 branch
9. `git stash`
10. `git stash pop`
11. `git log`
12. `git show <commit-id>`
13. `git fetch` 获取不同的 branches

# 2. chrome 调试工具

1. Elements
2. Console
3. Debugger
4. Network
5. Application

# 3. 抓包

1. Windows 一般用 fiddler
2. Mac OS 一般用 charles

# 4. Webpack 和 Babel

## 1. 为什么需要 Webpack 和 Babel

1. ES6 模块化，浏览器暂不支持
2. ES6 语法，浏览器不完全支持
3. 压缩代码，整合代码，让网页加载更快

## 2. Webpack 和 Babel 的包

1. `npm install webpack webpack-cli -D`
2. `npm install html-webpack-plugin -D`
3. `npm install webpack-dev-server -D`
4. `npm install @babel/core @babel/preset-env babel-loader -D`

# 5. linux 命令

1. 登陆：`ssh <username>@<IP>`
2. 查看所有文件：`ls -a`
3. 看列表：`ll <name?>`
4. 清屏：`clear`
5. 创建文件夹：`mkdir <name>`
6. 删除文件夹：`rm -rf <name>`
7. 跳转：`cd <path>`
8. 修改文件名：`mv <current-name> <new-name>`
9. 移动文件：`mv <current-location/file-name> <new-location/file-name>`
10. 拷贝：`cp <current-file> <new-file>`
11. 新建文件：`touch <file-name>`
12. 新建文件并打开：`vi <file-name>`
13. 显示
    - 显示所有内容：`cat <file-name>`
    - 显示文本头几行： `head <file-name>`
    - 显示文本尾几行： `tail <file-name>`
14. 查找：`grep <keyword> <filename>`
