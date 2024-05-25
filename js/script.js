// Script for adding, removing book entries
// and tracking pages
// TODO: Add DOM manipulation for removing entry
const bkGrid = document.querySelector(".bkGrid");

const btnAddBook = document.querySelector(".addBook");

const backdropID = document.getElementById("backdropID");
const modalNew = document.getElementById("modalNew");
const modalEdit = document.getElementById("modalEdit");
const modalDel = document.querySelector(".modalDelete");

const library = [];

// TODO: Add book card elements using bkCard.insertAdjacentHTML() method for a
// given object

// NOTE: Library interactions

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
    for (let i = 0; i < library.length; i++) {
        bkGrid.insertAdjacentElement('beforeend',
            '<div class="bkCard>"'
                + "<div class='bkInfo'>"
                + "<div class='bkTitle'>" + library[i].title + "</div>"
                + "<div class='bkAuthor'>" + library[i].author + "</div>"
                + "<div class='bkYear'>" + library[i].year + "</div>"
                + "<div class='bkPages'>" + library[i].pages + " pages</div>"
                + "<output></output>"
                + "<input class='bkPagesRead' type='range' min='0' max='" + library[i].pages + "' step='1' value='0' oninput='this.previousElementSibling.value = 'Pages read: ' + this.value'>"
                + "<div class='bkBtns'> <button class='editBk'>Edit</button> <button class='deleteBk'>X</button> </div>"
                + "</div>"
                + "</div>"
        );
    }
}
// NOTE: Button and modal interactions

btnAddBook.addEventListener("click", () => {
    toggleModal(modalNew);
});

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


