
let results = [];

fetch('./data.json')
    .then(res=>res.json())
    .then(function(res){
        console.log(res);
        results = res;
        renderHTML();
    })
    .catch(function(err){
        console.log(err);
    });

function age(birthYear){
    let years = new Date().getFullYear() - birthYear;
    return years > 0 ? `${years} years old` : 'baby';
}

function foods(foodList) {
    return `
        <h4> Favorite Foods</h4>
        <ul class="foods-list">
            ${foodList.map(food=>`<li>${food}</li>`).join('')}
        </ul>
    `
}

function createAnimAlCard(pet){
    return `
            <div class="animal">
                <img src="${pet.photo}" class="pet-photo" alt="pet-photo">
                <h2 class="pet-name">${pet.name} <span class="species">(${pet.species})</span></h2>
                <p><strong>Age : ${age(pet.birthYear)}</strong></p>
                ${pet.favFoods? foods(pet.favFoods): 'Any food'}
            </div>
            `
}

function renderHTML(){
    document.getElementById('app').innerHTML = `
    <h1 class="app-title">Pets (${results.length})</h1>
    ${results.map(createAnimAlCard).join('')}
    <p class="footer">These ${results.length} are added recently. Check back soon for updates</p>
`;
}

