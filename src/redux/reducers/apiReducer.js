import * as types from '../actions/actionTypes';

const initialState = {
    markers:[{position:{lat:40.4167754,lng:-3.7037902}}],
    address:'',
}

const apiState = (state= initialState, action) => {
    switch (action.type) {
        case types.STORE_ALL: {
            return {
                ...state,
                markers: [...action.payload.markers]
            }
        }
        case types.STORE_ADDRESS : {
            return {
                ...state,
                address:action.payload.address
            }
        }
        default: return state
    }
}

export default apiState;