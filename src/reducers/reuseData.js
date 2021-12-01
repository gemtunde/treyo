const reuseData = (state = {}, action) => {
	if(action.type === "SAVE_REUSE_DATA"){
		return action.payload
	}else{
		return state
	}
}

export default reuseData;