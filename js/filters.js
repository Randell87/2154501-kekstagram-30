import { debounce } from './function';
import { renderGallery } from './gallery';

const MAX_RANDOM_FILTER = 10;

const filtersEl = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while(randomIndexList.length < max){
      const index = getRandomIndex(0, data.length);
      if(!randomIndexList.includes(index)){
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

let currentFilter = FilterEnum.DEFAULT;

const repaint = (event, filter, data) => {
  if(currentFilter !== filter){
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderGallery(filteredData);
    const currentActiveEl = filterForm.querySelector('.img-filters__button--active');
    currentActiveEl.classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};

const debounceRepained = debounce(repaint);

export const initFilter = (data) => {
  filtersEl.classList.remove('img-filters--inactive');
  defaultBtn.addEventListener('click', (event) => {
    debounceRepained(event, FilterEnum.DEFAULT, data);
  });
  randomBtn.addEventListener('click', (event) => {
    debounceRepained(event, FilterEnum.RANDOM, data);
  });
  discussedBtn.addEventListener('click', (event) => {
    debounceRepained(event, FilterEnum.DISCUSSED, data);
  });
};
