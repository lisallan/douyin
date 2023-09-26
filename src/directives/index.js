import { nextTick } from 'vue';
import Dom from '../utils/dom'

const redHeart = (el, binding, vnode) => {
    // 双击
    var passiveEvent = false;

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
            nextTick(()=>{
                let elWidth = 80
                let template = `<img style="position: absolute;top:${y}px;left:${x}px" class='love-dbclick' id="${id}" src="../src/assets/img/icon/loved.svg">`
                let el = new Dom().create(template)
                el.css({ top: el.y - elWidth - 40, left: el.x - elWidth / 2, })
console.log(el)

                console.log(binding)
                new Dom(`#${binding.value}`).append(el)
                setTimeout(() => {
                    new Dom(`#${id}`).remove()
                }, 1000)
                clicked_count = 0;
            })

        }

    }, passiveEvent);

};


export default redHeart;