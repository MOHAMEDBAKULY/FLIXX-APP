const globalState = {
    currentPage: window.location.pathname,
    search:{
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0
    },
    api: {
      apiKey: '24fe7282d55fb467d617de1ce924c3e2',
      apiUrl: 'https://api.themoviedb.org/3/'
    }
};

// Displaying The Popular Movies
const displayPopularMovies =  async () => {
    const  { results } = await fecthAPIData('movie/popular')
    results.forEach((movie) => {
        const div = document.createElement('div')
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
            ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.original_title}"
          />` :
         `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.original_title}"
        />`
         }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `
        document.querySelector('#popular-movies').appendChild(div)
    })
}

// Displaying The Popular TV Shows
const displayPopularTVShows =  async () => {
    const  { results } = await fecthAPIData('tv/popular')
    results.forEach((TvShows) => {
        const div = document.createElement('div')
        div.classList.add('card');
        div.innerHTML = `
        <a href="tv-details.html?id=${TvShows.id}">
          ${
            TvShows.poster_path
            ? `<img
            src="https://image.tmdb.org/t/p/w500${TvShows.poster_path}"
            class="card-img-top"
            alt="${TvShows.name}"
          />` :
         `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${TvShows.name}"
        />`
         }
        </a>
        <div class="card-body">
          <h5 class="card-title">${TvShows.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date${TvShows.first_air_date}</small>
          </p>
        </div>
        `
        document.querySelector('#popular-shows').appendChild(div)
    })
}

