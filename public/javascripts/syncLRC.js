var loaderInterval=null;
var getPTimeout=null;
var getObjectInterval=null;
var getlrcInterval=null;
var tmpScroll;
var tmpScrollId;
var perLength;
var tmpMatchLrcLine=0;
var preMatchLrcLine=-1;
var count=0;
var tmpLrcContent="";
var preStyleObj=null;
var nowStyleObj=null;
var tmpLrcs=new Array();
var lineCount=new Array();
var perLineCount=new Array();
var preLrcContent=new Array();
var nextLrcContent=new Array();
var color=new Array(21);
color[0]="#000000";
color[1]="#0d0500";
color[2]="#1a0a00";
color[3]="#270f00";
color[4]="#341400";
color[5]="#411900";
color[6]="#4e1e00";
color[7]="#5b2300";
color[8]="#682800";
color[9]="#752d00";
color[10]="#823200";
color[11]="#8f3700";
color[12]="#9c3c00";
color[13]="#a94100";
color[14]="#b64600";
color[15]="#c34b00";
color[16]="#d05000";
color[17]="#dd5500";
color[18]="#ea5a00";
color[19]="#f75f00";
color[20]="#ff5a00";
function lrcInterface(B,C)
{
    preStyleObj=document.styleSheets[0].rules[0];
    nowStyleObj=document.styleSheets[0].rules[1];
    var D=document.getElementById("LrcShower_div");
    count=0;
    D.innerHTML="<br><br><br><br><br><br><span style='font-size:12px;margin-left:12px'>&nbsp;正在加载歌词信息，请您稍等片刻....";
    document.getElementById("LrcUrl_div").style.display="";
    bdSyncLRC.showLRCAPI(null);
    tmpLrcContent="";
    tmpLrcs=new Array();
    if(getObjectInterval!=null)
    {
        clearInterval(getObjectInterval)
    }
    getObjectInterval=setInterval(A,200);
function A()
{
    bdLRC=new bdSyncLRC();
    if(bdLRC!=null)
    {
        if(getObjectInterval!=null)
        {
            clearInterval(getObjectInterval)
        }
        bdLRC.setPlayer(B);
        bdLRC.setURL(C);
        bdLRC.setOutput("LrcShower_div");
        bdLRC.Exchange();
        bdLRC.begin()
    }
    else
    {
        if(count==25)
        {
            if(getObjectInterval!=null)
            {
                clearInterval(getObjectInterval)
            }
            D.innerHTML="<br><br><br><br><br><br><span style='font-size:12px;margin-left:12px'>&nbsp;可能是因为网络的原因，系统没有找到合适的歌词。请稍后重试.";
            bdSyncLRC.showLRCAPI(null)
        }
        else
        {
            count++
        }
    }
}
}
function bdSyncLRC()
{
    var H=null;
    var G=null;
    var D="";
    var C="";
    var F="";
    var B=new Array();
    this.preLRC=new Array();
    this.offsetTime=0;
    this.scrollMoveLen=20;
    var E="MPH";
    var A=document.getElementById("LrcUrlA")
}
bdSyncLRC.prototype.setPlayer=function()
{
    if(arguments.length>=1)
    {
        arg=arguments[0];
        this.playerType=arg;
        if(arg=="MPH"||arg=="MPL")
        {
            arg="MediaPlayer1"
        }
        else
        {
            if(arg=="RP")
            {
                arg="RealPlayer1"
            }
        }
        playerTypeStr=String(arg);
        if(typeof (arg)=="string")
        {
            this.playerObj=document.getElementById(arg)
        }
        else
        {
            if(typeof (arg)=="object")
            {
                this.playerObj=arg
            }
        }
    }
};
bdSyncLRC.prototype.showLRC=function()
{
    if(arguments[0])
    {
        LrcUrlA.style.visibility="visible";
        LrcUrlA.href=arguments[0];
        var A=(arguments[0].length<=42)?arguments[0]:(arguments[0].substr(0,42)+"...");
        LrcUrlA.innerHTML="LRC歌词来自："+A
    }
    else
    {
        LrcUrlA.style.visibility="hidden"
    }
};
bdSyncLRC.showLRCAPI=bdSyncLRC.prototype.showLRC;
bdSyncLRC.prototype.setPlayerType=function()
{
    if(arguments.length>=1)
    {
        this.playerType=arguments[0]
    }
};
bdSyncLRC.prototype.getPlayer=function()
{
    if(typeof (document.getElementById("this.playerObj"))=="object")
    {
        return this.playerObj
    }
    else
    {
        return null
    }
};
bdSyncLRC.prototype.getPlayerType=function()
{
    return this.playerType
};
bdSyncLRC.prototype.setURL=function()
{
    if(arguments.length>=1)
    {
        var B,A;
        B=String(Math.floor((parseInt(arguments[0])/100)));
        A=arguments[0]+".lrc";
        this.lrcURL="http://box.zhangmen.baidu.com/bdlrc/"+B+"/"+A
    }
};
bdSyncLRC.prototype.getURL=function()
{
    return this.lrcURL
};
bdSyncLRC.prototype.setContent=function()
{
    if(arguments.length>=1)
    {
        this.lrcContent=arguments[0]
    }
};
bdSyncLRC.prototype.getContent=function()
{
    return this.lrcContent
};
bdSyncLRC.prototype.setLRC=function()
{
    if(arguments.length>=1)
    {
        this.lrcObjArray=arguments[0]
    }
};
bdSyncLRC.prototype.getLRC=function()
{
    return this.lrcObjArray
};
bdSyncLRC.prototype.setOutput=function(A)
{
    this.lrcShower=A
};
bdSyncLRC.prototype.getOutput=function()
{
    if(this.lrcShower!="")
    {
        arg=this.lrcShower;
        if(typeof (arg)=="string")
        {
            return document.getElementById(arg)
        }
        else
        {
            if(typeof (arg)=="object")
            {
                return arg
            }
        }
    }
    return null
};
bdSyncLRC.prototype.multiLRC=function(A)
{
    thisObj=this;
    tmpVar=A.split("]");
    if(tmpVar.length>=2)
    {
        lrcText=tmpVar[tmpVar.length-1];
        for(j=0;j<tmpVar.length-1;j++)
        {
            lrcTime=tmpVar[j]+"]";
            thisObj.preLRC.push(lrcTime+""+lrcText)
        }
    }
};
bdSyncLRC.prototype.preSyncLRC=function()
{
    if(this.getContent()==null||this.getContent()=="")
    {
        return
    }
    lrcLines=this.getContent().split("\n");
    tmpArr=new Array();
    var C;
    var E=0;
    var D=lrcLines.length;
    var B=lrcLines[D-1];
    new RegExp("url:([^]]+)").test(B);
    B=RegExp.$1;
    this.showLRC(B);
    for(E=0;E<D;E++)
    {
        this.multiLRC(replaceStr(lrcLines[E]))
    }
    this.preLRC.sort();
    var A="aaa";
    for(E=this.preLRC.length-1;E>=0;E--)
    {
        if(this.preLRC[E]==A)
        {
            A=this.preLRC[E];
            this.preLRC.splice(E,1)
        }
        else
        {
            A=this.preLRC[E]
        }
    }
    preTime=0;
    indexLRC=1;
    tmpArr[0]=new LRCItem(0,"");
    for(E=0;E<this.preLRC.length;E++)
    {
        if(this.preLRC[E].length>9)
        {
            tmpTime=getLyrcTime(this.preLRC[E]);
            tmpLrc=getLyrc(this.preLRC[E]);
            if(tmpTime<preTime||tmpLrc=="")
            {
                continue
            }
            if(tmpTime==0)
            {
                tmpArr[0].lrcContent=tmpLrc;
                continue
            }
            preTime=tmpTime;
            C=new LRCItem(tmpTime,tmpLrc);
            tmpArr[indexLRC++]=C
        }
    }
    var C=new LRCItem(3600,"Over...");
    tmpArr[indexLRC]=C;
    this.setLRC(tmpArr);
    getLineCount(tmpArr);
    getLrcContent(tmpArr);
    tmpLrcs=this.getLRC();
    tmpScroll=this.getOutput();
    tmpScrollId=this.getOutput();
    perLength=this.scrollMoveLen;
    if(perLength<=0)
    {
        perLength=1
    }
    tmpScrollId.scrollTop=0;
    tmpMatchLrcLine=0;
    preMatchLrcLine=-1
};
function replaceStr(A)
{
    return A.replace(/^\s*|\s*$/g,"")
}
function getLyrc(A)
{
    try
    {
        tmpArray=A.split("]");
        return tmpArray[tmpArray.length-1]
    }
    catch(B)
    {
    }
    return""
}
function getLyrcTime(A)
{
    try
    {
        tmpChar=A.split("]")[0].split("[")[1];
        tmpVar=tmpChar.split(":");
        if(tmpVar.length<2)
        {
            return 0
        }
        min=tmpVar[1].split(".")[0];
        tmpInt=parseInt(tmpVar[0])*60+parseFloat(min);
        if(!isNaN(tmpInt))
        {
            return tmpInt
        }
    }
    catch(B)
    {
    }
    return 0
}
function LRCItem()
{
    var A=-1;
    var B="";
    if(arguments.length>=2)
    {
        this.lrcTime=arguments[0];
        this.lrcContent=arguments[1]
    }
}
function getLineCount(A)
{
    for(m=0;m<A.length;m++)
    {
        lineCount[m]=Math.floor(A[m].lrcContent.length/67);
        perLineCount[m]=0;
        for(j=0;j<m;j++)
        {
            perLineCount[m]+=lineCount[j]
        }
    }
}
function getLrcContent(A)
{
    for(m=0;m<A.length;m++)
    {
        preLrcContent[m]="<br><br><br><br><br><br><br>";
        nextLrcContent[m]="";
        for(j=0;j<m-1;j++)
        {
            preLrcContent[m]+="<span style='font-size:12px;margin-left:12px'>&nbsp;<font color=#000000>"+replaceStr(A[j].lrcContent)+"</font></span><br>"
        }
        for(j=m+1;j<A.length;j++)
        {
            nextLrcContent[m]+="<span style='font-size:12px;margin-left:12px'>&nbsp;<font color=#000000>"+replaceStr(A[j].lrcContent)+"</font></span><br>"
        }
        nextLrcContent[m]+="<br><br><br><br><br><br><br>"
    }
}
bdSyncLRC.prototype.Exchange=function()
{
    var C=null;
    if(window.XMLHttpRequest)
    {
        C=new XMLHttpRequest()
    }
    else
    {
        if(window.ActiveXObject)
        {
            try
            {
                C=new ActiveXObject("Microsoft.XMLHTTP")
            }
            catch(B)
            {
                C=new ActiveXObject("MSXML.XMLHTTP")
            }
        }
    }
    var D=this.getURL();
    thisObj=this;
    var A="";
    try
    {
        C.open("GET",D,false);
        C.onreadystatechange=function()
        {
            if((C.readyState==4)&&(C.status==200))
            {
                A=bdBytes2Str(C.responseBody);
                thisObj.setContent(A)
            }
        };
        C.send(null)
    }
    catch(B)
    {
    }
};
bdSyncLRC.prototype.begin=function()
{
    thisObj=this;
    tmpPlayerObj=thisObj.getPlayer();
    var B=document.getElementById("LrcShower_div");
    if(getlrcInterval!=null)
    {
        clearInterval(getlrcInterval)
    }
    getlrcInterval=setInterval(A,100);
    count=0;
function A()
{
    if(typeof (thisObj.getContent())!="undefined")
    {
        if(getlrcInterval!=null)
        {
            clearInterval(getlrcInterval)
        }
        thisObj.preSyncLRC();
        if(thisObj.getLRC()[0].lrcContent!="")
        {
            thisObj.getOutput().innerHTML="<br><br><br><br><br><br><span style='font-size:12px;margin-left:12px'>&nbsp;<font color=#000000>"+replaceStr(thisObj.getLRC()[0].lrcContent)+"</font></span><br>"+nextLrcContent[0]
        }
        else
        {
            thisObj.getOutput().innerHTML="<br><br><br><br><br><br>"+nextLrcContent[0]
        }
        getPlayingTime(thisObj.getPlayer(),thisObj)
    }
    else
    {
        if(count==50)
        {
            if(getlrcInterval!=null)
            {
                clearInterval(getlrcInterval)
            }
            B.innerHTML="<br><br><br><br><br><br><span style='font-size:12px;margin-left:12px'>&nbsp;可能是因为网络的原因，系统没有找到合适的歌词。请稍后重试";
            bdSyncLRC.showLRCAPI(null)
        }
        else
        {
            count++
        }
    }
}
};
function getPlayingTime(D,A)
{
    try
    {
        tmpbdLRCObj=A;
        var B=D;
        if(typeof (B)=="string")
        {
            B=document.getElementById(B)
        }
        if(getPTimeout!=null)
        {
            clearTimeout(getPTimeout)
        }
        getPTimeout=window.setTimeout("getPlayingTime(tmpPlayerObj,tmpbdLRCObj)",1000);
        bdsyncLyrc(tmpbdLRCObj)
    }
    catch(C)
    {
    }
}
function getCurrentPosition(A,B)
{
    if(B=="MPH")
    {
        return A.controls.currentPosition
    }
    else
    {
        if(B=="MPL")
        {
            return A.CurrentPosition
        }
        else
        {
            if(B=="RP")
            {
                return A.GetPosition()/1000
            }
        }
    }
    return 0
}
function findLoc(D)
{
    var E;
    var B;
    var A=D.getPlayer();
    currentTime=getCurrentPosition(A,D.getPlayerType());
    if(currentTime>=tmpLrcs[tmpMatchLrcLine].lrcTime)
    {
        E=tmpMatchLrcLine;
        B=tmpLrcs.length
    }
    else
    {
        E=0;
        B=tmpMatchLrcLine+1
    }
    var C;
    for(C=E;C<B;C++)
    {
        nowLrc=tmpLrcs[C];
        nextLrc=tmpLrcs[(C<B-1)?C+1:C];
        nowTime=nowLrc.lrcTime+D.offsetTime;
        nextTime=nextLrc.lrcTime+D.offsetTime;
        if(nowTime<=currentTime&&currentTime<nextTime)
        {
            return C
        }
    }
    return 0
}
function bdsyncLyrc(B)
{
    try
    {
        var A=findLoc(B);
        tmpMatchLrcLine=A;
        tmpLrcContent=preLrcContent[A];
        if(A>0)
        {
            tmpLrcContent+="<span class=prelrc>&nbsp;"+replaceStr(tmpLrcs[A-1].lrcContent)+"</span><br>"
        }
        tmpLrcContent+="<span class=nowlrc>&nbsp;"+replaceStr(tmpLrcs[A].lrcContent)+"</span><br>";
        tmpLrcContent+=nextLrcContent[A];
        if(preMatchLrcLine!=tmpMatchLrcLine)
        {
            tmpScroll.innerHTML=tmpLrcContent;
            if(Math.abs(tmpMatchLrcLine-preMatchLrcLine)>1)
            {
                tmpScrollId.scrollTop=(tmpMatchLrcLine+perLineCount[tmpMatchLrcLine]+1)*perLength
            }
            else
            {
                var E=0;
function D()
{
    tmpScrollId.scrollTop+=2*(1+lineCount[preMatchLrcLine]);
    E++;
    if(E>=10)
    {
        clearInterval(loaderInterval);
        loaderInterval=null;
        E=0
    }
    else
    {
        if(E<0)
        {
            E=0
        }
    }
}
if(loaderInterval!=null)
{
    clearInterval(loaderInterval);
    loaderInterval=null;
    E=0
}
loaderInterval=setInterval(D,25)
}
}
preMatchLrcLine=tmpMatchLrcLine
}
catch(C)
{
}
};
