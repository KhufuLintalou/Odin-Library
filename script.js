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
addBookToLibrary("book#2", "author#2", 210);
addBookToLibrary("book#3", "author#3", 120, "Read");
addBookToLibrary("book#4", "author#4", 520);

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
    cardBottom.appendChild(read);
    cardBottom.appendChild(pages);
  })
}

displayBook();

const newBookDialog = document.querySelector("#new-book-dialog");
const newBookButton = document.querySelector("#new-book-button");
const closeDialogButton = document.querySelector("#close");
const addBookButton = document.querySelector("#add");

newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
})

addBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  const inputtedAuthor = document.querySelector("#author");
  const inputtedTitle = document.querySelector("#title");
  const inputtedPage = document.querySelector("#page");
  const readStatus = document.querySelector("#read");
  
  if (readStatus.checked) {
    addBookToLibrary(inputtedAuthor.value, inputtedTitle.value, inputtedPage.value, readStatus.value);
  } else {
    addBookToLibrary(inputtedAuthor.value, inputtedTitle.value, inputtedPage.value);
  }

  displayBook();

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  })
  newBookDialog.close();
})

closeDialogButton.addEventListener("click", (event) => {
  event.preventDefault();
  newBookDialog.close();
})

