import bookAdd from './book-add.cmp.js'

export default{
    components:{
         bookAdd
        },
   

   template:`
   <section class="book-filter">
       <form class="filter-form">
       <input  v-model="filterBy.title" type="text" placeholder="Search.....">
       <label>Price From:<input  v-model.number="filterBy.priceStart" type="number" id="price-start" min="0" max="200" > </label>
       <label>Price To:<input  v-model.number="filterBy.priceTo" type="number" id="price-to" min="1" max="200"></label>
       <button @click.prevent="filter()">Search</button>
    </form>  
   
    
</section>
   `,
data(){
  return {
      
      filterBy:{
          title:'',
          priceStart:0,
          priceTo:200
          
    
      }
  }
},methods:{
    filter(){

        this.$emit('filtered',{...this.filterBy})
    },
    openNewModal(){
     this.isModalOpen = true
    },
    
}
}