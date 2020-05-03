const tableBody = document.getElementById('tableBody');
const search = document.getElementById('search');

const data = [
	"Virendra",
	'Viru',
	'Viren',
	'Dhirendra',
	'Dheeru',
	'Shaleen',
	'Baba',
	'Rohit',
];

function renderNames(data){
	return data.map((el,index)=>{
		return (
			`<tr>
				<td>${index}</td>
				<td>${el}</td>
			</tr>`
			)
	}).join('')
}

function debounce(fn,timeInterval){
	let timer = null;
	return function(){
		let context = this, args = arguments;
		let later = function(){
			timer = null;
			fn.apply(context, args);
		}
		clearTimeout(timer);
		setTimeout(later, timeInterval);
	}
}

function searchFunction(value){
	console.log(value);
	const newList = data.filter((el)=>{
		const name = el.toLowerCase();
		return name.includes(value.toLowerCase());
	})
	updateUI(newList);
}

const betterSearch = debounce(searchFunction,1000);

search.addEventListener('keyup',event=>{
	betterSearch(event.target.value);
})

function updateUI(items){
	tableBody.innerHTML = `${renderNames(items)}`
}

updateUI(data);