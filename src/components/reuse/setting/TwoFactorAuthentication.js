import React,{useState} from 'react';
import {Link,Redirect,useHistory} from "react-router-dom";
import axios from "../../../helpers/axios";
import Loading from "../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {userData} from "../../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../../reuse/dashboard/headers/MainHeader";
import SideBar from "../../reuse/dashboard/headers/SideBar";

toast.configure();


const TwoFactorAuthentication = (props) => {

   const [passwordStatus,setPasswordStatus] = useState(true);
   const userData = useSelector((state) => state.userData.data);
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

  const [regSection,setRegSection] = useState(true);
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

      <SideBar active="settings" type={props.type}/>
        

        <div className="col-md-9">
          <div className="card card-body">
              <div className="row g-4">
                <div className="col-md-12">
                    <div className="pc fs-36 fw-700">Account Setting</div>
                </div>

    
                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">


                   <div className="register-wrapper ">
                       <div className="register-option-wrapper mb-5 col-md-12 d-flex">
                         <div className="left me-2 fs-14">
                            <div className="card card-body bg-white fw-600" role="button">
                              <div>Update Profile</div>
                               <Link to="/sub-contractor/setting/update-profile" className="stretched-link"/>
                            </div>
                         </div>
                         <div className="right fs-14">
                            <div className="card card-body  active" role="button">
                              <div>Set two-factor authentication</div>
                              <Link to="/sub-contractor/setting/two-factor-authentication" className="stretched-link"/>
                            </div>
                         </div>
                      </div>
                   </div>



                   <form className="register-wrapper bg-white rounded row card card-body mt-0">

                   <div className="pc fs-24 fw-700  mb-2 col-md-12">Two-factor Authentication</div>

                   <div className="form-group col-12">Add another layer of security to your account by enabling a two-factor authentication</div>


                  <div className={regSection == true ? "d-block" : "d-none"} >

                    <div className="form-group col-7">
                        <label for="name" className="form-label">Set Security Question</label>
                        <input type="text" className="form-control" id="name" placeholder="Sifon Dan" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        {errors.name != undefined ? <span className="fs-12 text-danger">{errors.name[0]}</span> : null}
                    </div>


                     <div className="form-group col-7">
                        <label for="name" className="form-label">Set Answer</label>
                        <input type="text" className="form-control" id="name" placeholder="Sifon Dan" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        {errors.name != undefined ? <span className="fs-12 text-danger">{errors.name[0]}</span> : null}
                    </div>

                    <div className="form-group col-12" >
                        <button className="rounded-pill btn btn-primary text-white fs-14 px-4" type="button" onClick={() => setRegSection(false)}>Next</button>
                    </div>


                     </div>

                    <div className={regSection == false ? "d-block" : "d-none"}>

                    <div className="form-group col-md-6" >

                      <div className="rounded-10 green-2-bg card card-body py-4 d-flex flex-row justify-content-start align-items-start">
                            <img src="../../asset/images/arrow-up.png" />
                          <section className="ms-3">
                              <div className="fs-22">Tap to Generate OTP</div>
                              <div className="fs-16">Add another layer of security to your account by enabling a two-factor authentication</div>
                          </section>
                     </div>
                        
                    </div>

                    <div className="form-group" >
                        <button className="rounded-pill btn btn-lg btn-primary text-white fs-14 px-4" type="submit">Submit</button>
                    </div>


                      </div>


                    </form>


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

export default TwoFactorAuthentication;