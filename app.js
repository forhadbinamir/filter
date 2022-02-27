
function clearContent(id) {
    const cleanContent = document.getElementById(id);
    const cleanData = cleanContent.innerHTML = '';
    return cleanData;
}

function allFood() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => displayAllFood(data.categories))
    clearContent('chicken-card')
    clearContent('fish-items')
    clearContent('fish-details')
    clearContent('card-details')
    clearContent('user-profile')
}

const displayAllFood = allFood => {
    // console.log(allFood)
    const foodContainer = document.getElementById('food-container');
    // foodContainer.innerHTML = '';
    allFood.forEach(food => {
        // console.log(food)
        const div = document.createElement('div');
        div.className = 'col-4 shadow rounded-3'
        div.innerHTML = `
        <div onclick="loadDetails('${food.idCategory}')">
            <img src="${food.strCategoryThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="text-center">${food.strCategory}</h3>
            </div>
        </div>
        `
        foodContainer.appendChild(div)
    });

}

const loadDetails = details => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
            const allCategoris = data.categories;
            const categoriesDetails = allCategoris.find(name => name.idCategory === details)
            const cardDetails = document.getElementById('card-details')
            cardDetails.innerHTML = `
            <img src="${categoriesDetails.strCategoryThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h2>${categoriesDetails.strCategory}</h2>
              <p class="card-text">${categoriesDetails.strCategoryDescription}</p>
            </div>
            `
        })
}

// Fish area details

const loadFish = () => {
    clearContent('food-container')
    clearContent('fish-details')
    clearContent('chicken-card')
    clearContent('card-details')
    clearContent('fish-details')
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=fish')
        .then(fish => fish.json())
        .then(fishdata => displayFish(fishdata.meals));
}

const displayFish = fishs => {
    // console.log(fishs);
    const showFish = document.getElementById('fish-items');
    fishs.forEach(fish => {
        const div = document.createElement('div');
        div.className = 'col-4 shadow-sm'
        div.innerHTML = `
        <div class="card">
        <img src="${fish.strMealThumb}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
        <h2>${fish.strMeal}</h2>
            <p class="card-text">${fish.strInstructions.slice(0, 250)}</p>
        <button onclick="fishDetailsbtn(${fish.idMeal})" class="btn btn-primary">Fish Details</button>

        </div>
    </div>
        `
        showFish.appendChild(div);
    })

}

const fishDetailsbtn = fishInfo => {
    const showFish = document.getElementById('fish-items');
    showFish.innerHTML = '';
    const chickenCard = document.getElementById('chicken-card');
    chickenCard.textContent = '';
    clearContent('fish-items')
    clearContent('chicken-card')
    // console.log(fishInfo);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fishInfo}`)
        .then(fish => fish.json())
        .then(fishData => fishDetailsFun(fishData.meals[0]));

}

const fishDetailsFun = fishdetails => {
    // console.log(fishdetails);
    const fishDetails = document.getElementById('fish-details');
    fishDetails.innerHTML = `
    <div class="col-6">
    <img src="${fishdetails.strMealThumb}" class="card-img-top" alt="...">

        </div>
        <div class="col-6">
            <div class="card-body">
                <h5 class="card-title">${fishdetails.strMeal}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's
                    content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
`

}

// load Chicken details;
const loadChiken = () => {
    clearContent('food-container')
    clearContent('card-details')
    clearContent('fish-items')
    clearContent('user-profile')
    clearContent('fish-details')

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
        .then(chiken => chiken.json())
        .then(chikenData => showChickenData(chikenData.meals));
}

const showChickenData = allchiken => {
    const chickenCard = document.getElementById('chicken-card');
    allchiken.forEach(chicken => {
        // console.log(chicken);
        const div = document.createElement('div');
        div.className = "col-4";
        div.innerHTML = `
        <img src="${chicken.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${chicken.strMeal}</h5>
            <p class="card-text">${chicken.strInstructions.slice(0, 250)}</p>
            <a href="${chicken.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
        `
        chickenCard.appendChild(div);
    });

}

// user details 


const loadUsers = () => {
    // clearContent('user-profile')
    clearContent('user-details')
    clearContent('chicken-card')
    clearContent('food-container')
    clearContent('fish-items')
    clearContent('fish-details')
    fetch(`https://randomuser.me/api/?results=50`)
        .then(res => res.json())
        .then(data => displayUsers(data.results))
}

const displayUsers = users => {
    // console.log(users)
    const userProfile = document.getElementById('user-profile');
    users.forEach(user => {
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `
    <div class="card h-100 shadow-lg">
      <img src="${user.picture.medium}" class="card-img-top rounded-circle w-75 mx-auto mt-4 mb-3" alt="...">
      <div class="card-body d-flex flex-column justify-content-center">
        <h4 class="card-title text-center">${user.name.title} ${user.name.first} ${user.name.last}</h4>
        <button onclick="loadUsersDetails('${user?.name?.first}')" class="btn btn-dark mt-2 w-75 mx-auto fw-bold">See
          Details</button>
      </div>
    </div>
    `
        userProfile.appendChild(div)
    })
}

const loadUsersDetails = usersDetails => {
    clearContent('user-profile')

    fetch('https://randomuser.me/api/?results=5000')
        .then(res => res.json())
        .then(data => {
            const allUsers = data.results;
            const userData = allUsers.find(dataa => dataa?.name?.first === usersDetails);
            displayUserDetails(userData);
        })
}


const displayUserDetails = (details) => {
    const userDetails = document.getElementById('user-details')
    userDetails.innerHTML = `
    <div class="col-6">
      <img src="${details.picture.medium}" class="card-img-top w-100" alt="...">
    </div>
    <div class="col-6">
      <div>
        <div class="card-body">
          <h2 class="card-title">${details.name.title} ${details.name.first} ${details.name.last}</h2>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Age:</b> ${details.dob.age}</li>
          <li class="list-group-item"><b>Date of birth:</b> ${details.dob.date}</li>
          <li class="list-group-item"><b>Gender:</b> ${details.gender}</li>
          <li class="list-group-item"><b>City:</b> ${details.location.city}</li>
          <li class="list-group-item"><b>Country:</b> ${details.location.country}</li>
          <li class="list-group-item"><b>PostCode:</b> ${details.location.postcode}</li>
          <li class="list-group-item"><b>State:</b> ${details.location.state}</li>
          <li class="list-group-item"><b>Phone:</b> ${details.phone}</li>
          <li class="list-group-item"><b>Email:</b> ${details.email}</li>
        </ul>
        <div class="card-body">
          <a href="https://www.facebook.com/" target="_blank" class="card-link">Facebook</a>
          <a href="https://www.youtube.com/" target="_blank" class="card-link">YouTube</a>
        </div>
      </div>
    </div>
    `
}