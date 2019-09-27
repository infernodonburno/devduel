/* eslint-disable no-undef */
$('form').submit(() => {
  const username = $('form input').val()
  console.log(`examining ${username}`)

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => {
    
      console.log(response.status) 
      return response.json()  // Returns parsed json data from response body as promise
    })
    .then(data => {
      console.log(`Got data for ${username}`)
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

      $('.user-error').addClass('hide')
      $('.user-not-valid').addClass('hide')
      $('.no-user').addClass('hide')
      $('.username').text(data.username)
      $('.full-name').text(data.fullName)
      $('.email').text(data.email)
      $('.bio').text(data.bio)
      $('.avatar').attr('src', data.avatar)
      $('.titles').text(data.titles)
      //$('.favorite-language').text(data.favoriteLanguage) //couldn't figure out language functionality in time
      $('.total-stars').text(data.totalStars)
      $('.most-starred').text(data.highestStarCount)
      $('.public-repos').text(data.publicRepos)
      $('.perfect-repos').text(data.perfectRepos)
      $('.followers').text(data.followers)
      $('.following').text(data.following)
      $('.location').text(data.location)     

      $('.user-results').removeClass('hide') // Display '.user-results' element
    
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      $('.user-results').addClass('hide')
      $('.user-error').removeClass('hide')
      $('.user-error').text(`${username} doesn't exist!`)
     
    })   
  return false // return false to prevent default form submission
})
