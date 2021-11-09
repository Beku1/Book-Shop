import {books} from '../data/books.js'
import {storageService} from './async-storage-service.js'
import { utilService } from './util-service.js'

const BOOKS_KEY = 'books'
_createBooks()


export const bookService = {
    query,
    addReview,
    getById,
    deleteReview,
}

function query(){
    return storageService.query(BOOKS_KEY)
}


function _createBooks(){
    let newBooks = utilService.loadFromStorage(BOOKS_KEY)
    if(!newBooks || !newBooks.length){
        newBooks = books
        utilService.saveToStorage(BOOKS_KEY,newBooks)  
        
    }
    return newBooks
}

function getById(bookId){
  return storageService.get(BOOKS_KEY,bookId)
}

function addReview(review,book){
        if(!book['review']) book.review = [] 
        console.log(review)
            let newReview = {...review}
            book.review.push(newReview)
          return  storageService.put(BOOKS_KEY,book)

    }

    function deleteReview(reviewIdx,book){
        book.review.splice(reviewIdx,1)
      return storageService.put(BOOKS_KEY,book)
    }
