// Global Variables
const API_KEY = '21986a7db51b69eee31c7a5cc67cd807';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w300/';
const PATH_TRENDING = '/trending/movie/day';
const PATH_GENRE = '/genre/movie/list';
const PARAMETER_LANGUAGE = '&language=es';
const URL_GENRE = '/discover/movie';

// AXIOS
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        api_key: API_KEY,
        language: 'es-ES',
    },
});

// Events
//BTN - Search Movie
btnSearch.addEventListener('click', () => {
    getMovieBySearch(inputSearch.value);

    subtitleSearchMovie.innerHTML = '';
    subtitleSearchMovie.innerHTML = `Search: ${inputSearch.value}`;
});

// Btn - Contract -> Section Movies Category Preview
btnContract.addEventListener('click', () => {
    sectionCategoryMoviesPreview.setAttribute('class', 'inactive');
    hideBtnCategorySelected();
});

// Btn - Back
btnBack.addEventListener('click', () => {
    history.back();
});

// Functions

// Create Container with movies and scroll X
function createContainerMoviesAndScrollX(iterable, container) {
    container.innerHTML = '';

    iterable.forEach((i) => {
        container.innerHTML += `
            <div class='movie'>
                <img id='${i.id}' src='${BASE_URL_IMG}${i.poster_path}' alt='${i.original_title}' onClick='getMovie(this.id)'/>
            </div>
        `;
    });
}

// Create Container with movies on large
function createContainerMoviesOnLarge(iterable, container) {
    container.innerHTML = '';

    iterable.forEach((i) => {
        container.innerHTML += `
            <div class='movie-large'>
                <img id='${i.id}' src='${BASE_URL_IMG}${i.poster_path}' alt='${i.original_title}' onClick='getMovie(this.id)'/>
            </div>
        `;
    });
}

function createContainerMovieDetails(movie, container, subtitle) {
    container.innerHTML = '';

    subtitle.innerHTML = `${movie.title}`;

    container.innerHTML += `
            <img id='${movie.id}' src='https://image.tmdb.org/t/p/w500/${
        movie.poster_path
    }' class='img-movie--details' alt='${
        movie.original_title
    }' onClick='getMovie(this.id)'>
            <div class='container-description'>
                <p><b class='descritpion-movie'>Descripcion:</b> ${
                    movie.overview
                }</p>
                <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            </div>
                `;
}

// Hide Button Category Selection
function hideBtnCategorySelected() {
    let btnCategory = document.querySelectorAll('.btn-category');
    btnCategory.forEach((btn) => {
        btn.classList.remove('clicked');
    });
}

// Show Button Category Selection
function showBtnCategorySelected() {
    let btnCategory = document.querySelectorAll('.btn-category');
    let btnPrevious = null;

    btnCategory.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btnPrevious !== null) {
                btnPrevious.classList.remove('clicked');
            } else if (true) {
                btnCategory.forEach((btn) => {
                    if (btn.classList.contains('clicked')) {
                        btn.classList.remove('clicked');
                    }
                });
            }
            btn.classList.add('clicked');
            btnPrevious = btn;
        });
    });
}

/* Category */

// GET Categories Buttons
async function getCategories() {
    const { data } = await api('/genre/movie/list');

    const categories = data.genres;

    sectionCategoryButtons.removeAttribute('class');

    categoryButtonsSubtitle.innerHTML = 'Categorias';

    await categories.forEach((category) => {
        containerCategoriesButtons.innerHTML += `
            <button id=${category.id} class='btn-category' onClick='getMoviesByGenrePreview(this.id)'>${category.name}</button>
        `;
    });

    showBtnCategorySelected();

    const btnCategory = document.querySelectorAll('.btn-category');

    btnCategory.forEach((btn) => {
        if (btn.classList.contains('clicked')) {
            sectionCategoryMoviesPreview.removeAttribute('class');
            return;
        }
    });

    skeletonLoadingCategoryBtn.setAttribute('class', 'inactive');
}

