const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

// Utils
function createMovies(movies, container) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    const movieImage = document.createElement("img");

    movieImage.classList.add("movie-img");
    movieImage.setAttribute("alt", movie.title);
    movieImage.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );
    movieContainer.appendChild(movieImage);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    const categoryTitle = document.createElement("h3");

    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

// Llamados a la API

//* Aplicando axios 👇

async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day");
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const { data } = await api("/genre/movie/list");
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api("/discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api("/search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

//* Aplicando fetch 👇

// async function getTrendingMoviesPreview() {
//   const res = await fetch(
//     "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
//   );
//   const data = await res.json();

//   const movies = data.results;
//   movies.forEach((movie) => {
//     const movieContainerPreviewSection = document.querySelector(
//       "#trendingPreview .trendingPreview-movieList"
//     );

//     const movieContainer = document.createElement("div");
//     movieContainer.classList.add("movie-container");

//     const movieImage = document.createElement("img");
//     movieImage.classList.add("movie-img");
//     movieImage.setAttribute("alt", movie.title);
//     movieImage.setAttribute(
//       "src",
//       "https://image.tmdb.org/t/p/w300" + movie.poster_path
//     );
//     movieContainer.appendChild(movieImage);
//     movieContainerPreviewSection.appendChild(movieContainer);
//   });
// }

// async function getCategoriesPreview() {
//   const res = await fetch(
//     "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY
//   );
//   const data = await res.json();

//   const categories = data.genres;
//   categories.forEach((category) => {
//     const previewCategoriesContainer = document.querySelector(
//       "#categoriesPreview .categoriesPreview-list"
//     );

//     const categoryContainer = document.createElement("div");
//     categoryContainer.classList.add("category-container");

//     const categoryTitle = document.createElement("h3");
//     categoryTitle.classList.add("category-title");
//     categoryTitle.setAttribute("id", "id" + category.id);
//     const categoryTitleText = document.createTextNode(category.name);

//     categoryTitle.appendChild(categoryTitleText);
//     categoryContainer.appendChild(categoryTitle);
//     previewCategoriesContainer.appendChild(categoryContainer);
//   });
// }
