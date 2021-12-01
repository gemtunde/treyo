import {useState,useEffect} from 'react';
import {Link,useHistory} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios from "../../../../helpers/axios";
import Loading from "../../../Loading";
import {Loading2} from "../../../Loading2";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../headers/MainHeader";
import {viewUserData} from "../../../../actions";
import SideBar from "../headers/SideBar";
import Moment from 'react-moment';
import 'moment-timezone';

toast.configure();


const Bids = (props) => {

 
  const [loading,setLoading] = useState(false);
  const userData = useSelector((state) => state.userData.data);
  const reuseData = useSelector((state) => state.reuseData);
  const [isReady,setIsReady] = useState(true);
  const dispatch = useDispatch();
  const [jobs,setJobs] = useState([]);
  const history = useHistory();



    useEffect(() => {
     axios({
       method: "GET",
       url: userData.role.name === 'driver' ? "transaction/job-order/driver/list" :  "transaction/job-order/contractor/list"
      }).then((res) => {
            
        var data = [];
        reuseData.map((i) => {
          data.push(res.data.job_orders.filter((e) => e.id === i.id));
        })
       
         setJobs(data.length === 0 ? data : data[0]);
         setIsReady(false);

    }).catch((err) => setIsReady(false));

  },[])

  const View = (data) => {

      dispatch(viewUserData(data));
      return history.push(userData.role.name === 'driver' ? "/driver/user/" + data.id :  "/sub-contractor/user/" + data.id );

  }


  return (
    <>
      <Loading status={loading} />

       <div className="page-wrapper bg-white">
          <MainHeader />

  <div className="container-fluid mt-4">
  <div className="row">

      <SideBar active="myjobs"/>
        

        <div className="col-md-9">
          <div className="card card-body">
              <div className="row g-4">
                <div className="col-md-12">
                    <Link to={userData.role.name === 'driver' ? "/driver/history" :  "/sub-contractor/history"} className="btn rounded-pill btn-primary text-white "><i className="fas fa-chevron-left"></i> Back</Link>
                    <div className="pc fs-36 fw-700 py-3">My Job</div>
                </div>

    
                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">

                   <div className="pc fs-24 fw-700 pb-4">Bids ({jobs.length === 0 ? 0 : jobs.length })</div>



             {isReady ? <Loading2 /> : jobs.length == 0 ? <div className="alert alert-info">No one has bidded for this job</div> : jobs.map((item) => 

                   <div className="p-4 rounded-10 bg-white">
                       <div className="card card-body border py-4 position-relative">
                       <div className="fw-700 fs-18 mb-2"><span>Pick Up/Delivery Address</span> &nbsp; <span className="text-muted fw-400 fs-14"><img src="/asset/images/location.png" /> {item.job.from_state.name}</span></div>
                        <div className="mb-2 fs-14"><span className="fw-600">From: &nbsp; </span><span className="text-muted">{item.job.pickup_address}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">To: &nbsp; </span><span className="text-muted">{item.job.delivery_address}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Item: &nbsp; </span><span className="text-muted">{item.job.item}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Vehicle Type: &nbsp;</span> <span className="text-muted">{item.job.vehicle_type.name}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Capacity: &nbsp;</span><span className="text-muted">{item.job.vehicle_capacity}</span></div>
                       <div className="mb-2 fs-14 d-block d-md-none"><span className="fw-600">Price: &nbsp;</span><span><span className="pc fw-600">&#8358;{item.job.budget}</span> <span className="fw-300 fs-10 text-danger text-uppercase">&nbsp; &nbsp; {item.job.payment_type}</span> </span> </div>

                        <div className="mt-1 d-flex justify-content-between align-items-center">
                        <button className="btn rounded-pill btn-lg lh-1 px-4 g2 fs-9 border" onClick={() => View(userData.role.name === 'driver' ? item.contractor : item.driver)}>
                        <img src="/asset/images/telephone.png"/> &nbsp; &nbsp; View Driver</button>


                        <button className="opacity-50 btn rounded-0 btn-lg green-1-bg fs-9 text-capitalize">{item.status}</button>

                         <a href={`tel:${userData.role.name === 'driver' ? item.contractor.phone_number : item.driver.phone_number}`} className="btn btn-lg rounded-pill lh-1 px-4 g2 fs-9 border me-2 mb-1"><img src="/asset/images/telephone.png"/></a>

                         </div>

                      

                     {/*<div className="position-md-absolute bottom-0 end-0 my-md-2 mx-md-2" >*/}
                      {/* */}

                        {/*<a href={`tel:${userData.role.name === 'driver' ? item.contractor.phone_number : item.driver.phone_number}`} className="btn rounded-pill lh-1 px-4 g2 fs-9 border me-2 mb-1"><img src="/asset/images/telephone.png"/></a>*/}
                        
                       {/* <button className="btn rounded-pill lh-1 px-4 fs-9 pc" style={{border: "2px solid #315A89"}}>Negotiate</button>*/}

                        {/*</div>*/}



                        <div className="job-budget d-none d-md-block" style={{top:"0",right:"0",paddingRight:"inherit",paddingLeft:"inherit",paddingTop:"inherit"}}>
                             <div className="pc fw-600 fs-18 d-flex align-items-center justify-content-end mb-2"><span>&#8358;{item.job.budget}</span> <span className="fw-300 fs-10 text-danger text-uppercase">&nbsp; &nbsp; {item.job.payment_type}</span></div>
                             
                        </div>

                       </div>
                   </div> ) }
                   
                   </div>
                </div>


            </div>

            </div>
       </div>
    </div>
  </div>
       </div>
    </>
  )
}

export default Bids;