const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleInputElement.value, 10) - SCALE_STEP, MIN_SCALE));
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleInputElement.value, 10) + SCALE_STEP, MAX_SCALE));
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export {resetScale};
