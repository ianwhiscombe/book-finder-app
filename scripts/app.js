// Class with constructor to create instance of a book

class Book {
    constructor(title, author, genre, location, rating = 'Not read', id) {
        if (!title) {
            throw new Error(`No book title provided, received: ${title}`);
        }
        if (typeof title !== 'string') {
            throw new Error(`Title should be a string, received: ${title}`);
        }
        this.title = title;

        if (!author) {
            throw new Error(`No author name provided, received: ${author}`);
        }
        if (typeof author !== 'string') {
            throw new Error(`Author name should be a string, received: ${author}`);
        }
        this.author = author;

        if (!genre) {
            throw new Error(`No genre provided, received: ${genre}`);
        }
        if (typeof genre !== 'string') {
            throw new Error(`Genre should be a string, received: ${genre}`);
        }
        this.genre = genre;

        if (!location) {
            throw new Error(`No location provided, received: ${location}`);
        }
        if (typeof location !== 'string') {
            throw new Error(`Location should be a string, received: ${location}`);
        }
        this.location = location;
        
        this.rating = rating;
        this.hasBeenRead = rating != null;

        this.id = id;
    }
}

// Class for book finder app

class BookFinderApp {
    
    constructor(libraryDataArray) {
        
        if (!libraryDataArray) {
            throw new Error(`No library provided, received: ${library}`);
        }
        if (!Array.isArray(libraryDataArray)) {
            throw new Error(`Library must be an array, received: ${library}`);
        }
        
        this.library = [];

        for (const bookData of libraryDataArray) {
            this.library.push(new Book(
                bookData.title,
                bookData.author,
                bookData.genre,
                bookData.location,
                bookData.rating,
                bookData.id
            ));
        }
    };

    // CRUD methods

    // Add (create) a book. 

    addBook(bookData) {
        if(!bookData) {
            throw new Error(`No data provided to addBook, received: ${bookData}`);
        }
        
        const newBook = new Book(
            bookData.title,
            bookData.author,
            bookData.genre,
            bookData.location,
            bookData.rating
        );
        this.library.push(newBook);
        return newBook;
    }

    // Find (read) a book 

    // get the index of the book that exists with supplied title for getBook method to use.
    getBookIndex(title) {
        if (!title) {
            throw new Error(`No book title provided, received: ${title}`);
        }
        if (typeof title !== 'string') {
            throw new Error(`The book title provided to getBookIndex should be a string, received: ${title}`);
        }
        const index = this.library.findIndex((book) => {
            return book.title === title;
        });
        
        if (!~index) {
            log(`Book with title of ${title} was not found`);
        }
        return index;
        
    }

    // find specific book using title to search.
    getBook(title) {
        const index = this.getBookIndex(title);
        if (!~index) {
            return null;
        }
        const targetBook = this.library[index];
        return targetBook;
    }

    // Amend (update) a book's rating or location.

    updateBook(title, field, value) {
        if (!field) {
            throw new Error(`A field to amend must be provided to updateBook, received: ${field}`);         
        }
        if (field === 'location' && typeof value !== 'string') {
            throw new Error(`Location must be a string, received: ${location}`);
        }
        if (field === "rating" && typeof field === "number" && !targetBook.hasBeenRead) {
            targetBook.hasBeenRead = true;
        }
        if (field === 'title' || field === 'author' || field === 'genre') {
            throw new Error(`You cannot change the ${field} of a book.`);
        }
        if (!value) {
            throw new Error(`A value must be provided to update any fields. Received: ${value}`);
        }
        
        const targetBook = this.getBook(title);
        
        if (!targetBook) {
            throw new Error(`Book not found, received ${title}`);
        }
        targetBook[field] = value;
        return targetBook;
    }

    // Remove (delete) a book from the library.
    removeBook(title) {
        if (!title) {
            throw new Error(`No book title provided, received: ${title}`);
        }
        
        const index = this.getBookIndex(title);
        
        if (!~index) {
            throw new Error(`Book title not found, received: ${title}`);
        }
        
        return this.library.splice(index, 1);
    }
}

