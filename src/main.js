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

// Btn - Back
btnBack.addEventListener('click', () => {
    history.back();
});

// Functions

// Utils

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    });
});

// function btnContract
function btnContractFun() {
    sectionCategoryMoviesPreview.setAttribute('class', 'inactive');
    hideBtnCategorySelected();
}

// Create Container with movies and scroll X
function createContainerMoviesAndScrollX(
    iterable,
    container,
    lazyLoad = false
) {
    container.innerHTML = '';

    iterable.forEach((i) => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie');

        const movieImg = document.createElement('img');
        movieImg.setAttribute('id', i.id);
        movieImg.setAttribute('alt', i.title);
        movieImg.setAttribute('onClick', 'getMovie(this.id)');

        if (i.poster_path) {
            movieImg.setAttribute(
                lazyLoad ? 'data-img' : 'src',
                `${BASE_URL_IMG}${i.poster_path}`
            );
        } else {
            movieImg.setAttribute('src', 'assets/no-image.avif');
        }

        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);

        // container.innerHTML += `
        //     <div class='movie'>
        //         <img id='${i.id}' data-img='${BASE_URL_IMG}${i.poster_path}' alt='${i.original_title}' onClick='getMovie(this.id)'/>
        //     </div>
        // `;
    });
}

// Create Container with movies on large
function createContainerMoviesOnLarge(
    iterable,
    container,
    { lazyLoad = false, clean = true }
) {
    if (clean) {
        container.innerHTML = '';
    }

    iterable.forEach((i) => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-large');

        const movieImg = document.createElement('img');
        movieImg.setAttribute('id', i.id);
        movieImg.setAttribute('alt', i.title);
        movieImg.setAttribute('onClick', 'getMovie(this.id)');

        if (i.poster_path) {
            movieImg.setAttribute(
                lazyLoad ? 'data-img' : 'src',
                `${BASE_URL_IMG}${i.poster_path}`
            );
        } else {
            movieImg.setAttribute('src', 'assets/no-image.avif');
        }

        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
        // if (clean) {
        //     container.innerHTML = '';
        // }

        // iterable.forEach((i) => {
        //     if (i.poster_path) {
        //         container.innerHTML += `
        //         <div class='movie-large'>
        //             <img id='${i.id}' src='${BASE_URL_IMG}${i.poster_path}' alt='${i.original_title}' onClick='getMovie(this.id)'/>
        //         </div>
        //     `;
        //     } else {
        //         container.innerHTML += `
        //         <div class='movie-large'>
        //             <img id='${i.id}' src='assets/no-image.avif' alt='${i.original_title}' onClick='getMovie(this.id)'/>
        //         </div>
        //     `;
        //     }
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
    const genre = document.getElementById(`${id}`).textContent;

    // Remove a inactive class
    sectionCategoryMoviesPreview.removeAttribute('class');
    skeletonLoadingCategoryMoviesPreview.removeAttribute('class');

    containerCategoryMoviesPreview.innerHTML = '';
    categoryPreviewSubititle.innerHTML = '';
    containerCategoryBtnPreviewTop.innerHTML = '';

    //categorySubtitle
    categorySubtitle.innerHTML = '';
    categorySubtitle.innerHTML = `Categoria: ${genre}`;

    const { data } = await api('/discover/movie', {
        params: {
            with_genres: id,
        },
    });

    movies = data.results;

    // Hide Skeleton Loadint Category Movies Preview
    skeletonLoadingCategoryMoviesPreview.setAttribute('class', 'inactive');

    createContainerMoviesAndScrollX(
        movies,
        containerCategoryMoviesPreview,
        true
    );

    // Set Name in Container Category Movies Preview
    categoryPreviewSubititle.innerHTML += `Categoria: ${genre}`;

    containerCategoryBtnPreviewTop.innerHTML = `
                        <button class="btn-contract" onclick="btnContractFun()">🔺</button>
                        <button
                            id='${id}'
                            class="btn-more btn-more--category"
                            onclick="getMoviesByGenre(this.id)"
                        >
                            ➕
                        </button>
                        `;
}

// GET Movies By Category
async function getMoviesByGenre(id, page = 1) {
    if (document.getElementById(id)) {
        let categoryName = document.getElementById(id).textContent;
        location.hash = `category=${id}-${categoryName}`;
    }

    const [_, query] = location.hash.split('-');
    categorySubtitle.innerHTML = '';
    categorySubtitle.innerHTML = decodeURI(query);

    const { data } = await api('/discover/movie', {
        params: {
            with_genres: id,
            page,
        },
    });

    movies = data.results;

    createContainerMoviesOnLarge(movies, containerCategoryMovies, {
        lazyLoad: true,
        clean: page == 1,
    });

    skeletonLoadingCategoryMovies.setAttribute('class', 'inactive');

    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = '➕';
    btnLoadMore.classList.add('btn-more');

    containerCategoryMovies.appendChild(btnLoadMore);

    // const btnLoadMore = document.querySelector('#btn-more--trending');

    btnLoadMore.addEventListener('click', () => {
        getTrendingMovies(page + 1);
        btnLoadMore.remove();
    });
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

    createContainerMoviesAndScrollX(
        movies,
        containerTrendingMoviesPreview,
        true
    );
    skeletonLoadingTrendingMoviesPreview.setAttribute('class', 'inactive');
}

async function getTrendingMovies(page = 1) {
    location.hash = `#trends`;
    skeletonLoadingTrendingMovies.removeAttribute('class');

    const { data } = await api('/trending/movie/day', {
        params: {
            page,
        },
    });

    subtitleTrendingMoviesAll.innerHTML = '';
    subtitleTrendingMoviesAll.innerHTML += 'Trending Movies';

    const movies = data.results;

    createContainerMoviesOnLarge(movies, containerTrendingMovies, {
        lazyLoad: true,
        clean: page == 1,
    });
    skeletonLoadingTrendingMovies.setAttribute('class', 'inactive');

    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = '➕';
    btnLoadMore.classList.add('btn-more');

    containerTrendingMovies.appendChild(btnLoadMore);

    // const btnLoadMore = document.querySelector('#btn-more--trending');

    btnLoadMore.addEventListener('click', () => {
        getTrendingMovies(page + 1);
        btnLoadMore.remove();
    });
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

    console.log(movies);

    createContainerMoviesOnLarge(movies, containerSearchMovies);
    skeletonLoadingSearchMovie.setAttribute('class', 'inactive');
}
