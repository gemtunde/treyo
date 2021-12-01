import React,{useState} from 'react';
import {Link,Redirect,useHistory} from "react-router-dom";
import axios  from "../../helpers/axios";
import Loading from "../Loading";
import {useSelector,useDispatch} from "react-redux";
import {saveNewRegistration} from "../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const Login = (props) => {

  const [passwordStatus,setPasswordStatus] = useState(true);
  const newRegistration = useSelector((state) => state.saveNewRegistration);
  const [email,setEmail] = useState("");
  const [error,setError] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();



  const submitLoginForm = (e) => {
    
  e.preventDefault();

  var params = new FormData();

  params.append('email', email);
  params.append('password', password);
 
  setLoading(true);
  axios({
  method: "post",
  url: "account/login",
  data: params
  }).then((res) => {
     if(res.data.status == "success"){


      toast.success("Login Successful",{theme: "colored"});

         setTimeout(()=>{

            if(res.data.data.token == null){
                props.type == "driver" ? history.push("/driver/verify-account") : history.push("/sub-contractor/verify-account");
                toast.dismiss();
                toast.warn("Please verify your account",{theme: "colored"});
            }else if(res.data.data.token != null){

               props.type == "driver" ? history.push("/driver/profile") : history.push("/sub-contractor/profile");

            }

         },1000)


        dispatch(saveNewRegistration(res.data.data.user));

     }

     setLoading(false);

  })
  .catch((err) => {

    if(err.response){

      if(err.response.data.status == "fail"){
        if(err.response.data != undefined){
               toast.error(err.response.data.data,{theme: "colored"});
        }
      }

   }

   setLoading(false);

  });

  }

  return (
    <>
      <Loading status={loading} />
       
          <div className="row gx-5 bg-white" style={{height:"100vh"}}>
            <div className="col-md-6 ">
               <div className="register-wrapper card card-body  h-100 d-flex flex-column align-items-center justify-content-center"
               >
                   <form  onSubmit={(e) => submitLoginForm(e)} className="w-75">


                   <h1 className="header text-center">Welcome Back!</h1>
                   <div className="sub-header text-center">Login to access Dashboard</div>

                      <div className="form-group">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="user@email.com"  onChange={(e) => setEmail(e.target.value)} />
                    </div>

                   
                    <div className="form-group">
                        <label for="password" className="form-label">Password</label>
                        <input type={passwordStatus ? "password" : "text"} className="form-control" id="password" placeholder="xxxxxxxx" onChange={(e) => setPassword(e.target.value)} />
                        <a role="button" onClick={() => setPasswordStatus(!passwordStatus)}><i className={passwordStatus ? "fas fa-eye-slash" : "fas fa-eye"}></i></a>
                    </div>

                    

                     <div className="form-group  d-flex align-items-center">
                        <div className="d-flex align-items-center"><input type="checkbox" id="reminder"/> <label className="fs-11 lh-1 mx-2 position-static" for="reminder">Remind me</label></div>

                        <Link to={props.type == "driver" ? "/driver/forgot-password" : "/sub-contractor/forgot-password"}  className="fw-600 mx-1 pc fs-11">Forgot Password?</Link>
                    </div>

                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button className="rounded-pill btn btn-primary text-white fs-14 w-50" type="submit">Login</button>
                    </div>

                    <div className="d-flex align-items-center justify-content-center fs-13">
                        <span >New User?</span> <Link to="register" className="fw-600 mx-1">Register</Link>
                    </div>

                   </form>
               </div>
            </div>
            <div className="col-md-6 d-none d-md-block position-relative" style={{
              backgroundImage: `url('../asset/images/admin-login.png')`,
              backgroundRepeat:'no-repeat',backgroundPosition:'100%'}}>

             
                <h3 className="fw-700 text-white position-absolute  w-100 d-flex align-items-center justify-content-center" style={{bottom:"50px"}}>  
                 <div style={{width:"75px",height: "7px"}} className="bg-white rounded-pill mx-3"></div> <div>Your best way home</div>
                 </h3>
              
              

            </div>    
          </div>          
 
    </>
  )
}

export default Login;