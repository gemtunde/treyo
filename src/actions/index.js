import axios from "../helpers/axios"

export const increment = () => {
	return {
		type: "INCREMENT"
	}
}

export const decrement = () => {
	return {
		type: "DECREMENT"
	}
}


export const saveNewRegistration = (payload) => {
	return {
		type: "SAVE_NEW_REGISTER",
		payload: payload
	}
}


export const saveUserData = (payload) => {
	return {
		type: "SAVE_USER_DATA",
		payload: payload
	}
}
// export const saveUserData =  (payload) => async (dispatch, getState) => {

//     dispatch({
//         type : "SAVE_USER_DATA",
//         payload : payload
//     })
//    //localStorage.setItem('cart', JSON.stringify(getState().cart.cartItem));
//     localStorage.setItem('cart', JSON.stringify(getState().cart.cartItem));
// };


export const saveResueData = (payload) => {
	return {
		type: "SAVE_REUSE_DATA",
		payload: payload
	}
}


export const viewUserData = (payload) => {
	return {
		type: "VIEW_USER_DATA",
		payload: payload
	}
}


export const saveCurrentLocation = (payload) => {
	return {
		type: "SAVE_CURRENT_LOCATION",
		payload: payload,
	}
	
}


