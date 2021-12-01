import {useState,useRef,useEffect,memo} from 'react';
import {Link,useHistory,useLocation  } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios  from "../../helpers/axios";
import Loading from "../Loading";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const VerifyAccount = (props) => {


  const [loading,setLoading] = useState(true);
  const [paymentStatus,setPaymentStatus] = useState(false);
  const userData = useSelector((state) => state.userData);
  const location = useLocation();


   useEffect(() => {

    const search = location.search;
    const reference = new URLSearchParams(search).get("reference");
    axios({
      method:"GET",
      url: "payment/verify?reference="+reference,
      data: {reference:reference}
    }).then((res) => {
  
      if(res.data.status === "success"){
         // setPaymentStatus(res.data.data)
      }

      setLoading(false);
    }).catch((e) => setLoading(false));


  },[])
 

   if(loading){
    return <Loading status={loading} />
   }else{

  return (
    <>
          <div className="row d-flex justify-content-center align-items-center position-relative" style={{backgroundColor:"#F6FAFF",height:"100vh",zIndex:"1"}}>
            <div className="col-md-6 bg-white border position-relative" style={{zIndex:"5"}} >
            

            <div style={{height:"80px"}} className="position-absolute w-100 start-0 arc-shape">
                <div className="position-absolute top-100 start-50 translate-middle" >
                  <img src="/../asset/images/check.png" />
                </div>
            </div>

             <div style={{background: "#fff",height:"70px"}} className="position-absolute w-100 end-0 bottom-0 border-bottom">
            </div>


               
                   <div className="card card-body py-5 mt-5">

                   <h1 className="header text-center my-3 fw-600 fs-18">Payment Verified</h1>

                    <div className="form-group d-flex align-items-center justify-content-center">
                        <a href="/sub-contractor/dashboard" className="rounded-pill btn btn-primary text-white fs-14 w-50" >Go to Dashboard</a>
                    </div>

                   </div>

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
}

export default memo(VerifyAccount);