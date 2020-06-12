"use strict";

const apiKey = "563492ad6f91700001000001bce3f0f7f72942048eea4da3cb90d3b0";

function getPhoto(query){
fetch(`https://api.pexels.com/v1/search?query=${query}+query&per_page=16&page=1`,
    {   
        method:"GET",
        headers:{
            Accept: 'application/json',
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
    $('.gallery').empty();
  // loop throught the photos array 
  
    for (let i = 0; i < responseJson.photos.length; i++){
    $('.gallery').append(`
        <div id="spacing">
       <img src="${responseJson.photos[i].src.large}" class="img-search"> <br>
       <p>${responseJson.photos[i].photographer}</p>
       <a href="${responseJson.photos[i].url}">Download!</a>
       </div>
    `)
    };

    // $('.nav-button').append(`
    // <a href="${responseJson.next_page}">More</a>
    // `)
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