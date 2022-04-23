var cookieExpirationAdd = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
var cookieExpirationDel = '; expires=Thu, 01 Jan 1970 00:00:01 GMT';

var allNotes = [];

var noteSelected = '';
var noteDialogOpen = false;

var helpScreenText =
  'JSCN - JavaScript Cookie Notes\nCreate and edit notes saved in browser cookie.\n\nKeyboard shortcuts:\nAlt+a - add new note\nAlt+s - save note';

// ---------- Init ----------
restoreAll();
printAll();

// add event listener for keyboard shortcuts
// add new note: alt+a
// save: alt+s

function keyboardHandler(event) {
  if (event.altKey && event.key === 'a') {
    if (!noteDialogOpen) {
      openNoteDialog();
    }
  } else if (event.altKey && event.key === 's' && noteDialogOpen) {
    event.preventDefault();
    saveChanges();
  }
}

document.addEventListener('keydown', keyboardHandler);

// ---------- Page Control Functions ----------

function openNoteDialog() {
  document.getElementById('noteOverlay').style.height = '100%';
  document.getElementById('noteTextArea').value = '';
  document.getElementById('noteTextArea').focus();
  document.getElementById('noteDialog_DeleteBtn').style.color = '#20262e';
  document.getElementById('noteDialog_DeleteBtn').style.cursor = 'default';
  noteDialogOpen = true;
}

function closeDialog() {
  document.getElementById('noteOverlay').style.height = '0%';
  noteSelected = '';
  noteDialogOpen = false;
}

function saveChanges() {
  var value = document.getElementById('noteTextArea').value;
  if (noteSelected != '') {
    allNotes[noteSelected] = value;
  } else {
    allNotes.push(value);
  }
  noteSelected = '';
  printAll();
  saveAll();
  closeDialog();
}

function deleteNote() {
  if (noteSelected != '') {
    allNotes.splice(noteSelected, 1);
  }
  noteSelected = '';
  printAll();
  saveAll();
  closeDialog();
}

function selectNote(caller) {
  noteDialogOpen = true;
  noteSelected = caller.id;
  document.getElementById('noteOverlay').style.height = '100%';
  document.getElementById('noteDialog_DeleteBtn').style.color = '#5ee084';
  document.getElementById('noteDialog_DeleteBtn').style.cursor = 'pointer';
  document.getElementById('noteDialog_SaveBtn').style.color = '#5ee084';
  document.getElementById('noteDialog_SaveBtn').style.cursor = 'pointer';
  document.getElementById('noteTextArea').value =
    document.getElementById(noteSelected).innerHTML;
  document.getElementById('noteTextArea').focus();
}

function openHelpScreen() {
  document.getElementById('noteOverlay').style.height = '100%';
  document.getElementById('noteTextArea').value = helpScreenText;
  document.getElementById('noteDialog_DeleteBtn').style.color = '#20262e';
  document.getElementById('noteDialog_DeleteBtn').style.cursor = 'default';
  document.getElementById('noteDialog_SaveBtn').style.color = '#20262e';
  document.getElementById('noteDialog_SaveBtn').style.cursor = 'default';
  noteDialogOpen = true;
}

// --------------------------------------------------------

// put all items from allNotes array in html div with ID notesWrapperDiv
function printAll() {
  var nWrap = document.getElementById('notesWrapperDiv');
  var allNotesHTML = '';
  for (var i = 0; i < allNotes.length; i++) {
    allNotesHTML +=
      '<div class="note" id="' + i + '" onclick="selectNote(this);">';
    allNotesHTML += allNotes[i] + '</div>';
  }
  nWrap.innerHTML = allNotesHTML;
  nWrap.style.display = 'block';
  if (allNotes.length == 0) {
    nWrap.style.display = 'none';
  }
  allNotesHTML = '';
}

// save all items from allNotes array in a cookie
function saveAll() {
  if (allNotes.length == 0) {
    deleteAllCookies();
    return;
  }
  var allNotesTemp = allNotes.slice();
  for (var i = 0; i < allNotesTemp.length; i++) {
    allNotesTemp[i] = encodeURIComponent(allNotesTemp[i]);
  }
  var saveString = btoa(allNotesTemp.toString());
  allNotesTemp = null;
  setCookie('jscn', saveString);
}

// restore cookie to allNotes array
function restoreAll() {
  var saveString = getCookieValue('jscn');
  if (saveString.length == 0) {
    return;
  }
  allNotes = atob(saveString).split(',');
  for (var i = 0; i < allNotes.length; i++) {
    allNotes[i] = decodeURIComponent(allNotes[i]);
  }
}

// ------------- Cookie functions -------------

function setCookie(cName, cValue) {
  document.cookie =
    cName + '=' + cValue + cookieExpirationAdd + ';SameSite=Strict';
}

function deleteCookie(cName) {
  document.cookie = cName + '=' + cookieExpirationDel;
}

function getCookieValue(cName) {
  var cArray = document.cookie.split(';');
  var cNameTmp = '';
  for (var i = 0; i < cArray.length; i++) {
    cNameTmp = cArray[i].trim().split('=')[0];
    if (cNameTmp === cName) {
      return cArray[i].trim().split('=')[1];
    }
  }
  return '';
}

function deleteAllCookies() {
  if (document.cookie != '') {
    var cArray = document.cookie.split(';');
    for (var i = 0; i < cArray.length; i++) {
      deleteCookie(cArray[i].trim().split('=')[0]);
    }
  }
}
