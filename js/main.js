import bookApp from './pages/book-app.cmp.js'
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import {router} from './routes.js'

const options = {
    el:'#app',
    router,
    components:{
    bookApp,
    appHeader,
    appFooter,
    userMsg
    },
    template:`
    <section>
        <user-msg></user-msg>
     <app-header></app-header>
     <router-view></router-view>
     <app-footer ></app-footer >
    </section>
    `,
    
}

new Vue(options)