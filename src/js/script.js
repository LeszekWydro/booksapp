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
  const filters = [];


  const render = function(){

    for (let book of dataSource.books){

      const generatedHTML = template.book(book);
      
      const bookDOM = utils.createDOMFromHTML(generatedHTML);

      const bookList = document.querySelector(select.list.bookList);

      bookList.appendChild(bookDOM);
    }
  };

  const initActions = function(){

    const favoriteBooks = [];
    const container = document.querySelector(select.list.bookList);
    
    container.addEventListener('dblclick', function(event){
      event.preventDefault();

      const elementClicked = event.target.offsetParent;

      console.log(elementClicked);

      if(elementClicked.classList.contains('book__image')){

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

    const filters = [];
    const bookFilter = document.querySelector(select.all.form);

    bookFilter.addEventListener('click', function(event){

      const clickedElement = event.target;

      if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter'){

        if (clickedElement.checked) {
          filters.push(clickedElement.value);
        }else{
          const filterIndex = filters.indexOf(clickedElement.value);
          filters.splice(filterIndex, 1);
        }
      }
      console.log('clickedElement', clickedElement);
      filterBooks ();
    });
  };
    
  
  const filterBooks = function(){
    

    for (let book of dataSource.books){

      const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');

      let shouldBeHidden = false;
      for(const filter of filters){
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
  };
  render();
  initActions();
}

