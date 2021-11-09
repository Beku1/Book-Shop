export default {
    template:`
    <section class="home-page min-height">
    <transition name="slide-fade">
        <div v-if="appear" class="home-content-container">
        <!-- <div>This site is for Book Lovers.</div> -->
        <div>We have Books for You</div>
            <div>We sell Books!!!</div>
            <div>We Review Books!!!</div>
            <div>WE LOVE BOOKS!!!</div>
        </div>
     </transition>
     <transition name="slide-fade">
        <router-link v-if="appear" to="/book" class="check-books">Check Books</router-link>
        </transition>
    </section>
    `,
    data(){
        return {
        appear:false,
        interval:null
        }
    },
    created(){
        
        setTimeout(()=>{
            this.appear= true
        },500)
     
    
    },
    
    destroyed(){
        
        this.appear = false
        
        
    },
    
}