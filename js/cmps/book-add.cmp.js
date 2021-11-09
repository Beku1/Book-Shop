
import { bookService } from '../services/book-service.js'
import { eventBus } from "../services/event-bus-service.js"



export default {
    components:{
     
    },
    template:`
    <div class="book-add-modal">
        <button @click="closeModal" class="close-button">X</button>
        <label class="book-title">Book Title:
    <input type="text" v-model.lazy="title"></label>
    <div class="new-book-list">
    <ul class="new-google-books" v-for="(book) in newBooks">
        <li>{{book.title}}</li>
        <button @click="addBook(book)" > + </button>
        
    </ul>
</div>
    
    
        
    </div>
    `,
    data(){
        return {
        title:null,
        newBooks:[],
        bookId:null
        }
    },
    methods:{
        closeModal(){
            this.$emit('close')
        },
        addBook(book){
            console.log(book)
            bookService.addGoogleBook(book)
            .then(()=>{
                const msg = {
                    txt:'Book has been added',
                    type:'success'
                }
                eventBus.$emit('showMsg',msg) 
                this.$emit('addedBook')
            })
            .catch((err)=>{
                const msg = {
                    txt: 'Book already exists',
                    type:'error'
                }
                eventBus.$emit('showMsg',msg)
            })
           
            
        },
        getPrice(){
             let amount= Math.floor(Math.random() * 300) + 1
             let currencyCode = amount < 100 ? "EUR" : amount < 200 ? "USD" : "ILS"
             let isOnSale = amount < 150 ? true : false
            return{
                amount,
                currencyCode,
                isOnSale
            }
        }

    },
    watch:{
        title(newVal){
            if(!newVal){
               return this.newBooks = []
            }
            bookService.askBooks(newVal)
            .then(books=>{
                this.newBooks = []
                books.forEach(book=>{
                    let title = book.volumeInfo.title
                    let subtitle = book.volumeInfo.subtitle || 'No Subtitles'
                    let authors = book.volumeInfo.authors || ['B.K']
                    let publishedDate = book.volumeInfo.publishedDate || 'Unknown'
                    let description = book.volumeInfo.description || 'Good Book'
                    let pageCount = book.volumeInfo.pageCount || 'Unknown'
                    let categories = book.volumeInfo.categories || ['Unknown']
                    let thumbnail = book.volumeInfo.imageLinks.thumbnail || '../img/header-background.jpg'
                    let language = book.volumeInfo.language || 'Unknown'
                    let listPrice = this.getPrice()
                    this.newBooks.push({id:book.id,title,subtitle,authors,publishedDate,description,pageCount,categories,thumbnail,language,listPrice})
                })
                

            })
        }
    }
}

