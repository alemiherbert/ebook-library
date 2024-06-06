#!/usr/bin/node

const bookListContent = document.getElementById('book-list-content');
const modal = document.getElementById('enter-book');
const closeModal = document.getElementById('cancel');
const form = document.getElementById('book-entry-form');

function scrollContentLeft() {
    bookListContent.scrollBy(-72, 0);
}

function scrollContentRight() {
    bookListContent.scrollBy(72, 0);
}

function addBook() {
    modal.style.display = 'block';
}

closeModal.onclick = function() {
    modal.style.display = 'none';
    form.reset();
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    printBooks() {
        bookListContent.innerHTML = '';
        for (let book of this.books) {
            const output = `
                <div class="book">
                    <p>${book.title}</p>
                    <p>${book.author}</p>
                    <p>${book.pages} Pages</p>
                    <p>${book.read ? 'Read' : 'Not Read'}</p>
                </div>`;
            bookListContent.innerHTML += output;
        }
        bookListContent.innerHTML += `
            <div class="book" id="add-book">
                <button onclick="addBook()">+</button>
            </div>`;
    }
}

const library = new Library();

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const book = new Book(
        document.getElementById('book-title').value || "<Unknown>" ,
        document.getElementById('book-author').value || "<Unknown>",
        document.getElementById('book-pages').value || "0",
        true
    );
    library.addBook(book);
    form.reset();
    library.printBooks();
    modal.style.display = 'none';
});

const defaultBook = new Book('1984', 'George Orwell', 252, true);
library.addBook(defaultBook);
library.printBooks();