// Displaying The Movie Details 
const displayMovieDetails = async ()  => {
    const movieId = window.location.search.split('=')[1];

    const movie = await fecthAPIData(`movie/${movieId}`)

    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
  <div>
     ${
   movie.poster_path
   ? `<img
   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
   class="card-img-top"
   alt="${movie.title}"
 />` :
`<img
 src="images/no-image.jpg"
 class="card-img-top"
 alt="${movie.title}"
>`
}
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)}/ 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
    ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
     ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${AddCommasToNumber(movie.budget)}</li>
    <li><span class="text-secondary">Revenue:</span> $${AddCommasToNumber(movie.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
  ${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}
  </div>
</div>
    `
    document.querySelector('#movie-details').appendChild(div);
}


// Displaying The Show Details 
const displayShowDetails = async ()  => {
    const showId = window.location.search.split('=')[1];

    const show = await fecthAPIData(`tv/${showId}`)
    console.log(show)

    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
  <div>
     ${
   show.poster_path
   ? `<img
   src="https://image.tmdb.org/t/p/w500${show.poster_path}"
   class="card-img-top"
   alt="${show.name}"
 />` :
`<img
 src="images/no-image.jpg"
 class="card-img-top"
 alt="${show.name}"
>`
}
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)}/ 10
    </p>
    <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
    <p>
    ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
     ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
    <li><span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.overview}</li>
    <li><span class="text-secondary">Runtime:</span> ${show.episode_run_time} minutes</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
  ${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}
  </div>
</div>
    `
    document.querySelector('#show-details').appendChild(div);
    
}



// Fetching DATA FROM THE TMDB MOVIE DATABASE API
const fecthAPIData = async (endpoint)  => {
    // Fetch data with your registered key from the TMDB DataBase
    const API_KEY =  globalState.api.apiKey;
    const API_URL = globalState.api.apiUrl;

    Showspinner()

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`
   );

    const data  = await response.json();

    Hidespinner()

    return data;
}

// Shwowing the Spinner Loading When we get data from the server
function Showspinner () {
    document.querySelector('.spinner').classList.add('show')
}

function Hidespinner () {
    document.querySelector('.spinner').classList.remove('show')
}

// Display backdrop on Details Pages
const displayBackgroundImage = (type, backgroundPath) => {
    const backgroundDiv = document.createElement('div');
    backgroundDiv.style.backgroundImage = 
    `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    backgroundDiv.style.backgroundSize = 'cover';
    backgroundDiv.style.backgroundPosition = 'center';
    backgroundDiv.style.backgroundRepeat = 'no-repeat';
    backgroundDiv.style.height = '100vh';
    backgroundDiv.style.width= '100vw';
    backgroundDiv.style.position = 'fixed';
    backgroundDiv.style.top = '0';
    backgroundDiv.style.left = '0';
    backgroundDiv.style.zIndex = '-1';
    backgroundDiv.style.opacity = '0.1';

    if(type === 'movie'){
        document.querySelector('#movie-details').appendChild(backgroundDiv)
    }else{
        document.querySelector('#show-details').appendChild(backgroundDiv)

    }
}

const searchAPIData = async ()  => {
  // Fetch data with your registered key from the TMDB DataBase
  const API_KEY =  globalState.api.apiKey;
  const API_URL = globalState.api.apiUrl;

  Showspinner()

  const response = await fetch(
      `${API_URL}search/${globalState.search.type}?api_key=${API_KEY}&language=en-US&query=${globalState.search.term}&page=${globalState.search.page}`
 );

  const data  = await response.json();

  Hidespinner()

  return data;
}

// Shwowing the Spinner Loading When we get data from the server
function Showspinner () {
  document.querySelector('.spinner').classList.add('show')
}

function Hidespinner () {
  document.querySelector('.spinner').classList.remove('show')
}

// Search Movie and Shows
const searchMovies = async () => {
    const queryString =  window.location.search;

    const urlParams = new URLSearchParams(queryString);

   globalState.search.type = urlParams.get('type');
   globalState.search.term = urlParams.get('search-term');

   if(globalState.search.term !== '' && globalState.search.term !== null){
    // @todo - make request and display results
    const { results, total_pages, page, total_results } = await searchAPIData();

    globalState.search.page = page;
    globalState.search.totalPages = total_pages;
    globalState.search.totalResults = total_results;

    if(results === 0){
      showAlert('No results Found')
      return;
    }

    displaySearchResults(results)

    document.querySelector('#search-term').value = '';
    
   }else {
    showAlert('Please Enter a search term')
   }
   
}

// Display search results 
const displaySearchResults = (results) => {
  // Clear The Previous results 
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

    results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <a href="${globalState.search.type}-details.html?id=${result.id}">
    ${
      result.poster_path
      ? `<img
      src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
      class="card-img-top"
      alt="${globalState.search.type === 'movie' ? result.title : result.name}"
    />` :
   `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${globalState.search.type === 'movie' ? result.title : result.name}"
  />`
   }
  </a>
  <div class="card-body">
    <h5 class="card-title">${globalState.search.type === 'movie' ? result.title : result.name}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${globalState.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
    </p>
  </div>
    `
    document.querySelector('#search-results-heading').innerHTML = `
       <h2>
       ${results.length} of ${globalState.search.totalResults}
        Results for ${globalState.search.term}
       </h2>
    `

    document.querySelector('#search-results').appendChild(div)
  });

  displayPagination()
}

// Pagination Functionality Display  For Search

const displayPagination = () => {
  const div = document.createElement('div')
  div.classList.add('pagination')
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${globalState.search.page} of ${globalState.search.totalPages}</div>
  `;

  document.querySelector('#pagination').appendChild(div)

  // Disbale prev button if on the first page
  if(globalState.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disbale next button if on the last page
  if(globalState.search.page ===  globalState.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next Page 
  document.querySelector('#next').addEventListener('click', async () => {
    globalState.search.page++;
    const { results, total_pages }  = await searchAPIData();
    displaySearchResults(results);
  })

  // Prev Page 
  document.querySelector('#prev').addEventListener('click', async () => {
    globalState.search.page--;
    const { results, total_pages }  = await searchAPIData();
    displaySearchResults(results);
  })
}





// Display Slider Movie
const displaySliderMovie = async () => {
  const { results } = await fecthAPIData('movie/now_playing');
  
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)}/ 10
    </h4> 
    `;

    document.querySelector('.swiper-wrapper').appendChild(div)

    initializeSwiper();
  });
  
}

const initializeSwiper = () => {
  const swiper = new Swiper('.swiper', {

    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      700: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    }
  })
}



// Highlight All Active links 
const highlightActiveLinks = () => {
  const links = document.querySelectorAll('.nav-link')
  links.forEach((link) => {
    if(link.getAttribute('href') === globalState.currentPage)
     link.classList.add('active')
  });

}

// SHOW ALERT
const showAlert = (message, className = 'error') => {
   const alterEl = document.createElement('div')
   alterEl.classList.add('alert', className)
   alterEl.appendChild(document.createTextNode(message))
   document.querySelector('#alert').appendChild(alterEl)


   setTimeout(() => alterEl.remove(),3000)
}

const AddCommasToNumber = (number)  => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// Initializing The App
const Init = () => {
    switch (globalState.currentPage){
        case '/':
        case '/index.html':
            displaySliderMovie()
            displayPopularMovies();
        break;
        case '/shows.html':
          displayPopularTVShows();
        break;
        case '/movie-details.html':
          displayMovieDetails()
        break;
        case '/tv-details.html':
           displayShowDetails()
        break;
        case '/search.html':
           searchMovies();
        break;
    }

    highlightActiveLinks();
}




document.addEventListener('DOMContentLoaded', Init)






















