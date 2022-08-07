import { generatePaginatedActions } from '../../generators/StateActionGenerator'

export const Races = {
    namespaced: true,
    state: () => (
        {
            races: null,
            proficiencies: null,
            traits: null
        }
    ),
    actions: {
        ...generatePaginatedActions('/api/admin/races', 'races'),
        loadProficiencies({ state }) {
            return axios.get('/api/admin/proficiencies')
                .then((response) => {
                    state.proficiencies = response.data.data
                })
        },
        loadTraits({ state }) {
            return axios.get('/api/admin/races/traits')
                .then((response) => {
                    state.traits = response.data.data
                })
        },

        find({ state }, id) {
            if ((
                state?.races?.data || []
            ).length > 0) {
                const race = state.races.data.find((item) => item.id === id)
                if (race) {
                    return Promise.resolve(race)
                }
            }
            return axios.get(`/api/admin/races/${id}?include=subraces,ability_bonuses,proficiencies,languages`)
                .then((response) => {
                    return response.data.data
                })
        },

        store({ state, dispatch }, { race }) {
            return axios.post('/api/admin/races', race)
                .then(() => {
                    dispatch('Messages/success', 'Race saved!', { root: true })
                })
        },

        update({ state, dispatch }, { id, race }) {
            return axios.post(`/api/admin/races/${id}`, race)
                .then(() => {
                    dispatch('Messages/success', 'Race saved!', { root: true })
                })
        },

        destroy({ dispatch }, { id }) {
            return axios.delete(`/api/admin/races/${id}`)
                .then(() => {
                    dispatch('load')
                        .then(() => {
                            dispatch('Messages/success', 'Spell successfully deleted!', { root: true })
                        })
                })
        }
    }
}