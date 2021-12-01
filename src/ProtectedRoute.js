import React,{useState,useEffect,useCallback} from "react";
import {useSelector,useDispatch} from "react-redux";
import axios  from "./helpers/axios";
import {BrowserRouter as Router, Route, Redirect,useHistory} from "react-router-dom";
import {Profile} from "./helpers/profile";
import Loading from "./components/Loading";
import {saveUserData} from "./actions";

export const ProtectVerifyAccount = ({component: Component,...rest}) => {

  const newRegistration = useSelector((state) => state.saveNewRegistration);


  return (
    <>
           <Route {...rest} render={(props) => {
              if(newRegistration.length != 0){
                return <Component />
              }else{
                return <Redirect to={{pathname: "login", state: {from:props.location}}} />
              }
           }} />

    </>
  );
}

export const IsLoggedInSubContractor = ({component: Component,...rest}) => {


  const userData = useSelector((state) => state.userData);
  const [isLoggedIn,setIsLoggedIn] = useState(userData.status === "success" ?  true : false);
  const dispatch = useDispatch();

  useEffect(async ()=>{

  
      var res = await Profile();

      if(res.status === "fail"){
        dispatch(saveUserData(res));
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(true);
        dispatch(saveUserData(res));
      }

      

  },[])


      return (
        <>
               <Route {...rest} render={(props) => {
                  if(isLoggedIn === false){
                    return  <Loading status={!isLoggedIn} />
                  }else if(userData.status === "success" ){
                    return <Component />
                  }else{
                    return <Redirect to={{pathname: "/sub-contractor/login", state: {from:props.location}}} />
                  }
               }} />

        </>
      );

}
export const IsLoggedInDriver = ({component: Component,...rest}) => {

   const userData = useSelector((state) => state.userData);
  const [isLoggedIn,setIsLoggedIn] = useState(userData.status === "success" ?  true : false);
  const dispatch = useDispatch();
  
  useEffect(async ()=>{


       var res = await Profile();

      if(res.status === "fail"){
        dispatch(saveUserData(res));
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(true);
        dispatch(saveUserData(res));
      }

 

  },[])


      return (
        <>
               <Route {...rest} render={(props) => {
                  if(isLoggedIn == false){
                    return  <Loading status={!isLoggedIn} />
                  }else if(userData.status === "success" ){
                    return <Component />
                  }else{
                    return <Redirect to={{pathname: "/driver/login", state: {from:props.location}}} />
                  }
               }} />

        </>
      );

}

export const NotLoggedIn = ({component: Component,...rest}) => {

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(async ()=>{

    if(window.localStorage.getItem("token") !== null){ 
      var res = await Profile();
      
      if(res.status == "fail"){
        dispatch(saveUserData(res));
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(true);
        dispatch(saveUserData(res));
      }

    }else{
        setIsLoggedIn(true);
    }
    

  },[])


      return (
        <>
               <Route {...rest} render={(props) => {
                  if(isLoggedIn == false){
                    return  <Loading status={!isLoggedIn} />
                  }else if(userData.status === "success"){
                    return <Redirect to={{pathname: "dashboard", state: {from:props.location}}} /> 
                  }else{
                    return <Component />
                  }
               }} />

        </>
      );

}

