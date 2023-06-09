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
// Title
title.addEventListener('click', () => {
    location.hash = '';
    homePage();
});

// Btn - Home
btnHome.addEventListener('click', () => {
    location.hash = '';
    homePage();
});

// Btn - Back
btnBack.addEventListener('click', () => {
    history.back();
});

//BTN - Search Movie
btnSearch.addEventListener('click', () => {
    getMovieBySearch(inputSearch.value);
});

formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
});

inputSearch.addEventListener('keyup', function (e) {
    if (e.key == 'Enter' || e.key == 'enter') {
        getMovieBySearch(inputSearch.value);
    }
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

function likeMovie(movie) {
    const likedMovies = JSON.parse(localStorage.getItem('liked_movies')) || {};

    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}

function getCategoryIdOnLocationHash() {
    const currentHash = decodeURI(location.hash);

    const currentHashSplit = currentHash.split('=');
    console.log(currentHashSplit);
    const [categoryId, _] = currentHashSplit[1].split('-');
    console.log(categoryId);

    return categoryId;
}

function getInputSearchOnLocationHash() {
    const currentHash = decodeURI(location.hash);

    const [_, query] = currentHash.split('=');

    return query;
}

function returnSearchMovieWhenInputSearchIsEmpty() {
    const querySearch = inputSearch.value;

    if (querySearch) {
        return querySearch;
    } else {
        const [_, querySearchLocation] = location.hash.split('=');
        return querySearchLocation;
    }
}

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

        const addToMyListBtn = document.createElement('button');
        addToMyListBtn.innerText = '➕';
        addToMyListBtn.setAttribute('class', 'btn-more btn-add--myList');
        addToMyListBtn.setAttribute('id', i.id);

        const listMovies =
            JSON.parse(localStorage.getItem('liked_movies')) || {};

        if (listMovies[addToMyListBtn.id]) {
            addToMyListBtn.classList.toggle('btn-add--clicked');
            addToMyListBtn.innerHTML = '';
            addToMyListBtn.innerHTML = '✔️';
        }

        addToMyListBtn.addEventListener('click', (e) => {
            addToMyListBtn.classList.toggle('btn-add--clicked');

            if (addToMyListBtn.classList.contains('btn-add--clicked')) {
                addToMyListBtn.innerHTML = '';
                addToMyListBtn.innerHTML = '✔️';

                likeMovie(i);
            } else {
                addToMyListBtn.innerHTML = '';
                addToMyListBtn.innerHTML = '➕';
                likeMovie(i);
            }

            getMoviesFromMyList();
        });

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
        movieContainer.appendChild(addToMyListBtn);
        container.appendChild(movieContainer);
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
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            `${BASE_URL_IMG}${i.poster_path}`
        );

        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'assets/no-image.avif');
        });

        const addToMyListBtn = document.createElement('button');
        addToMyListBtn.innerText = '➕';
        addToMyListBtn.setAttribute('class', 'btn-more btn-add--myListLarge');
        addToMyListBtn.setAttribute('id', i.id);

        const listMovies =
            JSON.parse(localStorage.getItem('liked_movies')) || {};

        if (listMovies[addToMyListBtn.id]) {
            addToMyListBtn.classList.toggle('btn-add--clicked');
            addToMyListBtn.innerHTML = '';
            addToMyListBtn.innerHTML = '✔️';
        }

        addToMyListBtn.addEventListener('click', (e) => {
            addToMyListBtn.classList.toggle('btn-add--clicked');

            if (addToMyListBtn.classList.contains('btn-add--clicked')) {
                addToMyListBtn.innerHTML = '';
                addToMyListBtn.innerHTML = '✔️';

                likeMovie(i);
            } else {
                addToMyListBtn.innerHTML = '';
                addToMyListBtn.innerHTML = '➕';
                likeMovie(i);
            }

            getMoviesFromMyList();
        });

        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(addToMyListBtn);
        container.appendChild(movieContainer);
    });
}

