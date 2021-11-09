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
    askBooks,
    addGoogleBook,
    getNextPrevId
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

    function askBooks(str){
        let data = utilService.loadFromStorage(str)
         if(storageService.query(str).length>0) return data
        return axios
        .get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${str}`)
        .then(books =>{
            console.log('books',books)
             storageService._save(str,books.data.items)
             return books.data.items
        })
        .catch(err=>{
            console.log('ISSUES WITH API')
        })
        
    
    }


    function getNextPrevId(bookId){
        return query()
        .then(books=>{
            const idx = books.findIndex(book=> book.id === bookId)
            console.log(idx)
            if(idx===books.length-1)
            return {nextId:books[0].id,prevId:books[idx-1].id}
            else if(idx===0)
            return {nextId:books[idx+1].id,prevId:books[books.length-1].id}
            return {nextId:books[idx+1].id,prevId:books[idx-1].id}
        })
    }

    function addGoogleBook(googleBook){
            return query(BOOKS_KEY)
            .then(books=>{
                console.log(books)
               let idx = books.findIndex(book =>{
                    return book.id === googleBook.id
                })
                if(idx<0) return storageService.post(BOOKS_KEY,googleBook)
                else return Promise.reject(new Error('Fail'))
            })
    }