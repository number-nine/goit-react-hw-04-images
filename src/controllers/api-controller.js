import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '35449391-877499d7e02cc8d7dbb493e51',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
};

export default async function getPictures({ page, query: q, perPage: per_page }) {
  options.params = { ...options.params, page, q, per_page };
  try {
    const { data } = await axios.get('', options);
    return data;
  } catch (error) {
    Notify.info(`Remote data unavailable. ${error.message}. Please try again later.`);
  }
}
