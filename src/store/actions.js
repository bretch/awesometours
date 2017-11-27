import * as mutationTypes from './mutation-types'
import { setIdToken, setAccessToken, login, logout, isLoggedIn, getUser } from './../utils/auth'
import * as api from './../utils/api'

export default {
  async getTourPackages ({commit}, callback) {
    if (isLoggedIn()) {
      await api.getTourPackages().then(items => {
        commit(mutationTypes.ADD_PACKAGES, items)
        if (typeof callback === 'function') callback(items)
      })
    } else {
      await api.getPublicTourPackages().then(items => {
        commit(mutationTypes.ADD_PACKAGES, items)
        if (typeof callback === 'function') callback(items)
      })
    }
  },
  createTourPackage ({commit, state}, tourPackage) {
    let id = 1
    if (state.tourPackages.length) {
      id = state.tourPackages[state.tourPackages.length - 1].id + 1
    }
    tourPackage.id = id

    commit(mutationTypes.ADD_PACKAGE, tourPackage)
    return Promise.resolve({ tourPackage })
  },
  // Profile actions
  login ({commit}) {
    login()
  },
  logout ({commit}) {
    logout()
    commit(mutationTypes.UPDATE_PROFILE, {})
  },
  afterLogin ({dispatch}) {
    setAccessToken()
    setIdToken()
    dispatch('getProfile')
    dispatch('getTourPackages')
  },
  getProfile ({commit}) {
    if (isLoggedIn()) {
      getUser((profile) => {
        commit(mutationTypes.UPDATE_PROFILE, profile)
      })
    }
  }
}
