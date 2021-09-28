import * as types from './actionTypes';

export const store_all = data => {
    return {
        type: types.STORE_ALL,
        payload: {
            markers: [...data.markers]
        }
    }
}

export const store_address = data => {
    return {
        type: types.STORE_ADDRESS,
        payload: {
            address: data.address
        }
    }
}