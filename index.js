"use strict";

const apiKey = "563492ad6f91700001000001bce3f0f7f72942048eea4da3cb90d3b0";
let page = 1;

// fetchs the API for both the curated photos and searched photos

function getPhoto(query,pageNum,showMore = false){
    let pageNumber;

    if (!pageNum){
        pageNumber = 1;
    } else{
        pageNumber = pageNum;
    }

    let photoUrl;

    if(!query){
        // curated photos:
        photoUrl = `https://api.pexels.com/v1/curated?per_page=16&page=${pageNumber}`;
    } else{
        // search photos:
        photoUrl = `https://api.pexels.com/v1/search?query=${query}+query&per_page=10&page=${pageNumber}`
    }
    
    fetch(photoUrl,
        {   
            method:"GET",
            headers:{
                Accept: 'application/json',
                Authorization: apiKey
            }
        }
    )
    .then(response => response.json())
    .then(responseJson => {
        if (responseJson.total_results === 0) {
            errorMessage();
        } else {
            displayResults(responseJson, showMore);
        }
    })
    .catch(error => alert('Something went wrong! Try again later'))
}


// error message

function errorMessage(){
    $('.gallery').empty();
    $('.nav-button').hide();
    $('.error').show();
}

// populates the images  to the DOM

function displayResults(responseJson, showMore = false) {
    if (showMore === false){
        $('.gallery').empty();
    }

        for (let i = 0; i < responseJson.photos.length; i++){
            $('.gallery').append(`
               <div class="spacing">
                <img src="${responseJson.photos[i].src.large}" class="img-search" alt="image results"> <br>
                <div class="photograph-info">
                    <p>${responseJson.photos[i].photographer}</p>
                    <a href="${responseJson.photos[i].url}" target="_blank"><i class="fas fa-file-download"></i></a>
                </div>
                </div>
            `)
            $('.nav-button').show();
            $('.error').hide();

            };

} 

// runs the More button allowing the user to generate more images to the app

function moreImages(){
   
    $('#more').click(event =>{
    let search = $('#search_input').val();
     getPhoto(search,++page,true);
    });
}

// this function watches for the search submit button to activate

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      let search = $('#search_input').val();
      getPhoto(search);
    });
    moreImages();
    getPhoto();
  }
  
  $(function() {
<<<<<<< HEAD
=======
    console.log('App loaded! Waiting for submit!');
>>>>>>> 264bb0fffde3b57e582c23d5cee80228a3f12ea9
    watchForm();
  });


