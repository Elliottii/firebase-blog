/**
 * Module for render blogpost form and blogpost.
 *
 * @module Post
 * @author Eeli Klemettilä
 */

'use strict';

import Firebase from './firebase';
import Location from './location';

/**
 * Render blogpost form.
 */
const renderForm = () => {
  const target = document.querySelector('#content');
  target.innerHTML = '';

  const postFormContainer = document.createElement('div');
  postFormContainer.id = 'new-post';
  postFormContainer.classList = 'container mt-2';

  const card = document.createElement('div');
  card.classList = 'card';

  const cardBody = document.createElement('div');
  cardBody.classList = 'card-body';

  const form = document.createElement('form');
  form.id = 'post-form';

  const header = document.createElement('h3');
  header.textContent = 'Uusi arvostelu';

  const restaurantLabel = document.createElement('label');
  restaurantLabel.classList = 'form-label';
  restaurantLabel.textContent = 'Ravintola';

  const restaurantHeader = document.createElement('input');
  restaurantHeader.id = 'restaurant';
  restaurantHeader.classList = 'form-control';
  restaurantHeader.type = 'text';

  const portionLabel = document.createElement('label');
  portionLabel.classList = 'form-label';
  portionLabel.textContent = 'Annos';

  const portionHeader = document.createElement('input');
  portionHeader.id = 'portion';
  portionHeader.classList = 'form-control';
  portionHeader.type = 'text';

  const locationLabel = document.createElement('label');
  locationLabel.classList = 'form-label';
  locationLabel.textContent = 'Sijainti';

  const locationField = document.createElement('select');
  locationField.id = 'location';
  locationField.classList = 'form-select';

  const ratingLabel = document.createElement('label');
  ratingLabel.classList = 'form-label';
  ratingLabel.textContent = 'Arvosana';

  const ratingField = document.createElement('select');
  ratingField.id = 'rating';
  ratingField.classList = 'form-select';

  const descriptionLabel = document.createElement('label');
  descriptionLabel.classList = 'form-label';
  descriptionLabel.textContent = 'Kuvaus';

  const description = document.createElement('textarea');
  description.id = 'description';
  description.classList = 'form-control';
  description.cols = '30';
  description.rows = '4';

  const fileInput = document.createElement('input');
  fileInput.id = 'image';
  fileInput.classList = 'form-control';
  fileInput.type = 'file';
  fileInput.accept = 'images/*';

  const uploadDiv = document.createElement('div');
  uploadDiv.classList = 'text-center';

  const uploadButton = document.createElement('button');
  uploadButton.id = 'uploadButton';
  uploadButton.classList = 'btn btn-success';
  uploadButton.textContent = 'Tallenna';
  uploadButton.type = 'button';

  for (let i = 0; i < Location.cities.length; i++) {
    const option = document.createElement('option');
    option.value = Location.cities[i];
    option.textContent = Location.cities[i];
    locationField.append(option);
  }

  for (let i = 0; i <= 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    ratingField.append(option);
  }

  uploadDiv.append(uploadButton);
  form.append(
    header,
    restaurantLabel,
    restaurantHeader,
    portionLabel,
    portionHeader,
    locationLabel,
    locationField,
    ratingLabel,
    ratingField,
    descriptionLabel,
    description,
    fileInput,
    uploadDiv
  );
  cardBody.append(form);
  card.append(cardBody);
  postFormContainer.append(card);
  target.append(postFormContainer);
  const upload = document.querySelector('#uploadButton');
  upload.addEventListener('click', () => {
    Firebase.uploadPost();
  });
};

/**
 * Render blogpost from data.
 *
 * @param {Function} a - Function from Firebase module that returns data
 */
const renderPost = async (a) => {
  const data = await a;
  if (data.length != 0) {
    const selected = document.getElementById('select-location').value;

    const container = document.createElement('div');
    container.classList = 'container-lg';

    const slogan = document.createElement('p');
    slogan.classList = 'fs-4 text-center';
    slogan.id = 'slogan';
    if (selected == '') {
      slogan.textContent = 'Koko Suomen arvostelut';
    } else {
      slogan.textContent = `Arvostelut paikassa ${selected}`;
    }

    const target = document.querySelector('#content');
    target.innerHTML = '';
    const row = document.createElement('div');
    row.id = 'posts';
    row.classList = 'row';
    for (let i = 0; i < data.length; i++) {
      const col = document.createElement('div');
      col.classList = 'col-sm-6 mb-3 mb-sm-0';

      const card = document.createElement('div');
      card.classList = 'card';

      const img = document.createElement('img');
      img.classList = 'card-img-top';
      img.src = data[i].imageUrl;

      const cardBody = document.createElement('div');
      cardBody.classList = 'card-body';

      const cardTitle = document.createElement('h5');
      cardTitle.classList = 'card-title';
      cardTitle.textContent = data[i].restaurant + ', ' + data[i].location;

      const cardSubtitle = document.createElement('h6');
      cardSubtitle.classList = 'card-subtitle mb-2 text-body-secondary';
      cardSubtitle.textContent = data[i].portion + ' ' + data[i].rating + '/5';

      const cardText = document.createElement('p');
      cardText.classList = 'card-text';
      cardText.textContent = data[i].description;

      const cardFooter = document.createElement('div');
      cardFooter.classList = 'card-footer';

      const calenderIcon = document.createElement('i');
      calenderIcon.classList = 'bi bi-calendar';

      const footerText1 = document.createElement('small');
      footerText1.classList = 'text-body-secondary';
      footerText1.textContent = data[i].created.date;

      const clockIcon = document.createElement('i');
      clockIcon.classList = 'bi bi-clock';

      const footerText2 = document.createElement('small');
      footerText2.classList = 'text-body-secondary';
      footerText2.textContent = data[i].created.time;

      cardFooter.append(calenderIcon, footerText1, clockIcon, footerText2);
      container.append(slogan);
      cardBody.append(cardTitle, cardSubtitle, cardText);
      card.append(img, cardBody, cardFooter);
      col.append(card);
      row.append(col);
      target.append(container, row);
    }
  } else {
    const selected = document.getElementById('select-location').value;
    const target = document.querySelector('#content');
    target.innerHTML = '';

    const container = document.createElement('div');
    container.classList = 'container-lg';

    const slogan = document.createElement('p');
    slogan.classList = 'fs-4 text-center';
    slogan.id = 'slogan';
    slogan.textContent = `Ei arvosteluja paikassa ${selected}`;

    container.append(slogan);
    target.append(container);
  }
};

const Post = {renderForm, renderPost};

export default Post;
