
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
      bookImg: '.book__image'
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

  new render();
}