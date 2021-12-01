import {useState,useEffect} from 'react';
import {Link,useHistory} from "react-router-dom";
import axios from "../../../helpers/axios";
import Loading from "../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {saveUserData} from "../../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../../reuse/dashboard/headers/MainHeader";
import SideBar from "../../reuse/dashboard/headers/SideBar";

toast.configure();


const UpdateProfile = (props) => {

  const userData = useSelector((state) => state.userData.data);
  const dispatch = useDispatch();
  const [passwordStatus,setPasswordStatus] = useState(true);

  const [formData, setFormData] = useState({
   name: userData.name,
   email: userData.email,
   password: "",
   phoneNumber : userData.phone_number,
   countryId : userData.country_id,
   cityId : userData.city_id,
   confirmPassword : "",
   selfie : "",
   govtId : "",
   selfieId : "",
   type : "",
   errors : [],
   registrationStatus: false
  });
  const {name,email,password,phoneNumber,countryId,cityId,confirmPassword,selfie,govtId,selfieId,type,errors,registrationStatus} = formData;

const [loading,setLoading] = useState(false);
const [countries,setCountries] = useState([]);
const [states,setStates] = useState([]);
const [cities,setCities] = useState([]);
const [stateId,setStateId] = useState(userData.state_id);
const handleUpdateProfile = (e) => {
    
  e.preventDefault();

  var params = new FormData();
  params.append('name', name);
  params.append('email', email);
  // params.append('password', password);
  // params.append('phone_number', phoneNumber);
  params.append('country_id', countryId);
  // params.append('confirm_password', password);
  params.append('state_id', stateId);
  params.append('city_id', cityId);
  // params.append('selfie_image', selfie);
  // params.append('valid_id_image', govtId);
  // params.append('selfie_valid_id_image', selfieId);


  setLoading(true);
  axios({
  method: "PATCH",
  url: "account/profile/update",
  data: {name,email}
  }).then((res) => {
     if(res.data.status == "success"){

       toast.success("Profile Updated",{theme: "colored"}); 
        dispatch(saveUserData(res.data));

     }

     setLoading(false);

  })
  .catch((err) => {

    if(err.response){

      if(err.response.data.status == "fail"){
        if(err.response.data.errors != undefined){
            setFormData({...formData, errors: err.response.data.errors})
            toast.error("Please try again",{theme: "colored"});
        }
      }

   }

   setLoading(false);

  });

  }

  




   //Initialize country data and vehicle types list 
  useEffect(() => {

    axios.get("account/country/nigeria-show").then((res) => {
  
      if(res.data.status == "success"){
         setCountries([res.data.data])
      }else{
         setCountries([])
      }
    });


  },[])

  // Handle states when country changes
  useEffect(() => {

    if(countries.length != 0){
      setStates(countries[0]['states'])
    }

  },[countryId])


  // Handle Cities when state changes
  useEffect(() => {

    if(states.length != 0){
       states.map((item) => {
           if(item.id == stateId){
               setCities(item.cities)
           }
       });
   }



  },[stateId])



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


                   <form className="register-wrapper row" onSubmit={(e) => handleUpdateProfile(e)}>


                   <div className="register-option-wrapper mb-5 col-md-12 d-flex">
                       <div className="left me-2 fs-14">
                          <div className="card card-body active" role="button">
                            <div>Update Profile</div>
                             <Link to="/sub-contractor/setting/update-profile" className="stretched-link"/>
                          </div>
                       </div>
                       <div className="right fs-14">
                          <div className="card card-body bg-white" role="button">
                            <div className="fw-600">Set two-factor authentication</div>
                            <Link to="/sub-contractor/setting/two-factor-authentication" className="stretched-link"/>
                          </div>
                       </div>
                    </div>


                    <div className="form-group col-12">
                         <div className="rounded-5  pc  card card-body  position-relative d-flex flex-column justify-content-center align-items-center" style={{border: "0.5px dashed #315A89",opacity:"0.7",width:"220px"}}>
                            <img src={userData.selfie_image_path} className="rounded-circle" width="168" height="168"  />

                             <img src="/../../asset/images/camera.png" className="position-absolute top-50 start-50 translate-middle" type="button"  />
                         </div>
                    </div>



                   <div className="form-group col-6">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter Name" onChange={(e) => setFormData({...formData, name: e.target.value})} defaultValue={userData.name} />
                        {errors.name != undefined ? <span className="fs-12 text-danger">{errors.name[0]}</span> : null}
                    </div>

                    <div className="form-group col-6">
                        <label for="about-us" className="form-label">Country</label>
                        <select className="form-select"  onChange={(e) => setFormData({...formData, countryId: e.target.value})}>
                          <option >Select Country</option>

                          {countries.length == 0 ? null : countries.map((item) => 
                               <option  defaultValue={item.id} key={item.id} >{item.name}</option>
                            )}
                         
                        </select>
                        {errors.country_id != undefined ? <span className="fs-12 text-danger">{errors.country_id[0]}</span> : null}
                    </div>


                      <div className="form-group col-6">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="user@email.com" onChange={(e) => setFormData({...formData, email: e.target.value})} defaultValue={userData.email} />
                        {errors.email != undefined ? <span className="fs-12 text-danger">{errors.email[0]}</span> : null}
                    </div>

                    <div className="form-group col-6">
                        <label for="about-us" className="form-label">State</label>
                        <select className="form-select" onChange={(e) => setStateId(e.target.value)}>
                          <option>Select State</option>
                          {states.length == 0 ? null : states.map((item) => <option value={item.id} key={item.id}>{item.name}</option> )}
                        </select>
                        {errors.state_id != undefined ? <span className="fs-12 text-danger">{errors.state_id[0]}</span> : null}
                    </div>

                     <div className="col-6">
                      <div className="form-group input-group">
                       <label for="phone" className="form-label" style={{zIndex:"5"}}>Phone</label>
                      <span className="input-group-text bg-light">+234</span>
                      <input type="text" className="form-control" style={{zIndex:"1"}} placeholder="Phonenumber" aria-label="Enter Phone" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} defaultValue={userData.phone_number} />
                        {errors.phone_number != undefined ? <span className="fs-12 text-danger">{errors.phone_number[0]}</span> : null}
                      </div>
                    </div>

                     <div className="form-group col-6">
                        <label for="about-us" className="form-label">City</label>
                        <select className="form-select" onChange={(e) => setFormData({...formData, cityId: e.target.value})}>
                          <option>Select City</option>
                          {cities.length == 0 ? null : cities.map((item) => <option value={item.id} key={item.id}>{item.name}</option> )}
                        </select>
                        {errors.city_id != undefined ? <span className="fs-12 text-danger">{errors.city_id[0]}</span> : null}
                    </div>


                    <div className="form-group" >
                        <button className="rounded-pill btn-lg btn btn-primary text-white fs-14 px-4" type="submit">Save</button>
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

export default UpdateProfile;