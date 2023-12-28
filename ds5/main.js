'use strict';

const API_KEY = '50d2199a-42dc-447d-81ed-d68a443b697e'
const HOST = 'http://tasks-api.std-900.ist.mospolytech.ru/'

let btn = document.querySelector('#create');

function createItem(value){
    const list = document.querySelector(`#${value.status}-list`);
    const item = document.getElementById('task-template').cloneNode(true);
    item.querySelector('.task-name').textContent = value.name ? value.name : 'No name';
    item.dataset.id=value.id
    item.querySelector('.task-description').textContent = value.desc;
    item.classList.remove('d-none');
    list.append(item);
}

btn.addEventListener('click', function(event){
    let modal = event.target.closest('.modal');
    let name = modal.querySelector('#nameTask').value;
    let description = modal.querySelector('#textTask').value;
    let status = modal.querySelector('#select').value;

    localStorage.setItem(`task-${localStorage.length+1}`,JSON.stringify({name, description, status}));
    createTask(name, description, status);

    //createItem({id:`task-${localStorage.length+1}`,name, description, status})
});

const showShowModal = document.querySelector('#showModal');
showShowModal.addEventListener('show.bs.modal',showModal)

function showModal(event){
    let task = event.relatedTarget.closest('#task-template');
    let name = task.querySelector('.task-name').textContent;
    let description = task.querySelector('.task-description').textContent;
    event.target.querySelector('#showNameTask').value = name;
    event.target.querySelector('#showTextTask').value = description;
};


const showEditModal = document.querySelector('#editModal');
showEditModal.addEventListener('show.bs.modal',editModal)

function editModal(event){
    let task = event.relatedTarget.closest('#task-template');
    let name = task.querySelector('.task-name').textContent;
    let description = task.querySelector('.task-description').textContent;
    let id = task.dataset.id;
    let status = event.target.closest('.list-group li');
    event.target.querySelector('#editNameTask').value = name;
    event.target.querySelector('#editTextTask').value = description;
    const btn = event.target.querySelector('#save');
    btn.addEventListener('click', function(event) { 
        //const item = JSON.parse(localStorage.getItem(id));
        //item.name = document.getElementById('editNameTask').value;
        //item.description = document.getElementById('editTextTask').value;
        //localStorage.setItem(id, JSON.stringify(item));
        editTask(id, name, description, status) 
        //task.querySelector('.task-name').textContent = item.name;
        //task.querySelector('.task-description').textContent = item.desc;
    });
}

const showRemoveModal = document.querySelector('#removeModal');
showRemoveModal.addEventListener('show.bs.modal',removeModal)

function removeModal(event){
    let task = event.relatedTarget.closest('#task-template');
    let name = task.querySelector('.task-name').textContent;
    let id = task.dataset.id;
    event.target.querySelector('#removeNameTask').textContent= name;
    const btn = event.target.querySelector('#removeModalBtn');
    btn.addEventListener('click', function(event) {
        localStorage.removeItem(id);
        deleteTask(id);
        document.querySelector((`[data-id="${id}"]`)).remove();
        
    });
}

async function deleteTask(id) {
    console.log(`DELETING ${id}`)
    const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(
        `${HOST}/api/tasks/${id}?api_key=${API_KEY}`,
        requestOptions
    )
        .catch(error => console.log('error', error));
}

async function createTask(name, description, status) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("status", status);

    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch(
        `${HOST}/api/tasks?api_key=${API_KEY}`,
        requestOptions
    )
        .then(response => response.json())
        .then(data => createItem(data))
        .catch(error => console.log('error', error));

}

async function editTask(id, name, description, status) {
    console.log(id)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("status", status);

    const requestOptions = {
        method: 'PUT',
        body: formData,
        redirect: 'follow'
    };

    fetch(
        `${HOST}/api/tasks/${id}?api_key=${API_KEY}`,
        requestOptions
    )
        .then(response => console.log(response.json()))
        .catch(error => console.log('error', error));
}

async function getTasks() {
    await fetch(`${HOST}/api/tasks?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.tasks.map(item=>createItem(item)));
}

window.onload = function () { 
    for (let i = 0; i < localStorage.length; ++i) {
        let key = localStorage.key(i);
        if (key.startsWith('task')) {
            const value = JSON.parse(localStorage.getItem(key));
            createItem({id:key,...value});
        }
    }
    getTasks();
};
