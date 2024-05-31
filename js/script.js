// Script for adding, removing book entries
// and tracking pages
const BKGRID = document.querySelector( ".bkGrid" );

const BTNADDBOOK = document.querySelector( ".addBook" );

const FORMNEWBOOK = document.getElementById( "formNewBook" );
const BTNSUBMIT = document.querySelector( ".bkSubmit" );

const BACKDROP = document.getElementById( "backdropID" );
const MODALNEW = document.getElementById( "modalNew" );
const MODALEDIT = document.getElementById( "modalEdit" );

// NOTE: Library interactions

const library = [];

class Book {
    constructor( title, author, year, pages, pagesRead = 0, isRead = false ) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.pagesRead = pagesRead;
        this.isRead = isRead;
    }
}

AddSampleBooks();

function AddSampleBooks() {
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
    RefreshLibrary();
}

function RefreshLibrary() {
    // Removes all displayed books first before redisplaying
    while ( BKGRID.firstChild ) {
        BKGRID.removeChild( BKGRID.lastChild );
    }

    for ( let i = 0; i < library.length; i++ ) {
       // HACK: Change div classes if isRead == true
        // allows persistent isRead indicator on page refresh
       let bkCardisReadHTML = "<div class='bkCard'";
       let bkRangeisReadHTML = "<input class='bkPagesRead'";

        if ( library[i].pagesRead == library[i].pages ) {
            bkCardisReadHTML = "<div class='bkCard isRead' ";
            bkRangeisReadHTML = "<input class='bkPagesRead isRead' ";
        }
        // This is pretty disgusting but I can't find any other way to do this
        // that fits my implementation that avoids innerHTML
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
        BKGRID.insertAdjacentHTML( 'beforeend', bookHTML );
    }
}

// NOTE: User input on range PagesRead
// HACK: Attaching event listeners to dynamic elements is annoying
// Using event listener on grid. Trigger if target = bkPagesRead

// Mouse
BKGRID.addEventListener( "mouseup", (e) => {
    if ( e.target.classList.contains('bkPagesRead') ) {
        UpdatePagesRead(e);
    }
});
// Keyboard
BKGRID.addEventListener( "keyup", (e) => {
    if ( e.target.classList.contains('bkPagesRead') ) {
        UpdatePagesRead(e);
    }
});
// Touchscreen
BKGRID.addEventListener( "ontouchend", (e) => {
    if ( e.target.classList.contains("bkPagesRead") ) {
        UpdatePagesRead(e);
    }
});

function UpdatePagesRead(e) {

    const inputPagesRead = e.target;
    const CARD = inputPagesRead.parentNode;
    const cardIndex = CARD.getAttribute( "index" );

    library[cardIndex].pagesRead = inputPagesRead.value;

    // Logic to check if isRead == true and changes style
    if ( library[cardIndex].pagesRead == library[cardIndex].pages ) {
        library[cardIndex].isRead = true;
        CARD.classList.add( "isRead" );
        inputPagesRead.classList.add( "isRead" );
    } else {  
        library[cardIndex].isRead = false;
        CARD.classList.remove("isRead");
        inputPagesRead.classList.remove("isRead");
    }
}

// NOTE: Modal and modal backdrop interactions

function ToggleModal( modal ) {
    BACKDROP.classList.toggle( "show" );
    modal.classList.toggle( "show" );
}

function CloseModal() {
    const MODAL = document.querySelector( ".modal" );
    const BACKDROP = document.querySelector( ".backdrop" );
    MODAL.classList.remove( "show" );
    BACKDROP.classList.remove( "show" );
}

BACKDROP.addEventListener( "click", () => {
    CloseModal(); 
});

// NOTE: Book creation (modals and buttons)

BTNADDBOOK.addEventListener( "click", () => {
    ToggleModal( MODALNEW );
});

BTNSUBMIT.addEventListener( "click", () => {
    CloseModal(); 
});

FORMNEWBOOK.addEventListener( "submit", (e) => { 
    CreateBook(e);
    // Reset form
    document.forms[1].reset()
});

function CreateBook( event ) {
    event.preventDefault();

    const bookData = new FormData( event.target );
    const title = bookData.get( 'bookTitle' );
    const author = bookData.get( 'bookAuthor' );
    const year = bookData.get( 'bookYear' );
    const pages = bookData.get( 'bookPages' );

    library.push( new Book( title, author, year, pages ) );
    RefreshLibrary();
}

// NOTE: Book deletion (buttons)
//
// Mouse
BKGRID.addEventListener( "mouseup", (e) => {
    if ( e.target.classList.contains('deleteBk') ) {
        DeleteBook(e);
    }
});
// Keyboard
BKGRID.addEventListener( "keyup", (e) => {
    if ( e.target.classList.contains('deleteBk') ) {
        DeleteBook(e);
    }
});
// Touchscreen
BKGRID.addEventListener( "ontouchend", (e) => {
    if ( e.target.classList.contains("deleteBk") ) {
        DeleteBook(e);
    }
});

function DeleteBook( e ) {

    const deleteButton = e.target;
    const CARD = deleteButton.parentNode.parentNode;
    const cardIndex = CARD.getAttribute( "index" );
    library.splice( cardIndex,1 );
    RefreshLibrary();

}
