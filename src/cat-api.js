const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = 'breeds';
const key =
  'live_6enHbLaUqnPinAN5wxTVnxWpOnswe09KExRR25z6rlXOC3FIDrmQbJP2vw57kNOO';

function fetchBreeds() {
  return fetch(`${BASE_URL}${ENDPOINT}?api_key=${key}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  fetch(`${BASE_URL}images/search?api_key=${key}&breed_ids=${breedId}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}

export { fetchBreeds, fetchCatByBreed };
