import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

const loadEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

let storedBreeds = [];

loadEl.style.display = 'block';
errorEl.style.display = 'none';

fetchBreeds()
  .then(data => {
    storedBreeds = data;
    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');
      option.value = i;
      option.innerHTML = `${breed.name}`;
      selectEl.appendChild(option);
    }
  })
  .catch(err => console.log(err));

function onClick(e) {
  catInfoEl.innerHTML = '';
  const breedId = selectEl.value;
  loadEl.style.display = 'block';
  fetchCatByBreed(breedId)
    .then(cats => {
      loadEl.style.display = 'none';
      const catMarkup = createCatMarkup(cats);
      catInfoEl.insertAdjacentHTML('beforeend', catMarkup);
    })
    .catch(err => console.log(err));
}

function createCatMarkup(cats) {
  return cats
    .map(storedBreeds => {
      return `
        <img class="img" src="${storedBreeds.url}" width="360" />
        <div class="cat-box">
            <h1 class="title">${storedBreeds.breeds[0].name}</h1>
            <p class="desc">${storedBreeds.breeds[0].description}</p>
            <p class="temper"><b>Temperament: </b>${storedBreeds.breeds[0].temperament}</p>
            </div>
        `;
    })
    .join('');
}

selectEl.addEventListener('change', onClick);
