// Script for adding, removing book entries
// and tracking pages
// TODO: Add DOM manipulation for removing entry
const bkGrid = document.querySelector(".bkGrid");

const formNewBook = document.getElementById("formNewBook");
const btnAddBook = document.querySelector(".addBook");
const btnSubmit = document.querySelector(".bkSubmit");

const backdropID = document.getElementById("backdropID");
const modalNew = document.getElementById("modalNew");
const modalEdit = document.getElementById("modalEdit");
const modalDel = document.querySelector(".modalDelete");

// NOTE: Library interactions

const library = [];
class Book {
    constructor(title, author, year, pages) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
    }
}

// Add book card html elements onto grid
function refreshLibrary() {
    // TODO: Fix bug with duplicated entries. Need to delete all entries first
    delAllDisplayedBooks();
    for (let i = 0; i < library.length; i++) {
        let bookHTML =
            "<div class='bkCard'>"
                    + "<div class='bkInfo' index = '" + i + "'>"
                        + "<div class='bkTitle'>" + library[i].title + "</div>"
                        + "<div class='bkAuthor'>" + library[i].author + "</div>"
                        + "<div class='bkYear'>" + library[i].year + "</div>"
                        + "<div class='bkPages'>" + library[i].pages + " pages</div>"
                    + "</div>"
                    + "<output>Pages read:</output>"
                    + "<input class='bkPagesRead' type='range' min='0' max='" + library[i].pages + "' step='1' value='0' oninput='this.previousElementSibling.value = &#39;Pages read: &#39; + this.value' />"
                    +"<div class='bkBtns'>"
                        + "<button class='editBk'>Edit</button>" 
                        + "<button class='deleteBk'>X</button>"
                    + "</div>"
                + "</div>";
        bkGrid.insertAdjacentHTML('beforeend', bookHTML);
    }
}
// NOTE: Button and modal interactions

btnAddBook.addEventListener("click", () => {
    toggleModal(modalNew);
});

btnSubmit.addEventListener("click", () => {
    closeModal(); 
});

formNewBook.addEventListener('submit', createBook);

function createBook(event) {
    event.preventDefault();
    const bookData = new FormData(event.target);
    const title = bookData.get('bookTitle');
    const author = bookData.get('bookAuthor');
    const year = bookData.get('bookYear');
    const pages = bookData.get('bookPages');
    library.push( new Book(title, author, year, pages) );
    refreshLibrary();
}

// TODO: Write delete book function. Account for library array and html
function delBook(event) {
    event.preventDefault();

}

function delAllDisplayedBooks() {
    while (bkGrid.firstChild) {
        bkGrid.removeChild(bkGrid.lastChild);
    }
}

backdropID.addEventListener("click", () => {
    closeModal(); 
});

function closeModal() {
    const modal = document.querySelector(".modal");
    const backdrop = document.querySelector(".backdrop");
    modal.classList.remove("show");
    backdrop.classList.remove("show");
}

function toggleModal(modal) {
    const backdrop = document.querySelector(".backdrop");
    backdrop.classList.toggle("show");
    modal.classList.toggle("show");
}
