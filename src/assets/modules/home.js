/**
 * Module for home page render.
 *
 * @module Home
 * @author Eeli Klemettilä
 */

'use strict';

import Firebase from './firebase';
import Post from './post';

/**
 * Render all blogposts using Post and Firebase module.
 */
const render = () => {
  Post.renderPost(Firebase.getAllPosts());
  document.getElementById('select-location').value = '';
};

const Home = {render};

export default Home;
