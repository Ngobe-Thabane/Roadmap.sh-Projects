import { photos } from "./Photos.js";
const photoContainer = document.getElementById('photos');

addPictures();


function addPictures(){
  photos.forEach((photo, index) =>{
    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo-div pic-'+index;
    photoDiv.style.backgroundImage = `url(${photo.src})`;
    photoDiv.style.backgroundSize = "cover";  
    photoDiv.style.backgroundPosition = "center";  
    photoContainer.appendChild(photoDiv);
  })
}