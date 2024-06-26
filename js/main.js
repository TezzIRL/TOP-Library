const myTable = {
    rowSelected: NaN
};

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = function () {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, already read.`
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`
    }

    bookRead = function () {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
    }

    addBookToLibrary(newBook) {
        this.myLibrary.push(newBook);
    }

    removeBook(id) {
        this.myLibrary.splice(id, 1);
    }

    get Books() {
        return this.myLibrary;
    }

    getBook(id) {
        return this.myLibrary[id];
    }
}



const clearSelected = () => {
    const tableRows = document.querySelectorAll("tr");
    tableRows.forEach((element) => {
        element.classList.remove("selected");
    })
}

const updateTable = () => {
    const table = document.getElementsByClassName('table')[0];
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Already Read</th>
        </tr>`
    myLibrary.Books.forEach((element) => {
        table.innerHTML += `
                        <tr>
                            <td>${element.title}</td>
                            <td>${element.author}</td>
                            <td>${element.pages}</td>
                            <td>${element.read}</td>
                        </tr>`
    })

    const tableRows = document.querySelectorAll("tr");
    for (let i = 1; i < tableRows.length; i++) {
        tableRows[i].addEventListener("click", () => {
            myTable.rowSelected = i;
            clearSelected();
            tableRows[i].classList.add('selected');
        })
    }
}

addEventListener('load', () => {
    updateTable();
})

const hobbitBook = new Book("The Hobbit", "J.R.R Tolkein", "256", false);
const lotrBook = new Book("The Lord of The Rings", "J.R.R Tolkein", "350", true);
const eragonBook = new Book("Eragon", "Christopher Paolini", "487", true);

const myLibrary = new Library();

myLibrary.addBookToLibrary(hobbitBook);
myLibrary.addBookToLibrary(lotrBook);
myLibrary.addBookToLibrary(eragonBook);

const addBookBtn = document.getElementById('addBookBtn');
const submitBtn = document.getElementsByClassName('submitBtn')[0];
const cancelBtn = document.getElementsByClassName('cancelBtn')[0];

addBookBtn.addEventListener('click', () => {
    const form = document.getElementsByClassName('signupFrm')[0];
    form.classList.remove('hidden');
})

const validateForm = (inputs) => {
    if (!inputs[0].value || !inputs[1].value || !inputs[2].value) {
        return false;
    } return true;
}

const resetForm = (inputs) => {
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
    inputs[3].checked = false;
}

const hideForm = () => {
    const form = document.getElementsByClassName('signupFrm')[0];
    form.classList.add('hidden');
}

submitBtn.addEventListener('click', () => {
    const inputs = document.getElementById("book-submission-form").elements;
    if (!validateForm(inputs)) {
        alert("Please fill in the form or press cancel")
    } else {
        myLibrary.addBookToLibrary(new Book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked));
        updateTable();
        resetForm(inputs);
        hideForm();
    }
})

cancelBtn.addEventListener("click", () => {
    const inputs = document.getElementById("book-submission-form").elements;
    resetForm(inputs);
    hideForm();
})

const removeBookBtn = document.getElementById('removeBookBtn');

removeBookBtn.addEventListener("click", () => {
    if (!myTable.rowSelected) {
        return;
    }
    myLibrary.removeBook(myTable.rowSelected - 1);
    myTable.rowSelected = NaN;
    updateTable();
})

const changeReadStatusBtn = document.getElementById('readBookBtn');

changeReadStatusBtn.addEventListener('click', () => {
    if (!myTable.rowSelected) {
        return;
    }
    myLibrary.getBook([myTable.rowSelected - 1]).bookRead();
    myTable.rowSelected = NaN;
    updateTable();
})