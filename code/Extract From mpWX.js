//- 会重复获取以及遗漏,可能调大延迟时间就可以避免

var result=new Array()


function getData() {
  let list=document.querySelectorAll(".mpui-mass-list__content>.mpui-list__item")
  list.forEach(function(e){
    result.push(e.querySelector(".mpui-mass-list__media__time").outerHTML)
    let titleList=e.querySelectorAll(".mpui-mass-list__media__content > a")
    titleList.forEach(function functionName(f) {
      result.push(f.outerHTML)
    })
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
    var btn= document.querySelector("#list_container > div.mpui-pagination > span.mpui-pagination__nav > .mpui-pagination__num__wrp ~ a")
    if(btn){
        btn.click()
        setTimeout(nextPage,300)
    }else{
        result=unique(result)
        result.forEach(function functionName(e) {
           document.write(e)
        })
        console.log(result.length)
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
