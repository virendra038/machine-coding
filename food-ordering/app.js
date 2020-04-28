let results = [];
let originalArray = [];
let favoriteHotels = JSON.parse(localStorage.getItem('favoriteHotels')) || [];
console.log(favoriteHotels);
fetch('./restaurants-data.json')
    .then(res=>res.json())
    .then(function(res){
        console.log(res);
        results = res;
        originalArray = res.slice();
        renderHotels();
    })
    .catch(function(err){

    });

function hotelCard(hotel){
    return `<div class="hotelCard">
                <img src="${hotel.imageUrl}" alt="hotel" class="hotel-image">
                <div class="hotel-body">
                    <h1 class="hotel-title">${hotel.name}</h1>
                    <div class="hotel-rating">Rating: <b>${hotel.rating}</b></div>
                    <div class="hotel-location">Location: <b>${hotel.location}</b></div>
                    <div>Speciality : ${hotel.tags.map(tag=>tag).join(',')}</div>
                    <div>Expected delivery time : ${hotel.eta} min</div>
                    <div><button class="fav-button" id="${hotel.id}">Mark as favorite</button></div>
                </div>
            </div>`
}

function markAsFavorite(event){
    event.stopPropagation();
    console.log(event.target.className);
    if(event.target.className === 'fav-button'){
        console.log(event.target.id);
        let index = results.findIndex(function(obj){
            return obj.id == event.target.id;
        });
        console.log(index);
        if(index > -1){
            favoriteHotels.push(results[index]);
            localStorage.setItem('favoriteHotels',JSON.stringify(favoriteHotels));
        }
        console.log(favoriteHotels);
    }
}

function getFavorites() {
    results = favoriteHotels;
    console.log('reslts',results);
    renderHotels();
}

function getAlls(){
    results = originalArray;
    renderHotels();
}

function getSearchResult(event){
    event.preventDefault();
    let searchValue = document.getElementById('search-input').value;
    console.log(searchValue);
    searchValue = searchValue.toLowerCase();
    results = originalArray.filter(hotel=>{
        let hotelName = hotel.name.toLowerCase();
        return hotelName.includes(searchValue);
    });

    renderHotels();
}

function renderHotels(){
    document.getElementById('restaurant-containers').innerHTML = `${results.map(hotelCard).join('')}`;
    let hotels = document.getElementById('restaurant-containers');
    hotels.addEventListener('click',markAsFavorite);
}

const sortByArray = [
    {
        key:1,
        name:'Ratings'
    },
    {
        key:2,
        name:'Delivery Time'
    }
];

function renderSortOption(o){
    return `<option value="${o.key}">${o.name}</option>`
}

function callSortByFn(value) {
    console.log(value);
    let arr = originalArray.slice();
    if(value == 1){
        results = arr.sort((a,b)=>b.rating-a.rating)
    } else if(value == 2){
        results = arr.sort((a,b)=>a.eta-b.eta)
    } else {
        results = arr;
    }
    renderHotels();
}

function renderSort(){
    document.getElementById('sortBy').innerHTML = `
        <select onchange="callSortByFn(value)">
            <option value="">sort by</option>
            ${sortByArray.map(renderSortOption).join('')}
        </select>
       `
}
renderSort();