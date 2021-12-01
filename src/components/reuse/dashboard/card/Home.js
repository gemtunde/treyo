import React,{useState} from 'react';
import {Link,Redirect,useHistory} from "react-router-dom";
import axios from "../../../../helpers/axios";
import Loading from "../../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../headers/MainHeader";
import SideBar from "../headers/SideBar";

toast.configure();


const Home = (props) => {

  const userData = useSelector((state) => state.userData.data);
   const [passwordStatus,setPasswordStatus] = useState(true);
  const [formData, setFormData] = useState({
   name: "",
   email: "",
   password: "",
   phoneNumber : "",
   countryId : "",
   stateId : "",
   cityId : "",
   confirmPassword : "",
   selfie : "",
   govtId : "",
   selfieId : "",
   type : "",
   states: [],
   cities: [],
   countries: [],
   errors : [],
   registrationStatus: false,
   confirmId: false,
   terms: false,
  });
  const {name,email,password,phoneNumber,countryId,stateId,cityId,confirmPassword,selfie,govtId,selfieId,type,states,cities,countries,errors,confirmId,registrationStatus,terms} = formData;

  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();



  return (
    <>
      <Loading status={loading} />

       <div className="page-wrapper bg-white">
          <MainHeader />

  <div className="container-fluid mt-4">
  <div className="row">

      <SideBar active="card"/>
        

        <div className="col-md-9">
          <Link to={userData.role.name === 'driver' ? "/driver/dashboard" :  "/sub-contractor/dashboard"} className="btn rounded-pill btn-primary text-white "><i className="fas fa-chevron-left"></i> Back</Link>
          <div className="card card-body">
              <div className="row g-4">
                <div className="col-md-12">
                    <div className="pc fs-36 fw-700 py-3">Add Card</div>
                </div>

    
                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">

                   <div className="pc fs-24 fw-700 pb-4">Add Details</div>

                   <div className="rounded-10 d-inline-block pc w-25 card card-body py-5 d-flex flex-column justify-content-center align-items-center" style={{border: "4px solid #315A89"}}>
                        <span>+</span>
                        <span>Add Card</span>
                        <Link to={props.type == "driver" ? "/driver/add-card" : "/sub-contractor/add-card"} className="stretched-link"/>
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

export default Home;