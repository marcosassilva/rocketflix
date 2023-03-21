import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

// Armazenar divs manipuladas em variáveis.

let title = document.getElementById('title');
let description = document.getElementById('description');
let poster = document.getElementById('poster');
let releaseDate = ""

// Adicionar Event Listener

document.getElementById("buscarFilme").addEventListener('click', start);

// Função inicial, oculta elemento e renderiza dados.

function start() {
  title.setAttribute("hidden", "");
  description.setAttribute("hidden", "");
  poster.setAttribute("hidden", "");
  renderMovie();
} 

// Renderizar dados

function renderMovie() {
  let selectedGenre = document.getElementById('genre').value
  let validGenre = false
  let id = getRandomID()

  // Consumir API utilizando fetch.

  fetch(`${BASE_URL}${id}?${API_KEY}&${language}`)
  .then(response => response.json())
  .then(data => {
    filterData(data)

    // Se retornar descrição vazia, rodar função novamente.

    if (description.innerHTML == "") {
      renderMovie()
    }

    // Rodar função para validar o gênero solicitado.

    validGenre = verifyGenre(data, selectedGenre)
    console.log(validGenre)
    console.log(selectedGenre)
    if (validGenre == false) {
      renderMovie()
    } else {
      title.removeAttribute("hidden");
      description.removeAttribute("hidden");
      poster.removeAttribute("hidden");
    }
  })
  .catch(err => {
    console.log(err)

    // Se retornar erro, rodar função novamente com novo ID.

    renderMovie()
  })
}

// Validação e manipulação de dados obtidos da API

function filterData(data) {
  console.log(data)
  document.querySelector('h1').innerText = "Não sabe o que assistir?"
  releaseDate = data.release_date.slice(0, 4);
  title.innerText = `${data.title} (${releaseDate})`;
  description.innerHTML = data.overview;
  poster.src = IMG_URL + data.poster_path
}

// Função para validar gênero de filme obtido.

function verifyGenre(data, selectedGenre) {
  let count = 0
  let validGenre = false
  for (let i = 0; i < data.genres.length; i++) {
    if (data.genres[i].name == selectedGenre) {
      count++
    }
  }
  if (count == 0) {
    validGenre = false
  } else {
    validGenre = true
  }
  return validGenre;
}

// Funções matemáticas

function getRandomID() {
  let id = getRandom(2, 1000)
  return id;
  }

function getRandom (min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}