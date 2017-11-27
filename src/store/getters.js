export default {
  getTourPackageById: (state, getters) => (id) => {
    return state.tourPackages.find(tour => tour.id.toString() === id.toString())
  }
}
