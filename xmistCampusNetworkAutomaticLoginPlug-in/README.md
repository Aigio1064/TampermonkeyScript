# 厦门软件职业技术学院校园网自动登录插件
**\[ [安装此脚本](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/userScript.user.js) | [在greasyfork上查看](https://greasyfork.org/zh-CN/scripts/446921-%E5%8E%A6%E9%97%A8%E8%BD%AF%E4%BB%B6%E8%81%8C%E4%B8%9A%E6%8A%80%E6%9C%AF%E5%AD%A6%E9%99%A2%E6%A0%A1%E5%9B%AD%E7%BD%91%E8%87%AA%E5%8A%A8%E7%99%BB%E5%BD%95%E6%8F%92%E4%BB%B6) \]**  
## 尝试适配兼容其它学校的校园网系统?
脚本内建议修改的地方为了方便都放在脚本最前的位置，所以你应该一眼就能看到。  
### 登录时间设置
你可以看到一个名为`timeSettings`的对象，包含有`Enable`、`loginUP`和`loginOut`三个值，它们分别是 启用时间段设置、开放登录时间和断开网络时间。  
```javascript
const timeSettings = {
    Enable: true,
    loginUP: 6,
    loginOut: 23
};
```
将`Enable`改为`true`就会在 开放登录时间 到 断开网络时间 的时间内进行自动登录，改为`false`则可以在任何时间自动登录，当然! 其实并没有什么用!(因为都不限制在线时间了还要自动登录干什么(小声。  
### 修改匹配页面 & 页面检测
在 ==UserScript== 注释块中，有两个`@match`段 ![==UserScript==](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/==UserScript==.png)  
分别改成你的只到pathname并加上通配符的注册页和登录成功后最终转跳的页面的链接，但是!我有个简单的办法帮你完成，首先按下`CTRL+Shift+I`打开控制台，在控制台(console)选项卡内输入
```javascript
location.origin+location.pathname+"*"
```
并按下回车来获取准确的链接，如果你不修改或者改错了，那么这个脚本应该无法正常的运行在你的校园网页面上，并且这不是我的限制。
然后你需要在控制台输入
```javascript
location.pathname
```
来取得你的页面路径，并修改`pagePathname`对象里的`login`(登录页)和`success`(最终转跳的页面)
```javascript
const pagePathname = {
    Login: "/eportal/index.jsp",
    success: "/eportal/success.jsp"
};
```
### 寻找登录按钮的唯一特征 & 修改`Element`对象
