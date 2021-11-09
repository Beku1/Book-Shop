import bookDesc from '../cmps/book-desc.cmp.js'
import addReview from '../cmps/add-review.cmp.js'
import { bookService } from '../services/book-service.js'



export default {
    components:{
    bookDesc,
    addReview
    },
    template:`
    <section class="book-details-container ">
        <div class="nextBook">
        <router-link  :to="'/book/'+nextBookId">Next</router-link>
        </div>
        <div class="prevBook">
        <router-link  :to="'/book/'+prevBookId">Prev</router-link>
</div>
    <div class="book-details" v-if="book">
        <button class="close-book" @click="closeDetails">X</button>
        <div class="small-price">{{showSale}}</div>
        <img :src="book.thumbnail"/>
        <div class="book-title">Title: {{book.title}}</div>
        <div class="book-subtitle"> Subtitle: {{book.subtitle}}</div>
        <div class="book-authors">Authors:{{showAuthors}}</div>
        <div class="book-published">Published At: {{book.publishedDate}}  <span>{{publishedDate}}</span> </div>
       
        <div class="book-pageCount">{{pageCount}}</div>
        <div class="book-categories">Categories: {{showCategories}} </div>
            <div class="book-language">language: {{book.language}}</div>
        <div  class="book-price">Price: <span :class="priceColor">{{showPrice}} </span><span class="small-price"> {{showSale}} </span></div>
        <book-desc v-bind:desc="book.description"></book-desc>
         <add-review :book="book" />
        </div>
</section>
    `,
    data(){
        return{
         book:null,
         nextBookId:null,
         prevBookId:null
        }
    },
    created(){
     const {bookId} = this.$route.params
     if(!bookId) this.$router.push('/book')
     bookService.getById(bookId)
     .then(book=> {
        if(!book) this.$router.push('/book')
        else
        this.book = book})
    },
    methods:{
     closeDetails(){
         console.log(this.nextBookId,this.PrevBookId)
        this.$router.push('/book')
     }
    },
    computed:{
        pageCount(){
            if(this.book.pageCount>500)return 'Long Reading'
            else if(this.book.pageCount>200)return 'Decent Reading'
            else if(this.book.pageCount<100) return 'Light Reading'
        },
        showAuthors(){
           const authors =  [...this.book.authors]
           .toString()
           .split(',')
           .join(' &  \n')
           return authors
        },
        showCategories(){
            const categories = [...this.book.categories]
            .toString()
            .split(',')
            .join(' | ')
            return categories
        },
        showPrice(){
            const currencyCode = this.book.listPrice.currencyCode
            var currency = ''
            if(currencyCode === 'EUR') currency = '€'
            else if(currencyCode === 'USD') currency = '$'
            else if(currencyCode === 'ILS') currency = '₪'
            let price = this.book.listPrice.amount + currency
            return price
        },
        publishedDate(){
            const date = this.book.publishedDate
            let currDate = new Date()
            if(currDate.getFullYear() - date >= 10) return 'Veteran Book'
            else if(currDate.getFullYear() - date <= 1) return 'New!!!'
            else return ''
        },
        showSale(){
            if(this.book.listPrice.isOnSale) return 'SALE'
            
        },
        priceColor(){
            return {'big-price': this.book.listPrice.amount > 150 , 'small-price': this.book.listPrice.amount < 20}
        },
    },
        watch:{
            '$route.params.bookId':{
                handler(){
                    const { bookId } = this.$route.params
                    console.log(bookId)
                    bookService.getById(bookId)
                    .then(book => this.book = book)
                    bookService.getNextPrevId(bookId)
                    .then(bookIds =>{
                        console.log(bookIds)
                        this.nextBookId = bookIds.nextId
                        this.prevBookId = bookIds.prevId
                        console.log( this.nextBookId, this.prevBookId)
                    })
                },
                immediate:true
            }
        }




    }


