window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    location.hash.startsWith('#trends')
        ? trendsPage()
        : location.hash.startsWith('#search=')
        ? searchPage()
        : location.hash.startsWith('#movie=')
        ? movieDetailsPage()
        : location.hash.startsWith('#category=')
        ? categoriesPage()
        : homePage();
}

function homePage() {
    window.scrollTo(0, 0);

    // Invoke Functions
    getTrendingMoviesPreview();

    getCategories();

    getMoviesFromMyList();

    containerBtnBack.setAttribute('class', 'inactive');
    containerBtnHome.setAttribute('class', 'inactive');
    sectionCategoryButtons.removeAttribute('class');
    sectionTrendingMoviesPreview.removeAttribute('class');

    // Category
    sectionCategoryMovies.setAttribute('class', 'inactive');
    skeletonLoadingCategoryMoviesPreview.setAttribute('class', 'inactive');
    // Trending
    sectionTrendingMovies.setAttribute('class', 'inactive');
    // Movie Details
    sectionMovieDetails.setAttribute('class', 'inactive');
    //Search Movie
    sectionSearchMovie.setAttribute('class', 'inactive');
}

function categoriesPage() {
    window.scrollTo(0, 0);

    containerBtnBack.removeAttribute('class');
    containerBtnHome.setAttribute('class', 'inactive');
    // Category
    sectionCategoryMovies.removeAttribute('class');

    sectionCategoryButtons.setAttribute('class', 'inactive');
    sectionCategoryMoviesPreview.setAttribute('class', 'inactive');
    // Trending
    sectionTrendingMoviesPreview.setAttribute('class', 'inactive');
    sectionTrendingMovies.setAttribute('class', 'inactive');
    // Movie Details
    sectionMovieDetails.setAttribute('class', 'inactive');
    //Search Movie
    sectionSearchMovie.setAttribute('class', 'inactive');

    sectionMyListMovies.setAttribute('class', 'inactive');

    const categoryId = getCategoryIdOnLocationHash();
    getMoviesByGenre(categoryId);
}

function trendsPage() {
    window.scrollTo(0, 0);

    containerBtnBack.removeAttribute('class');
    containerBtnHome.setAttribute('class', 'inactive');
    // Category
    sectionTrendingMovies.removeAttribute('class');

    sectionCategoryMovies.setAttribute('class', 'inactive');
    sectionCategoryButtons.setAttribute('class', 'inactive');
    sectionCategoryMoviesPreview.setAttribute('class', 'inactive');
    // Trending
    sectionTrendingMoviesPreview.setAttribute('class', 'inactive');
    // Movie Details
    sectionMovieDetails.setAttribute('class', 'inactive');
    //Search Movie
    sectionSearchMovie.setAttribute('class', 'inactive');

    sectionMyListMovies.setAttribute('class', 'inactive');

    getTrendingMovies();
}

function searchPage() {
    window.scrollTo(0, 0);

    //Search Movie
    sectionSearchMovie.removeAttribute('class');

    containerBtnBack.setAttribute('class', 'inactive');
    containerBtnHome.removeAttribute('class');
    // Category
    sectionCategoryMovies.setAttribute('class', 'inactive');
    sectionCategoryButtons.setAttribute('class', 'inactive');
    sectionCategoryMoviesPreview.setAttribute('class', 'inactive');
    // Trending
    sectionTrendingMoviesPreview.setAttribute('class', 'inactive');
    sectionTrendingMovies.setAttribute('class', 'inactive');
    // Movie Details
    sectionMovieDetails.setAttribute('class', 'inactive');

    sectionMyListMovies.setAttribute('class', 'inactive');

    const querySearch = returnSearchMovieWhenInputSearchIsEmpty();
    getMovieBySearch(querySearch);
}

function movieDetailsPage() {
    window.scrollTo(0, 0);

    containerBtnBack.removeAttribute('class');
    containerBtnHome.setAttribute('class', 'inactive');
    // Movie Details
    sectionMovieDetails.removeAttribute('class');

    // Category
    sectionCategoryMovies.setAttribute('class', 'inactive');
    sectionCategoryButtons.setAttribute('class', 'inactive');
    sectionCategoryMoviesPreview.setAttribute('class', 'inactive');
    // Trending
    sectionTrendingMoviesPreview.setAttribute('class', 'inactive');
    sectionTrendingMovies.setAttribute('class', 'inactive');
    //Search Movie
    sectionSearchMovie.setAttribute('class', 'inactive');

    sectionMyListMovies.setAttribute('class', 'inactive');

    const [_, query] = location.hash.split('=');
    getMovie(query);
}
