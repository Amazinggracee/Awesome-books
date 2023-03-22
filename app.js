/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
const listOfBooks = document.querySelector('.book-list');

class Book {
  constructor(title, author, index) {
    this.title = title;
    this.author = author;
    this.index = index;
  }

  static displayBooks() {
    const books = Book.getBooks();
    books.forEach((book) => Book.addBookToList(book));
  }

  static addBookToList(book) {
    const library = document.querySelector('.library');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td> by ${book.author}</td> 
    <td><button class='remove'>
    remove
    </button></td>
   `;
    library.appendChild(row);
    const removeButton = row.querySelector('button');
    removeButton.addEventListener('click', (e) => {
      this.removeBook(book.index);
      this.deleteBooks(e.target);
    });
  }

  static addBook(book) {
    const books = this.getBooks();
    if (books.length === 0) {
      book.index = 0;
    } else {
      const lastIndex = books.slice(-1).pop().index;
      book.index = lastIndex + 1;
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteBooks(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.parentElement.remove();
    }
  }

const savebook = new StoreBook();
// Get input value
const getformInput = () => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  const insertbook = new Book(title.value, author.value);
  return insertbook;
};

// Display the list of books on the web page
let DisplayBooks = (index) => {
  let bgcolor = '';
  if (savebook.BookData.indexOf(index) % 2 !== 0) {
    bgcolor = '#fff';
  } else {
    bgcolor = '#ff99';
  }
  const newBook = document.createElement('div');
  newBook.classList.add('book-item');
  newBook.classList.add(bgcolor);
  newBook.setAttribute('id', index.bookid); newBook.innerHTML = `
 <p>${index.title} <br> written by ${index.author}</p> <hr>`;
  const removeBook = document.createElement('button');
  removeBook.innerHTML = 'Remove';
  removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
  newBook.appendChild(removeBook);
  listOfBooks.appendChild(newBook);
};

// Add Button
const addnewBook = document.querySelector('.add-btn');
addnewBook.addEventListener('click', () => {
  const item = getformInput();
  savebook.addBook(item);
});