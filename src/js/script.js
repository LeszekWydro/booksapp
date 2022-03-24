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
      form: '.filters',
    },

  };

  const template = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML), 
  };

  class BookList {
    constructor() {
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.render();
      thisBookList.getElements();
      thisBookList.initActions();
    }

    initData(){
      this.data = dataSource.books;
      this.favoriteBooks = [];
      this.filters = [];
    }

    getElements(){
      const thisBookList = this;

      thisBookList.dom = {};
      thisBookList.dom.container = document.querySelector(select.list.bookList);
      thisBookList.dom.bookFilter = document.querySelector(select.all.form);
    }

    render(){
      const thisBookList = this;

      for (let book of dataSource.books){

        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;

        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;

        const generatedHTML = template.book(book);
      
        const bookDOM = utils.createDOMFromHTML(generatedHTML);

        const bookList = document.querySelector(select.list.bookList);
      
        bookList.appendChild(bookDOM);
      }
    }

    initActions(){
      const thisBookList = this;
    
      thisBookList.dom.container.addEventListener('dblclick', function(event){
        event.preventDefault();

        const elementClicked = event.target.offsetParent;

        console.log(elementClicked);

        if(elementClicked.classList.contains('book__image')){

          const idBook = elementClicked.getAttribute('data-id');
        
          if(thisBookList.favoriteBooks.includes(idBook)){
          
            elementClicked.classList.remove('favorite');
          
            const favoriteBooksIndex = thisBookList.favoriteBooks.indexOf(idBook);
            thisBookList.favoriteBooks.splice(favoriteBooksIndex,1);

          }else {

            elementClicked.classList.add('favorite');
            thisBookList.favoriteBooks.push(idBook);

          }
        }
      });

      thisBookList.dom.bookFilter.addEventListener('click', function(event){

        const clickedElement = event.target;

        if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter'){

          if (clickedElement.checked) {
            thisBookList.filters.push(clickedElement.value);
          }else{
            const filterIndex = thisBookList.filters.indexOf(clickedElement.value);
            thisBookList.filters.splice(filterIndex, 1);
          }
        }
        console.log('clickedElement', clickedElement);
        thisBookList.filterBooks ();
      });
    }
    
  
    filterBooks(){
      const thisBookList = this;

      for (let book of dataSource.books){

        const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

        let shouldBeHidden = false;
        for(const filter of thisBookList.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden === true){
          filterBook.classList.add('hidden');
        }else{
          filterBook.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){

      if(rating < 6){
        return  'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
    }
  }
  const app = new BookList();
  console.log('app', app);
}
