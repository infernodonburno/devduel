import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'
import { getUserData } from '../lib/userdata'

import validation from './validation'

export default () => {
  let router = Router()

  /** GET /health-check - Check service health */
  router.get('/health-check', (req, res) => res.send('OK'))

  // The following is an example request.response using axios and the
  // express res.json() function
  /** GET /api/rate_limit - Get github rate limit for your token */
  router.get('/rate', (req, res) => {
    axios.get(`http://api.github.com/rate_limit`, {
      headers: {
        'Authorization': token
      }
    }).then(({ data }) => res.json(data))
  })

  /** GET /api/user/:username - Get user */
  router.get('/user/:username', validate(validation.user), (req, res) => {
    console.log(req.params)
   
    let url = `https://api.github.com/users/${req.params.username}`
    getUserData(url)
    .then(data => res.send(data))
    .catch(err => {
      return res.status(err.response.status).json()
    })

  })
    

  /** GET /api/users? - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    console.log(req.query)
  
   let url = 'https://api.github.com/users/'
   Promise.all([getUserData(url + req.query.username[0]), getUserData(url + req.query.username[1])])
   .then(data => {
     console.log(data)
     res.send(data)
   })
     .catch(err => {
       return res.status(err.response.status).json()
      })
    
    })

  return router
}
