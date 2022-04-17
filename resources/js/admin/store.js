import {Campaigns} from './modules/campaigns';
import {Messages} from '../modules/messages';
import {Races} from "./modules/races";
import {Spells} from "./modules/spells";
import {Users} from "./modules/users";
import {createStore} from 'vuex';

export const store = createStore({
    modules: {Campaigns, Messages, Races, Spells, Users},
    state: {
        campaign: {},
        errors: {},
        languages: null,
        logs: [],
        user: {
            permissions: {}
        }
    },
    actions: {
        logout({}) {
            axios.post('/logout')
                .then(() => {
                    document.location.href = '/';
                });
        },
        loadLanguages({state}) {
            return axios.get('/languages')
                .then((response) => {
                    state.languages = response.data;
                })
        }
    }
});