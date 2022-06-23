# 厦门软件职业技术学院校园网自动登录插件
![Tampermonkey](https://img.shields.io/badge/Tampermonkey-4.16.1-green) ![Greasy Fork](https://img.shields.io/badge/Open%20Script-Greasy%20Fork-red)  
**\[ [安装此脚本](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/userScript.user.js) | [在greasyfork上查看](https://greasyfork.org/zh-CN/scripts/446921-%E5%8E%A6%E9%97%A8%E8%BD%AF%E4%BB%B6%E8%81%8C%E4%B8%9A%E6%8A%80%E6%9C%AF%E5%AD%A6%E9%99%A2%E6%A0%A1%E5%9B%AD%E7%BD%91%E8%87%AA%E5%8A%A8%E7%99%BB%E5%BD%95%E6%8F%92%E4%BB%B6) | [在GitHub上查看](https://github.com/Aigio1064/TampermonkeyScript/blob/main/xmistCampusNetworkAutomaticLoginPlug-in/userScript.user.js) \]**  
## 使用说明
傻瓜式操作，简单无脑，正常登录一次并勾选保存密码应该就能正常运行
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
将`Enable`改为`true`就会在 开放登录时间 到 断开网络时间 的时间内进行自动登录，改为`false`则可以在任何时间自动登录，当然! 其实并没有什么用! `Tips:因为都不限制在线时间了还要自动登录干什么(小声`  
### 修改匹配页面 & 页面检测
在 ==UserScript== 注释块中，有两个`@match`段 ![==UserScript==](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/==UserScript==.png)  
分别改成你的只到pathname并加上通配符的注册页和登录成功后最终转跳的页面的链接，但是!我有个简单的办法帮你完成，首先按下`CTRL+Shift+I`打开开发者工具，在控制台(console)选项卡内输入
```javascript
location.origin+location.pathname+"*"
```
并按下回车来获取准确的链接，如果你不修改或者改错了，那么这个脚本应该无法正常的运行在你的校园网页面上，并且这不是我的限制。  
然后你需要在控制台输入
```javascript
location.pathname
```
来取得你的页面路径，并修改`pagePathname`对象里的`login`(登录页)和`success`(最终转跳的页面) `Tips:因为这才是我的!`
```javascript
const pagePathname = {
    Login: "/eportal/index.jsp",
    success: "/eportal/success.jsp"
};
```
### 寻找登录按钮的唯一特征 & 修改`Element`对象
嗯...你可能会疑惑为什么要找它，因为我不知道它会以什么样的代码出现在我面前，所以只能出此下策，同时，我不知道为什么会有那么多天杀的校园网系统!!!  
首先呢! 还是我们熟悉的东东`CTRL+Shift+I`，对，还是开发者工具，然后呢，有一个小小的按钮![元素选择工具](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/scys.png)你可以叫它元素选择工具，因为它就是干这个的，然后点击它或者按`CTRL+Shift+C`用它找到那个美妙的按钮 `Tips:也有可能是丑陋的` 并且按下去  
![《美妙的按钮》](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/indexDemo.png)  
然后不出意外的话，它应该能帮你找到这个按钮元素所在的位置  
![找到的元素段](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/zddys.png)  
但是呢，你能看到，它定位到的元素呢，并没有onClick属性，而它的父级`<a>`元素才有一个onClick属性  
![特征选择](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/tzxz.png)  
至于这个 `document.querySelectorAll()`呢，这里有它的用法 [菜鸟教程](https://www.runoob.com/jsref/met-document-queryselectorall.html)  
可以看到，我试了4种方法，至于为什么我不查找那个onClick，因为它太长了! `Tips:我不明白为什么就一个 doauthen() 就能解决的事情为什么硬要搞那么长`  
然后为了尽可能减少代码量，所以我选择了最短的那个，虽然我也搞了挺长一个😜  
```javascript
const Element = {
    loginButton:"#loginLink"
};
```
按照你找到的改哦，改之前记得先试试那个onClick里的东西去掉外圈的引号能不能用喔! 别没试就改喔!  
### 保存密码按钮的CookieName
嗯...这个东西也是不确定的，不过呢,应该有一个比较好分辨的办法。  
![饼干页面](https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/cookie.png)  
因为是否保存密码这个cookie并不是很需要进行保护的，所以名字里大概率会有个`SavaPasswd`或者`SavePassword`,所以还是比较简单的，只要把名字改一下就好了  
```javascript
const savePasswdCookieName = "EPORTAL_COOKIE_SAVEPASSWORD";
```

## 更新计划
* 计划加入  
    + 本地长期存储 `用户名`、`密码` 以及 `运营商` 的 `localStorage` 方法。
    + 从 `localStorage` 更新 `cookie` 值的方法。
    + 修改一些代码的运行机制。
* 任务计划
    + 咕咕咕。

## 更新日志
* 1.1 `2022/6/24`
    + 测试完成后发出的第一个版本，功能简单，也好像不是很实用😇
* Beta `null`
    + 测试版本，Bug超多，屎山代码，使用麻烦，时不时无法正常运行😇
