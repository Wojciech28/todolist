let $todoInput; // miejsce gdzie uzytkownik wpisuje tresc 
let $alertInfo; // info o braku zadan / koniecznosci dodania 
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadan, tagi <ul></ul>
let $newTask; // przechowuje dodane li
let $toolsPanel;
let $completeBtn; 
let $editBtn;
let $deleteBtn;

let $popup; // pobrany popup
let $popupInfo; // alert w popupie, jak sie doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; // tekst wpisywany w inputa w popupie
let $addPopupBtn; // przycisk zatwierdz w popupie 
let $closeTodoBtn // przycisk do zamykania popupa 
let $idNumber = 0;  // 
let $allTasks;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents(); 
};

// pobieranie elementow
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn    = document.querySelector('.addBtn');
    $ulList    = document.querySelector('.todoList ul');

    $popup    = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel'); 
    $allTasks = $ulList.getElementsByTagName('li');

}

// nadajemy nasluchiwania
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click',addNewtask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click',changeTodo);
    $todoInput.addEventListener('keyup',enterCheck)
}


// Funkcje:






const addNewtask = () => {

    if($todoInput.value !== ''){
        $newTask = document.createElement('li');
        $idNumber++;
        $newTask.textContent= $todoInput.value; 
        $ulList.appendChild($newTask);
        $newTask.setAttribute('id',`todo-${$idNumber}`)
        $todoInput.value='';
        $alertInfo.textContent="";
        createToolsArea();
        
    }else{
        $alertInfo.textContent="You need to type the name of the task !";
        $alertInfo.style.color = "red";
    }
    
};

const enterCheck = () => {
    if(event.keyCode === 13){
        addNewtask();
    }
};




const createToolsArea = () => {
   
  

    $toolsPanel = document.createElement('div');
    $toolsPanel.classList.add('tools');

    $completeBtn = document.createElement('button');
    $completeBtn.classList.add('complete');
    $completeBtn.innerHTML = "<i class='fas fa-check'></i>";

    $editBtn = document.createElement('button');
    $editBtn.classList.add('edit');
    $editBtn.innerHTML="EDIT";

    $deleteBtn = document.createElement('button');
    $deleteBtn.classList.add('delete');
    $deleteBtn.innerHTML="<i class='fas fa-times'></i>";

    $newTask.appendChild($toolsPanel);

    $toolsPanel.appendChild($completeBtn);
    $toolsPanel.appendChild($editBtn);
    $toolsPanel.appendChild($deleteBtn);
   
   
}

const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete')){
       
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');

    }else if (e.target.closest('button').className === 'edit'){

        editTask(e);

    }else if (e.target.closest('button').className === 'delete'){

        deleteTask(e);

    }
    
}

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value= $editedTodo.firstChild.textContent;

    $popup.style.display='flex';


}

const changeTodo = () => {

    if($popupInput.value !== ''){
        $editedTodo.firstChild.textContent=$popupInput.value;
        $popup.style.display = 'none';

        $popupInfo.innerText='' ;
    }else{
        $popupInfo.innerText = 'You need to type the name of the task !'; 
        $popupInfo.style.color = 'red'; 

    }



}

const closePopup = () => {
    $popup.style.display='none';
    $popupInfo.innerText='' ;

}

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    
    if($allTasks.length === 0){
        $alertInfo.innerText = "You don't have any tasks";
    }
};

document.addEventListener('DOMContentLoaded', main);

