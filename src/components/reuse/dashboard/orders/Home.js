import {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios from "../../../../helpers/axios";
import Loading from "../../../Loading";
import {Loading2} from "../../../Loading2";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../headers/MainHeader";
import SideBar from "../headers/SideBar";
import Moment from 'react-moment';
import 'moment-timezone';

toast.configure();


const Orders = (props) => {

  const [loading,setLoading] = useState(false);
  const userData = useSelector((state) => state.userData.data);
  const [isReady,setIsReady] = useState(true);
  const dispatch = useDispatch();
  const [jobs,setJobs] = useState([]);

    useEffect(() => {
     axios({
       method: "GET",
       url: userData.role.name === 'driver' ? "transaction/job-order/driver/list" :  "transaction/job-order/contractor/list"
      }).then((res) => {
  
         setJobs(res.data);

         setIsReady(false);

    }).catch((err) => setIsReady(false));

  },[])


  const changeRoute= (e,id) => {

        e.preventDefault();

  var params = new FormData();

  params.append('job_order_id', id);
  params.append('status', e.target.value);
 
  setLoading(true);
  axios({
  method: "post",
  url: userData.role.name === 'driver' ?  "transaction/job-order/driver/update-status" : "transaction/job-order/final-status",
  data: params
  }).then((res) => {
     if(res.data.status == "success"){

      toast.success("Status has been updated",{theme: "colored"});

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

       <div className="page-wrapper bg-white">
          <MainHeader />

  <div className="container-fluid mt-4">
  <div className="row">

      <SideBar active="orders"/>
        

        <div className="col-md-9">
          <div className="card card-body">
              <div className="row g-4">
                <div className="col-md-12">
                    <Link to={userData.role.name === 'driver' ? "/driver/dashboard" :  "/sub-contractor/dashboard"} className="btn rounded-pill btn-primary text-white "><i className="fas fa-chevron-left"></i> Back</Link>
                    <div className="pc fs-36 fw-700 py-3">Orders</div>
                </div>

    
                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">

                   <div className="pc fs-24 fw-700 pb-4">My Orders ({jobs.length === 0 ? 0 : jobs.job_orders.length })</div>


               {isReady ? <Loading2 /> : jobs.length == 0 ? <div className="alert alert-info">No Jobs Available in your history</div> : jobs.job_orders.slice(0,10).map((item) => 

                   <div className="rounded-10  card card-body  bg-white mb-3" key={item.id}>
                        <div className="d-flex justify-content-between">
                           <div className="fs-14 d-flex align-items-center">
                              <img src={userData.role.name === 'driver' ? item.contractor.selfie_image_path : item.driver.selfie_image_path} height="35" width="35" className="rounded-circle" /> 
                              <div className="right px-2 d-flex flex-column justify-content-center dropdown">
                                <div  className="fw-600 text-capitalize" role="button">{userData.role.name == 'driver' ? item.contractor.name : item.driver.name}</div>
                                <div className="fs-12 text-capitalize">{userData.role.name === 'driver' ? "Contractor" : "Driver"}</div>
                              </div>
                           </div>

                           <div className="text-center ">
                              <div className="px-2 d-flex flex-column justify-content-center dropdown">
                                <div className="fw-600 fs-18">&#8358;{item.job.budget}</div>
                                <div className="fs-12 text-capitalize" style={{color:"#C4C4C4"}}><Moment fromNow>{item.job.created_at}</Moment></div>
                              </div>
                           </div>
                        </div>

                        <div className="mt-3">

                       <div className="mb-2 fs-14"><span className="fw-600">Item Capacity: &nbsp;</span><span className="text-muted">{item.job.item}</span></div>

                        <div className="mb-2 fs-14"><span className="fw-600">Pickup Address: &nbsp; </span><span className="text-muted">{item.job.pickup_address} </span></div>

                       <div className="mb-2 fs-14"><span className="fw-600">Delivery Address: &nbsp; </span><span className="text-muted">{item.job.delivery_address}</span></div>


                       <div className="mb-2 fs-14"><span className="fw-600">Contractor Status: &nbsp; </span><span className="text-muted text-capitalize">{item.contractor_final_status === 'delivered' ? item.contractor_final_status : "No Response"}</span></div>

                       <div className="mb-2 fs-14"><span className="fw-600">Driver Status: &nbsp; </span><span className="text-muted text-capitalize">{item.job.status}</span></div>

                       <div className="collapse" id={`s${item.id}e`}>
                          <div className="mb-2 fs-14"><span className="fw-600">Vehicle Capacity: &nbsp; </span><span className="text-muted">{item.job.vehicle_capacity}</span></div>

                         <div className="mb-2 fs-14"><span className="fw-600">Description: &nbsp; </span><span className="text-muted">{item.job.description}</span></div>

                       </div>

                       </div>


                       <div className="mt-1 d-flex justify-content-between align-items-center">

                        {item.contractor_final_status === 'delivered' ? null : 
                        <select className="btn  rounded-pill  g2 fs-9  form-control-lg border px-2" defaultValue={item.job.status}
                         onChange={(e) => changeRoute(e,item.id)}>
                        }

                        <option value="">Update Status</option>
                        {userData.role.name === 'driver' ? <> 
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                        <option value="enroute">Enroute</option>
                        <option value="arrived">Arrived</option>
                        </> : 
                         <option value="delivered">Delivered</option> }
                        </select> 
                      }




                       <button className="position-absolute btn"  type="button"  data-bs-toggle="collapse" data-bs-target={`#s${item.id}e`} aria-controls={`s${item.id}e`} aria-expanded="false"  style={{bottom:"5px",right:"10px",paddingRight:"inherit",paddingLeft:"inherit",paddingTop:"inherit"}}><i className="fas fa-chevron-down"></i></button>


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

export default Orders;