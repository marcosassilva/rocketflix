import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

let title = document.getElementById('title');
let description = document.getElementById('description');
let poster = document.getElementById('poster');
let releaseDate = ""



document.getElementById("buscarFilme").addEventListener('click', renderMovie);

/* function rodar() {
  getMovie();

  /*   getMovie();
  if (description.innerText == $0) {
    getMovie();
  } */

/*   getMovie()
  console.log(description.innerHTML) */

/*   do {getMovie()} while (
    description.innerHTML == ""
  ) 
} */

function renderMovie() {
  let id = getRandomID()
  fetch(`${BASE_URL}${id}?${API_KEY}&${language}`)
  .then(response => response.json())
  .then(data => {
    getMovie(data)
    while (description.innerHTML == "") {
      getMovie()
    }
    poster.removeAttribute("hidden")
    title.removeAttribute("hidden")
    description.removeAttribute("hidden")

  })
  .catch(err => {
    console.log(err)
    document.querySelector('h1').innerText = "Não encontramos nenhum filme, tente novamente!"
    document.querySelector('h1').style.textAlign = 'center'
    poster.setAttribute("hidden", "")
    title.setAttribute("hidden", "")
    description.setAttribute("hidden", "")
  })
}

function getMovie(data) {
  console.log(data)
  document.querySelector('h1').innerText = "Não sabe o que assistir?"
  releaseDate = data.release_date.slice(0, 4);
  title.innerText = `${data.title} (${releaseDate})`;
  description.innerHTML = data.overview;
  poster.src = IMG_URL + data.poster_path
}

function getRandomID() {
  let id = getRandom(2, 1000)
  return id;
  
  
/*   let success = false;

  while (success === false) {
      let id = getRandom(2, 700000);
      fetch(`${BASE_URL}/${id}?${API_KEY}&${language}`)
      .then(response => response.json())
      .then(data => {
        success = data.success
    } )
      .catch(err => console.error(err))
    } 
    
    return id */
    
  }

/*   while (success == false) {
    let id = getRandom(2, 700000);
    fetch(`${BASE_URL}/${id}?${API_KEY}&${language}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.success)
  } )
    .catch(err => console.error(err))
  } */


/* function rodar() {
  axios.get(`${BASE_URL}?${API_KEY}`)
  .then(response => {
      const data = response.data
      console.log(data);
      userName.textContent = data.name
      userCity.textContent = data.city
      userID.textContent = data.id
      userAvatar.src = data.avatar 
  })
  .catch(err => console.error(err))
} */

function getRandom (min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}