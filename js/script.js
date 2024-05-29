// Script for adding, removing book entries
// and tracking pages
const bkGrid = document.querySelector(".bkGrid");

const btnAddBook = document.querySelector(".addBook");

const formNewBook = document.getElementById("formNewBook");
const btnSubmit = document.querySelector(".bkSubmit");

const backdropID = document.getElementById("backdropID");
const modalNew = document.getElementById("modalNew");
const modalEdit = document.getElementById("modalEdit");
const modalDel = document.querySelector(".modalDelete");

// NOTE: Library interactions

const library = [];

class Book {
    constructor(title, author, year, pages, pagesRead = 0, isRead = false) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.pagesRead = pagesRead;
        this.isRead = isRead;
    }
}

addSampleBooks();

function addSampleBooks() {
    library.push( new Book(
        "The C Programming Language 2nd ed.", 
        "Brian Kernighan & Dennis Ritchie", 
        "1988", 
        "238",
        "63"
    ) );

    library.push( new Book(
        "How to lie with maps 3rd ed.", 
        "Mark Monmonier", 
        "2018", 
        "231",
        "231",
        true
    ) );
    refreshLibrary();
}

function refreshLibrary() {
    // Removes all displayed books first before redisplaying
    while (bkGrid.firstChild) {
        bkGrid.removeChild(bkGrid.lastChild);
    }

    for (let i = 0; i < library.length; i++) {

       // HACK: this allows persistent isRead indicator on page refresh
       let bkCardisReadHTML = "<div class='bkCard'";
       let bkRangeisReadHTML = "<input class='bkPagesRead'";

        if (library[i].pagesRead == library[i].pages) {
            bkCardisReadHTML = "<div class='bkCard isRead' ";
            bkRangeisReadHTML = "<input class='bkPagesRead isRead' ";
        }
        // 
        
        let bookHTML =
            bkCardisReadHTML + "index='" + i + "'>"
                + "<div class='bkInfo'>"
                    + "<div class='bkTitle'>" + library[i].title + "</div>"
                    + "<div class='bkAuthor'>" + library[i].author + "</div>"
                    + "<div class='bkYear'>" + library[i].year + "</div>"
                    + "<div class='bkPages'>" + library[i].pages + " pages</div>"
                + "</div>"
                + "<output>Pages read: "+ library[i].pagesRead  + "</output>"
                + bkRangeisReadHTML + "type='range' min='0' max='" + library[i].pages + "' step='1' value='" + library[i].pagesRead + "' oninput='this.previousElementSibling.value = &#39;Pages read: &#39; + this.value' />"
                +"<div class='bkBtns'>"
                    + "<button class='bkBtn deleteBk'>Delete</button>"
                    + "<button class='bkBtn editBk'>Edit</button>" 
                + "</div>"
            + "</div>";
        bkGrid.insertAdjacentHTML('beforeend', bookHTML);
    }
}

// NOTE: Update pagesRead property when input range is used for a given card
// Change card style depending on whether it is read
// HACK: Attaching event listeners to dynamic elements is annoying
// Using event listener on grid. Trigger if target = bkPagesRead

// Mouse
bkGrid.addEventListener('mouseup', (e) => {
    if ( e.target.classList.contains('bkPagesRead') ) {
        updatePagesRead(e);
    }
});
// Keyboard
bkGrid.addEventListener('keyup', (e) => {
    if ( e.target.classList.contains('bkPagesRead') ) {
        updatePagesRead(e);
    }
});
// Touchscreen
bkGrid.addEventListener('ontouchend', (e) => {
    if ( e.target.classList.contains('bkPagesRead') ) {
        updatePagesRead(e);
    }
});

function updatePagesRead(e) {
    const inputPagesRead = e.target;
    const card = inputPagesRead.parentNode;
    const cardIndex = card.getAttribute("index");
    library[cardIndex].pagesRead = inputPagesRead.value;
    
    // change style to green if read by adding isRead class
    if (library[cardIndex].pagesRead == library[cardIndex].pages) {
        library[cardIndex].isRead = true;
        card.classList.add("isRead");
        inputPagesRead.classList.add("isRead");
    } 
    else {  
        library[cardIndex].isRead = false;
        card.classList.remove("isRead");
        inputPagesRead.classList.remove("isRead");
    }
}

// NOTE: Book creation (modals and buttons)

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

// NOTE: Book deletion (buttons)

// TODO: Write delete book function. 
// Account for library array and html.
function delBook(event) {
    event.preventDefault();
    
    
}
