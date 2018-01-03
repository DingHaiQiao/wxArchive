//- 会重复获取以及遗漏,可能调大延迟时间就可以避免

var result=new Array()


function getData() {
  let list=document.querySelectorAll(".weui-desktop-mass__item")
  list.forEach(function(e){
    let myDiv=document.createElement("div")
    myDiv.insertAdjacentHTML('beforeend',e.querySelector(".weui-desktop-mass__time").outerHTML) //date
    let img=e.querySelector('.weui-desktop-mass__content > .weui-desktop-mass-img >a')
    if(img){//纯图片推送
        myDiv.insertAdjacentHTML('beforeend',img.outerHTML) 
    }else{
        let titleList=e.querySelectorAll("div.weui-desktop-mass-appmsg__bd > a")
        titleList.forEach(function (f) {
            if(f.children[0]){
                f.children[0].remove()  //remove “原创”
            }
            if(f.parentNode.parentNode.classList.contains('weui-desktop-mass-media_del')){
                myDiv.insertAdjacentHTML('beforeend','已删除') 
            }
            myDiv.insertAdjacentHTML('beforeend',f.outerHTML) //title
        })
    }
    result.push(myDiv.outerHTML)
  })
}

//去除数组中重复数据
function unique(arr) {
    let result = [], hash = {};
    for (let i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

function nextPage()
{
    getData()
    let btn= document.querySelector(".weui-desktop-pagination__nav > .weui-desktop-pagination__num__wrp ~ a")
    let endNumber='3' //设置结束页
    if(document.querySelector(".weui-desktop-pagination__nav .weui-desktop-pagination__num").textContent==endNumber){
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
