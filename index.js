"use strict";

const apiKey = "563492ad6f91700001000001bce3f0f7f72942048eea4da3cb90d3b0";
let page = 1;
const url = 'https://api.pexels.com/v1/curated?per_page=16&page=5';


function getPhoto(query,pageNum,showMore = false){
    let pageNumber;

    if (!pageNum){
        pageNumber = 1;
    } else{
        pageNumber = pageNum;
    }

    let photoUrl;

    if(!query){
        photoUrl = url;
    } else{
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

// function getCurated(){
//     fetch('https://api.pexels.com/v1/curated?per_page=16&page=1',
//         {   
//             method:"GET",
//             headers:{
//                 Accept: 'application/json',
//                 Authorization: apiKey
//             }
//         }
//     )
//     .then(response => response.json())
//     .then(responseJson => displayResults(responseJson))
//     .catch(error => alert('Something went wrong! Try again later'));
//  }


function displayResults(responseJson, showMore = false) {
    if (showMore === false){
        $('.gallery').empty();
    }

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
} 

function moreImages(){
   
    $('#more').click(event =>{
    let search = $('#search_input').val();
     getPhoto(search,++page,true);
    });
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      let search = $('#search_input').val();
      getPhoto(search);
    //   $('#search_input').val('');
    });
    moreImages();
    getPhoto();
  }
  
  $(function() {
    console.log('App loaded! Waiting for submit!');
    // console.log(watchForm());
    watchForm();
  });


