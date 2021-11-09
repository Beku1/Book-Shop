import {bookService} from '../services/book-service.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from '../pages/book-details.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js'



export default {
    components:{
    bookFilter,
    bookList,
    bookDetails,
    bookAdd
    },
    template:`
      <section class="book-app">
          <div class="filter-and-modal">
          <book-filter v-if="!selectedBook" @filtered="setFilter" />
         <button @click="openNewModal"  >Add Books</button>
</div>
          <book-list  v-if="!selectedBook" :books="booksToShow" @selected="selectBook" />
           
          <book-add v-show="isModalOpen" @close="closeModal" @addedBook="loadBooks" />
              <!-- <book-details v-if="selectedBook" :book="selectedBook" @close="closeDetails" />  -->
              <router-link to="/book/"></router-link>
      </section>
    `,
    data(){
        return {
            isModalOpen:false,
        books:null,
        filterBy:null,
        selectedBook:null,
        }
    },
    created(){
     this.loadBooks()
    },
    destroyed(){

    },
    methods:{  
        closeModal(){
            this.isModalOpen = false
        },
        openNewModal(){
            this.isModalOpen = true
        },
    loadBooks(){
       bookService.query()
       .then(books=> {
           console.log(books)
           this.books = books
       })
    },
    setFilter(filterBy){
    this.filterBy = filterBy
    },
    selectBook(book){
     this.selectedBook = book
    },
    closeDetails(){
    this.selectedBook = false
    }
    },
    computed:{
    booksToShow(){
        if(!this.filterBy) return this.books
        console.log(this.filterBy)
        const searchStr = this.filterBy.title.toLowerCase()
        const priceStart  =  this.filterBy.priceStart
        const priceTo = this.filterBy.priceTo
        const booksToShow = this.books.filter((book)=>{
            return (book.title.toLowerCase().includes(searchStr)
             && priceStart <= book.listPrice.amount
              && priceTo >= book.listPrice.amount || !priceTo)
        })
        return booksToShow
    },
    addedBooks(){

    }
  
    }

}