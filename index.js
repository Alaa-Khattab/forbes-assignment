
function openModal(image) {

  const display = document.getElementById("modal-images")
  const x = document.createElement("IMG");
    x.setAttribute("src",image);
    x.setAttribute("width", "500");
    x.setAttribute("height", "500");
    display.appendChild(x);
    document.getElementById("modal").style.display = "block";
}

function closeModal() {

  const display = document.getElementById("modal-images");
    display.innerHTML = '';
    document.getElementById("modal").style.display = "none";
}

function getImages(page) {

  const xmlHttp = new XMLHttpRequest();

  const l = document.getElementById("loader");
  l.innerHTML = "Loading....";

  const displayImages = document.getElementById("images");
  displayImages.innerHTML = '';

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){

      const images =  JSON.parse(xmlHttp.responseText.split('(')[1].split(')')[0]);
      l.innerHTML = "";

      const photos = images.photos.photo.map((photo)=>{
        const x = document.createElement("IMG");
          x.setAttribute("src",`http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
          x.setAttribute("width", "500");
          x.setAttribute("height", "500");
          x.addEventListener("click", function () {
            openModal(`http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
          });
        displayImages.appendChild(x);

      });
    }
  }

  xmlHttp.open("GET", `https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=soccer&api_key=b42d2fb8253ae35e4579a7d85d39db30&per_page=10&page=${page}&format=json`, true);
  xmlHttp.send(null);
}

function buttonClicked() {
  const page_num = Math.floor(Math.random() * 200) + 1 ;
  getImages(page_num)
}
