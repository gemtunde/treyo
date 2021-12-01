const currentLocation = (state = "[]", action) => {
	if(action.type === "SAVE_CURRENT_LOCATION"){
		return action.payload
	}else{
		return state
	}
}

export default currentLocation;