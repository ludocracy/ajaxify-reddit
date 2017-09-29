/* GLOBAL VARIABLES UP HERE */
var frontPage = 'https://www.reddit.com/';
var DEFAULT_THUMBNAIL = 'https://vignette.wikia.nocookie.net/questworld/images/4/47/Comic_image_missing.png/revision/latest?cb=20100421133705';

$(document).ready(function(){
/* FUNCTION EXECUTION HERE */
  // attach event listeners to nav links
  $('.hot-new-rising-nav').click(navToArticles);
  $('form').submit(findSubreddit);

  // ajax call
  getArticles();
});

function findSubreddit(e) {
  e.preventDefault();
  getArticles(`r/${$('form input').val()}`);
}

function navToArticles(e) {
  let target = e.target;
  e.preventDefault();
  getArticles(target.innerText);
}

function getArticles(page = '') {
  console.log(`${frontPage}${page}/.json`);
  $.ajax({
    method: 'GET',
    url: `${frontPage}${page}/.json`,
    dataType: 'json',
    success: onSuccess,
    error: onError
  })
}

function onSuccess(response) {
  displayArticles(response.data);
}

function onError(xhr) {
  console.log(xhr);
}

function displayArticles(data) {
  $('.hot-new-rising-body').empty();
  data.children.forEach(article => {
    displayAnArticle(article.data);
  });
}

function displayAnArticle(article) {
  $('.hot-new-rising-body').append(`<article id="${article.id}">
<img src="${fixImageUrl(article.thumbnail)}"/>
<a href="${article.url}">${article.title}</a>
  </article>`)
}

function fixImageUrl(url) {
  return ['self', 'image', 'default'].includes(url) ? DEFAULT_THUMBNAIL : url;
}

/* FUNCTION DEFINITION HERE */
/* TIP: don't forget scope! */
