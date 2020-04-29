const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random person data
async function getRandomUser(){
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	}

	addData(newUser);
}

// add new user to data
function addData(obj){
	data.push(obj);
	updateDOM();
}

//double the money
function doubleMoney(){
	data.map(item=>{
		item.money *= 2;
		return item;
	})
	updateDOM();
}

// show only millionaires

function showOnlyMillionaires(){
	data = data.filter(item=>{
		return item.money > 1000000;
	})
	updateDOM();
}

// sort by richest

function sortByRichest(){
	data.sort((a,b)=>b.money - a.money);
	updateDOM();
}

// calculate total wealth
function calculateTotalWealth(){
	const wealth = data.reduce((acc,user)=> (acc += user.money),0);
	const wealthEl = document.createElement('div');
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
	main.appendChild(wealthEl);
}

// upate dom with user data
function updateDOM(providedData = data){
	// clear the main section
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
	providedData.forEach(item=>{
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML =`<strong>${item.name}</strong> ${formatMoney(item.money)}`
		main.appendChild(element);
	})
}

//format money
function formatMoney(number){
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}

//event listeners

addUser.addEventListener('click',getRandomUser);
double.addEventListener('click',doubleMoney);
showMillionaires.addEventListener('click',showOnlyMillionaires);
sort.addEventListener('click',sortByRichest);
calculateWealth.addEventListener('click',calculateTotalWealth);
