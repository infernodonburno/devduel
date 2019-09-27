/* eslint-disable no-undef */
/*
  TODO
  Fetch 2 user's github data and display their profiles side by side
  If there is an error in finding user or both users, display appropriate error
  message stating which user(s) doesn't exist

  It is up to the student to choose how to determine a 'winner'
  and displaying their profile/stats comparison in a way that signifies who won.
 */

$('form').submit(() => {
  const usernameLeft = $('[name = username-left]').val()
  const usernameRight = $('[name = username-right]').val()
  console.log(`examining ${usernameLeft} and ${usernameRight}`)

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  
    fetch(`${USERS_URL}?username=${usernameLeft}&username=${usernameRight}`)
    .then(response => {
      if(response.status === 404){
        throw new Error('User doesn\'t exist')
      }
      return response.json()
    }) 
    .then(data => {
    console.log(`Got data for ${usernameLeft} and ${usernameRight}`)
    console.log(data)


    //Removing null lines in json object response
    if (data === null) {
      throw err
    }
    for (let key in data) {
      if(data[key] === null) {
        delete data[key]
      }
    }
    $('.duel-container, .victor').removeClass('hide') // Display '.user-results' element
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      $('.user-results').addClass('hide')
      $('.user-error').removeClass('hide')
      $('.user-error').text(`${username} doesn't exist!`)
    })
    
    return false

  })
