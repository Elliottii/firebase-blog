/**
 * @author Eeli Klemettilä
 */

'use strict';

import './styles/style.scss';
import 'bootstrap/js/dist/collapse';
import ServiceWorker from './assets/modules/service-worker';
import Firebase from './assets/modules/firebase';
import Location from './assets/modules/location';
import Login from './assets/modules/login';
import Navigation from './assets/modules/navigation';
import Home from './assets/modules/home';
import Post from './assets/modules/post';

/**
 * Listen account login status and render content based on it.
 */
Firebase.auth.onAuthStateChanged(function (user) {
  if (user) {
    Navigation.renderUserNav();
    Home.render();
  } else {
    Navigation.renderNav();
    Login.renderForm();
  }
});

/**
 * Makes dropdown menu from cities in Finland.
 */
const selectLocation = document.querySelector('#select-location');
for (let i = 0; i < Location.cities.length; i++) {
  const option = document.createElement('option');
  option.value = Location.cities[i];
  option.textContent = Location.cities[i];
  selectLocation.append(option);
}

/**
 * Render blogposts based on value of selection. Render all blogposts if selection is empty.
 */
selectLocation.addEventListener('change', () => {
  if (selectLocation.value == '') {
    Post.renderPost(Firebase.getAllPosts());
  } else {
    Post.renderPost(Firebase.getPostsByCity(selectLocation.value));
  }
});

/**
 * Add event listener to location icon. Gets location data when clicked.
 */
const locationIcon = document.querySelector('#locationIcon');
locationIcon.addEventListener('click', () => {
  Location.getLocation();
});

/**
 * App initialization.
 */
const init = async () => {
  ServiceWorker.register();
};

init();
