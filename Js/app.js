console.log("welcome to notes app");
showNotes();

// if user adds a note, add it to local storage
let addBtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addtxt');
    let addTitle = document.getElementById('addtitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = " ";
    notesObj.forEach(function (element, index) {
        html += `<div class=" noteCard my-2 mx-2 card" style="width: 18rem;">

        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class = card-text"> ${element.text}</p>
            <button id = "${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! use "Add a note" section above to add a note.`
    }
}

function deleteNote(index) {
    // console.log('I am deleteing', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
// search function
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();

    // console.log('fired', inputVal);
    let notecards = document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt)
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }

    })
})
/*
Further Features:
1.add title
2.mark imp note
3.separate notes by user 
4.sync with server and host
*/