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
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

 
  const handleForgotPassword = (e) => {
    
  e.preventDefault();

  var params = new FormData();

  params.append('email', email);
 
  setLoading(true);
  axios({
  method: "post",
  url: "account/forgot-password-email",
  data: params
  }).then((res) => {
     if(res.data.status == "success"){
        toast.success("An email Verification code has been sent to your mail",{theme: "colored"});
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

          <div className="row bg-white" style={{minHeight:"100vh"}}>
           <div className="col-md-6 d-none d-md-block ">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                      <div className="col-md-11">
                        <div className="card card-body d-flex justify-content-center align-items-start">
                           <img src="../asset/images/forgot-password.png"/>
                         </div>
                      </div>
            </div>
            </div>   

            <div className="col-md-6 ">
               <div className="register-wrapper card card-body  h-100 d-flex align-items-center justify-content-center"
               >
                   <form  onSubmit={(e) => handleForgotPassword(e)}>


                   <h1 className="header text-center mb-3">Forgot Password?</h1>
                   <div className="sub-header text-center w-75 mx-auto">Enter the email address associated with your Treyos account</div>




                      <div className="form-group">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="user@email.com"  onChange={(e) => setEmail(e.target.value)} />
                    </div>                    


                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button className="rounded-pill btn btn-primary text-white fs-14 w-50 btn-lg" type="submit">Reset Link</button>
                    </div>


                   </form>
               </div>
            </div>
            
          </div>          
    </>
  )
}

export default ForgotPassword;