
{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book', 
    },

    list : {
      bookList: '.books-list',
    },

    all: {
      bookName: '.book_name',
      price: '.product__base-price',
      bookImg: '.book__image',
    },

  };

  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML), 
  };


  const render = function(){

    for (let book of dataSource.books){

      const generatedHTML = template.book(book);
      
      const bookDOM = utils.createDOMFromHTML(generatedHTML);

      const bookList = document.querySelector(select.list.bookList);

      bookList.appendChild(bookDOM);
    }
  };

  const favoriteBooks = [];

  const initActions = function(){

    const container = document.querySelector(select.list.bookList);
    
    container.addEventListener('dblclick', function(event){
      event.preventDefault();

      const elementClicked = event.target.offsetParent;

      console.log(elementClicked);

      if(elementClicked.classList.contains('.book__image')){

        const idBook = elementClicked.getAttribute('data-id');
        
        if(favoriteBooks.includes(idBook)){
          
          elementClicked.classList.remove('favorite');
          
          const favoriteBooksIndex = favoriteBooks.indexOf(idBook);
          favoriteBooks.splice(favoriteBooksIndex,1);

        }else {

          elementClicked.classList.add('favorite');
          favoriteBooks.push(idBook);

        }
      }
    });
  };

  render();
  initActions();
}