

import { createApp, nextTick } from 'vue'
import App from './App.vue'
import Dom from './utils/dom'
import {adminStore} from '../src/store/admin'
//router
import router from './router'
//piain
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App);

//自定义指令
app.directive('redHeart', (e, binding, vnode) => {
   
    // 双击
    var clicked_count = 0;
    let id = 'a' + Date.now()
 
    document.addEventListener('ontouchstart' in document ? 'touchstart' : 'mousedown', function (e) {
        const x = e.touches[0].pageX;
        const y = e.touches[0].pageY;
        clicked_count++;
        setTimeout(function () {
            clicked_count = 0;
        }, 500);
        if (clicked_count > 1) {
            const store = adminStore()
            store.flag = true
            let elWidth = 80
            let template = `<img style="position: absolute;top:${y}px;left:${x}px" class='left love-dbclick' id="${id}" src="../src/assets/img/icon/loved.svg">`
            let el = new Dom().create(template)
            el.css({ top: el.y - elWidth - 40, left: el.x - elWidth / 2, })
            new Dom(`#${binding.value}`).append(el)
            setTimeout(() => {
                new Dom(`#${id}`).remove()
            }, 1000)
            clicked_count = 0;
        }

    }, false);




})

app.use(pinia).use(router).mount('#app')
