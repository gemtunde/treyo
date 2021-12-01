import {useState,useRef,useEffect} from 'react';
import {Link,useHistory } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {saveNewRegistration} from "../../../actions";
import axios  from "../../../helpers/axios";
import Loading from "../../Loading";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const VerifyAccount = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [loading,setLoading] = useState(false);
  const [firstCode,setFirstCode] = useState("");
  const [secondCode,setSecondCode] = useState("");
  const [thirdCode,setThirdCode] = useState("");
  const [fourthCode,setFourthCode] = useState("");
  const newRegistration = useSelector((state) => state.saveNewRegistration);



  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const tapChange = (val,e) => {

    
    if(e.target.value.length != 0){
      if(val == 1){
        inputRef2.current.focus();
      }else if(val == 2){
        inputRef3.current.focus();
      }else if(val == 3){
        inputRef4.current.focus();
      }    

    }

  }

const resendOtp = () => {
  
    setLoading(true);

    var params = new FormData();
    params.append('auth_code', newRegistration.auth_code); 
    params.append('email', newRegistration.email);

    axios({
    method: "post",
    url: "account/resend-auth-code",
    data: params
    }).then((res) => {
       if(res.data.status == "success"){
          toast.success("Verification Code Sent!",{theme: "colored"});
           dispatch(saveNewRegistration(res.data.data.user));
       }
       setLoading(false);
    })
    .catch((err) => {

      if(err.response){

        if(err.response.data.status == "fail"){
            toast.error("Please try again",{theme: "colored"});
        }
      }

       setLoading(false);

    }); 
}



const submitVerificationCode = (e) => {
  e.preventDefault();
  setLoading(true);

  const code = firstCode + secondCode + thirdCode + fourthCode;
  
    var params = new FormData();
    params.append('auth_code', code); //6768
    params.append('email', newRegistration.email);

    axios({
    method: "post",
    url: "account/verify",
    data: params
    }).then((res) => {
       if(res.data.status == "success"){

          toast.success("Verification Successful",{theme: "colored"});

           setTimeout(()=>{
             toast.dismiss();
             props.type == "driver" ? history.replace("/driver/login") : history.replace("/sub-contractor/login");
             toast.success("Please login to continue",{theme: "colored"});


           },1000)
           
       }
       setLoading(false);
    })
    .catch((err) => {

      if(err.response){

        if(err.response.data.status == "fail"){
            toast.error(err.response.data.data,{theme: "colored"});
        }
      }

       setLoading(false);

    }); 

}


  return (
    <>
          <Loading status={loading} />
          <div className="row d-flex justify-content-center align-items-center position-relative" style={{backgroundColor:"#F6FAFF",height:"100vh",zIndex:"1"}}>
            <div className="col-md-6 bg-white border position-relative" style={{zIndex:"5"}} >
            

            <div style={{height:"80px"}} className="position-absolute w-100 start-0 arc-shape">
                <div className="position-absolute top-100 start-50 translate-middle" >
                  <img src="/../asset/images/envelop.png" style={{width:"70px"}}/>
                </div>
            </div>

             <div style={{background: "#fff",height:"70px"}} className="position-absolute w-100 end-0 bottom-0 border-bottom">
            </div>


               
                   <form className="register-wrapper card card-body py-5 mt-4"  onSubmit={(e) => submitVerificationCode(e)}>

                   <h1 className="header text-center mt-5">OTP Verification</h1>

                   <p className="g2 fs-13 text-center w-75 mx-auto my-4">We just sent a verification code to {newRegistration.phone_number}. Please enter OTP below ({newRegistration.auth_code})</p>


                    <div className="mb-3 d-flex justify-content-center">
                        <input type="text"  className="otp form-control" ref={inputRef1} onChange={(e) => setFirstCode(e.target.value)} onInput={(e) => tapChange(1,e)}/>
                        <input type="text"  className="otp form-control" ref={inputRef2} onChange={(e) => setSecondCode(e.target.value)} onInput={(e) => tapChange(2,e)} />
                        <input type="text"  className="otp form-control" ref={inputRef3} onChange={(e) => setThirdCode(e.target.value)} onInput={(e) => tapChange(3,e)} />
                        <input type="text"  className="otp form-control" ref={inputRef4} onChange={(e) => setFourthCode(e.target.value)} />
                    </div>

               

                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button className="rounded-pill btn btn-primary text-white fs-14 w-50 btn-lg" type="submit">Verify Account</button>
                    </div>

                    <div className="d-flex align-items-center justify-content-center fs-13">
                        <span >Not gotten code?</span> <a href="javascript:void(0)" className="fw-600 mx-1 pc" onClick={() => resendOtp()}>Resend OTP</a>
                    </div>

                   </form>

                   <div className="top-right position-absolute" style={{top:"-35px",right:"-35px",zIndex:"-2"}}>
                      <div style={{width: "70px",height:"70px",border:"3px solid #315A89",}} className="rounded-circle position-relative" ></div>

                      <div style={{width: "20px",height:"20px",border:"1px solid #315A89",top:"10px",right:"-30px"}} className="rounded-circle position-absolute" ></div>

                      <div style={{width: "20px",height:"20px",background:"#fff",top:"-35px",right:"0"}} className="rounded-circle position-absolute" ></div>


                   </div>


                    <div className="top-left position-absolute" style={{top:"-35px",left:"-35px",zIndex:"-2"}}>
                      <div style={{width: "70px",height:"70px",background:"#fff"}} className="rounded-circle position-relative" ></div>

                      <div style={{width: "20px",height:"20px",background:"#315A89",top:"-5px",right:"0"}} className="rounded-circle position-absolute" ></div>

                      <div style={{width: "20px",height:"20px",border:"1px solid #fff",top:"-25px",left:"0"}} className="rounded-circle position-absolute" ></div>

                   </div>


                    <div className="bottom-left position-absolute" style={{bottom:"-35px",left:"-35px",zIndex:"-2"}}>
                      <div style={{width: "70px",height:"70px",border:"3px solid #315A89"}} className="rounded-circle position-relative" ></div>

                      <div style={{width: "20px",height:"20px",background:"#315A89",bottom:"-5px",left:"-30px"}} className="rounded-circle position-absolute" ></div>
                   </div>


                    <div className=" position-absolute" style={{bottom:"-35px",right:"-35px",zIndex:"-2"}}>

                     <div style={{width: "70px",height:"70px",backgroundColor:"#fff"}} className="rounded-circle position-relative" ></div>

                      <div style={{width: "20px",height:"20px",background:"#315A89",bottom:"-5px",right:"-10px"}} className="rounded-circle position-absolute" ></div>

                       <div style={{width: "20px",height:"20px",border:"1px solid #fff",bottom:"-25px",left:"30px"}} className="rounded-circle position-absolute" ></div>

                   </div>





             
            </div>



               
          </div>          
    
    </>
  )
}

export default VerifyAccount;