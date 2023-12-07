const storedNotesData = JSON.parse(localStorage.getItem("notesData"));
const notes = storedNotesData ? storedNotesData.notes : [];
let activeUser;


function createNoteElement(note) {
   const noteElem = document.createElement('div');
   noteElem.classList.add('note-wrapper');
   let noteItems = ``;
   for (let i=0; i<note.items.length-1; i++){
      noteItems+=`<textarea type="text" spellcheck="false" class="note-item item-shadow" placeholder="Текст записки">${note.items[i]}</textarea>`
   }
   noteText = `
      <div class="note-title-wrapper flex justify-between align-center">
         <input type="text" class="note-title" maxlength="30" placeholder="Название записки" value="${note.title}">
         <button class="note-delete flex justify-center align-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="black"/>
            </svg>
         </button>
      </div>
      <div class="note-item-wrapper flex col gap-10-0">
      ${noteItems}
      <button class="note-item note-item-add item-shadow">Новая заметка</button>
      </div>
   `;
   noteElem.innerHTML = noteText;
   
   const noteItemAddBtn = noteElem.querySelector('.note-item-add');
   noteItemAddBtn.addEventListener('click', () => addNewTextArea(noteItemAddBtn));

   const deleteBtn = noteElem.querySelector('.note-delete');
   deleteBtn.addEventListener('click', () => deleteNoteElement(deleteBtn));

   return noteElem;
}

function deleteNoteElement(deleteBtn) {
   const index = deleteBtn.getAttribute('data-index');
   const noteWrapper = deleteBtn.closest('.note-wrapper');
   
   notes.splice(index, 1); // Remove the corresponding note from the notes array
   updateLocalStorage(); // Update localStorage after removing the note

   noteWrapper.remove(); // Remove the note-wrapper from the DOM
}

function addNewTextArea(btn) {
   const noteItemWrapper = btn.parentElement;
   const newTextArea = document.createElement('textarea');
   newTextArea.setAttribute('type', 'text');
   newTextArea.classList.add('note-item', 'item-shadow');
   newTextArea.setAttribute('spellcheck', 'false');
   newTextArea.setAttribute('placeholder', 'Текст записки');
   noteItemWrapper.insertBefore(newTextArea, btn);
   updateNotes();
   const input = document.querySelector('.note-item');
}

function updateNotes() {
   const noteElements = document.querySelectorAll('.note-wrapper');
   const updatedNotes = [];

   noteElements.forEach((noteElement) => {
      const title = noteElement.querySelector('.note-title').value;
      const items = [];

      const itemElements = noteElement.querySelectorAll('.note-item');
      itemElements.forEach((itemElement) => {
         items.push(itemElement.value);
      });

      const updatedNote = {
         by: 'darzhan',
         title,
         items,
      };

      updatedNotes.push(updatedNote); // Push each updated note directly
   });

   const filteredNotes = updatedNotes.filter((note) => note !== undefined);

   const notesData = filteredNotes.map((note) => ({
      title: note.title,
      items: note.items,
   }));

   localStorage.setItem('notesData', JSON.stringify({ notes: notesData }));

   updateNotesArray(filteredNotes);
}


function updateNotesArray(updatedNotes) {
   notes.splice(0, notes.length, ...updatedNotes);
   updateLocalStorage();
}

function updateLocalStorage() {
   localStorage.setItem("notesData", JSON.stringify({ notes }));
}

function addNote() {
   const newNote = {
      by: activeUser,
      title: '',
      items: ['']
   };
   notes.push(newNote);
   updateLocalStorage();
   const newNoteElem = createNoteElement(newNote);
   const notesContainer = document.querySelector('.wrapper-body');
   notesContainer.appendChild(newNoteElem);
   checkIfThereIsBgUrl();
}

function initializeEventListeners() {
   const addBtn = document.querySelector('.add-btn');
   addBtn.addEventListener('click', addNote);

   const notesContainer = document.querySelector('.wrapper-body');
   notesContainer.addEventListener('input', (event) => {
      const targetClassList = event.target.classList;
      if (targetClassList.contains('note-item') || targetClassList.contains('note-title')) {
         updateNotes();
      }
   });
}

function renderNotes() {
   const storedNotesData = JSON.parse(localStorage.getItem("notesData"));
   const notes = storedNotesData ? storedNotesData.notes : [];

   const notesContainer = document.querySelector('.wrapper-body');

   notes.forEach((note, index) => {
   const noteElem = createNoteElement(note, index); // Pass index to createNoteElement
   notesContainer.appendChild(noteElem);
});
   
   
   initializeEventListeners();
}
renderNotes();




















$('.change-background').on('click', function(){
   $('.customize-wrapper').fadeIn(100);
});
$('.bgselect-close').on('click', function(){
   $('.customize-wrapper').fadeOut(100);
});
$('.bgselect-photo').on('click', function (){
   $('.bgselect-photo-container').fadeIn(200);
   $('.bgselect-color-container').hide();
});
$('.bgselect-color').on('click', function (){
   $('.bgselect-color-container').fadeIn(200);
   $('.bgselect-photo-container').hide();
});
// bg selector
$('.bgselect-submit').on('click', function (){
   localStorage.setItem('bg-url', $('.bgselect-input').val());
   window.location.href = "";
});

function checkIfThereIsBgUrl(){
   if(localStorage.getItem('bg-url')){
      $('.app').css({
         background: `url('${localStorage.getItem('bg-url')}') no-repeat`,
         'background-position': 'center',
         'background-size': 'cover',
      });
      $('.nav, .note-wrapper').css({
         background: `#ffffff90`,
         border: `1px solid #ffffff50`
      });
   } else {
      $('.app').css({
         background: `var(--'${localStorage.getItem('bg-color')});`
      })
   }
}
checkIfThereIsBgUrl();



function setBgColor(){
   if(!localStorage.getItem('bg-url') && localStorage.getItem('bg-color')){
      $('.app').css({
         'background-color': localStorage.getItem('bg-color')
      })
   }
}
setBgColor();
function showDarkOpacity(){
   if(localStorage.getItem('bg-url')){
      $('.dark-opacity').show();
   }
}
showDarkOpacity();

$('.bgselect-color-button').on('click', function(){
   const bgColor = $(this).attr('data-bgcolor');
   localStorage.setItem('bg-url', '');
   localStorage.setItem('bg-color', bgColor);
   $('.app').css('background-color', `--${bgColor}`);
   setBgColor();
});
