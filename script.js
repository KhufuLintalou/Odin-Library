const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
}

addBookToLibrary("book#1", "author#1", 123, true);
addBookToLibrary("book#2", "author#2", 123, false);
addBookToLibrary("book#3", "author#3", 123, false);
addBookToLibrary("book#4", "author#4", 123, true);