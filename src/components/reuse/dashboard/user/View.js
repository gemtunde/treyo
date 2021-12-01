import {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios from "../../../../helpers/axios";
import Loading from "../../../Loading";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../headers/MainHeader";
import SideBar from "../headers/SideBar";
import Moment from 'react-moment';
import 'moment-timezone';

toast.configure();


const View = (props) => {

 
  const [loading,setLoading] = useState(false);
  const userData = useSelector((state) => state.userData.data);
  const viewUserData = useSelector((state) => state.viewUserData);
  const [isReady,setIsReady] = useState(true);
  const dispatch = useDispatch();
  const [country,setCountry] = useState("");
  const [state,setState] = useState("");
  const [city,setCity] = useState("");



    //Initialize country data and vehicle types list 
  useEffect(() => {

    axios.get("account/country/nigeria-show").then((res) => {
  
         setCountry(res.data.data);

         setState(res.data.data.states.filter((item) => item.id == viewUserData.state_id)[0])


         setCity(res.data.data.states.filter((item) => item.id == viewUserData.state_id)[0].cities.filter((item) => item.id == viewUserData.city_id)[0])

      
    });


  },[])

  

  return (
    <>
      <Loading status={loading} />

       <div className="page-wrapper bg-white">
          <MainHeader />

  <div className="container-fluid mt-4">
  <div className="row">

      <SideBar active="overview"/>
        

        <div className="col-md-9">
          <div className="card card-body">
              <div className="row g-4">
                <div className="col-md-12">
                    <Link to={userData.role.name === 'driver' ? "/driver/dashboard" :  "/sub-contractor/dashboard"} className="btn rounded-pill btn-primary text-white "><i className="fas fa-chevron-left"></i> Back</Link>
                    <div className="pc fs-36 fw-700 py-3">{viewUserData.name} ({userData.role.name === 'driver' ? "Contractor" :  "Driver"})</div>
                </div>                        

                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">


                  <div className="rounded-5  mb-4 pc w-100 position-relative d-flex flex-column justify-content-center align-items-center">
                            <div style={{border: "0.5px dashed #315A89",opacity:"0.7",width:"220px"}} className="d-flex justify-content-center"><img src={viewUserData.selfie_image_path} className="rounded-circle" width="168" height="168"  /></div>
                  </div>

                  <div className="card card-body bg-white rounded-10 my-2">
                      <div className="fs-18 fw-600 mb-2">Email Address</div>
                      <div><a href="#" className="fs-14 pc">{viewUserData.email}</a></div>
                   </div>

                   <div className="card card-body bg-white rounded-10 my-2">
                      <div className="fs-18 fw-600 mb-2">Phone number</div>
                      <div><a href="#" className="fs-14 pc">{viewUserData.phone_number}</a></div>
                   </div>

                    <div className="card card-body bg-white rounded-10 my-2">
                      <div className="fs-18 fw-600 mb-2">Country</div>
                      <div><a href="#" className="fs-14 pc">{country.length == 0 ? null : country.name}</a></div>
                   </div>


                    <div className="card card-body bg-white rounded-10 my-2">
                      <div className="fs-18 fw-600 mb-2">State</div>
                      <div><a href="#" className="fs-14 pc">{state.length == 0 ? null : state.name}</a></div>
                   </div>

                    <div className="card card-body bg-white rounded-10 my-2">
                      <div className="fs-18 fw-600 mb-2">City</div>
                      <div><a href="#" className="fs-14 pc">{city.name}</a></div>
                   </div>



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

export default View;