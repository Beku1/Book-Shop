
import bookPreview from './book-preview.cmp.js'

export default {
  props: ['books'],
  components:{
    bookPreview
  },
  template: `
    <section class="book-list">
        <div>{{noBooks}}</div>
        <div v-for="book in books" :key="book.id" class="book-preview-container">
        <router-link :to="'/book/'+book.id"   > <book-preview :book="book" />
      </router-link>
       
</div>
</section>
    `,
    data(){
        return{
        isNoBooks:null
        }
    },
    methods:{
    select(book){
    this.$emit('selected',book)
    }
    },
    computed:{
      noBooks(){
        return !this.books || this.books.length===0 ? 'There is no books' : ''
      }
    }
}
