const API_KEY = "ae2dabf7ff4c9e7f8ad75f14c9218617";
// constantes home//
const popularMovies = document.getElementById("popular-movies");
const imgContainer = document.getElementsByClassName("img-container");
const divWrapper = document.getElementsByClassName("category-wrap");
const movieTitle = document.getElementsByClassName("movie-title");
const categoryList = document.getElementsByClassName("category-list");
const fullMoviesDisplay = document.getElementsByClassName("display-movies");
const search = document.getElementById("miBusqueda");
const topRatedMovies = document.getElementById("top-rated");
const upcomingMovies = document.getElementById("upcoming-movies");
const nowPlayingMovies = document.getElementById("now-playing");
const bannerIMG = document.getElementsByClassName("banner-img");
const viewAll = document.getElementsByClassName("view-all");
const viewContent = document.getElementsByClassName("view-content");
const categoryTitle = document.getElementsByClassName("category-title");
const button = document.getElementsByClassName("load-more-btn");
const fullMovies = document.getElementById("full-movies");
const fullContainer = document.getElementsByClassName("img-fullContainer");
// constantes modal //
const backgroundPoster = document.getElementById("background");
const poster = document.getElementById("poster");
const genres = document.getElementById("genre");
const tagline = document.getElementById("tagline");
const closeModal = document.getElementById("close");
const modal = document.getElementById("movie-detail");

let numeroImagenAnterior = 1;

let paginaActual = 1;



// Populares

const morePopular = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let results = data.results.slice(0, 5);
            divWrapper[0].innerHTML = "";
            for (const movieData of results) {
                const newMovie = imgContainer[0].cloneNode(true);
                newMovie.children[0].src = `https://image.tmdb.org/t/p/w500/${
                    movieData.poster_path
                    }`;
                newMovie.children[1].innerText = movieData.title;

                newMovie.onclick = () => showModal(movieData.id);
                divWrapper[0].appendChild(newMovie);
            }
        });
};

// Top Rated

const topRated = () => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let results = data.results.slice(0, 5);
            divWrapper[1].innerHTML = ""; // imgContainer.innerHTML = "";
            for (const movieData of results) {
                const newMovie = imgContainer[1].cloneNode(true);
                newMovie.children[0].src = `https://image.tmdb.org/t/p/w500/${
                    movieData.poster_path
                    }`;
                newMovie.children[1].innerText = movieData.title;

                newMovie.onclick = () => showModal(movieData.id);
                divWrapper[1].appendChild(newMovie);
            }
        });
};

// Upcoming

const upcoming = () => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let results = data.results.slice(0, 5);
            divWrapper[2].innerHTML = "";
            for (const movieData of results) {
                const newMovie = imgContainer[2].cloneNode(true);
                newMovie.children[0].src = `https://image.tmdb.org/t/p/w500/${
                    movieData.poster_path
                    }`;
                newMovie.children[1].innerText = movieData.title;

                newMovie.onclick = () => showModal(movieData.id);
                divWrapper[2].appendChild(newMovie);
            }
        });
};

// Now playing

const nowPlaying = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            let results = data.results.slice(0, 5);
            divWrapper[3].innerHTML = "";
            for (const movieData of results) {
                const newMovie = imgContainer[3].cloneNode(true);
                newMovie.children[0].src = `https://image.tmdb.org/t/p/w500/${
                    movieData.poster_path
                    }`;
                newMovie.children[1].innerText = movieData.title;
                newMovie.onclick = () => showModal(movieData.id);
                divWrapper[3].appendChild(newMovie);
            }
        });
};


const uploadCategories = categoria => {
    fetch(
        `https://api.themoviedb.org/3/movie/${categoria}?api_key=${API_KEY}&page=${paginaActual}`
    )
        .then(response => response.json())
        .then(data => {
            viewAll[4].innerText = `${data.total_results} results`;
            let results = data.results.slice(0, 20);
            for (const movies of results) {
                const nodesMovies = imgContainer[4].cloneNode(true);
                nodesMovies.children[0].src = `https://image.tmdb.org/t/p/w500/${
                    movies.poster_path
                    }`;
                nodesMovies.children[1].innerText = movies.title;
                nodesMovies.onclick = () => showModal(movies.id);
                divWrapper[4].appendChild(nodesMovies);
            }
        });
};

