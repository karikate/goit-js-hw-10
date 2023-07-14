import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

const loadEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

loadEl.style.display = 'block';
errorEl.style.display = 'none';
selectEl.style.display = 'none';

function onErr(err) {
  loadEl.style.display = 'none';
  Notiflix.Notify.failure(errorEl.textContent);
}

fetchBreeds()
  .then(data => {
    const markup = data
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');

    selectEl.innerHTML = markup;
    selectEl.style.display = 'block';
    loadEl.style.display = 'none';
  })
  .catch(err => onErr(err));

function onClick(e) {
  catInfoEl.innerHTML = '';
  const breedId = selectEl.value;
  loadEl.style.display = 'block';
  fetchCatByBreed(breedId)
    .then(cats => {
      loadEl.style.display = 'none';
      errorEl.style.display = 'none';
      const catMarkup = createCatMarkup(cats);
      catInfoEl.insertAdjacentHTML('beforeend', catMarkup);
    })
    .catch(err => onErr(err));
}

function createCatMarkup(cats) {
  return cats
    .map(storedBreeds => {
      return `<div class="img-wrap" width="360">
        <img class="img" src="${storedBreeds.url}" width="360" />
        </div>
        <div class="info-wrap width="360">
            <h1 class="breed-cat">${storedBreeds.breeds[0].name}</h1>
            <p class="desc-cat">${storedBreeds.breeds[0].description}</p>
            <p class="temp-cat"><b>Temperament: </b>${storedBreeds.breeds[0].temperament}</p>
            </div>
        `;
    })
    .join('');
}

// catInfoEl.style.padding = '20px';
// selectEl.style.textAlign = 'center';
// selectEl.style.margin = '20px';
selectEl.addEventListener('change', onClick);
