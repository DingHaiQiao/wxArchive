//usage: phantomjs.exe wx.js "网址"
/*global require phantom:true*/
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    address = system.args[1]

if (system.args.length === 1) {
    console.log('Usage: page.js <some URL>')
    phantom.exit()
}

page.viewportSize = { width: 1024, height: 768 }
page.zoomFactor = 1.5

page.open(address, function() {
    var medialist = page.evaluate(function() {
        var imgs = document.querySelectorAll('img') //恢复被延迟加载的图片
        var content = { imglist: '', voicelist: '' } //存储多媒体地址

        for (var i = 0; i < imgs.length; i++) {
            var src = imgs[i].dataset.src
            if (/^http/.test(src)) {
                content.imglist += src + '\n'
            }
            imgs[i].setAttribute('src', src)
        }
        var scripts = document.querySelectorAll('script') //remove <script>
        for (var i = 0; i < scripts.length; i++) {
            scripts[i].remove()
        }
        var videos = document.querySelectorAll('.video_iframe') //恢复被延迟加载的视频
        for (var i = 0; i < videos.length; i++) {
            videos[i].src = videos[i].dataset.src.replace('file', 'http')
            videos[i].style.display = 'block'
        }
        var voices = document.querySelectorAll('mpvoice') //恢复音频播放
        for (var i = 0; i < voices.length; i++) {
            var mpv = voices[i]
            var v = document.createElement('video')
            var voiceurl = 'https://res.wx.qq.com/voice/getvoice?mediaid=' + mpv.getAttribute('voice_encode_fileid')
            content.voicelist += voiceurl + '\n'
            v.innerHTML = '<source src="' + voiceurl + '" type="audio/mp3">'
            v.style.height = '2em'
            v.style.width = '100%'
            v.setAttribute('controls', '')
            v.setAttribute('name', mpv.getAttribute('name'))
            mpv.parentNode.appendChild(v)
        }
        var qqMusics = document.querySelectorAll('qqmusic') //恢复QQ音乐播放
        for (var i = 0; i < qqMusics.length; i++) {
            var audiourl = qqMusics[i].getAttribute('audiourl')
            var v = document.createElement('video')
            v.innerHTML = '<source src="' + audiourl + '" type="audio/mp3">'
            v.style.height = '2em'
            v.style.width = '100%'
            v.setAttribute('controls', '')
            v.setAttribute('name', qqMusics[i].getAttribute('music_name'))
            qqMusics[i].parentNode.appendChild(v)
        }

        return content
    })
    fs.write('imglist', medialist.imglist, 'w+') //保存图片链接
    fs.write('voicelist', medialist.voicelist, 'w+') //保存音频链接
    window.setTimeout(function functionName() {
        page.render('wx.png')//输出截图
        console.log(page.content)//输出html
        phantom.exit()
    }, 1000) ////延迟1秒，尽量保证图片已加载
})
