import {useState,useEffect} from 'react';
import {Link,Redirect,useHistory} from "react-router-dom";
import axios  from "../../helpers/axios";
import Loading from "../Loading";
import {Loading2} from "../Loading2";
import {useSelector,useDispatch} from "react-redux";
import {saveNewRegistration} from "../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "./dashboard/headers/MainHeader";
import SideBar from "./dashboard/headers/SideBar";

toast.configure();


const Dashboard = (props) => {

  const userData = useSelector((state) => state.userData);
  const [loading,setLoading] = useState(false);
  const [isReady,setIsReady] = useState(true);
  const [jobs,setJobs] = useState([]);
  const [amount,setAmount] = useState("");
  const [method,setMethod] = useState("");
  const [errors,setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();



   useEffect(() => {
     axios({
       method: "GET",
       url: "transaction/job-order/contractor/list"}).then((res) => {
  
         setJobs(res.data);

         setIsReady(false);

    }).catch((err) => {

      setIsReady(false)
      setJobs([]);


   });

  },[])

   const handleTopWallet = (e) => {

       e.preventDefault();

  var params = new FormData();

  params.append('amount', amount);
  params.append('method', method);
  params.append('type', "fund_wallet");
  params.append('callback_url', window.location.host +"/payment/verify");
 
  setLoading(true);
  axios({
  method: "post",
  url: "/payment/create",
  data: params
  }).then((res) => {
     if(res.data.status === "success"){

        toast.success("Successful. You are being redirected for payment",{theme: "colored"});
        window.open(res.data.data.url, "_blank")
     }

     setLoading(false);

  })
  .catch((err) => {

    if(err.response){

      if(err.response.data.status === "fail"){
               toast.error(err.response.data.data,{theme: "colored"});

              return  err.response.data.errors !== undefined ? setErrors(err.response.data.errors) : null;
      }

   }

   setLoading(false);

  });


   }



  return (
    <>
      <Loading status={loading} />

       <div className="page-wrapper bg-white" style={{overflowY: 'scroll'}}>
          <MainHeader />

  <div className="container-fluid mt-4">
  <div className="row">

      <SideBar active="overview" type={props.type}/>
        

        <div className="col-md-9">
             {/*<div className="pc fs-29 fw-700 py-3">Overview</div>*/}
          <div className="card card-body green-2-bg ">
              <div className="row g-4">
                <div className="col-md-7">
                    <div className="pc fs-24 fw-700 py-3">About Treyos</div>
                     <div className="px-3 py-3 rounded-10 py-4 d-flex flex-column justify-content-between" style={{backgroundImage: "url('../asset/images/ship.png')",backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"228px"}}>

                         <div className="d-flex justify-content-end">
                           <button className="fs-12  primary-color-bg text-white btn">02:04</button>
                         </div>
                         <div className="text-center"> <img src="../asset/images/play-btn.png" className="img-fluid" /></div>

                         <div className="text-white mt-3">Lorry driver shortage: I'll never be stuck for work</div>
                        


                   </div>
                </div>

                <div className="col-md-5 position-relative">
                    <div className="pc fs-24 fw-700 py-3">Wallet Balance</div>
                   <div className="card card-body rounded-10 yellow-1-bg" style={{height:"228px"}}>

                        <div className="fs-22 mt-3">Total Balance</div>

                      
                        <div className="d-flex justify-content-between align-items-center position-absolute w-100" style={{bottom:"25px",paddingRight:"inherit",paddingLeft:"inherit",left:"0",right:"0"}}>
                        <h1 className="pc fw-600 ">&#8358;{userData.data.balance}</h1>
                        <button className="btn rounded-pill primary-color-bg text-white ms-auto" data-bs-toggle="modal" data-bs-target="#topupModal">Top Up</button>
                        </div>
                
                   </div>
                </div>

                 <div className="col-md-12">
                   <div className="px-md-5 px-3 py-3 yellow-1-bg h-100 position-relative pt-5" style={{ backgroundImage: `linear-gradient(rgba(102, 78, 61, 0.58), rgba(102, 78, 61, 0.58)),url('../../asset/images/dashboard1.png')`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>

                       <div className="fw-600 text-white my-3 mt-5 fs-24">Same City Haulage</div>
                       <div className="d-md-flex justify-content-between align-items-center" >
                        <div className="text-white  fs-22 fw-300 me-4  mb-3 mb-md-0">Future Youth Zone, is a purpose built facility for the borough???s young people aged 8 ??? 19, and up to 25 for those with disabilities.</div>
                        <Link to="/sub-contractor/jobs/same-city" className="btn rounded-pill yellow-1-bg pc fw-600 ms-auto w-100 d-block fs-18 align-self-end">Post Job within your city</Link>
                        </div>

                   </div>
                </div>


                <div className="col-md-12">
                   <div className="px-md-5 px-3 py-3 yellow-1-bg h-100 position-relative pt-5" style={{ backgroundImage: `linear-gradient(rgba(102, 78, 61, 0.58), rgba(102, 78, 61, 0.58)),url('../../asset/images/dashboard2.png')`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>

                       <div className="fw-600 text-white my-3 mt-5 fs-24">Inter-City Haulage</div>
                       <div className="d-md-flex justify-content-between align-items-center" >
                        <div className="text-white  fs-22 fw-300 me-4 mb-3 mb-md-0">Future Youth Zone, is a purpose built facility for the borough???s young people aged 8 ??? 19, and up to 25 for those with disabilities.</div>
                        <Link to="/sub-contractor/jobs/inter-state" className="btn rounded-pill yellow-1-bg pc fw-600 ms-auto d-block w-100 fs-18 align-self-end">Post Job at the exchange</Link>
                        </div>

                   </div>
                </div>


                <div className="col-md-12">
                    <div className="pc fs-24 fw-700">Job History</div>
                </div>


                <div className="col-md-8">


              {isReady ? <Loading2 /> : jobs.length === 0 ? <div className="alert alert-info">No Jobs Available in your history</div> : jobs.job_orders.filter((item) => item.type !== "pending").length === 0 ? <div className="alert alert-info">No Jobs Available in your history</div> :

           jobs.job_orders.map((item) => 
                   <div className="p-4 rounded-10 bg-white">
                       <div className="card card-body border py-4 position-relative">
                       <div className="fw-700 fs-18 mb-2"><span>Pick Up/Delivery Address</span> &nbsp; <span className="text-muted fw-400 fs-14"><img src="../asset/images/location.png" /> {item.job.from_state.name}</span></div>
                        <div className="mb-2 fs-14"><span className="fw-600">From: &nbsp; </span><span className="text-muted">{item.job.pickup_address}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">To: &nbsp; </span><span className="text-muted">{item.job.delivery_address}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Item: &nbsp; </span><span className="text-muted">{item.job.item}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Vehicle Type: &nbsp;</span> <span className="text-muted">{item.job.vehicle_type.name}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Capacity: &nbsp;</span><span className="text-muted">{item.job.vehicle_capacity}</span></div>
                       <div className="mb-2 fs-14 d-block d-md-none"><span className="fw-600">Price: &nbsp;</span><span><span className="pc fw-600">&#8358;{item.job.budget}</span> <span className="fw-300 fs-10 text-danger text-uppercase">&nbsp; &nbsp; {item.job.payment_type}</span> </span> </div>

                        <div className="mt-1 d-flex justify-content-between align-items-center"><button className="btn rounded-pill lh-1 px-4 g2 fs-9 border form-control-lg"><img src="../asset/images/telephone.png"/> &nbsp; &nbsp; View Driver</button> <button className="opacity-50 btn rounded-0 green-1-bg fs-9 form-control-lg">Accepted</button></div>


                        <div className="job-budget d-none d-md-block" style={{top:"0",right:"0",paddingRight:"inherit",paddingLeft:"inherit",paddingTop:"inherit"}}>
                             <div className="pc fw-600 fs-18 d-flex align-items-center justify-content-end mb-2"><span>&#8358;{item.job.budget}</span> <span className="fw-300 fs-10 text-danger text-uppercase">&nbsp; &nbsp; {item.job.payment_type}</span></div>
                             
                        </div>

                       </div>
                   </div> ) }


                   {jobs.length === 0 ? null :  jobs.job_orders.filter((item) => item.status !== "pending").length !== 0 ? <div className="text-center mt-4"><a href="#" className="fw-18 pc fw-700">View All</a></div> : null}

                </div>

                 <div className="col-md-4">
                   <div className="px-3 py-3 bg-white" >

                       <div className="d-inline-block mx-auto my-3 mt-4 d-flex flex-column justify-content-center align-items-center rounded-circle text-center" style={{width:"128px",height:"128px",border:"4px solid var(--main-color)"}}>
                          <div className="pc fs-29 fw-600">{jobs.length == 0 ? 0 : jobs.job_orders.filter((item) => item.status !== "pending").length}</div>
                          <div className="lh-1 fs-18">Jobs</div>
                       </div>

                       <div className="mt-5">
                          <div className="d-flex justify-content-between align-items-center position-relative mb-2 fs-14" style={{color:"#0AEEB7"}}><div>Accepted</div> <div style={{border: "0.25px dashed #A2A2A8",width:"106px",left:"calc(40%)"}} className="position-absolute top-50"></div>  <div>{jobs.length == 0 ? 0 : jobs.job_orders.filter((item) => item.status === "accepted").length}</div> </div>

                          <div className="d-flex justify-content-between align-items-center position-relative mb-2 fs-14" style={{color:"#FFA8A7"}}><div>Declined</div> <div style={{border: "0.25px dashed #A2A2A8",width:"106px",left:"calc(40%)"}} className="position-absolute top-50"></div>  <div>{jobs.length == 0 ? 0 : jobs.job_orders.filter((item) => item.status === "declined").length}</div> </div>

                          <div className="d-flex justify-content-between align-items-center position-relative mb-2 fs-14" style={{color:"#FBBC05"}}><div>Enroute</div> <div style={{border: "0.25px dashed #A2A2A8",width:"106px",left:"calc(40%)"}} className="position-absolute top-50"></div>  <div>{jobs.length == 0 ? 0 : jobs.job_orders.filter((item) => item.status === "enroute").length}</div> </div>

                          <div className="d-flex justify-content-between align-items-center position-relative mb-2 fs-14" style={{color:"#EB6200"}}><div>Delivered</div> <div style={{border: "0.25px dashed #A2A2A8",width:"106px",left:"calc(40%)"}} className="position-absolute top-50"></div>  <div>{jobs.length == 0 ? 0 : jobs.job_orders.filter((item) => item.status === "delivered").length}</div> </div>

                       </div>

                   </div>
                </div>


            </div>

            </div>
       </div>
    </div>
  </div>
       </div>



        {/*Modals*/}

  
<div class="modal fade" id="topupModal"  tabindex="-1"  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title pc fw-600 mx-auto" id="staticBackdropLabel">Top Up Wallet</h5>
        {/*<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>*/}
      </div>
      <form class="modal-body register-wrapper px-3" onSubmit={(e) => handleTopWallet(e)}>


          <div className="form-group">
                        <label for="amount" className="form-label">Amount</label>
                        <input type="text" className="form-control" id="amount" placeholder="Enter Amount"  onChange={(e) => setAmount(e.target.value)}/>
                        {errors.amount != undefined ? <span className="fs-12 text-danger">{errors.amount[0]}</span> : null}
                    </div>


         <div className="form-group">
                        <label className="form-label">Payment Option</label>
                        <select class="form-select" onChange={(e) => setMethod(e.target.value)}>
                          <option>Select Payment Option</option>
                          <option value="card">Card</option>
                          <option value="cash">Cash</option>
                        </select>
                        {errors.method != undefined ? <span className="fs-12 text-danger">{errors.method[0]}</span> : null}
          </div>

         <div className="form-group d-flex justify-content-center">
            <button className="rounded-pill btn btn-primary text-white fs-14 px-5" type="submit">Proceed</button>
         </div>
        
      </form>
    </div>
  </div>
</div>
    </>
  )
}

export default Dashboard;