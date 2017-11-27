import decode from 'jwt-decode'
import auth0 from 'auth0-js'

const SCOPE = 'openid profile email'
const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'

var auth = new auth0.WebAuth({
  clientID: process.env.CLIENT_ID,
  domain: process.env.CLIENT_DOMAIN,
  scope: SCOPE
})

export function login () {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: `${window.location.protocol}//${window.location.host}/callback`,
    audience: process.env.AUDIENCE,
    scope: SCOPE
  })
}

export function logout () {
  clearIdToken()
  clearAccessToken()
  window.location.href = '/'
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    login()
  } else {
    next()
  }
}

export function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// Get and store access_token in local storage
export function setAccessToken () {
  let accessToken = getParameterByName('access_token')
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// Get and store id_token in local storage
export function setIdToken () {
  let idToken = getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

export function getUser (cb) {
  const accessToken = getAccessToken()
  auth.client.userInfo(accessToken, (err, profile) => {
    if (err) console.log(err)
    else cb(profile)
  })
}
