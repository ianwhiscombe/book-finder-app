
const { log } = console;

// Class with constructor to create instance of a book

class Book {
    constructor(title, author, genre, location, rating = 'Not read') {

        log(arguments); // for debugging, to easily see the values passed to the constructor when the app class is executed.

        // Checks on values being passed.

        if (!title) {
            throw new Error(`No book title provided, received: ${title}`);
        }
        if (typeof title !== 'string') {
            throw new Error(`Title should be a string, received: ${title}`);
        }
        // assign passed value to title in this instance.
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
        // removed this check as the form element is a select so user can only choose the set values.
        // if (
        //     typeof rating !== "number" &&
        //     rating != null &&
        //     typeof rating !== "undefined") {
        //     throw new Error(
        //         `Rating should be a number from 0 to 5 or null, received: ${rating}`
        //     );
        // }
        this.rating = rating;
        this.hasBeenRead = rating != null;
    }
}

// Class for book finder app

class BookFinderApp {
    // receive an array of data to be turned into books 
    constructor(libraryDataArray) {
        // checking it was provided the library and then that it is an array.
        if (!libraryDataArray) {
            throw new Error(`No library provided, received: ${library}`);
        }
        if (!Array.isArray(libraryDataArray)) {
            throw new Error(`Library must be an array, received: ${library}`);
        }
        // creates an empty array to hold a list of all books.
        this.library = [];

        // put each piece of data into the app's library array that it receives by calling the Book class.
        for (const bookData of libraryDataArray) {
            this.library.push(new Book(
                bookData.title,
                bookData.author,
                bookData.genre,
                bookData.location,
                bookData.rating
            ));
        }
    };

    // CRUD methods (create, read, update, delete)

    // Add (create) a book. 

    addBook(bookData) {
        if(!bookData) {
            throw new Error(`No data provided to addBook, received: ${bookData}`);
        }
        // create new Book from the data, push into the apps array and then return the new book.
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

    // Find (read) a book (reveals book's location)

    // get the index of the book that exists with supplied title.
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
        // warns if no item with that title exists. 
        if (!~index) {
            log(`Book with title of ${title} was not found`);
        }
        return index;
        // getBook method will use the return from this method to take the book from the array.
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
        // this now updates the book.
        const targetBook = this.getBook(title);
        // this deals with not finding the book.
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

// Some initial data to turn into books (an array containing book objects).

const books = [
    {
        title: 'I am Legend',
        author: 'Richard Matheson',
        genre: 'Horror',
        location: 'Top Floor',
        rating: 5
    },
    {
        title: 'Game of Thrones',
        author: 'George RR Martin',
        genre: 'Fantasy',
        location: 'Top Floor',
        rating: 4
    },
    {
        title: 'The Pragmatic Programmer',
        author: 'David Thomas & Andrew Hunt',
        genre: 'Education',
        location: 'Study',
        rating: 4
    },
    {
        title: 'Take Your Eye Off the Ball',
        author: 'Pat Kirwan',
        genre: 'Sport',
        location: 'Landing',
        rating: 5
    },
    {
        title: 'Bring Up the Bodies',
        author: 'Hilary Mantel',
        genre: 'Historical Fiction',
        location: 'Lounge',
        rating: 3
    }
];

// * UI functions

// log the books array to test
log('books', books);
// create an instance of the app by executing the BookFinderApp function with the books array, assiging the result of that to a new variable called myBookFinderApp and then logging it to the console.
const myBookFinderApp = new BookFinderApp(books);
log(myBookFinderApp);



// assigning div with id library-list-mount to variable called listMount
const listMount = document.getElementById("library-list-mount");
log("listMount", listMount); //testing in console

// todo Create the render function to display all books in the library, (expand on this description once finished and I understand it).

function render(library = [], ordered = false, insertionPoint = listMount) {
    insertionPoint.innerHTML = "";
    let displayElement = null;
    // ! Q is the library.length condition in if statement checking that there is something in the library array (so if it returns false then the statement doesn't run)?
    if (library.length) {
        log("rendering list"); // testing
        const listType = ordered ? "ol" : "ul";
        const list = document.createElement(listType);
        list.classList.add("list-group");

        for (const book of library) {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "book-item", "shadow-sm", "p-3", "mb-5", "rounded");
            li.draggable = true;
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
        log("rendering no books"); //testing (or comment out all objects in the books array)
        const noBooksMessage = document.createElement("p");
        noBooksMessage.innerHTML = `<span>Your library is empty :( <a class="text-primary" href="https://www.goodreads.com">Get inspired!</a></span>`

        displayElement = noBooksMessage;    
    }
    insertionPoint.append(displayElement);
} 
// execute the render function, this calls the mybookFinderApp function and passes the books array in.
render(myBookFinderApp.library);

// Add a new book to the library functionality

// assigns the form named edit-form to a variable called editForm (.forms is a property of the document object that holds an array of all forms on the page)
const editForm = document.forms["edit-form"];
const modeDisplayNodes = document.querySelectorAll(".mode");

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { mode } = editForm.dataset;
    log("form mode", mode);//testing

    // ! Q. this if statement is stopping title from being passed when adding a new book, commenting it out fixes the problem. Should it be mode === "Update"??
    const formData = new FormData(editForm);
    if (mode === "Update") {
        // formData.delete("title");
    }

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
            // id,
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
    // this handles delegation using .closest to target the update and delete buttons that don't exist when the page is created.
    const evtTarget = e.target;
    const updateBtn = evtTarget.closest("button.update");
    const deleteBtn = evtTarget.closest("button.delete");

    if (deleteBtn) {
        log("delete");
        log(deleteBtn);
        const { id } = deleteBtn.dataset;
        log("here is delete id", id);

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
        log("update");
        log(updateBtn);

        const { id } = updateBtn.dataset;
        const book = myBookFinderApp.getBook(id);
        log("book to be updated", book);
        populate(editForm, book);
        const updateModeStr = "Update";
        editForm.dataset.mode = updateModeStr;
        
        for (const node of modeDisplayNodes) {
            node.textContent = updateModeStr;
        }
    } else {
        log("was neither");
        return;
    }
});


// Populate function taken from James' code. 
function populate(form, data) {
    // walk the object
    for (const key in data) {
      // if this is a system property then bail...
        if (!data.hasOwnProperty(key)) {
        continue;
    }

      // get key/value for inputs
        let name = key;
        let value = data[key];

      // Make any bad values an empty string
        if (!value && value !== 0) {
        value = "";
    }

      // try to find element in the form
        const element = form.elements[name];

      // If we can't then bail
        if (!element) {
        continue;
    }

      // see what type an element is to handle the process differently
        const type = element.type || element[0].type;

        switch (type) {
        case "checkbox": {
          // Here, value is an array of values to be spread across the checkboxes that make up this input. It's the value of the input as a whole, NOT the value of one checkbox.
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





