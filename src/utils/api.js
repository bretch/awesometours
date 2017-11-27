import axios from 'axios'
import { getAccessToken } from './auth'

const API = process.env.API

export function getTourPackages () {
  const url = `${API}/api/tour-packages`
  return axios.get(url).then(response => response.data)
}

export function getPublicTourPackages () {
  const url = `${API}/api/tour-packages/public`
  return axios.get(url).then(response => response.data)
}

export function getPrivateTourPackages () {
  const url = `${API}/api/tour-packages/private`
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } }).then(response => response.data)
}