// Some initial data to turn into books

const books = [
    {
        title: 'I am Legend',
        author: 'Richard Matheson',
        genre: 'Horror',
        location: 'Top Floor',
        rating: 5,
        id: 11
    },
    {
        title: 'Game of Thrones',
        author: 'George RR Martin',
        genre: 'Fantasy',
        location: 'Top Floor',
        rating: 4,
        id: 12
    },
    {
        title: 'The Pragmatic Programmer',
        author: 'David Thomas & Andrew Hunt',
        genre: 'Education',
        location: 'Study',
        rating: 4,
        id: 13
    },
    {
        title: 'Take Your Eye Off the Ball',
        author: 'Pat Kirwan',
        genre: 'Sport',
        location: 'Landing',
        rating: 5,
        id: 14
    },
    {
        title: 'Bring Up the Bodies',
        author: 'Hilary Mantel',
        genre: 'Historical Fiction',
        location: 'Lounge',
        rating: 3,
        id: 15
    }
];

// * UI functions

// create an instance of the app using the array of books
const myBookFinderApp = new BookFinderApp(books);

const listMount = document.getElementById("library-list-mount");

// display books

function render(library = [], ordered = false, insertionPoint = listMount) {
    
    insertionPoint.innerHTML = "";
    let displayElement = null;

    if (library.length) {
        const listType = ordered ? "ol" : "ul";
        const list = document.createElement(listType);
        list.classList.add("list-group");

        for (const book of library) {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "book-item", "shadow-sm", "p-3", "mb-5", "rounded");
            li.draggable = true;
            li.id = `${book.id}`
            li.setAttribute("ondragstart", "onDragStart(event);")
            li.setAttribute("ondragend", "onDragEnd(event);")
            li.innerHTML = `
            <i class="fas fa-book"></i>
            <span class="title">${book.title}</span><br>
            <i class="fas fa-user"></i>
            <span class="author">'${book.author}'</span><br>
            <i class="fas fa-theater-masks"></i>
            <span class="genre">${book.genre}</span><br>
            <i class="far fa-compass"></i>
            <span class="location">${book.location}</span><br>
            <i class="far fa-star"></i>
            <span class="rating">${book.rating}</span>
            <div class="controls">
                <button class="update btn btn-outline-warning" onclick="window.location.href = '#add-edit';" data-id="${book.title}">
                    <i class="fas fa-edit"></i>
                    <span class="sr-only">Update</span>
                </button>
                <button class="delete btn btn-outline-danger" data-id="${book.title}">
                    <i class="fas fa-trash"></i>
                    <span class="sr-only">Delete</span>
                </button>
            </div>`;
            list.append(li);
        }
        displayElement = list;
    } else {
        const noBooksMessage = document.createElement("p");
        noBooksMessage.innerHTML = `<span>Your library is empty :( <a class="text-primary" href="https://www.goodreads.com">Get inspired!</a></span>`

        displayElement = noBooksMessage;    
    }
    insertionPoint.append(displayElement);

    

} 

render(myBookFinderApp.library);

// Drag and Drop 

onDragStart = (event) => {
    
    event
    .dataTransfer
    .setData('text/plain', event.target.id);
    
    event
    .currentTarget
    .style
    .border = 'dashed rgb(0,123,255)'
}

onDragEnd = (event) => {
    event
    .currentTarget
    .style
    .border = '1px solid rgba(0,0,0,.125)'
}

onDragOver = (event) => {
    event.preventDefault();
    
    event
    .currentTarget
    .style
    .border = 'dashed'

    event
    .currentTarget
    .style
    .height = '225px'
}

onDragLeave = (event) => {
    event
    .currentTarget
    .style
    .border = '1px dashed rgba(0,0,0,.125)'

    event
    .currentTarget
    .style
    .height = '150px'
}

