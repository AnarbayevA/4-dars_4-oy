let elDiv = document.querySelector(".wrapper-div");
let elSpan = document.querySelector(".search-result");
let elMovieReating = document.querySelector("#movie-reating");
let elMovieYear = document.querySelector("#movie-year");
let elButton = document.querySelector("#search-button");
let elTemplate = document.querySelector("#movie-template").content;
let elCategories = document.querySelector("#categories-list")
let elSearch = document.querySelector("#search-input")


let moviesPieces = movies.slice(0,50)

let normolizeMovies = moviesPieces.map(movieItem =>{
    return{
        title: movieItem.Title.toString(),
        categories: movieItem.Categories,
        rating: movieItem.imdb_rating,
        year: movieItem.movie_year,
        imageLink: `http://i.ytimg.com/vi/${movieItem.ytid}/hqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movieItem.ytid}`
    }
}) 

// function of categories

function generationCategories(movieCategories){
    let categoryList = []

    movieCategories.forEach(function(item){

        let splitItem = item.categories.split("|");

        splitItem.forEach(function(item){
            if(!categoryList.includes(item)){
                categoryList.push(item)
            }
        })
    })

    categoryList.sort()
    let categoryFragment = document.createDocumentFragment()

    categoryList.forEach(function(item){
        let categoryOption = document.createElement("option")
        categoryOption.value = item
        categoryOption.textContent = item
        categoryFragment.appendChild(categoryOption)
    })
    elCategories.appendChild(categoryFragment)
}

generationCategories(normolizeMovies)

// render movies function

function renderMovies(sliceMovies, placePush) {
    
    placePush.innerHTML = null;
    let elFragment = document.createDocumentFragment();

    sliceMovies.forEach(movie => {
        let templateDiv = elTemplate.cloneNode(true);
        
        templateDiv.querySelector(".card-img-top").src = movie.imageLink;
        templateDiv.querySelector(".card-title").textContent = movie.title;
        templateDiv.querySelector(".date-movie").textContent = movie.year;
        templateDiv.querySelector(".rating-movie").textContent = movie.rating;
        templateDiv.querySelector(".btn-movie-trailer").href = movie.youtubeLink;
        
        elFragment.appendChild(templateDiv)
    });
    
    placePush.appendChild(elFragment)
    
    elSpan.innerHTML = null
    elSpan.textContent = sliceMovies.length
}

renderMovies(normolizeMovies, elDiv)

// renderMovies(moviesPieces, elDiv)

elButton.addEventListener("click", function(event){
    event.preventDefault()
    
    //Search with name
    let searchInput = elSearch.value.trim().toLowerCase();

    let searchMovies = normolizeMovies.filter(function(item){
        return item.title.toLowerCase().includes(searchInput)
    })

    

    
    // Search with rating and year
    let list = searchMovies.filter(function(item){
        return (item.rating >= elMovieReating.value && item.year >= elMovieYear.value)

    })  

    // Search with categories
   
    let selectOption = elCategories.value
    let categorisedMovies = []

    if(selectOption === "All"){
        categorisedMovies = list
    }

    else{
        categorisedMovies = list.filter(function(item){
            return item.categories.split("|").includes(selectOption)
        })
    }

    

    elSpan.innerHTML = null
    elSpan.textContent = list.length
    
    renderMovies(categorisedMovies, elDiv)

})



