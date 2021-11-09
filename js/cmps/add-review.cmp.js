import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/event-bus-service.js"


export default {
    props:['book'],
    template:`
    <section class="book-reviews-container">
        <button v-if="isShowReviews" class="write-review" @click="openReview">Write Review</button>
    <div v-if="!isShowReviews" class="book-review">
     <form class="review-form">
         <input v-model="review.reader" type="name" ref="userName" placeholder="Enter your name" required>
        <!-- <label> Rating:  <select v-model.number="review.rating" name="rating" required >
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
         </select> </label> -->
         <div class="rating">
             <span v-for="rate in 5" class="fa fa-star star" :class="{rated: review.rating >= rate}" @click="changeRating(rate)"></span>
         </div>
         <label>Reviewed At:
         <input v-model="review.readAt" type="date" ></label>
         <label class="textarea-div">Your Review: 
         <textarea v-model="review.reviewTxt" cols="30" rows="4"></textarea></label>
         <button type="submit" @click.prevent="saveReview" >Save Review</button>
         <button @click="closeReview">cancel</button>
     </form> 
     
</div>
<div class="book-reviews" v-else>
  <div v-for="(reviewInBook,idx) in book.review" class="book-single-review"> 
      <button @click="deleteReview(idx)">Delete</button>
      <div>Name: {{reviewInBook.reader}}</div>
      <div>Rating: <span v-for="rate in 5" class="fa fa-star star" :class="{rated: reviewInBook.rating >= rate}"></span></div>
      <div>Read At: {{reviewInBook.readAt}}</div>
      <div>Review: {{reviewInBook.reviewTxt}}</div>
  </div>
</div>
</section>
   
    `,
    data(){
        return {
            isShowReviews:true,
            reviewTill:3,
         review:{
             reader:null,
             rating:1,
             readAt:null,
             reviewTxt:null,
            
         }
        }
    },
    mounted(){
     
    },
    created(){
    //  this.dateNow()
    },
    destroyed(){

    },
    methods:{
        focusInput() {
            
            this.$refs.userName.focus()
          },
          saveReview(){
              this.checkReviewInput()
          bookService.addReview(this.review,this.book)
          .then(()=>{
              this.isShowReviews = true
          this.clearForm()
          })
          },

          openReview(){
           this.isShowReviews = false
           setTimeout(()=>{
               this.focusInput()
           },100)
          },

          closeReview(){
              this.isShowReviews = true
          },

          deleteReview(reviewIdx){
           bookService.deleteReview(reviewIdx,this.book)
           .then(()=>{
               console.log('then')
               const msg = {
                   txt:'Deleted Review Succsefully',
                   type:'success'
               }
               eventBus.$emit('showMsg',msg)
           })
           .catch(()=>{
               const msg = {
                   txt: 'Error. Please try again later',
                   type:'error'
               }
               eventBus.$emit('showMsg',msg)
           })
          },

          checkReviewInput(){
          if(!this.review.reader) this.review.reader='Books Reader'
          if(!this.review.readAt) this.review.readAt = this.dateNow()
          if(!this.review.reviewTxt) this.review.reviewTxt = 'He/She Wrote nothing'
          },

          dateNow(){
              let today = new Date()
              let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              return date
          },

          clearForm(){
              this.readAt = null
              this.review.reader = null
              this.review.rating= 1
              this.review.reviewTxt = null
            
          },
          changeRating(rate){
           this.review.rating = rate
          }
    },
    computed:{
   
    }
}