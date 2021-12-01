const viewUserData = (state = {}, action) => {
	if(action.type === "VIEW_USER_DATA"){
		return action.payload
	}else{
		return state
	}
}

export default viewUserData;