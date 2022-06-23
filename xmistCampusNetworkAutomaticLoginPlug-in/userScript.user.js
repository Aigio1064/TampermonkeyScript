// ==UserScript==
// @name         厦门软件职业技术学院校园网自动登录插件
// @namespace    https://tampermonkey.ultiaigio.top/xmistCampusNetworkAutomaticLoginPlug-in/
// @version      1.1
// @description  只需要完成一次登录操作，在你下次打开登录校园网页面时，将会自动为你登录，并且在自动完成登录操作后尝试关闭页面。如果想更换校园网账户，那么请先把此脚本禁用。
// @author       Aigio1064
// @match        http://172.172.255.20/eportal/index.jsp*
// @match        http://172.172.255.20/eportal/success.jsp*
// ==/UserScript==

(function() {
    'use strict';
    var UserScript=document.createElement("script");UserScript.appendChild(document.createTextNode((function(){const timeSettings={Enadle:true,loginUP:6,loginOut:23};const pagePathname={Login:"/eportal/index.jsp",success:"/eportal/success.jsp"};const Element={loginButton:"#loginLink"};const savePasswdCookieName="EPORTAL_COOKIE_SAVEPASSWORD";const $_COOKIE=$_TEMP1();if(location.pathname==pagePathname.Login){setTimeout(S_LOGIN,1000);}else if(location.pathname==pagePathname.success){if(localStorage.getItem("Aigio1064AutoLogin")=='true'){localStorage.setItem("Aigio1064AutoLogin",'false');close();}else if(localStorage.getItem("Aigio1064AutoLogin")=='false'){if(confirm("检查到你已经成功自动登录过了，是否要退出此页面？")){localStorage.removeItem("Aigio1064AutoLogin");close();}}};function $_TEMP1(){let a=document.cookie.split("; ");let b={};a.forEach((c)=>{let d=c.split("=");b[d[0]]=d[1]});return b;};function $_LOGIN(){if($_COOKIE[savePasswdCookieName]=="true"){if(timecheck()){localStorage.setItem("Aigio1064AutoLogin",'true');document.querySelector(Element.loginButton).onclick();}else{alert("不在认证时段内")}}};function timecheck(){if(timeSettings.Enadle){let $_TEMP2=new Date();return $_TEMP2.getHours()>=timeSettings.loginUP&&$_TEMP2.getHours()<=timeSettings.loginOut}else if(!timeSettings.Enadle){console.log("没有登录时间限制。\nNo login time limit.");return true}}})()));document.body.appendChild(UserScript);
    // Your code here...
})();