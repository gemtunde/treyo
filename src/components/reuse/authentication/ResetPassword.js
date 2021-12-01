import {useState} from 'react';
import {Link,useHistory} from "react-router-dom";
import axios  from "../../../helpers/axios";
import Loading from "../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const ForgotPassword = (props) => {

  const [passwordStatus,setPasswordStatus] = useState(true);
  const [confirmPasswordStatus,setConfirmPasswordStatus] = useState(true);
  const [confirmPassword,setConfirmPassword] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();




  const submitLoginForm = (e) => {
    
  e.preventDefault();

  var params = new FormData();

  params.append('password', password);
  params.append('confirm_password', confirmPassword);
 
  setLoading(true);
  axios({
  method: "post",
  url: "account/login",
  data: params
  }).then((res) => {
     if(res.data.status == "success"){

   
        // dispatch(saveNewRegistration(res.data.data.user));

        

     }

     setLoading(false);

  })
  .catch((err) => {

    if(err.response){

      if(err.response.data.status == "fail"){
        if(err.response.data != undefined){
                  
        }
      }

   }

   setLoading(false);

  });

  }

  return (
    <>
      <Loading status={loading} />

          <div className="row bg-white" style={{minHeight:"100vh"}}>
           <div className="col-md-6 d-none d-md-block ">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                      <div className="col-md-11">
                        <div className="card card-body d-flex justify-content-center align-items-start">
                           <img src="../asset/images/reset-password.png"/>
                         </div>
                      </div>
            </div>
            </div>   

            <div className="col-md-6 ">
               <div className="register-wrapper card card-body  h-100 d-flex align-items-center justify-content-center"
               >
                   <form  onSubmit={(e) => submitLoginForm(e)} className="w-75">


                   <h1 className="header text-center mb-2">Reset Password</h1>

                    <div className="sub-header text-center w-75 mx-auto m-0" style={{visibility:"hidden"}}>Enter the email address associated with your Treyos account</div>

               

                     <div className="form-group">
                        <label for="password" className="form-label">New Password</label>
                        <input type={passwordStatus ? "password" : "text"} className="form-control w-100" id="password" placeholder="xxxxxxxx" onChange={(e) => setPassword(e.target.value)} />
                        <a role="button" onClick={() => setPasswordStatus(!passwordStatus)}><i className={passwordStatus ? "fas fa-eye-slash" : "fas fa-eye"}></i></a>
                    </div>      


                      

                     <div className="form-group">
                        <label for="confirm-password" className="form-label">Confirm Password</label>
                        <input type={confirmPasswordStatus ? "password" : "text"} className="form-control" id="confirm-password" placeholder="xxxxxxxx" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <a role="button" onClick={() => setConfirmPasswordStatus(!confirmPasswordStatus)}><i className={confirmPasswordStatus ? "fas fa-eye-slash" : "fas fa-eye"}></i></a>
                    </div>           


                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button className="rounded-pill btn btn-primary text-white fs-14 w-50 btn-lg" type="submit">Reset Password</button>
                    </div>


                   </form>
               </div>
            </div>
            
          </div>          
    </>
  )
}

export default ForgotPassword;