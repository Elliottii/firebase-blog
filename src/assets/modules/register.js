/**
 * Module for render register form.
 *
 * @module Register
 * @author Eeli Klemettilä
 */

'use strict';

import Firebase from './firebase';
import Login from './login';

/**
 * Render register form.
 */
const renderForm = async () => {
  const target = document.querySelector('#content');
  target.innerHTML = '';

  const registerFormContainer = document.createElement('div');
  registerFormContainer.id = 'new-post';
  registerFormContainer.classList = 'container mt-2';

  const card = document.createElement('div');
  card.classList = 'card';

  const cardBody = document.createElement('div');
  cardBody.classList = 'card-body';

  const form = document.createElement('form');
  form.id = 'login-form';

  const header = document.createElement('h3');
  header.textContent = 'Luo tili';

  const nameLabel = document.createElement('label');
  nameLabel.classList = 'form-label';
  nameLabel.textContent = 'Käyttäjätunnus';

  const nameHeader = document.createElement('input');
  nameHeader.id = 'name';
  nameHeader.classList = 'form-control';
  nameHeader.type = 'text';

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

  const registerButton = document.createElement('button');
  registerButton.id = 'registerButton';
  registerButton.classList = 'btn btn-success';
  registerButton.textContent = 'Luo tili';
  registerButton.type = 'button';

  const buttonLabel = document.createElement('label');
  buttonLabel.classList = 'form-label';
  buttonLabel.textContent = 'tai';

  const loginButton = document.createElement('button');
  loginButton.id = 'loginButton';
  loginButton.classList = 'btn btn-secondary';
  loginButton.textContent = 'Kirjaudu sisään';
  loginButton.type = 'button';

  buttonDiv.append(registerButton, buttonLabel, loginButton);
  form.append(
    header,
    nameLabel,
    nameHeader,
    emailLabel,
    emailHeader,
    passwordLabel,
    passwordHeader,
    buttonDiv
  );
  cardBody.append(form);
  card.append(cardBody);
  registerFormContainer.append(card);
  target.append(registerFormContainer);

  const register = document.querySelector('#registerButton');

  register.addEventListener('click', () => {
    Firebase.registerWithEmailAndPassword(
      nameHeader.value,
      emailHeader.value,
      passwordHeader.value
    );
  });

  loginButton.addEventListener('click', () => {
    Login.renderForm();
  });
};

const Register = {renderForm};

export default Register;
