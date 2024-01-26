const globalState = {
    currentPage: window.location.pathname
};

// Displaying The Popular Movies
const displayPopularMovies =  async () => {
    const results = await fecthAPIData('movie/popular')
    console.log(results)
}


// Fetching DATA FROM THE TMDB MOVIE DATABASE API
const fecthAPIData = async (endpoint)  => {
    const API_KEY = '1540ee2b0c7fb27966e243ea305332d3';
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}?language=en-US&page=1`
        );

    const data  = await response.json();

    return data;
}

// Highlight All Active links 
const highlightActiveLinks = () => {
  const links = document.querySelectorAll('.nav-link')
  links.forEach((link) => {
    if(link.getAttribute('href') === globalState.currentPage)
     link.classList.add('active')
  });

}



// Initializing The App
const Init = () => {
    switch (globalState.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
        break;
        case '/shows.html':
           console.log('Shows Page')
        break;
        case '/movie-details.html':
          console.log('Movies Details')
        break;
        case '/tv-details.html':
            console.log('Tv Details')
        break;
        case '/search.html':
            console.log('Search Page')
        break;
    }

    highlightActiveLinks()
}




document.addEventListener('DOMContentLoaded', Init)






















// 1540ee2b0c7fb27966e243ea305332d3