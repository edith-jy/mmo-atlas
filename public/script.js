// An array of letters to help us build a Nav menu.
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

/* Variables to help us refer to dynamic elements on the page.  */
const navMenu = document.querySelector('nav#menu')
const mainContent = document.querySelector('main#content')

/* Construct a navigation menu from the array of letters above. */
alphabet.forEach(letter => {
  let menuItem = document.createElement('a')
  menuItem.classList.add('menuItem')
  menuItem.setAttribute('id', letter)
  menuItem.innerHTML = letter
  
  // add an event listener to monitor for clicks.
  menuItem.addEventListener('click', event => clickLetter(event))
  
  navMenu.appendChild(menuItem)
})

// this function runs whenever a letter is clicked-on
const clickLetter = (event) => {
  // use the id of the element to find out which letter was clicked
  let currentLetter = event.currentTarget.id;
  
  // Reset CSS class for all letters so that none are "selected"
  // see also: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
  document.querySelectorAll('.menuItem').forEach(menuItem => {
    menuItem.classList.remove('selected')
  })
 
  // Assign a "selected" CSS class to the current letter.
  // note: the appearance of this can be customized in style.css
  document.querySelector('#' + currentLetter).classList.add('selected')
  
  // pass along the current letter to the getDrinks function
  getGames(currentLetter)
}

/* This function fetches games based on a given letter. Only those games whose first letter matches will be returned. */
//Fetch the games from the server 
const getGames = (letter) => {
  
  fetch(`/games?letter=${letter}`)
    .then(response => response.json())
    .then(games => {
      
      // Only keep games that start with the selected letter. 
      let filteredGames = games.filter(game => game.title.toUpperCase().startsWith(letter)
      ) 
      
      //Sort the games alphabetically by title.
      filteredGames.sort((a, b) => a.title.localeCompare(b.title)
      )

      //Display the games 
      displayGames(filteredGames)      
    })
    .catch(error => console.log(error))
}

/* Display the games. */
const displayGames = (games) => {
  // reset the main content div to clear away previous results.
  
  mainContent.innerHTML = ""
  
  if (games == null || games.length === 0) {
    /* notify the user in case there are no games available for a given letter. */
    mainContent.innerHTML = "No games found."
  }
  else {
    
    // loop through all the games and display them. 
    games.forEach(game => {
      
      /* Create the card */
      let div = document.createElement('div')
      div.classList.add('game')
      
      //Put the basic information on the card 
      div.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}">
      <p class="name">${game.title}</p>
      `

      //When the card is clicked, open the game in a new tab.
      div.addEventListener('click', () => {
        showGameDetails(game)
      })

      mainContent.appendChild(div);
    })
  }
}

const showGameDetails = (game) => {

  let modal = document.createElement('div')
  modal.classList.add('modal')
  
  
  modal.innerHTML = `
    <div class="gameDetails">

      <button id="closeButton">x</button>

      <img src="${game.thumbnail}" alt="${game.title}">

      <h2>${game.title}</h2>

      <p>${game.short_description}</p>

      <p><strong>Genre:</strong> ${game.genre}</p>

      <p><strong>Platform:</strong> ${game.platform}</p>

      <p><strong>Release date:</strong> ${game.release_date}</p>

    </div>
  `
  document.body.appendChild(modal)
  
  modal.querySelector('#closeButton').addEventListener('click', () => {
  modal.remove()
})

  modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.remove()
  }
})
}



let navigation = document.createElement('nav')
fetch('../examples.json')
  .then(data => data.json())
  .then(json => {
    let template = json.map(example => `<a href="..${example.url}">${example.name}</a>`).join('')
    navigation.innerHTML = `<a href="..">Home</a> ${template}`
  })
document.querySelector('footer').appendChild(navigation)