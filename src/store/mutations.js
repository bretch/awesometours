import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.ADD_PACKAGES] (state, tourPackages) {
    state.tourPackages = tourPackages
  },
  [mutationTypes.ADD_PACKAGE] (state, tourPackage) {
    state.tourPackages.push(tourPackage)
  },
  [mutationTypes.UPDATE_PACKAGE] (state, { id, tourPackage }) {
    const index = state.tourPackages.findIndex(tour => tour.id.toString() === id.toString())
    state.tourPackages[index] = {...state.tourPackages[index], ...tourPackage}
  },
  [mutationTypes.DELETE_PACKAGE] (state, id) {
    state.tourPackages = state.tourPackages.filter(tour => tour.id.toString() !== id.toString())
  },
  [mutationTypes.UPDATE_PROFILE] (state, profile) {
    state.profile = profile
  }
}
