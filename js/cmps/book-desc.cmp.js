export default{
    props:['desc'],
    template:`
    <div>
    <div class="book-description">Description: {{showText}}<button v-if="!isShortDesc" @click="toggleDesc">{{buttonText}}</button></div></div>
    `,
    data(){
      return {
       isShowMore:false,
       isShortDesc:false,
       
      }
    },
    created(){
      this.checkDesc()
    },
    methods:{  
        toggleDesc(){
            this.isShowMore = !this.isShowMore
            
        },
        checkDesc(){
            if(this.desc.length <= 100) this.isShortDesc = true
        }
    },
    computed:{
        showText(){
            let description = this.desc
            if(this.isShortDesc) return description 
            let tldr = description.substring(100,0)
            if(this.isShowMore) return description
            else return tldr + '...'
            
        },
        buttonText(){
            return this.isShowMore ? '...Show Less' : '...Show More'
        }
        
       
    }


}