"use strict";

const addForm = document.querySelector('.add');
const updateForm = document.querySelector('.update');

document.addEventListener("click", popup);

function popup(e) {
	const targetElement = e.target;
	if (targetElement.closest('.admin__add')) {
		addForm.style = "display: block"
	}
	if (targetElement.closest('#close-image')) {
		addForm.style = "display: none";
	}
	if (targetElement.closest(".admin-items__edit")) {
		updateForm.style = "display: block";
	}
	if (targetElement.closest("#close-update")) {
		updateForm.style = "display: none";
	}
}

// ===============================

const NOTEBOOKS_API = "http://localhost:8000/notebooks";
const BOOKS_API = "http://localhost:8000/books";
const TRIFLE_API = "http://localhost:8000/trifle";

const nameInput = document.getElementById('name');
const subTitleInput = document.getElementById('subTitle');
const imageInput = document.getElementById('image');
const adminList = document.querySelector('.admin__items');

addForm.addEventListener("submit", function (e) {
	const nameArray = nameInput.value.trim().toLowerCase().split(' ');
	const subTitleArray = subTitleInput.value.trim().toLowerCase().split(' ');
	if (!nameInput.value.trim() || !subTitleInput.value.trim() || !imageInput.value.trim()) {
		alert("Заполните все поля!");
	} else {
		let obj = {
			name: nameInput.value,
			subTitle: subTitleInput.value,
			photo: imageInput.value
		};
		if (nameArray.includes("тетрадь") || subTitleArray.includes("тетрадь")) {
			postNotes(obj)
		}
		if (nameArray.includes("книга") || subTitleArray.includes("книга")) {
			postBooks(obj)
		}
		if (nameArray.includes("канцелярия") || subTitleArray.includes("канцелярия")) {
			postTrifle(obj)
		}
		nameInput.value = '';
		subTitleInput.value = '';
		imageInput.value = '';
		addForm.style = "display: none";
	}
	e.preventDefault();
});

function postNotes(notesObj) {
	fetch(NOTEBOOKS_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => readItems());
}

function postBooks(notesObj) {
	fetch(BOOKS_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => readItems());
}

function postTrifle(notesObj) {
	fetch(TRIFLE_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => readItems());
}

// ===============================

function readItems() {
	fetch(NOTEBOOKS_API).then(res => {
		return res.json();
	}).then(data => {
		adminList.innerHTML = "";
		data.forEach(element => {
			adminList.innerHTML += `
			<li class="admin-items__item">
				<div class="admin-items__image-ibg"><img src="${element.photo}" alt></div>
				<div class="admin-items__title">${element.title}</div>
				<div class="admin-items__sub-title">${element.subTitle}</div>
				<button class="admin-items__delete admin-button">Удалить</button>
				<button class="admin-items__edit admin-button">Изменить</button>
			</li>
			`
		});
	})
}
readItems();