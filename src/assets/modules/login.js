/**
 * Module for login form render.
 *
 * @module Login
 * @author Eeli Klemettilä
 */

'use strict';

import Firebase from './firebase';
import Register from './register';

/**
 * Render login form.
 */
const renderForm = async () => {
  const target = document.querySelector('#content');
  target.innerHTML = '';

  const loginFormContainer = document.createElement('div');
  loginFormContainer.id = 'new-post';
  loginFormContainer.classList = 'container mt-2';

  const card = document.createElement('div');
  card.classList = 'card';

  const cardBody = document.createElement('div');
  cardBody.classList = 'card-body';

  const form = document.createElement('form');
  form.id = 'login-form';

  const header = document.createElement('h3');
  header.textContent = 'Kirjaudu sisään';

  const emailLabel = document.createElement('label');
  emailLabel.classList = 'form-label';
  emailLabel.textContent = 'Sähköposti';

  const emailHeader = document.createElement('input');
  emailHeader.id = 'email';
  emailHeader.classList = 'form-control';
  emailHeader.type = 'text';

  const passwordLabel = document.createElement('label');
  passwordLabel.classList = 'form-label';
  passwordLabel.textContent = 'Salasana';

  const passwordHeader = document.createElement('input');
  passwordHeader.id = 'password';
  passwordHeader.classList = 'form-control';
  passwordHeader.type = 'password';

  const buttonDiv = document.createElement('div');
  buttonDiv.classList = 'text-center';

  const loginButton = document.createElement('button');
  loginButton.id = 'loginButton';
  loginButton.classList = 'btn btn-success';
  loginButton.textContent = 'Kirjaudu sisään';
  loginButton.type = 'button';

  const buttonLabel = document.createElement('label');
  buttonLabel.classList = 'form-label';
  buttonLabel.textContent = 'tai';

  const registerButton = document.createElement('button');
  registerButton.id = 'registerButton';
  registerButton.classList = 'btn btn-secondary';
  registerButton.textContent = 'Luo tili';
  registerButton.type = 'button';

  buttonDiv.append(loginButton, buttonLabel, registerButton);
  form.append(
    header,
    emailLabel,
    emailHeader,
    passwordLabel,
    passwordHeader,
    buttonDiv
  );
  cardBody.append(form);
  card.append(cardBody);
  loginFormContainer.append(card);
  target.append(loginFormContainer);

  loginButton.addEventListener('click', () => {
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    Firebase.logInWithEmailAndPassword(email, password);
  });

  registerButton.addEventListener('click', () => {
    Register.renderForm();
  });
};

const Login = {renderForm};

export default Login;
