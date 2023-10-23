/**
 * Module for navigationbar render based on login status.
 *
 * @module Navigation
 * @author Eeli Klemettilä
 */

'use strict';

import Firebase from './firebase';
import Home from './home';
import Login from './login';
import Post from './post';

/**
 * Set document element where to render navigation links.
 */
const target = document.querySelector('#nav-links');
const mobiletarget = document.querySelector('#mobile-nav-links');

/**
 * Render navigationbar when account is logged in.
 */
const renderUserNav = () => {
  target.innerHTML = '';
  mobiletarget.innerHTML = '';

  const homeLi = document.createElement('li');
  homeLi.classList = 'nav-item';

  const homeA = document.createElement('a');
  homeA.classList = 'nav-link';
  homeA.id = 'homeLink';

  const homeIcon = document.createElement('i');
  homeIcon.classList = 'bi bi-newspaper icon';

  const homeSpan = document.createElement('span');
  homeSpan.classList = 'nav-link-name';
  homeSpan.textContent = 'Arvostelut';

  const postLi = document.createElement('li');
  postLi.classList = 'nav-item';

  const postA = document.createElement('a');
  postA.classList = 'nav-link';
  postA.id = 'postLink';

  const postIcon = document.createElement('i');
  postIcon.classList = 'bi bi-plus-circle-fill icon';

  const postSpan = document.createElement('span');
  postSpan.classList = 'nav-link-name';
  postSpan.textContent = 'Uusi arvostelu';

  const logoutLi = document.createElement('li');
  logoutLi.classList = 'nav-item';

  const logoutA = document.createElement('a');
  logoutA.classList = 'nav-link';
  logoutA.id = 'logoutLink';

  const logoutIcon = document.createElement('i');
  logoutIcon.classList = 'bi bi-box-arrow-right icon';

  const logoutSpan = document.createElement('span');
  logoutSpan.classList = 'nav-link-name';
  logoutSpan.textContent = 'Kirjaudu ulos';

  const mobileHomeLi = document.createElement('li');
  mobileHomeLi.classList = 'nav-item';

  const mobileHomeA = document.createElement('a');
  mobileHomeA.classList = 'nav-link';
  mobileHomeA.id = 'mobileHomeLink';

  const mobileHomeIcon = document.createElement('i');
  mobileHomeIcon.classList = 'bi bi-newspaper icon';

  const mobileHomeSpan = document.createElement('span');
  mobileHomeSpan.classList = 'nav-link-name';

  const mobilePostLi = document.createElement('li');
  mobilePostLi.classList = 'nav-item';

  const mobilePostA = document.createElement('a');
  mobilePostA.classList = 'nav-link';
  mobilePostA.id = 'mobilePostLink';

  const mobilePostIcon = document.createElement('i');
  mobilePostIcon.classList = 'bi bi-plus-circle-fill icon';

  const mobilePostSpan = document.createElement('span');
  mobilePostSpan.classList = 'nav-link-name';

  homeA.append(homeIcon, homeSpan);
  homeLi.append(homeA);

  postA.append(postIcon, postSpan);
  postLi.append(postA);

  logoutA.append(logoutIcon, logoutSpan);
  logoutLi.append(logoutA);

  mobileHomeA.append(mobileHomeIcon, mobileHomeSpan);
  mobileHomeLi.append(mobileHomeA);

  mobilePostA.append(mobilePostIcon, mobilePostSpan);
  mobilePostLi.append(mobilePostA);

  target.append(homeLi, postLi, logoutLi);
  mobiletarget.append(mobileHomeLi, mobilePostLi);

  const homeLink = document.querySelector('#homeLink');

  homeLink.addEventListener('click', () => {
    Home.render();
  });

  const mobileHomeLink = document.querySelector('#mobileHomeLink');

  mobileHomeLink.addEventListener('click', () => {
    Home.render();
  });

  const postLink = document.querySelector('#postLink');
  postLink.addEventListener('click', () => {
    Post.renderForm();
  });

  const mobilePostLink = document.querySelector('#mobilePostLink');
  mobilePostLink.addEventListener('click', () => {
    Post.renderForm();
  });

  const logoutLink = document.querySelector('#logoutLink');
  logoutLink.addEventListener('click', Firebase.logout);
};

/**
 * Render navigationbar when account is not logged in.
 */
const renderNav = () => {
  target.innerHTML = '';
  mobiletarget.innerHTML = '';

  const homeLi = document.createElement('li');
  homeLi.classList = 'nav-item';

  const homeA = document.createElement('a');
  homeA.classList = 'nav-link';
  homeA.id = 'homeLink';

  const homeIcon = document.createElement('i');
  homeIcon.classList = 'bi bi-newspaper icon';

  const homeSpan = document.createElement('span');
  homeSpan.classList = 'nav-link-name';
  homeSpan.textContent = 'Arvostelut';

  const loginLi = document.createElement('li');
  loginLi.classList = 'nav-item';

  const loginA = document.createElement('a');
  loginA.classList = 'nav-link';
  loginA.id = 'loginLink';

  const loginIcon = document.createElement('i');
  loginIcon.classList = 'bi bi-box-arrow-left icon';

  const loginSpan = document.createElement('span');
  loginSpan.classList = 'nav-link-name';
  loginSpan.textContent = 'Kirjaudu sisään';

  const mobileHomeLi = document.createElement('li');
  mobileHomeLi.classList = 'nav-item';

  const mobileHomeA = document.createElement('a');
  mobileHomeA.classList = 'nav-link';
  mobileHomeA.id = 'mobileHomeLink';

  const mobileHomeIcon = document.createElement('i');
  mobileHomeIcon.classList = 'bi bi-newspaper icon';

  const mobileHomeSpan = document.createElement('span');
  mobileHomeSpan.classList = 'nav-link-name';

  const mobileLoginLi = document.createElement('li');
  mobileLoginLi.classList = 'nav-item';

  const mobileLoginA = document.createElement('a');
  mobileLoginA.classList = 'nav-link';
  mobileLoginA.id = 'mobileLoginLink';

  const mobileLoginIcon = document.createElement('i');
  mobileLoginIcon.classList = 'bi bi-box-arrow-in-left icon';

  const mobileLoginSpan = document.createElement('span');
  mobileLoginSpan.classList = 'nav-link-name';

  homeA.append(homeIcon, homeSpan);
  homeLi.append(homeA);

  loginA.append(loginIcon, loginSpan);
  loginLi.append(loginA);

  mobileHomeA.append(mobileHomeIcon, mobileHomeSpan);
  mobileHomeLi.append(mobileHomeA);

  mobileLoginA.append(mobileLoginIcon, mobileLoginSpan);
  mobileLoginLi.append(mobileLoginA);

  target.append(homeLi, loginLi);
  mobiletarget.append(mobileHomeLi, mobileLoginLi);

  const homeLink = document.querySelector('#homeLink');

  homeLink.addEventListener('click', () => {
    Home.render();
  });

  const mobileHomeLink = document.querySelector('#mobileHomeLink');

  mobileHomeLink.addEventListener('click', () => {
    Home.render();
  });

  const loginLink = document.querySelector('#loginLink');

  loginLink.addEventListener('click', () => {
    Login.renderForm();
  });

  const mobileLoginLink = document.querySelector('#mobileLoginLink');

  mobileLoginLink.addEventListener('click', () => {
    Login.renderForm();
  });
};

const Navigation = {renderUserNav, renderNav};

export default Navigation;
