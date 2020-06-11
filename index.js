"use strict";

const apiKey = "563492ad6f91700001000001bce3f0f7f72942048eea4da3cb90d3b0";

function getPhoto(query){
    fetch(`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`,
    {   
        method:"GET",
        headers:{
            Authorization: apiKey
        }
    }
)
.then(response => response.json())
.then(responseJson => displayResults(responseJson))
.catch(error => alert('Something went wrong! Try again later'));
}

console.log(getPhoto());

function displayResults(responseJson) {
    console.log(responseJson);
    
    $('.gallery').append(`
        <img src="${photos.src.large}">
        <p>${photos.photographer}</p>
        `);
        // <p><a href="${photos.url}">Download!</p>
    //   $('.gallery').removeClass('hidden');
} 


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      let search = $('input[name="search"]').val();
      getPhoto(search);
    });
  }
  
  $(function() {
    console.log('App loaded! Waiting for submit!');
    console.log(watchForm());
  });