/* GLOBAL VARIABLES UP HERE */
var frontPage = 'https://www.reddit.com/';
var DEFAULT_THUMBNAIL = 'https://vignette.wikia.nocookie.net/questworld/images/4/47/Comic_image_missing.png/revision/latest?cb=20100421133705';
var currentPage = '';

$(document).ready(function(){
  $('.articles-nav').click(navToArticles);
  $('form').submit(findSubreddit);
  $('.articles-container button').click(loadMoreArticles);

  getArticles();
});


// ajax call

function getArticles(options = {}) {
  console.log(`${frontPage}${options.page || ''}/.json${serialize(options.params)}`)
  $.ajax({
    method: 'GET',
    url: `${frontPage}${options.page || ''}/.json${serialize(options.params)}`,
    dataType: 'json',
    success: onSuccess,
    error: onError
  })
  currentPage = options.page || '';
}


// callbacks

function loadMoreArticles() {
  let lastID = $('article').last().attr('id');
  getArticles({page: currentPage, params: {count: 25, after: lastID}})
}

function findSubreddit(e) {
  e.preventDefault();
  getArticles({page: `r/${$('form input').val()}`});
}

function navToArticles(e) {
  let target = e.target;
  e.preventDefault();
  getArticles({page: target.innerText});
}

function onSuccess(response) {
  displayArticles(response.data);
}

function onError(xhr) {
  console.log(xhr);
}


// DOM manipulators

function displayArticles(data) {
  $('.articles-body').empty();
  data.children.forEach(article => {
    displayAnArticle(article.data);
  });
}

function displayAnArticle(article) {
  $('.articles-body').append(`<article id="t3_${article.id}">
<img src="${fixImageUrl(article.thumbnail)}"/>
<a href="${article.url}">${article.title}</a>
  </article>`)
}

// helpers

function fixImageUrl(url) {
  return ['self', 'image', 'default'].includes(url) ? DEFAULT_THUMBNAIL : url;
}

function serialize(obj) {
  if(obj === {}) { return ''; }
  let s = '?';
  for(let k in obj) {
    s += `${k}=${obj[k]}&`
  }
  return s.slice(0,-1);
}
