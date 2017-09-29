/* GLOBAL VARIABLES UP HERE */
var frontPage = 'https://www.reddit.com/';

$(document).ready(function(){
/* FUNCTION EXECUTION HERE */
  // attach event listeners to nav links
  $('.hot-new-rising-nav').click(navToArticles);

  // ajax call
  getArticles();
});

function navToArticles(e) {
  let target = e.target;
  e.preventDefault();
  getArticles(target.innerText);
}

function getArticles(page = '') {
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
<img src="${article.thumbnail}"/>
<a href="${article.url}">${article.title}</a>
  </article>`)
}

/* FUNCTION DEFINITION HERE */
/* TIP: don't forget scope! */
