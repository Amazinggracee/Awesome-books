/* eslint-disable no-restricted-globals */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
const listOfBooks = document.querySelector('.book-list');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookid = Math.random().toFixed(1);
  }
}

class StoreBook {
  constructor() {
    // Array of book items
    this.BookData = [];
  }

  // New books
  addBook = (newbook) => {
    this.BookData.push(newbook);
    localStorage.setItem('AllBooks', JSON.stringify(this.BookData));
    DisplayBooks(newbook);
  };

  // Remove book from the list
  removeBook = (bookid) => {
    const deleteBook = document.getElementById(bookid);
    deleteBook.remove();
    this.BookData = this.BookData.filter((x) => x.bookid !== bookid);
    localStorage.setItem('AllBooks', JSON.stringify(this.BookData));
  };
}

const savebook = new StoreBook();
const title = document.querySelector('.title');
const author = document.querySelector('.author');
// Get input value
const getformInput = () => {
  const insertbook = new Book(title.value, author.value);
  return insertbook;
};

// Display the list of books on the web page
let DisplayBooks = (index) => {
  let bgcolor = '';
  if (savebook.BookData.indexOf(index) % 2 !== 0) {
    bgcolor = '#fff';
  } else {
    bgcolor = '#d3d3d3';
  }
  const newBook = document.createElement('div');
  newBook.classList.add('book-item');
  newBook.style.backgroundColor = bgcolor;
  newBook.setAttribute('id', index.bookid);
  newBook.innerHTML = `
 <p>Title: ${index.title} by Author: ${index.author}</p> <br>`;
  const removeBook = document.createElement('button');
  removeBook.innerHTML = 'Remove';
  removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
  newBook.appendChild(removeBook);
  listOfBooks.appendChild(newBook);
};

// Add Button
const addnewBook = document.querySelector('.add-btn');
addnewBook.addEventListener('click', (e) => {
  if (title.value === '' || author.value === '') {
    e.preventDefault();
  } else {
    const item = getformInput();
    savebook.addBook(item);
  }
});

window.onload = () => {
  savebook.BookData = JSON.parse(localStorage.getItem('AllBooks' || '[]'));
  if (savebook.BookData === null) {
    savebook.BookData = [];
    return;
  }
  savebook.BookData.forEach((item) => DisplayBooks(item));
};
