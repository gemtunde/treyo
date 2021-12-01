import {useSelector,useDispatch} from "react-redux";
import {saveUserData} from "../actions";
import {Link,Redirect,useHistory} from "react-router-dom";

export const Logout = () => {
 
  const userData = useSelector((state) => state.userData.data);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {

    sessionStorage.removeItem('token');
    userData.data.vehicle == null ?  history.replace("/sub-contractor/login") : history.replace("/driver/login")
    dispatch(saveUserData({}));
    return true;
  }

}

