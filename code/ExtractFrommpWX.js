//- 会重复获取以及遗漏,可能调大延迟时间就可以避免

var result=new Array()
var endNumber='12' //设置结束页


function getData() {
    let list=document.querySelectorAll('.weui-desktop-mass__item')
    list.forEach(function(item){
        let myDiv=document.createElement('div')
        let r=/^\d\d月/
        let date=item.querySelector('.weui-desktop-mass__time')
        if(r.test(date.innerText)){
            date.innerText='2019年'+date.innerText//补齐年份
        }

        myDiv.insertAdjacentHTML('beforeend',date.outerHTML) //date

        let imgOnly=item.querySelector('.weui-desktop-mass__content > .weui-desktop-mass-img >a')
        let textOnly=item.querySelector('.weui-desktop-mass__content .weui-desktop-mass-text__bd.js_text_el.ellipsis-text')
        if (textOnly){//纯文字消息
            myDiv.insertAdjacentHTML('beforeend',textOnly.outerHTML) 
        }
        else if(imgOnly){//纯图片推送
            myDiv.insertAdjacentHTML('beforeend',imgOnly.outerHTML) 
        }else{
            let titleList=item.querySelectorAll('div.weui-desktop-mass-appmsg__bd > a')
            titleList.forEach(function (title) {
                title.querySelectorAll('.weui-desktop-key-tag').forEach(element => {
                    element.remove()
                })
                // if(title.children[0]){
                //     title.children[0].remove() //remove “原创”
                // }
                // if(title.parentNode.parentNode.classList.contains('weui-desktop-mass-media_del')){
                //     myDiv.insertAdjacentHTML('beforeend','已删除') 
                // }
                myDiv.insertAdjacentHTML('beforeend',title.outerHTML) //title
            })
        }
        result.push(myDiv.outerHTML)
    })
}

//去除数组中重复数据
function unique(arr) {
    let result = [], hash = {}
    for (let i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem)
            hash[elem] = true
        }
    }
    return result
}

function nextPage()
{
    getData()
    let btn= document.querySelector('.weui-desktop-pagination__nav > .weui-desktop-pagination__num__wrp ~ a')
    if(document.querySelector('.weui-desktop-pagination__nav .weui-desktop-pagination__num').textContent==endNumber){
        result=unique(result)
        result.forEach(function functionName(e) {
            document.write(e)
        })
    }else{
        console.log(result.length)
        btn.click()
        setTimeout(nextPage,700)
    }
}

nextPage()



//function clock()
//{
//    if(pageNumber!==document.querySelector("span.page_nav_area > span > label:nth-child(1)").innerText){
//        pageNumber=document.querySelector("span.page_nav_area > span > label:nth-child(1)").innerText
//      let next=document.querySelector("span.page_nav_area > a.btn.page_next")
//      if(next.style.display !=="none"){
//        add2result()
//        next.click()
//      }else{
//        window.clearInterval(intv)
//        window.alert(result.length)
//        result.forEach(function functionName(e) {
//          document.write(e)
//        })
//      }
//    }
//}