onDrop = (event) => {
    
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const selectedTitle = draggableElement.getElementsByClassName('title');
    bookTitle = selectedTitle[0].innerHTML;
    const dropzone = event.target;
    dropzone.insertAdjacentElement('afterend', draggableElement);

    event
    .currentTarget
    .style
    .border = '1px dashed rgba(0,0,0,.125)'

    event
    .currentTarget
    .style
    .height = '150px'

    event
    .dataTransfer
    .clearData();

    GrowlNotification.notify({
        title: 'Success!',
        description: `${bookTitle} has been added to your reading list`,
        type: 'success',
        position: 'top-right',
        closeTimeout: 2300
    })
}


// Add a new book to the library 

const editForm = document.forms["edit-form"];
const modeDisplayNodes = document.querySelectorAll(".mode");

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { mode } = editForm.dataset;
    
    const formData = new FormData(editForm);

    const data = Object.fromEntries(formData);

    if (mode === "Add") {
        myBookFinderApp.addBook(data);
        GrowlNotification.notify({
            title: 'Success!',
            description: `${data.title} has been added to your library`,
            type: 'success',
            position: 'top-right',
            closeTimeout: 2300
        });
    } else if (mode === "Update") {
        const id = data.title;
        const index = myBookFinderApp.getBookIndex(id);
        const updatedBook = new Book(
            data.title,
            data.author,
            data.genre,
            data.location,
            data.rating
        );
        myBookFinderApp.library.splice(index, 1, updatedBook);
        GrowlNotification.notify({
            title: 'Success!',
            description: `${data.title} has been updated.`,
            type: 'success',
            position: 'top-right',
            closeTimeout: 2300
        });
    } else {
        throw new Error("No mode given on form");    
    }
    render(myBookFinderApp.library);
    editForm.reset();
    const updateModeStr = "Add";
    editForm.dataset.mode = updateModeStr;
    for (const node of modeDisplayNodes) {
        node.textContent = updateModeStr;
    }
})

// Delete and Update functionality.

listMount.addEventListener("click", (e) => {
    const evtTarget = e.target;
    const updateBtn = evtTarget.closest("button.update");
    const deleteBtn = evtTarget.closest("button.delete");

    if (deleteBtn) {
        const { id } = deleteBtn.dataset;

        myBookFinderApp.removeBook(id);

        if (!myBookFinderApp.library.length) {
            render(myBookFinderApp.library);
        } else {
            const li = deleteBtn.closest("li.list-group-item");
            li.remove();
            GrowlNotification.notify({
                title: 'Success!',
                description: `${id} has been deleted from your library.`,
                type: 'success',
                position: 'top-right',
                closeTimeout: 2300
            });
        }

    } else if (updateBtn) {
        const { id } = updateBtn.dataset;
        const book = myBookFinderApp.getBook(id);
        populate(editForm, book);
        const updateModeStr = "Update";
        editForm.dataset.mode = updateModeStr;
        
        for (const node of modeDisplayNodes) {
            node.textContent = updateModeStr;
        }
    } else {
        return;
    }
});
 
function populate(form, data) {
    for (const key in data) {
        if (!data.hasOwnProperty(key)) {
        continue;
    }

        let name = key;
        let value = data[key];

        if (!value && value !== 0) {
        value = "";
    }

        const element = form.elements[name];

        if (!element) {
        continue;
    }

        const type = element.type || element[0].type;

        switch (type) {
        case "checkbox": {
            const values = Array.isArray(value) ? value : [value];

            for (let j = 0, len = element.length; j < len; j += 1) {
            const thisCheckbox = element[j];
            if (values.includes(thisCheckbox.value)) {
                thisCheckbox.checked = true;
            }
        }
            break;
        }
        case "select-multiple": {
            const values = Array.isArray(value) ? value : [value];

            for (let k = 0, len = element.options.length; k < len; k += 1) {
            const thisOption = element.options[k];
            if (values.includes(thisOption.value)) {
                thisOption.selected = true;
            }
            }
            break;
        }

        default:
            element.value = value;
            break;
        }
    }
}





