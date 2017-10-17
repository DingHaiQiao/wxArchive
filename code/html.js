//分批运行

//标题暂时隐藏
var a=document.querySelectorAll('a')
a.forEach(function hideA(e) {
  e.style.display='none'
})
// 恢复标题显示
a.forEach(function showA(e) {
  e.style.display='block'
})


//convert to CSV
var sep=document.createElement('span')
sep.innerText='|'
var br=document.createElement('br')
var r=/[!\\/*?|:"<>]/g

var divs=document.querySelectorAll('div')
divs.forEach(function eachDiv(div) {
  var a=div.querySelectorAll('a')
  var em=div.querySelector('em')
  em.style.display='initial'
  if (a.length>1) {//一天多篇文章，每个标题前加上日期
    for (var i = 1; i < a.length; i++) {
      var date=em.cloneNode(true)
      div.insertBefore(date,a[i])
    }
  }
  a.forEach(function eachA(thisa) {
    var url=document.createElement('span')
    url.innerText=thisa.href
    div.insertBefore(br.cloneNode(true),thisa.nextSibling)//插入换行
    div.insertBefore(url,thisa.nextSibling)//插入网址
    div.insertBefore(sep.cloneNode(true),thisa.nextSibling)//插入竖线
    div.insertBefore(sep.cloneNode(true),thisa)//插入竖线
    thisa.innerText=thisa.innerText.replace(r,'_')//删除标题中不合法字符
    thisa.style.display='initial'
  })
})



// 生成最终目录
r=/[!\\/*?|:"<>]/g
var r2=/\s*$/
br=document.createElement('br')

divs=document.querySelectorAll('div')
divs.forEach(function eachDiv(div) {
  var a=div.querySelectorAll('a')
  var em=div.querySelector('em')
  a.forEach(function eachA(thisa) {
    var localA=document.createElement('a')
    localA.className='local'
    localA.innerText='#'
    if (thisa.querySelectorAll('img').length>0) {//纯图片推送
      localA.href='dhqWX/'+em.innerText+'/'+'wx.jpeg'
      div.insertBefore(br.cloneNode(true),thisa.nextSibling)//插入换行
      div.insertBefore(localA,thisa.nextSibling)//插入jpeg网址
    } else {
      thisa.innerText=thisa.innerText.replace(r2,'')
      var newTitle=thisa.innerText.replace(r,'_')
      localA.href='dhqWX/'+em.innerText+'/'+newTitle+'.png'
      div.insertBefore(br.cloneNode(true),thisa.nextSibling)//插入换行
      div.insertBefore(localA,thisa.nextSibling)//插入png网址
      var localA2=localA.cloneNode(true)
      localA2.href='dhqWX/'+em.innerText+'/'+newTitle+'.html'
      div.insertBefore(localA2,thisa.nextSibling)//插入html网址
    }
  })
})
