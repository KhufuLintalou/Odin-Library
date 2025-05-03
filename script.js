const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    if (this.read == "Read") {
      this.read = "";
    } else {
      this.read = "Read";
    }
  }
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
  const bookOnPage = document.querySelectorAll(".book");
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

    if (read.textContent == "") {
      read.style.backgroundColor = "rgb(0, 0, 0, 0)";
    }

    card.dataset.indexNumber = myLibrary.indexOf(book);

    cardContainer.appendChild(card);
    card.appendChild(cardTop);
    card.appendChild(cardBottom);
    cardTop.appendChild(title);
    cardTop.appendChild(author);
    cardBottom.appendChild(read);
    cardBottom.appendChild(pages);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "book-button-container";
    card.appendChild(buttonContainer);

    const removeButton = document.createElement("button");
    removeButton.className = "remove";
    removeButton.textContent = "Remove"
    buttonContainer.appendChild(removeButton);

    const readStatusButton = document.createElement("button");
    readStatusButton.className = "read-button";
    readStatusButton.textContent = "Read";
    buttonContainer.appendChild(readStatusButton);
  })
}

displayBook();

const newBookDialog = document.querySelector("#new-book-dialog");
const newBookButton = document.querySelector("#new-book-button");
const closeDialogButton = document.querySelector("#close");
const addBookButton = document.querySelector("#add");

const inputtedAuthor = document.querySelector("#author");
const inputtedTitle = document.querySelector("#title");
const inputtedPage = document.querySelector("#page");
const readStatus = document.querySelector("#read");
const inputs = document.querySelectorAll("input");

newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
})

addBookButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (inputtedAuthor.value == "" || inputtedTitle.value == "" || inputtedPage.value == "") {
    inputs.forEach((input) => {
      if (!input.classList.contains("invalid") || !input.classList.contains("valid")) {
        input.classList.add("invalid");
      }

      newBookDialog.classList.add("error");
    })
  } else if (readStatus.checked) {
    addBookToLibrary(inputtedTitle.value, inputtedAuthor.value, inputtedPage.value, "Read");
    inputs.forEach((input) => {
      input.value = "";
    })
    newBookDialog.close();
  } else {
    addBookToLibrary(inputtedTitle.value, inputtedAuthor.value, inputtedPage.value);
    inputs.forEach((input) => {
      input.value = "";
    })
    newBookDialog.close();
  }

  displayBook();
})

closeDialogButton.addEventListener("click", (event) => {
  event.preventDefault();
  newBookDialog.close();
})

cardContainer.addEventListener("click", (event) => {
  if (event.target.className == "remove") {
    let removeButton = event.target;
    let book = removeButton.parentElement.parentElement;
    // "removeButton.parentElement" is the "book-button-container" and its .parentElement is the "book" element it is inside of.

    myLibrary.splice(book.dataset.indexNumber, 1);

    displayBook();
  }

  if (event.target.className == "read-button") {
    let readStatusButton = event.target;
    let book = readStatusButton.parentElement.parentElement;

    myLibrary[book.dataset.indexNumber].changeReadStatus();

    let bookReadStatus = document.querySelectorAll(".read");
    bookReadStatus.forEach((readStatus) => {
      if (book == readStatus.parentElement.parentElement) {
        if (readStatus.textContent != "Read") {
          readStatus.textContent = "Read";
          readStatus.style.backgroundColor = "rgb(1, 163, 238)";
        } else {
          readStatus.textContent = "";
          readStatus.style.backgroundColor = "rgb(0, 0, 0, 0)";
        }
      }
    })
  }
})

function setInputValidity(input) {
  if (input.validity.valueMissing) {
    input.classList.remove("valid");
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
    input.classList.add("valid");
  }
}

newBookDialog.addEventListener("input", (event) => {
  if (event.target.tagName === "INPUT") {
    setInputValidity(event.target);
  }
})

