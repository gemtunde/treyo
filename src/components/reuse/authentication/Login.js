import {useState} from 'react';
import {Link,useHistory,Route,Redirect} from "react-router-dom";
import axios  from "../../../helpers/axios";
import Loading from "../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {saveUserData,saveNewRegistration} from "../../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const Login = (props) => {

  const [passwordStatus,setPasswordStatus] = useState(true);
  const [email,setEmail] = useState("");
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

              localStorage.setItem("token",res.data.data.token);
              //console.log(res.data)
              localStorage.setItem("location",JSON.stringify(res.data));
              dispatch(saveUserData(res.data));
              props.type == "driver" ?  window.location.assign('/driver/dashboard')  : window.location.assign('/sub-contractor/dashboard');


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

       <div className="container my-5">
          <div className="row gx-5 bg-white">
            <div className="col-md-6 ">
               <div className="register-wrapper card card-body py-5"
               >
                   <form className="pt-5"  onSubmit={(e) => submitLoginForm(e)}>


                   <h1 className="header">Welcome Back!</h1>
                   <div className="sub-header">Login to access Dashboard</div>




            <div class="socials my-4">

               <a href="" class="btn border w-100 fs-12 g2 d-flex align-items-center justify-content-center" ><img src="../asset/images/24x24_google_rainbow.png" /> &nbsp; Login With Google</a>

            </div>


                  <div class="position-relative mt-4 mb-5">
                    <div class="progress" style={{height: "1px"}}>
                      <div className="progress-bar w-0" role="progressbar"  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div   className="position-absolute top-0 start-50 translate-middle bg-white px-3 g2 fs-13" >Or Login with Email</div>
                  </div>


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
                        <div className="d-flex align-items-center"><input type="checkbox" id="reminder" checked /> <label className="fs-11 lh-1 mx-2 position-static" for="reminder">Remind me</label></div>

                        <Link to={props.type == "driver" ? "/driver/forgot-password" : "/sub-contractor/forgot-password"}  className="fw-600 mx-1 pc fs-11">Forgot Password?</Link>
                    </div>

                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button className="rounded-pill btn btn-primary text-white fs-14 w-50 btn-lg"  type="submit">Login</button>
                    </div>

                    <div className="d-flex align-items-center justify-content-center fs-13">
                        <span >New User?</span> <Link to={props.type == "driver" ? '/driver/register' : '/sub-contractor/register'} className="fw-600 mx-1">Register</Link>
                    </div>

                   </form>
               </div>
            </div>
            <div className="col-md-6 d-none d-md-block position-relative" style={{
              backgroundImage: `linear-gradient(rgba(49, 90, 137, 0.46),rgba(49, 90, 137, 0.46)),url('../asset/images/truck.png')`,
              backgroundRepeat:'no-repeat',
              backgroundSize: "100%"}}>

              <div className="h-100 position-relative">


              <div className="position-absolute text-white p-4 w-75" style={{backgroundColor:`rgba(255, 255, 255, 0.33)`,backdropFilter: `blur(12px)`,height:"300px",left:"10%",top:"20%"}}>
                <h3 className="fw-600" style={{letterSpacing:"0.02em"}}> Move your Goods <br />conveniently <br />with Treyos</h3>

                <img src="../asset/images/victoria-preview.png" className="img-fluid position-absolute h-100" style={{"bottom":"10%","transform":"scale(1.2)","right":"-40%"}}/>


                <img src="../asset/images/ellipse.png" className="position-absolute top-100 start-0 translate-middle" height="60" />
                
              </div>




              </div>
              

            </div>    
          </div>          
       </div>
    </>
  )
}

export default Login;