//Load more

const buttonLoadMore = category => {
    fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${paginaActual}`
    )
        .then(response => response.json())
        .then(data => {
            let results = data.results.slice(0, 20);
            for (const movies of results) {
                const nodesMovies = imgContainer[4].cloneNode(true);
                nodesMovies.children[0].src = `https://image.tmdb.org/t/p/w500/${
                    movies.poster_path
                    }`;
                nodesMovies.children[1].innerText = movies.title;
                divWrapper[4].appendChild(nodesMovies);
            }
        });
};

// ONCLICK LOGO DE ADA //

categoryList[0].onclick = () => {
    fullMovies.style.display = "none";
    popularMovies.style.display = "block";
    topRatedMovies.style.display = "block";
    upcomingMovies.style.display = "block";
    nowPlayingMovies.style.display = "block";
    categoryTitle[4].style.display = "none";
    bannerIMG[0].style.display = "block";
    viewContent[4].style.display = "none";
    mostrarTitulos();
};

// SEARCH  //

let timer;

search.onkeypress = () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (search.value) updateMovie(search.value);
    }, 600);
};

const resetBanner = () => {
    bannerIMG.style.height = "400px";
    bannerIMG.style.transition = "0.5s";
};

const updateMovie = () => {
    fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${
        search.value
        }&page=${paginaActual}`
    )
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            divWrapper[4].innerHTML = "";
            if (data.total_results <= 1) {
                viewAll[4].innerHTML = `${data.total_results} result`;
            } else {
                viewAll[4].innerHTML = `${data.total_results} results`;
            }

            if (data.results.length > 1) {
                let results = data.results.slice(0, 20);
                for (const movies of results) {
                    categoryTitle[4].innerHTML = "Search results";
                    const nodesMovies = imgContainer[4].cloneNode(true);
                    nodesMovies.children[0].src = `https://image.tmdb.org/t/p/w500/${
                        movies.poster_path
                        }`;
                    nodesMovies.children[1].innerText = movies.title;
                    nodesMovies.onclick = () => showModal(movies.id);
                    divWrapper[4].appendChild(nodesMovies);
                }
            } else {
                button[0].style.visibility = "hidden";
                categoryTitle[4].innerHTML = "Nothing found";
                categoryTitle[4].style.margin = "0 auto";
                categoryTitle[4].style.textAlign = "center";
                viewContent[4].style.display = "none";

                fullMovies.style.backgroundImage = `url(batman.jpg)`;
                resetBanner();
            }
        });
};

search.onchange = () => {
    ocultandoDivs();
    ocultarTitulos();
    updateMovie();
};

// MODAL

const showModal = movieId => {
    modal.style.display = "block";
    mostrarPelicula(movieId);
    updateGenres(movieId);
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

closeModal.onclick = () => {
    modal.style.display = "none";
};

const updateGenres = movieId => {
    fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            let arrayGenre = [];
            for (let i = 0; i < data.genres.length; i++) {
                arrayGenre.push(" " + data.genres[i].name);
            }
            genres.innerHTML = arrayGenre;
        });
};
const mostrarPelicula = movieId => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            title.innerHTML = data.title;
            tagline.innerHTML = data.tagline;
            description.innerHTML = data.overview;
            date.innerHTML = data.release_date;
            backgroundPoster.src = `https://image.tmdb.org/t/p/w1280/${
                data.backdrop_path
                }`;
            poster.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
            updateGenres(movieId);
        });
};

// BOTONES POR CATEGORÍA (NAV)

categoryList[1].onclick = () => {
    popularFunctions();
};

categoryList[2].onclick = () => {
    topRatedFunctions();
};

categoryList[3].onclick = () => {
    upcomingFunctions();
};

categoryList[4].onclick = () => {
    nowPlayingFunctions();
};

// botones view all  

viewContent[0].onclick = () => {
    popularFunctions();
};

viewContent[1].onclick = () => {
    topRatedFunctions();
};

viewContent[2].onclick = () => {
    upcomingFunctions();
};

