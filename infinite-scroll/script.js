const postsContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');

let limit = 5;
let page = 1;

async function fetchDataFromAPI(){
	let data = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
	data = await data.json()
	return data;
}

async function updateUI(){
	const data = await fetchDataFromAPI();
	data.forEach(el=>{
		const postElement = document.createElement('div');
		postElement.classList.add('post');
		postElement.innerHTML = `<div class="number">${el.id}</div>
				<div class="post-info">
					<h2 class="post-title">${el.title}</h2>
					<div class="post-body">
						${el.body}
					</div>
				</div>`
		postsContainer.appendChild(postElement);		
	});
}

updateUI();

//show loader
function showLoader(){
	loader.classList.add('show');
	setTimeout(function() {
		setTimeout(function() {
			page++;
			updateUI();
		}, 300);
		loader.classList.remove('show');
	}, 1000);
}

window.addEventListener('scroll',()=>{
	const { scrollHeight, clientHeight, scrollTop} = document.documentElement;

	if(scrollTop + clientHeight >= scrollHeight - 5){
		showLoader();
	}
})