const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

const listItems = [];
let dragStartIndex;

function createList(){
	[...richestPeople]
		.map(person=>({ value: person, sortValue: Math.random() }))
		.sort( (a,b)=> a.sortValue - b.sortValue )
		.map(el=> el.value)
		.forEach((person,index)=>{
			const listItem = document.createElement('li');
			listItem.setAttribute('data-index',index);
			listItem.innerHTML = `
				<span class="number">${index + 1}</span>
				<div class="draggable" draggable="true">
					<p class="person-name">${person}</p>
					<i class="fas fa-grip-lines"></i>
				</div>
			`;
			listItems.push(listItem);
			draggableList.appendChild(listItem);
		});

	addEventListeners();	
}

//store ui with peoples list
createList();

//event listeners

function dragStart() {
	dragStartIndex = +this.closest('li').getAttribute('data-index');
	console.log(dragStartIndex);
}

function dragEnter() {
	this.classList.add('over');
}

function dragLeave() {
	this.classList.remove('over');
}

function dragOver(e) {
	e.preventDefault();
	// console.log('over');
}

function dragDrop() {
	const dragEndIndex = +this.getAttribute('data-index');
	swapItems(dragStartIndex,dragEndIndex);

	this.classList.remove('over');
}

function swapItems(dragStartIndex,dragEndIndex){
	const itemOne = listItems[dragStartIndex].querySelector('.draggable');
	const itemTwo = listItems[dragEndIndex].querySelector('.draggable');
	listItems[dragStartIndex].appendChild(itemTwo); //taking element from one and appending to another
	listItems[dragEndIndex].appendChild(itemOne);
}

//add event listerners
function addEventListeners() {
	const draggables = document.querySelectorAll('.draggable');
	const dragListItems = document.querySelectorAll('.draggable-list li');

	draggables.forEach(draggable=>{
		draggable.addEventListener('dragstart',dragStart);
	})

	dragListItems.forEach(item =>{
		item.addEventListener('dragover',dragOver);
		item.addEventListener('drop',dragDrop);
		item.addEventListener('dragenter',dragEnter);
		item.addEventListener('dragleave',dragLeave);
	})
}

// check order
function checkOrder(){
	listItems.forEach((el,index) => {
		const personName = el.querySelector('.draggable').innerText.trim();
		if(personName !== richestPeople[index]){
			el.classList.add('wrong');
		} else {
			el.classList.remove('wrong');
			el.classList.add('right');
		}

	})
}

check.addEventListener('click',checkOrder);