viewContent[3].onclick = () => {
    nowPlayingFunctions();
};

// funciones titulos

const ocultarTitulos = () => {
    for (let i = 0; i <= 3; i++) {
        categoryTitle[i].style.display = "none";
    }

    for (let i = 0; i <= 3; i++) {
        viewContent[i].style.display = "none";
    }
};

const mostrarTitulos = () => {
    for (let i = 0; i <= 3; i++) {
        categoryTitle[i].style.display = "block";
    }

    for (let i = 0; i <= 3; i++) {
        viewContent[i].style.display = "block";
    }
};

// funciones ocultar div

const ocultandoDivs = () => {
    fullMovies.style.display = "block";
    divWrapper[4].innerHTML = "";
    popularMovies.style.display = "none";
    topRatedMovies.style.display = "none";
    upcomingMovies.style.display = "none";
    nowPlayingMovies.style.display = "none";
    bannerIMG[0].style.display = "none";
    categoryTitle[4].style.display = "";
};

// funciones 

document.getElementById("miBusqueda").onclick = () => {
    document.getElementsByClassName("fa-search")[0].style.opacity = "1";
};

const popularFunctions = () => {
    categoryList[1].style.backgroundColor = "#f8f8f8";
    categoryList[2].style.backgroundColor = "transparent";
    categoryList[3].style.backgroundColor = "transparent";
    categoryList[4].style.backgroundColor = "transparent";
    paginaActual = 1;
    button[0].onclick = () => {
        paginaActual++;
        buttonLoadMore("popular");
    };
    ocultandoDivs();
    categoryTitle[4].innerText = "Popular Movies";
    ocultarTitulos();
    uploadCategories("popular");
    button[0].style.visibility = "visible";
    viewContent[4].style.display = "block";
    categoryTitle[4].style.margin = "0";
    categoryTitle[4].style.textAlign = "left";
};

const topRatedFunctions = () => {
    categoryList[1].style.backgroundColor = "transparent";
    categoryList[2].style.backgroundColor = "#f8f8f8";
    categoryList[3].style.backgroundColor = "transparent";
    categoryList[4].style.backgroundColor = "transparent";
    paginaActual = 1;
    button[0].onclick = () => {
        paginaActual = 1;
        paginaActual++;
        buttonLoadMore("top_rated");
    };
    ocultandoDivs();
    categoryTitle[4].innerText = "Top Rated Movies";
    ocultarTitulos();
    uploadCategories("top_rated");
    button[0].style.visibility = "visible";
    viewContent[4].style.display = "block";
    categoryTitle[4].style.margin = "0";
    categoryTitle[4].style.textAlign = "left";
};

const upcomingFunctions = () => {
    categoryList[1].style.backgroundColor = "transparent";
    categoryList[2].style.backgroundColor = "transparent";
    categoryList[3].style.backgroundColor = "#f8f8f8";
    categoryList[4].style.backgroundColor = "transparent";
    paginaActual = 1;
    button[0].onclick = () => {
        paginaActual++;
        buttonLoadMore("upcoming");
    };
    ocultandoDivs();
    categoryTitle[4].innerText = "Upcoming Movies";
    ocultarTitulos();
    uploadCategories("upcoming");
    button[0].style.visibility = "visible";
    viewContent[4].style.display = "block";
    categoryTitle[4].style.margin = "0";
    categoryTitle[4].style.textAlign = "left";
};

const nowPlayingFunctions = () => {
    categoryList[1].style.backgroundColor = "transparent";
    categoryList[2].style.backgroundColor = "transparent";
    categoryList[3].style.backgroundColor = "transparent";
    categoryList[4].style.backgroundColor = "#f8f8f8";
    paginaActual = 1;
    button[0].onclick = () => {
        paginaActual++;
        buttonLoadMore("now_playing");
    };
    ocultandoDivs();
    categoryTitle[4].innerText = "Now Playing Movies";
    ocultarTitulos();
    uploadCategories("now_playing");
    button[0].style.visibility = "visible";
    viewContent[4].style.display = "block";
    categoryTitle[4].style.margin = "0";
    categoryTitle[4].style.textAlign = "left";
};



morePopular();
topRated();
upcoming();
nowPlaying();
