//分批运行

////只留下日期，用来生成日期文件夹
//标题暂时隐藏
var a=Array.from(document.querySelectorAll('a'))
a=a.concat(Array.from(document.querySelectorAll('.weui-desktop-mass-text__bd')))//考虑到纯文字消息的情况

a.forEach(e=> {
    e.hidden=true
})
// 恢复标题显示
a.forEach(e=>{
    e.hidden=false
})


//convert to CSV
var sep=document.createElement('span')
sep.innerText='|'
var br=document.createElement('br')
var r=/[#!\\/*?|:"<>]/g

var divs=document.querySelectorAll('body > div')
divs.forEach(function eachDiv(div) {
    var a=div.querySelectorAll('a')
    var em=div.querySelector('em')
    em.style.display='initial'
    if(a.length>0){
        if (a.length>1) {//一天多篇文章，每个标题前加上日期
            for (var i = 1; i < a.length; i++) {
                var date=em.cloneNode(true)
                div.insertBefore(date,a[i])
            }
        }
        a.forEach(function eachA(thisa) {
            div.insertBefore(br.cloneNode(true),thisa.nextSibling)//插入换行
            var url=document.createElement('span')
            url.innerText=thisa.href
            div.insertBefore(url,thisa.nextSibling)//插入网址
            div.insertBefore(sep.cloneNode(true),thisa.nextSibling)//插入竖线
            div.insertBefore(sep.cloneNode(true),thisa)//插入竖线
            thisa.innerText=thisa.firstElementChild.innerText.replace(r,'_')//删除标题中不合法字符
            //检查是否出现多余的空格
            thisa.style.display='initial'
        })
    }else{
        div.remove()//排除纯文本消息
    }
})


//刷新titlelist后运行
// 添加备份文件链接，生成最终目录
r=/[#!\\/*?|:"<>]/g
var r2=/^\s*|\s*$/g
var r3=/&chksm.*rd/
br=document.createElement('br')

divs=document.querySelectorAll('body > div')
divs.forEach(function eachDiv(div) {
    let em=div.querySelector('em')
    //添加wrapper
    let content=div.querySelectorAll('em ~ *')
    let wrapper=document.createElement('div')
    wrapper.className='content'
    content.forEach(element => {
        wrapper.append(element.cloneNode(true))
        element.remove()
    })
    div.append(wrapper)

    let a=wrapper.querySelectorAll('a')
    a.forEach(function eachA(thisa) {
        thisa.href=thisa.href.replace(r3,'')
        let localA=document.createElement('a')
        localA.className='local'
        localA.innerText='#'
        let localA2=localA.cloneNode(true)
        if (thisa.querySelectorAll('img').length>0) {//纯图片推送
            localA.href='dhqWX/'+em.innerText+'/'+'wx.jpeg'
            localA.classList.add("img")
            wrapper.insertBefore(br.cloneNode(true),thisa.nextSibling)//插入换行
            wrapper.insertBefore(localA,thisa.nextSibling)//插入jpeg网址
        } else {
            thisa.innerText=thisa.firstElementChild.innerText.replace(r2,'')
            let newTitle=encodeURIComponent(thisa.innerText.replace(r,'_'))
            localA.href='dhqWX/'+em.innerText+'/'+newTitle+'.png'
            localA.classList.add("img")
            wrapper.insertBefore(br.cloneNode(true),thisa.nextSibling)//插入换行
            wrapper.insertBefore(localA,thisa.nextSibling)//插入截图png网址
            localA2.classList.add("html")
            localA2.href='dhqWX/'+em.innerText+'/'+newTitle+'.html'
            wrapper.insertBefore(localA2,thisa.nextSibling)//插入html网址
        }
    })
})
