# 厦门软件职业技术学院校园网自动登录插件
\[ [安装此脚本](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/userScript.user.js) | [在greasyfork上查看](https://greasyfork.org/zh-CN/scripts/446921-%E5%8E%A6%E9%97%A8%E8%BD%AF%E4%BB%B6%E8%81%8C%E4%B8%9A%E6%8A%80%E6%9C%AF%E5%AD%A6%E9%99%A2%E6%A0%A1%E5%9B%AD%E7%BD%91%E8%87%AA%E5%8A%A8%E7%99%BB%E5%BD%95%E6%8F%92%E4%BB%B6) \]  
## 尝试适配兼容其它学校的校园网系统?
脚本内建议修改的地方为了方便都放在脚本最前的位置，所以你应该一眼就能看到。  
### 登录时间设置
你可以看到一个名为`timeSettings`的对象，包含有`Enable`、`loginUP`和`loginOut`三个值，它们分别是 启用时间段设置、开放登录时间和断开网络时间。  
将`Enable`改为`true`就会在 开放登录时间 到 断开网络时间 的时间内进行自动登录，改为`false`则可以在任何时间自动登录，当然! 其实并没有什么用!(因为都不限制在线时间了还要自动登录干什么(小声。  
### 修改匹配页面 & 页面检测
在 \=\=UserScript\=\= 
