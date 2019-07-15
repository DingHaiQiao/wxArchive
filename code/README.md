1. 登录微信公众平台，用[Extract From mpWX](ExtractFrommpWX.js)提取推送列表  
    根据需要设置endNumber，如果改版则做相应调整。最后输出[titleList](titleList.html)网页,检查无误后保存
2. 打开titlelist.html，运行[html.js](html.js)第一段，生成日期列表datelist，运行[createfolder.sh](createfolder.sh)生成日期目录
3. 运行[html.js](html.js)第二段，结果保存为[titlelist.csv](titlelist.csv)，换行必须是LF
4. 运行[html.js](html.js)第三段，将结果插入[dingWX.html](../dingWX.html)
5. 清空[imglist](imglist)、[voicelist](voicelist)
6. 运行[1main.pl](1main.pl)
7. 打开[dingWX.html](../dingWX.html)，看是否能顺利访问备份文件，重点关注标题里有特殊字符的推送

