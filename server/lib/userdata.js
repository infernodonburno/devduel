import token from '../../token'
import axios from 'axios'

export const getUserData = url => {
    let userData = {}
    let repoUrls = {}
    
    return axios.get(url, {headers: {Authorization: token}})
        .then(data =>  data.data)
        .then(data => {
          userData.username = data.login
          userData.fullName = data.name
          userData.location = data.location
          userData.email = data.email
          userData.bio = data.bio
          userData.avatar = data.avatar_url
          userData.followers = data.followers
          userData.following = data.following
          userData.publicRepos = data.public_repos
          repoUrls.reposUrl = data.repos_url
          //userData.titles = [] //Haven't written function to retrieve titles. May do languages and titles together in an array?
         return axios.get(repoUrls.reposUrl, {headers: {Authorization: token}})
        })
        .then(data => data.data)
        .then(data => {
            [userData.totalStars, userData.highestStarCount] = getStarCount(data) 
            userData.perfectRepos = getPerfectRepos(data)

            return userData
        })
        .catch(err => {
            throw err
        })

}

const getStarCount = repos => {
    let total = 0
    let highest = 0
    
    for(let repo of repos){
        total = total + repo.stargazers_count
        if(repo.stargazers_count > highest)
        {
            highest = repo.stargazers_count
        }
    }
    return [total, highest]
}

const getPerfectRepos = repos => {
    let perfect = 0
    for(let repo of repos)
    {
        if(repo.open_issues_count === 0)
        {
            perfect++
        }
    }
    return perfect
}