// GET Movies by Category Preview
async function getMoviesByGenrePreview(id) {
    // Remove a inactive class
    sectionCategoryMoviesPreview.removeAttribute('class');
    skeletonLoadingCategoryMoviesPreview.removeAttribute('class');

    // Set a inactive class
    btnContract.setAttribute('class', 'inactive');
    btnMoreCategory.setAttribute('class', 'inactive');

    const genre = document.getElementById(`${id}`).textContent;
    btnMoreCategory.setAttribute('id', id);

    containerCategoryMoviesPreview.innerHTML = '';
    categoryPreviewSubititle.innerHTML = '';

    // Set Name in Container Category Movies on container Large
    categorySubtitle.innerHTML = '';
    categorySubtitle.innerHTML = `Categoria: ${genre}`;

    const res = await fetch(
        `${BASE_URL}${URL_GENRE}?api_key=${API_KEY}&with_genres=${id}`
    );
    const data = await res.json();

    const movies = data.results;

    // Hide Skeleton Loadint Category Movies Preview
    skeletonLoadingCategoryMoviesPreview.setAttribute('class', 'inactive');

    createContainerMoviesAndScrollX(movies, containerCategoryMoviesPreview);

    // Set Name in Container Category Movies Preview
    categoryPreviewSubititle.innerHTML += `Categoria: ${genre}`;

    // Show the buttons, quit the inactive class
    btnMoreCategory.setAttribute('class', 'btn-more', 'btn-more--category');
    btnContract.setAttribute('class', 'btn-contract');
}

// GET Movies By Category
async function getMoviesByGenre(id) {
    location.hash = `#category=${id}`;
    skeletonLoadingCategoryMovies.removeAttribute('class');

    const res = await fetch(
        `${BASE_URL}${URL_GENRE}?api_key=${API_KEY}&with_genres=${id}`
    );

    const data = await res.json();

    const movies = data.results;

    createContainerMoviesOnLarge(movies, containerCategoryMovies);
    skeletonLoadingCategoryMovies.setAttribute('class', 'inactive');
}

/* Trending */

// GET Trending Movies Preview
async function getTrendingMoviesPreview() {
    skeletonLoadingCategoryMoviesPreview.removeAttribute('class');

    const { data } = await api('/trending/movie/day');

    const movies = data.results;

    subtitleTrendingMovies.innerHTML = 'Trending';
    // btnMoreTrending.innerHTML = '➕';
    containerBtnMoreTrendingPreviewTop.innerHTML = '';
    containerBtnMoreTrendingPreviewTop.innerHTML += `
        <button class="btn-more btn-more--trending" onclick="getTrendingMovies()">➕</button>
    `;

    createContainerMoviesAndScrollX(movies, containerTrendingMoviesPreview);
    skeletonLoadingTrendingMoviesPreview.setAttribute('class', 'inactive');
}

async function getTrendingMovies() {
    location.hash = `#trends`;
    skeletonLoadingTrendingMovies.removeAttribute('class');

    const { data } = await api('/trending/movie/day');

    subtitleTrendingMoviesAll.innerHTML = '';
    subtitleTrendingMoviesAll.innerHTML += 'Trending Movies';

    const movies = data.results;

    createContainerMoviesOnLarge(movies, containerTrendingMovies);
    skeletonLoadingTrendingMovies.setAttribute('class', 'inactive');
}

/* Movie */
async function getMovie(id) {
    location.hash = `#movie=${id}`;
    skeletonMovieDetails.removeAttribute('class');

    const res = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}${PARAMETER_LANGUAGE}`
    );
    const movie = await res.json();

    createContainerMovieDetails(
        movie,
        containerMovieDetails,
        subtitleMovieDetails
    );

    subtitleSimilarMovies.innerHTML = '';
    subtitleSimilarMovies.innerHTML = 'Peliculas Similares';

    GetSimilarMovies(id);
    skeletonMovieDetails.setAttribute('class', 'inactive');
}

/* Similar Movies */
async function GetSimilarMovies(id) {
    const { data } = await api(`/movie/${id}/similar`);

    const movies = data.results;

    createContainerMoviesAndScrollX(movies, containerSimilarMovies);
}

/* Search Movie */
async function getMovieBySearch(query) {
    location.hash = `#search=${query}`;
    skeletonLoadingSearchMovie.removeAttribute('class');

    const { data } = await api('/search/movie', {
        params: {
            query,
        },
    });

    const movies = data.results;

    createContainerMoviesOnLarge(movies, containerSearchMovies);
    skeletonLoadingSearchMovie.setAttribute('class', 'inactive');
}
