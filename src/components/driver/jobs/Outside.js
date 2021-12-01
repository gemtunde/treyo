import {useState,useEffect} from 'react';
import {Link,useHistory} from "react-router-dom";
import axios  from "../../../helpers/axios";
import Loading from "../../Loading";
import {Loading2} from "../../Loading2";
import {useSelector,useDispatch} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../../reuse/dashboard/headers/MainHeader";
import SideBar from "../../reuse/dashboard/headers/SideBar";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

toast.configure();


const Outside = (props) => {

  const [loading,setLoading] = useState(false);
  const [isReady,setIsReady] = useState(true);
  const currentLocation = JSON.parse(useSelector((state) => state.currentLocation));
  const dispatch = useDispatch();
  const [jobs,setJobs] = useState([]);
  const history = useHistory();


  useEffect(() => {

axios({
  method: "GET",
  url: "transaction/job/driver/list"}).then((res) => {
  
         setJobs(res.data);   

         setIsReady(false);

    }).catch((err) => setIsReady(false));


  },[])


  const handleAcceptJob = (id) => {

  var params = new FormData();
  params.append('job_id',id);


  confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to accept this job.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {

              axios({
                      method: "POST",
                      url: "transaction/job/driver/accept",
                      data: params
                 })
               .then((res) => {
                     
                    toast.success("Job has been Accepted",{theme: "colored"});
                    setLoading(false);
                    history.push("/driver/dashboard");

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
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });

     

  }



  return (
    <>
      <Loading status={loading} />

       <div className="page-wrapper bg-white">
          <MainHeader />

  <div className="container-fluid mt-4">
  <div className="row">

      <SideBar active={props.active} type="driver"/>
        

        <div className="col-md-9">
              <Link to="/driver/dashboard" className="btn rounded-pill btn-primary text-white "><i className="fas fa-chevron-left"></i> Back</Link>
             <div className="pc fs-29 fw-700 py-3">Jobs</div>
          <div className="card card-body green-2-bg ">

                <div className="pc fs-24 fw-700 pb-4">Returned Jobs</div>
              <div className="row g-4">

                <div className="col-md-12">

                {isReady ? <Loading2 /> : jobs.jobs.filter((item) => item.type === "inter-state" && item.status === "pending" && item.from_city.state_id === currentLocation.id).length === 0 ? <div className="alert alert-info">No jobs leaving {currentLocation.name}</div> :


                jobs.jobs.slice(0,10).map((item) => item.type === "inter-state"  && item.status === "pending" ? 
                   <div className="rounded-10 bg-white mb-3">
                       <div className="card card-body border py-4 position-relative">
                       <div className="fw-700 fs-18 mb-2"><span>Pick Up/Delivery Address</span> &nbsp; <span className="text-muted fw-400 fs-14"><img src="/../asset/images/location.png" />  {item.from_state.name}</span>  <span className="text-muted fw-400 fs-14">&#8212; <img src="/../asset/images/location.png" />  {item.to_state.name}</span></div>
                        <div className="mb-2 fs-14"><span className="fw-600">From: &nbsp; </span><span className="text-muted">{item.pickup_address}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">To: &nbsp; </span><span className="text-muted">{item.delivery_address}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Item: &nbsp; </span><span className="text-muted">{item.item}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Vehicle Type: &nbsp;</span> <span className="text-muted">{item.vehicle_type.name}</span></div>
                       <div className="mb-2 fs-14"><span className="fw-600">Capacity: &nbsp;</span><span className="text-muted">{item.vehicle_capacity}</span></div>
                       <div className="mb-2 fs-14 d-block d-md-none"><span className="fw-600">Price: &nbsp;</span><span><span className="pc fw-600">&#8358;{item.budget}</span> <span className="fw-300 fs-10 text-danger text-uppercase">&nbsp; &nbsp; {item.payment_type}</span> </span> </div>

                        <div className="position-md-absolute bottom-0 end-0 my-md-2 mx-md-2" >
                        <button className="btn  btn-lg rounded-pill lh-1 px-4 fs-9  text-white primary-color-bg me-2 mb-1" role="button" onClick={() => handleAcceptJob(item.id)}>Accept Job</button> 

                        <a href={`tel:${item.user.phone_number}`} className="btn  btn-lg rounded-pill lh-1 px-4 g2 fs-9 border me-2 mb-1"><img src="../../asset/images/telephone.png"/></a>
                        
                        <button className="btn  btn-lg rounded-pill lh-1 px-4 fs-9 pc" style={{border: "2px solid #315A89"}}>Negotiate</button></div>


                        <div className="job-budget d-none d-md-block" style={{top:"0",right:"0",paddingRight:"inherit",paddingLeft:"inherit",paddingTop:"inherit"}}>
                              
                              <div className="pc fw-600 fs-18 d-flex align-items-center justify-content-end mb-2"><span>&#8358;{item.budget}</span> <span className="fw-300 fs-10 text-danger text-uppercase">&nbsp; &nbsp; {item.payment_type}</span></div>
                        </div>

                       </div>
                   </div> : null )}



                   {isReady ? null : jobs.jobs.filter((item) => item.type === "inter-state" && item.status === "pending" && item.from_city.state_id === currentLocation.id).length !== 0 ? <div className="text-center mt-4"><a href="#" className="fw-18 pc fw-700">View All</a></div> : null}


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

export default Outside;