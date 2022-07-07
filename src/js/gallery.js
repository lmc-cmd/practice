`use strict`;
import { GalleryApi } from './galleryApi';
import createGalleryList from '../templates/gallery_card.hbs';

const galleryApi = new GalleryApi();

const formEl = document.querySelector(`.js-search-form`);
const listEl = document.querySelector('.gallery');
const moreBtnEl = document.querySelector('.js-load-more');

const onFormSubmit = e => {
  e.preventDefault();
  const searchQry = e.target.elements.search.value;
  galleryApi.searchQry = searchQry;
  galleryApi.fetchImages().then(data => {
    listEl.innerHTML = createGalleryList(data.hits);
    moreBtnEl.classList.remove(`is-hidden`);
  });
};

const onMoreBtnClick = e => {
  galleryApi.page += 1;
  galleryApi.fetchImages().then(data => {
    listEl.insertAdjacentHTML('beforeend', createGalleryList(data.hits));
  });
};

moreBtnEl.addEventListener(`click`, onMoreBtnClick);

formEl.addEventListener('submit', onFormSubmit);

console.log(galleryApi);
