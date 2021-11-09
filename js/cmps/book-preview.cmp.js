

export default {
  props:['book'],
  template:`
   <section class="book-preview">
       <img :src="book.thumbnail"/>
       <div v-if="book.listPrice.isOnSale" class="on-sale">{{showOnSale}}</div>
       <p>Title:  {{showTitle}}</p>
       <p><span>Price: {{book.listPrice.amount}}</span> <span>{{currencyIcon}}</span></p>
</section>
  `,
  computed:{
        currencyIcon(){
            const currencyCode = this.book.listPrice.currencyCode
            var currency = ''
            if(currencyCode === 'EUR') currency = '€'
            else if(currencyCode === 'USD') currency = '$'
            else if(currencyCode === 'ILS') currency = '₪'
            return currency
        },
        showOnSale(){
            return this.book.listPrice.isOnSale ? 'SALE!!!' : ''
        },
        showTitle(){
          if(this.book.title.length>40) return this.book.title.substring(0,37) + '...'
          return this.book.title
        }
  }
}