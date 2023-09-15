import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        postcss: {
            plugins: [
                postCssPxToRem({
                    // 设计稿 375:37.5
                    // 设计稿：750:75
                    // Vant 是基于 375
                    // 自适应，px>rem转换
                    rootValue: 39,  // ps设计图纸宽度为750px时 就写上面的比例75  设计稿宽度的1/10
                    // rootValue根据设计稿宽度除以10进行设置
                    propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
                    selectorBlackList: ['van'] // 过c滤掉VantUI组件
                    /*
                        这个*作用是width,height,margin宽高这些属性的适配,单位转换为rem
                        都移动端项目了,那肯定全部都要转换
                    */
                })
            ]
        }
    }
})