function createContainerMovieDetails(movie, container, subtitle) {
    container.innerHTML = '';

    subtitle.innerHTML = `${movie.title}`;

    const containerImageBtn = document.createElement('div');
    containerImageBtn.setAttribute('class', 'container-movie--imgBtn');

    const movieImg = document.createElement('img');
    movieImg.setAttribute('id', movie.id);
    movieImg.setAttribute('class', 'img-movie--details');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('onClick', 'getMovie(this.id)');
    movieImg.setAttribute('src', `${BASE_URL_IMG}${movie.poster_path}`);

    const addToMyListBtn = document.createElement('button');
    addToMyListBtn.innerText = '➕';
    addToMyListBtn.setAttribute('class', 'btn-more  btn-add--myListMovie');
    addToMyListBtn.setAttribute('id', movie.id);

    const containerDescription = document.createElement('div');
    containerDescription.setAttribute('class', 'container-description');

    const pDescription = document.createElement('p');
    pDescription.innerHTML = `<b class='descritpion-movie'>Descripcion:</b> ${movie.overview}`;

    const pAverage = document.createElement('p');
    pAverage.innerText = `⭐ ${movie.vote_average.toFixed(1)}`;

    const listMovies = JSON.parse(localStorage.getItem('liked_movies')) || {};
    if (listMovies[addToMyListBtn.id]) {
        addToMyListBtn.innerHTML = '';
        addToMyListBtn.innerHTML = '✔️';
    }

    addToMyListBtn.addEventListener('click', (e) => {
        addToMyListBtn.classList.toggle('btn-add--clicked');

        if (addToMyListBtn.classList.contains('btn-add--clicked')) {
            addToMyListBtn.innerHTML = '';
            addToMyListBtn.innerHTML = '✔️';

            likeMovie(movie);
        } else {
            addToMyListBtn.innerHTML = '';
            addToMyListBtn.innerHTML = '➕';
            likeMovie(movie);
        }

        getMoviesFromMyList();
        sectionMyListMovies.setAttribute('class', 'inactive');
    });

    containerImageBtn.appendChild(movieImg);
    containerImageBtn.appendChild(addToMyListBtn);
    container.appendChild(containerImageBtn);
    containerDescription.appendChild(pDescription);
    containerDescription.appendChild(pAverage);
    container.appendChild(containerDescription);

    // container.innerHTML += `
    //         <img id='${movie.id}' src='https://image.tmdb.org/t/p/w500/${
    //     movie.poster_path
    // }' class='img-movie--details' alt='${
    //     movie.original_title
    // }' onClick='getMovie(this.id)'>
    //         <div class='container-description'>
    //             <p><b class='descritpion-movie'>Descripcion:</b> ${
    //                 movie.overview
    //             }</p>
    //             <p>⭐ ${movie.vote_average.toFixed(1)}</p>
    //         </div>
    //             `;
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
        let category = document.getElementById(id);
        let categoryName = category.textContent;
        location.hash = `category=${id}-${categoryName}`;
    }

    const [__, query] = location.hash.split('-');

    categorySubtitle.innerHTML = '';
    categorySubtitle.innerHTML = decodeURI(query);

    const { data } = await api('/discover/movie', {
        params: {
            with_genres: id,
            page,
        },
    });

    movies = data.results;
    const totalPages = data.total_pages;

    createContainerMoviesOnLarge(movies, containerCategoryMovies, {
        lazyLoad: true,
        clean: page == 1,
    });

    skeletonLoadingCategoryMovies.setAttribute('class', 'inactive');

    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = '➕';
    btnLoadMore.classList.add('btn-more', 'btn-load--category');

    const existButton = document.querySelector('.btn-load--category');

    if (!existButton) {
        btnLoadMoreCategory.appendChild(btnLoadMore);
    }

    btnLoadMore.addEventListener('click', () => {
        if (page >= totalPages) {
            const p = document.createElement('p');
            p.setAttribute('class', 'p-mensaje--limite');
            p.innerHTML = 'No hay mas resultado!';
            p.style.color = 'white';
            p.style.fontSize = '25px';
            p.style.paddingBottom = '20px';
            sectionSearchMovie.style.textAlign = 'center';

            btnLoadMore.remove();
            sectionSearchMovie.appendChild(p);
        } else {
            const categoryId = getCategoryIdOnLocationHash();
            getMoviesByGenre(categoryId, page + 1);
            btnLoadMore.remove();
        }
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

    if (document.querySelector('.p-mensaje--limite')) {
        document.querySelector('.p-mensaje--limite').remove();
    }

    const { data } = await api('/trending/movie/day', {
        params: {
            page,
        },
    });

    subtitleTrendingMoviesAll.innerHTML = '';
    subtitleTrendingMoviesAll.innerHTML += 'Trending Movies';

    const movies = data.results;

    const totalPages = data.total_pages;

    createContainerMoviesOnLarge(movies, containerTrendingMovies, {
        lazyLoad: true,
        clean: page == 1,
    });
    skeletonLoadingTrendingMovies.setAttribute('class', 'inactive');

    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = '➕';
    btnLoadMore.classList.add('btn-more', 'btn-load--trending');

    const existButton = document.querySelector('.btn-load--trending');

    if (!existButton) {
        btnLoadMoreTrending.appendChild(btnLoadMore);
    }

    // const btnLoadMore = document.querySelector('#btn-more--trending');

    btnLoadMore.addEventListener('click', () => {
        if (page >= totalPages) {
            const p = document.createElement('p');
            p.setAttribute('class', 'p-mensaje--limite');
            p.innerHTML = 'No hay mas resultado!';
            p.style.color = 'white';
            p.style.fontSize = '25px';
            p.style.paddingBottom = '20px';
            sectionSearchMovie.style.textAlign = 'center';

            btnLoadMore.remove();
            sectionSearchMovie.appendChild(p);
        } else {
            getTrendingMovies(page + 1);
            btnLoadMore.remove();
        }
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
async function getMovieBySearch(query, page = 1) {
    location.hash = `#search=${query}`;

    if (document.querySelector('.p-mensaje--limite')) {
        document.querySelector('.p-mensaje--limite').remove();
    }

    skeletonLoadingSearchMovie.removeAttribute('class');

    const { data } = await api('/search/movie', {
        params: {
            query,
            page,
        },
    });

    const movies = data.results;
    const totalPages = data.total_pages;

    createContainerMoviesOnLarge(movies, containerSearchMovies, {
        lazyLoad: true,
        clean: page == 1,
    });

    skeletonLoadingSearchMovie.setAttribute('class', 'inactive');

    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = '➕';
    btnLoadMore.classList.add('btn-more', 'btn-load--search');

    const existButton = document.querySelector('.btn-load--search');

    if (!existButton) {
        btnLoadMoreSearch.appendChild(btnLoadMore);
    }

    console.log(data);

    btnLoadMore.addEventListener('click', () => {
        if (page >= totalPages) {
            const p = document.createElement('p');
            p.setAttribute('class', 'p-mensaje--limite');
            p.innerHTML = 'No hay mas resultado!';
            p.style.color = 'white';
            p.style.fontSize = '25px';
            p.style.paddingBottom = '20px';
            sectionSearchMovie.style.textAlign = 'center';

            btnLoadMore.remove();
            sectionSearchMovie.appendChild(p);
        } else {
            const querySearch = returnSearchMovieWhenInputSearchIsEmpty();
            getMovieBySearch(querySearch, page + 1);
            btnLoadMore.remove();
        }
    });
}

function removeClassInactive(container) {
    container.removeAttribute('class');
}

function getMoviesFromMyList() {
    containerMyListMovies.setAttribute('class', 'inactive');
    skeletonLoadingMyListMovies.removeAttribute('class');

    const listMovies = JSON.parse(localStorage.getItem('liked_movies')) || {};

    subtitleMyListMovies.innerHTML = '';
    subtitleMyListMovies.innerHTML = 'Mi Lista';

    if (listMovies == {}) {
        sectionMyListMovies.setAttribute('class', 'inactive');
    } else {
        sectionMyListMovies.removeAttribute('class');
        createContainerMoviesAndScrollX(
            Object.values(listMovies),
            containerMyListMovies,
            true
        );
        removeClassInactive(containerMyListMovies);
    }

    skeletonLoadingMyListMovies.setAttribute('class', 'inactive');
}
