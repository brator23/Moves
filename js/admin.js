"use strict";

const addForm = document.querySelector('.add');
const updateForm = document.querySelector('.update');

const nameInput = document.getElementById('name');
const subTitleInput = document.getElementById('subTitle');
const imageInput = document.getElementById('image');

const updateName = document.querySelector('#updateName');
const updateSubTitle = document.querySelector('#updateSubTitle');
const updatePhoto = document.querySelector('#updateImage');

document.addEventListener("click", popup);

function popup(e) {
	const targetElement = e.target;
	if (targetElement.closest('.admin__add')) {
		addForm.style = "display: block"
	}
	if (targetElement.closest('#close-image')) {
		addForm.style = "display: none";
		nameInput.value = '';
		subTitleInput.value = '';
		imageInput.value = '';
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

const notesList = document.querySelector('.notes');
const booksList = document.querySelector('.books');
const trifleList = document.querySelector('.trifle');

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

// ===============================CREATE

function postNotes(notesObj) {
	fetch(NOTEBOOKS_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => readNotes());
}

function postBooks(notesObj) {
	fetch(BOOKS_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => readBooks());
}

function postTrifle(notesObj) {
	fetch(TRIFLE_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => readTrifle());
}

// ===============================READ

function readNotes() {
	fetch(NOTEBOOKS_API).then(res => {
		return res.json();
	}).then(data => {
		notesList.innerHTML = "";
		data.forEach(element => {
			notesList.innerHTML += `
			<li class="admin-items__item">
				<div class="admin-items__image-ibg"><img src="${element.photo}" alt></div>
				<div class="admin-items__title">${element.name}</div>
				<div class="admin-items__sub-title">${element.subTitle}</div>
				<button class="admin-items__delete-note admin-button" id="${element.id}">Удалить</button>
				<button class="admin-items__edit-note admin-items__edit admin-button" id="${element.id}">Изменить</button>
			</li>
			`
		});
	})
}
readNotes();

function readBooks() {
	fetch(BOOKS_API).then(res => {
		return res.json();
	}).then(data => {
		booksList.innerHTML = "";
		data.forEach(element => {
			booksList.innerHTML += `
			<li class="admin-items__item" id="${element.id}">
				<div class="admin-items__image-ibg"><img src="${element.photo}" alt></div>
				<div class="admin-items__title">${element.name}</div>
				<div class="admin-items__sub-title">${element.subTitle}</div>
				<button class="admin-items__delete-books admin-button" id="${element.id}">Удалить</button>
				<button class="admin-items__edit-books admin-items__edit admin-button" id="${element.id}">Изменить</button>
			</li>
			`
		});
	})
}
readBooks();

function readTrifle() {
	fetch(TRIFLE_API).then(res => {
		return res.json();
	}).then(data => {
		trifleList.innerHTML = "";
		data.forEach(element => {
			trifleList.innerHTML += `
			<li class="admin-items__item" id="${element.id}">
				<div class="admin-items__image-ibg"><img src="${element.photo}" alt></div>
				<div class="admin-items__title">${element.name}</div>
				<div class="admin-items__sub-title">${element.subTitle}</div>
				<button class="admin-items__delete-trifle admin-button" id="${element.id}">Удалить</button>
				<button class="admin-items__edit-trifle admin-items__edit admin-button" id="${element.id}">Изменить</button>
			</li>
			`
		});
	})
}
readTrifle();

// ===============================DELETE

function deleteNotes() {
	document.addEventListener("click", function (e) {
		const ItemDeleteClass = e.target;
		if (ItemDeleteClass.closest(".admin-items__delete-note")) {
			let ItemId = ItemDeleteClass.id;
			fetch(`${NOTEBOOKS_API}/${ItemId}`, {
				method: "DELETE"
			})
				.then(res => res.json())
				.then(() => {
					readNotes();
				})
		}
	});
}
deleteNotes();

function deleteBooks() {
	document.addEventListener("click", function (e) {
		const ItemDeleteClass = e.target;
		if (ItemDeleteClass.closest(".admin-items__delete-books")) {
			let ItemId = ItemDeleteClass.id;
			fetch(`${BOOKS_API}/${ItemId}`, {
				method: "DELETE"
			})
				.then(res => res.json())
				.then(() => {
					readBooks();
				})
		}
	});
}
deleteBooks();

function deleteTrifle() {
	document.addEventListener("click", function (e) {
		const ItemDeleteClass = e.target;
		if (ItemDeleteClass.closest(".admin-items__delete-trifle")) {
			let ItemId = ItemDeleteClass.id;
			fetch(`${TRIFLE_API}/${ItemId}`, {
				method: "DELETE"
			})
				.then(res => res.json())
				.then(() => {
					readTrifle();
				})
		}
	});
}
deleteTrifle();

// ===============================EDIT

document.addEventListener("click", function (e) {
	const targetElement = e.target;
	const id = targetElement.id;
	if (targetElement.closest(".admin-items__edit-note")) {
		fetch(`${NOTEBOOKS_API}/${id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				updateName.value = data.name;
				updateSubTitle.value = data.subTitle;
				updatePhoto.value = data.photo;
			});
	} else if (targetElement.closest(".admin-items__edit-books")) {
		fetch(`${BOOKS_API}/${id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				updateName.value = data.name;
				updateSubTitle.value = data.subTitle;
				updatePhoto.value = data.photo;
			});
	} else if (targetElement.closest(".admin-items__edit-trifle")) {
		fetch(`${TRIFLE_API}/${id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				updateName.value = data.name;
				updateSubTitle.value = data.subTitle;
				updatePhoto.value = data.photo;
			});
	}
});

document.addEventListener("click", function (e) {
	const targetElement = e.target;
	const id = targetElement.id;
	updateForm.addEventListener("submit", function (e) {
		const nameNewArray = updateName.value.trim().toLowerCase().split(' ');
		const subNewTitleArray = updateSubTitle.value.trim().toLowerCase().split(' ');
		let updateObject = {
			name: updateName.value,
			subTitle: updateSubTitle.value,
			photo: updatePhoto.value,
		}
		if (nameNewArray.includes("тетрадь") || subNewTitleArray.includes("тетрадь")) {
			editNotes(updateObject, id)
		}
		if (nameNewArray.includes("книга") || subNewTitleArray.includes("книга")) {
			editBooks(updateObject, id)
		}
		if (nameNewArray.includes("канцелярия") || subNewTitleArray.includes("канцелярия")) {
			editTrifle(updateObject, id)
		}
		e.preventDefault();
	});
});

function editNotes(notesObj, id) {
	fetch(`${NOTEBOOKS_API}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => {
		readNotes();
		updateForm.style = "display: none"
	})
}

function editBooks(notesObj, id) {
	fetch(`${BOOKS_API}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => {
		readBooks();
		updateForm.style = "display: none"
	})
}

function editTrifle(notesObj, id) {
	fetch(`${TRIFLE_API}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(notesObj),
	}).then(() => {
		readTrifle();
		updateForm.style = "display: none"
	})
}