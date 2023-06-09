const $ = (id) => document.querySelector(id);
const $Id = (id) => document.getElementById(id);

const title = $Id('title');

/* Container Button Back */
const containerBtnBack = $('#container-button--back');
const btnBack = $('.btn-back');

/* Container Button Home */
const containerBtnHome = $('#container-button--home');
const btnHome = $('.btn-home');

/* Category */

// Sections
const sectionCategoryButtons = $('#category-buttons');
const sectionCategoryMoviesPreview = $('#category-movies--preview');
const sectionCategoryMovies = $('#category-movies');

//Container Category Buttons
const containerCategoriesButtons = $('#container-categories--buttons');
const containerCategoryBtnPreviewTop = $('.container-preview-buttons');

// Container Movies
const containerCategoryMoviesPreview = $('#container-category--preview');
const containerCategoryMovies = $('#container-category--movies');
const categoryPreviewTop = $('#category-preview--top');
const articleCategoryMovies = $('#article-category--movies');

// Subtitle
const categoryButtonsSubtitle = $('.subtitle-categories--button');
const categoryPreviewSubititle = $('.subtitle-category--preview');
const categorySubtitle = $('.subtitle-category--movies');

// Buttons
const btnContract = $('.btn-contract');
const btnMore = $('.btn-more');
const btnMoreCategory = $('.btn-more--category');
const btnCategory = $('.btn-category');

/* Trending */

// Sections
const sectionTrendingMoviesPreview = $('#trending-movies--preview');
const sectionTrendingMovies = $('#trending-movies');

// Container Movies
const containerTrendingMoviesPreview = $('#container-trending--preview');
const containerTrendingMovies = $('#container-trending--movies');
const articleTrendingMovies = $('#article-trending--movies');

// Container Trending Preview Top
const containerBtnMoreTrendingPreviewTop = $('.trending-preview--top');

// Subtitle
const subtitleTrendingMovies = $('.subtitle-trending--movies');
const subtitleTrendingMoviesAll = $('.subtitle-trending--moviesAll');

// Buttons
// const btnMoreTrending = $('.btn-more--trending');

/* Movie Details */

// Sections
const sectionMovieDetails = $('#movie-details');

// Container Movies
const containerMovieDetails = $('#container-movie--details');
const containerSimilarMovies = $('#container-similar--movies');

// Subtitle
const subtitleMovieDetails = $('.subtitle-movie--details');
const subtitleSimilarMovies = $('.subtitle-similar--movies');

/* Search Movie */

// Sections
const sectionSearchMovie = $('#search-movies');

// Container Movies
const containerSearchMovies = $('#container-search--movies');
const articleSearchMovie = $('#article-search--movies');
const containerSearchBottom = $('.container-search--bottom');

// Subtitle
const subtitleSearchMovie = $('.subtitle-search--movies');

// Form Search
const formSearch = $Id('form-search');
// Input Search
const inputSearch = $Id('input-movie--search');

// Btn Search
const btnSearch = $('.btn-search');

// List Movies
const sectionMyListMovies = $Id('myList-movies');
const containerMyListMovies = $Id('container-MyList--movies');
const subtitleMyListMovies = $('.subtitle-MyList--movies');

/* SKeleton Loading */

//  Skeleton loading Category Buttons
const skeletonLoadingCategoryBtn = $('#skeleton-category--buttons');
// Skeleton Loading Category Movies Preview
const skeletonLoadingCategoryMoviesPreview = $('#skeleton-category--preview');
const skeletonLoadingCategoryMovies = $('#skeleton-category--movies');

// Skeleton Loading Trending Movies
const skeletonLoadingTrendingMoviesPreview = $('#skeleton-trending--preview');
const skeletonLoadingTrendingMovies = $('#skeleton-trending--movies');

/* SKeleton Movie Details */
const skeletonMovieDetails = $('#skeleton-movies--details');

/* SKeleton Search Movie */
const skeletonLoadingSearchMovie = $('#skeleton-search--movies');

const btnLoadMoreTrending = $('.button-load--moreTrending');
const btnLoadMoreCategory = $('.button-load--moreCategory');
const btnLoadMoreSearch = $('.btn-load--moreSearch');

// Skeleton List Movies
const skeletonLoadingMyListMovies = $('#skeleton-myList--movies');
