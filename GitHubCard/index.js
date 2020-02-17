/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const ax = axios.get('https://api.github.com/users/tylerkummer');

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/
ax.then(response => {
  console.log(response.data.message);
});

ax.catch(error => {
  console.log("Data not returned", error);
});

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const newCards = document.querySelector('.cards');
ax.then(response =>{
  newCards.append(GitHub(response.data));
});

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

//const followersArray = [];


const ax2 = axios.get('https://api.github.com/users/tylerkummer/followers');
ax2.then(response => {
  console.log(response.data);
  response.data.forEach((item, index) =>{
    if(index < 5){
      axios.get(item.url).then(response =>{
        newCards.append(GitHub(response.data));
      })
    }
  })
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function GitHub(gh){
  const newCard = document.createElement('div');
  const newImage = document.createElement('img');
  const newCardInfo = document.createElement('div');
  const newName = document.createElement('h3');
  const newUserName = document.createElement('p');
  const newLocation = document.createElement('p');
  const newProfile = document.createElement('p');
  const newAddress = document.createElement('a');
  const newFollowers = document.createElement('p');
  const newFollowing = document.createElement('p');
  const newBio = document.createElement('p');

  newImage.src = gh.avatar_url;
  newName.textContent = gh.name;
  newUserName.textContent = gh.login;
  newLocation.textContent = `Location: ${gh.location}`;
  newAddress.textContent = `Profile: ${gh.url}`;
  newFollowers.textContent = `Followers: ${gh.followers}`;
  newFollowing.textContent = `Following: ${gh.following}`;
  newBio.textContent = `Bio: ${gh.bio}`;

  newCard.classList.add('card');
  newImage.classList.add('img');
  newName.classList.add('name');
  newUserName.classList.add('username');
  newLocation.classList.add('p');
  newProfile.classList.add('p');
  newFollowers.classList.add('p');
  newFollowing.classList.add('p');
  newBio.classList.add('p');

  newCard.appendChild(newImage);
  newCard.appendChild(newCardInfo);
  newCardInfo.appendChild(newName);
  newCardInfo.appendChild(newUserName);
  newCardInfo.appendChild(newLocation);
  newCardInfo.appendChild(newProfile);
  newProfile.appendChild(newAddress);
  newCardInfo.appendChild(newFollowers);
  newCardInfo.appendChild(newFollowing);
  newCardInfo.appendChild(newBio);

  return newCard;

}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
