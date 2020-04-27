const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const total = document.getElementById('total');
const count = document.getElementById('count');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;


//update total and count
function updateSelectedCount(){
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	console.log(selectedSeats);
	count.innerText = selectedSeats.length;
	total.innerText = selectedSeats.length * ticketPrice;
}


//movie select event
movieSelect.addEventListener('change',(e)=>{
	ticketPrice = +e.target.value;
	updateSelectedCount();
})

container.addEventListener('click',(e)=>{
	if(e.target.classList.contains('seat') 
		&& !e.target.classList.contains('occupied')){
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
})