// ==UserScript==
// @name         Ci-AiCloud
// @namespace    https://github.com/CiChui/Ci-AiCloud
// @version      0.1
// @description  通过AiCloud外网访问斐讯天天链N1
// @description  本脚本支持梅林固件的AiCloud，做这个的原因就是局域网共享无法扫描到斐讯N1设备，导致我无法通过AiCloud远程访问家里的斐讯天天链N1设备
// @description  1.首先保证是梅林固件，启用了AiCloud
// @description  2.可以从外网访问，有公网IP或者FRP穿透
// @description  3.在路由器上给你要访问的设备分配一个固定IP（非必须，配置中可改）
// @description  4.这个脚本不仅限于访问斐讯天天链，所有内网可以访问而AiCloud又无法扫描到的都可以通过本脚本挂载到页面
// @description  5.自行修改第14行mathch后的地址为你的AiCloud访问地址，有关设备的配置项都在N1_Configs中,请参考注释可只填写IP
// @author       CiChui[Email:815362636@qq.com]
// @license      MIT
// @supportURL   https://github.com/CiChui/Ci-AiCloud/issues
// @date         04/25/2018
// @modified     04/25/2018
// @match        https://aicloud.cn/
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @require      https://cdn.bootcss.com/jquery/1.11.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    //配置项
    var N1_Configs = [
        {
            title:"斐讯天天链_N1",/*设备名称*/
            ip:"192.168.50.5",/*设备的内网IP*/
            uid:Math.random()/*设备的标识*/
        },
        {
            title:"玩客云",
            ip:"192.168.50.6",
            uid:Math.random()}
    ];
    setTimeout(function(){
        for(var i=0;i<N1_Configs.length;i++)
        {
            if(!N1_Configs[i].ip)
            {
                alert("未配置初始参数，插件未能正常加载！");
                return;
            }
            setConfig(N1_Configs[i]);
        }
    },5000);
    function setConfig(N1_Config){
        var dom = $("#hostview .host_item:last");
        dom.after(dom.clone(true));
        $("#hostview .host_item:last").removeClass("select");
        $("#hostview .host_item:last").click(function(){
            doPROPFIND("/"+N1_Config.ip);
            $("#hostview .host_item").removeClass("select");
            $(this).addClass("select");
        }).attr(
            {
                "uhref":"/"+N1_Config.ip,
                "title":N1_Config.title||"Ci-AiCloud" +" - "+ N1_Config.ip,
                "online":"1",
                "isdir":"1",
                "ip":N1_Config.ip,
                "mac":N1_Config.mac || "",
                "uid":N1_Config.uid || ""
            }
        ).find("p").text(N1_Config.title||N1_Config.ip);
    }
})();
