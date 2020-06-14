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
        photoUrl = `https://api.pexels.com/v1/search?query=${query}+query&per_page=16&page=${pageNumber}`
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
    .then(responseJson => displayResults(responseJson, showMore))
    .catch(error => alert('Something went wrong! Try again later'));
}


// populates the images  to the DOM

function displayResults(responseJson, showMore = false) {
    if (showMore === false){
        $('.gallery').empty();
    }

  // loop throught the photos array 
  
    for (let i = 0; i < responseJson.photos.length; i++){
    $('.gallery').append(`
       <div id="spacing">
        <img src="${responseJson.photos[i].src.medium}" class="img-search"> <br>
        <div id="photograph-info">
            <p>${responseJson.photos[i].photographer}</p>
            <a href="${responseJson.photos[i].url}" target="_blank"><i class="fas fa-file-download"></i></a>
        </div>
        </div>
    `)
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
    console.log('App loaded! Waiting for submit!');

    watchForm();
  });


