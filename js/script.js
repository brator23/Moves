"use strict";

const NOTEBOOKS_API = "http://localhost:8000/notebooks";
const BOOKS_API = "http://localhost:8000/books";
const TRIFLE_API = "http://localhost:8000/trifle";

const userNoteList = document.querySelector('.notebooks__list');

function readNotes() {
	fetch(NOTEBOOKS_API).then(res => {
		return res.json();
	}).then(data => {
		userNoteList.innerHTML = "";
		data.forEach(element => {
			userNoteList.innerHTML += `
			 <li class="cart__item">
				<div class="cart__image-ibg"><img src="${element.photo}" alt></div>
				<div class="cart__title">${element.name}</div>
				<div class="cart__sub-title">${element.subTitle}</div>
				<button class="cart__button">СМОТРЕТЬ</button>
			</li>
			`
		});
	})
}
readNotes();

const userBooksList = document.querySelector('.books__list');

function readBooks() {
	fetch(BOOKS_API).then(res => {
		return res.json();
	}).then(data => {
		userBooksList.innerHTML = "";
		data.forEach(element => {
			userBooksList.innerHTML += `
			 <li class="cart__item">
				<div class="cart__image-ibg"><img src="${element.photo}" alt></div>
				<div class="cart__title">${element.name}</div>
				<div class="cart__sub-title">${element.subTitle}</div>
				<button class="cart__button">СМОТРЕТЬ</button>
			</li>
			`
		});
	})
}
readBooks();

const userTrifleList = document.querySelector('.trifle__list');

function readTrifle() {
	fetch(TRIFLE_API).then(res => {
		return res.json();
	}).then(data => {
		userTrifleList.innerHTML = "";
		data.forEach(element => {
			userTrifleList.innerHTML += `
			 <li class="cart__item">
				<div class="cart__image-ibg"><img src="${element.photo}" alt></div>
				<div class="cart__title">${element.name}</div>
				<div class="cart__sub-title">${element.subTitle}</div>
				<button class="cart__button">СМОТРЕТЬ</button>
			</li>
			`
		});
	})
}
readTrifle();