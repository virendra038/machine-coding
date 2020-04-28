const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const total = document.getElementById('total');
const count = document.getElementById('count');
const movieSelect = document.getElementById('movie');


populateUI();

let ticketPrice = +movieSelect.value;


//save selected movie and prive
function saveMovieData(movieIndex,moviePrice){
	localStorage.setItem('movieIndex',movieIndex);
	localStorage.setItem('moviePrice',moviePrice)
}

//update total and count
function updateSelectedCount(){
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat));

	localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

	count.innerText = selectedSeats.length;
	total.innerText = selectedSeats.length * ticketPrice;
}

// get data from local storage and populate ui

function populateUI(){
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	if(selectedSeats !== null && selectedSeats.length){
		seats.forEach((seat, index)=> {
			if(selectedSeats.indexOf(index) > -1){
				seat.classList.add('selected');
			}
		})
	}
	const selectedMovieIndex = localStorage.getItem('movieIndex');
	if(selectedMovieIndex !== null) movieSelect.selectedIndex = selectedMovieIndex;
}


//movie select event
movieSelect.addEventListener('change',(e)=>{
	ticketPrice = +e.target.value;
	saveMovieData(e.target.selectedIndex,e.target.value);
	updateSelectedCount();
})

container.addEventListener('click',(e)=>{
	if(e.target.classList.contains('seat') 
		&& !e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
})

// update initial count and total
updateSelectedCount();
