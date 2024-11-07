const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("book#1", "author#1", 345, "Read");
addBookToLibrary("book#2", "author#2", 210, "Haven't Read Yet");
addBookToLibrary("book#3", "author#3", 120, "Read");
addBookToLibrary("book#4", "author#4", 520, "Haven't Read Yet");

const cardContainer = document.querySelector(".book-container");

function displayBook() {
  const bookOnPage = Array.from(document.getElementsByClassName("book"));
  bookOnPage.forEach((book) => {
    book.remove();
  })
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    const cardTop = document.createElement("div");
    const cardBottom = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const read = document.createElement("div");
      
    card.className = "book";
    cardTop.className = "book-top";
    cardBottom.className = "book-bottom";
    title.className = "title";
    author.className = "author";
    pages.className = "pages";
    read.className = "read";
      
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read;

    cardContainer.appendChild(card);
    card.appendChild(cardTop);
    card.appendChild(cardBottom);
    cardTop.appendChild(title);
    cardTop.appendChild(author);
    cardBottom.appendChild(pages);
    cardBottom.appendChild(read);
  })
}

displayBook();