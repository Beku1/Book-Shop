

export default{
    template:`
    <section class="about-page min-height">
    <transition name="slide-fade">
        <div v-if="appear" class="about-page-container">
        
        <div>About me</div>
        <div>My name <span class="i">I</span>s Beny Kursalin.</div>
        <div>I'm  in <span class="love">Love</span> with coding.</div>
        <div>So I'm studying to be a <span class="fullstack">FullStack</span> Developer.</div>
        
        </div>
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
        this.interval = setInterval(()=>{
            console.log('Interval on duty!!!')
           },1000)
    },
    
    destroyed(){
        this.appear = false
        clearInterval(this.interval)
    },
        
    
}