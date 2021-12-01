import React,{useState,useEffect} from 'react';
import {Link,useHistory} from "react-router-dom";
import axios  from "../../helpers/axios";
import Loading from "../Loading";
import {useSelector,useDispatch} from "react-redux";
import {saveNewRegistration} from "../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const Register = (props) => {

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

  const [regSection,setRegSection] = useState(true);
  const [loading,setLoading] = useState(false);
  const newRegistration = useSelector((state) => state.saveNewRegistration);
  const dispatch = useDispatch();
  const history = useHistory();


    useEffect(() => {

    
        if(confirmId && terms && typeof selfie == "object" && typeof govtId == "object" && typeof selfieId == "object"){
             setFormData({...formData, registrationStatus: true});

        }else{
            setFormData({...formData, registrationStatus: false});
        }

  },[confirmId,terms,selfie,govtId,selfieId])


  //Initialize country data and vehicle types list 
  useEffect(() => {

    axios.get("account/country/nigeria-show").then((res) => {
  
      if(res.data.status == "success"){
         setFormData({...formData, countries: [res.data.data]})
      }else{
         setFormData({...formData, countries: []})
      }
    });


  },[])

  //Handle states when country changes
  useEffect(() => {

    if(countries.length != 0){
      setFormData({...formData, states: countries[0]['states']})
    }

  },[countryId])


  //Handle Cities when state changes
  useEffect(() => {

    if(states.length != 0){
       states.map((item) => {
           if(item.id == stateId){
               setFormData({...formData, cities: item.cities})
           }
       });
   }

  },[stateId])



  const submitRegistrationForm = (e) => {
    
  e.preventDefault();

  var params = new FormData();
  params.append('name', name);
  params.append('email', email);
  params.append('password', password);
  params.append('phone_number', phoneNumber);
  params.append('country_id', countryId);
  params.append('confirm_password', password);
  params.append('type',"contractor");
  params.append('state_id', stateId);
  params.append('city_id', cityId);
  params.append('selfie_image', selfie);
  params.append('valid_id_image', govtId);
  params.append('selfie_valid_id_image', selfieId);



  setLoading(true);
  axios({
  method: "post",
  url: "account/register",
  data: params
  }).then((res) => {
     if(res.data.status == "success"){

       toast.success("Registration Successful",{theme: "colored"});

         setTimeout(()=>{
                history.push("/sub-contractor/verify-account");
                toast.dismiss();
                toast.warn("Please verify your account",{theme: "colored"});
            
         },1000)
 
        dispatch(saveNewRegistration(res.data.data));

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



  return (
    <>
       <Loading status={loading} />

       <div className="container my-5">


       <form className="register-wrapper"  onSubmit={(e) => submitRegistrationForm(e)}>
            <div className={regSection == true ? "row gx-5 bg-white" : "d-none"} >
            <div className="col-md-6">
               <div className="card card-body py-5"
               >

                   <h1 className="header">Let’s Get Started</h1>
                   <div className="sub-header">Register with Treyos Today</div>

                    <div className="row register-option-wrapper mb-5">
                       <div className="col-6 left">
                          <div className="card card-body active" role="button">
                           <small>Register as a</small>
                            <div>Sub-Contractor</div>
                          </div>
                       </div>
                       <div className="col-6 right ">
                          <div className="card card-body" role="button">
                           <small>Register as a</small>
                            <div>Truck Driver</div>

                            <Link to="/driver/register" className="stretched-link"/>
                          </div>
                       </div>
                    </div>


                   <div className="form-group">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control form-control-lg" id="name" placeholder="Enter Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        {errors.name != undefined ? <span className="fs-12 text-danger">{errors.name[0]}</span> : null}
                    </div>


                      <div className="form-group">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control form-control-lg" id="email" placeholder="user@email.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        {errors.email != undefined ? <span className="fs-12 text-danger">{errors.email[0]}</span> : null}
                    </div>

                     <div className="form-group">
                        <label for="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control form-control-lg" id="phone" placeholder="Enter Phone" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}/>
                        {errors.phone_number != undefined ? <span className="fs-12 text-danger">{errors.phone_number[0]}</span> : null}
                    </div>

                    <div className="form-group">
                        <label for="password" className="form-label">Password</label>
                        <input type={passwordStatus ? "password" : "text"} className="form-control form-control-lg" id="password" placeholder="xxxxxxxx" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        <a role="button" onClick={() => setPasswordStatus(!passwordStatus)}><i className={passwordStatus ? "fas fa-eye-slash" : "fas fa-eye"}></i></a>
                        {errors.password != undefined ? <span className="fs-12 text-danger">{errors.password[0]}</span> : null}
                    </div>


                     <div className="form-group">
                        <label for="password" className="form-label">Confirm Password</label>
                        <input type={passwordStatus ? "password" : "text"} className="form-control form-control-lg" id="password" placeholder="xxxxxxxx" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                        <a role="button" onClick={() => setPasswordStatus(!passwordStatus)}><i className={passwordStatus ? "fas fa-eye-slash" : "fas fa-eye"}></i></a>
                        {errors.confirm_password != undefined ? <span className="fs-12 text-danger">{errors.confirm_password[0]}</span> : null}
                    </div>



                   <div className="form-group">
                        <label for="about-us" className="form-label">Country</label>
                        <select class="form-select"  onChange={(e) => setFormData({...formData, countryId: e.target.value})}>
                          <option selected>Select Country</option>

                          {countries.length == 0 ? null : countries.map((item) => 
                               <option value={item.id} key={item.id}>{item.name}</option>
                            )}
                         
                        </select>
                        {errors.country_id != undefined ? <span className="fs-12 text-danger">{errors.country_id[0]}</span> : null}
                    </div>


                   <div className="form-group">
                        <label for="about-us" className="form-label">State</label>
                        <select class="form-select" onChange={(e) => setFormData({...formData, stateId: e.target.value})}>
                          <option selected>Select State</option>
                          {states.length == 0 ? null : states.map((item) => <option value={item.id} key={item.id}>{item.name}</option> )}
                        </select>
                        {errors.state_id != undefined ? <span className="fs-12 text-danger">{errors.state_id[0]}</span> : null}
                    </div>


                   <div className="form-group">
                        <label for="about-us" className="form-label">City</label>
                        <select class="form-select"  onChange={(e) => setFormData({...formData, cityId: e.target.value})}>
                          <option selected>Select City</option>
                          {cities.length == 0 ? null : cities.map((item) => <option value={item.id} key={item.id}>{item.name}</option> )}
                        </select>
                        {errors.city_id != undefined ? <span className="fs-12 text-danger">{errors.city_id[0]}</span> : null}
                    </div>

                    

                     <div className="form-group">
                        <label for="about-us" className="form-label">How did you hear about us?</label>
                        <select class="form-select">
                          <option selected>Tell Us</option>
                          <option value="1">Google</option>
                          <option value="2">Facebook</option>
                          <option value="3">Instagram</option>
                          <option value="3">Twitter</option>
                          <option value="3">Friends</option>
                        </select>
                         {errors.city_id != undefined ? <span className="fs-12 text-danger">{errors.city_id[0]}</span> : null}
                    </div>

                     <div className="form-group  d-flex align-items-center terms">
                        <input type="checkbox" id="terms" onChange={(e) => setFormData({...formData, terms: !formData.terms})}/> <label className="fs-11 lh-1 mx-2 position-static" for="terms">Accept Terms of Use</label>
                    </div>

                    <div className="form-group d-flex align-items-center justify-content-center" >
                        <button className="rounded-pill btn-lg  btn btn-primary text-white fs-14 w-50" type="button" onClick={() => setRegSection(false)}
                        >Next</button>
                    </div>

                    <div className="d-flex align-items-center justify-content-center fs-13">
                        <span >Already have an Account?</span> <Link to="/sub-contractor/login" className="fw-600 mx-1">Login</Link>
                    </div>

               </div>
            </div>
            {/*`linear-gradient(rgba(49, 90, 137, 0.46)),url('../asset/images/truck.png')`,*/}
            <div className="col-md-6 d-none d-md-block position-relative"  style={{
              backgroundImage: `linear-gradient(rgba(49, 90, 137, 0.46),rgba(49, 90, 137, 0.46)),url('../asset/images/truck.png')`,
              backgroundRepeat:'no-repeat',
              backgroundSize: "100%",
              height: "700px"}}>

              <div className="h-100 position-relative">


              <div className="position-absolute text-white p-4 w-75" style={{backgroundColor:`rgba(255, 255, 255, 0.33)`,backdropFilter: `blur(12px)`,height:"400px",left:"10%",top:"20%"}}>
                <h3 className="fw-600" style={{letterSpacing:"0.02em"}}> Be the <br />merchant of <br />your movement</h3>

                <img src="../asset/images/victoria-preview.png" className="img-fluid position-absolute h-100" style={{"bottom":"10%","transform":"scale(1.2)","right":"-40%"}}/>


                <img src="../asset/images/ellipse.png" className="position-absolute top-100 start-0 translate-middle" height="60" />
                
              </div>



            </div>   
             </div> 

             </div>  

              <div className={regSection == false ? "row gx-5 bg-white" : "d-none"}>
            <div className="col-md-12">
               <div className="card card-body py-5">

                <h1 className="header mb-3">Upload ID/Photo</h1>

                  <div className="row g-3" >

                        <div className="col-md-6">
                            <div style={{border: "1px dashed #A2A2A8"}} className="p-3 pt-5 d-flex flex-column justify-content-center align-items-center">
                                <div style={{border: "2px solid #315A89",background:"#F6FAFF"}} className="p-3 py-2 mb-3 lh-1">
                                <img src={selfie ? URL.createObjectURL(selfie) : "../asset/images/folder.png"} style={{height:"30px"}} />
                                </div>
                                <div className="fs-13 g2 mb-4">Please snap and upload a selfie of yourslef</div>
                                <label className="rounded-pill btn btn-outline-secondary btn-sm px-5" role="button" for="selfie">Choose File </label>

                                <input type="file" id="selfie" hidden onChange={(e) => setFormData({...formData, selfie: e.target.files[0]})} />

                                {errors.selfie_image != undefined ? <span className="fs-12 text-danger">{errors.selfie_image[0]}</span> : null}
                            </div>

                        </div>



                        <div className="col-md-6">
                            <div style={{border: "1px dashed #A2A2A8"}} className="p-3 pt-5 d-flex flex-column justify-content-center align-items-center">
                                <div style={{border: "2px solid #315A89",background:"#F6FAFF"}} className="p-3 py-2 mb-3 lh-1">
                                <img src={govtId ? URL.createObjectURL(govtId) : "../asset/images/folder.png"} style={{height:"30px"}} />
                                </div>
                                <div className="fs-13 g2 mb-4">Please upload a valid Govt. ID. Voters card, drivers licence or international passport</div>
                                <label className="rounded-pill btn btn-outline-secondary btn-sm px-5" role="button" for="govt-id">Choose File </label>
                                <input type="file" id="govt-id" hidden onChange={(e) => setFormData({...formData, govtId: e.target.files[0]})} />
                                {errors.valid_id_image != undefined ? <span className="fs-12 text-danger">{errors.valid_id_image[0]}</span> : null}
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div style={{border: "1px dashed #A2A2A8"}} className="p-3 pt-5 d-flex flex-column justify-content-center align-items-center">
                                <div style={{border: "2px solid #315A89",background:"#F6FAFF"}} className="p-3 py-2 mb-3 lh-1">
                                <img src={selfieId ? URL.createObjectURL(selfieId) : "../asset/images/folder.png"} style={{height:"30px"}} />
                                </div>
                                <div className="fs-13 g2 mb-4">Please snap and upload a selfie with valid ID</div>
                                <label className="rounded-pill btn btn-outline-secondary btn-sm px-5" role="button" for="selfie-id">Choose File </label>
                                 <input type="file" id="selfie-id" hidden onChange={(e) => setFormData({...formData, selfieId: e.target.files[0]})} />

                                 {errors.selfie_valid_id_image != undefined ? <span className="fs-12 text-danger">{errors.selfie_valid_id_image[0]}</span> : null}
                            </div>
                        </div>









                  </div>


                  <div className="form-group  d-flex align-items-center id-confirmation mt-3 px-3">
                        <input type="checkbox" id="id-confirmation" onChange={(e) => setFormData({...formData, confirmId: !formData.confirmId})} /> <label className="fs-11 lh-1 mx-2 position-static" for="id-confirmation">I confirm ID and Photo is Valid and in original color</label>
                    </div>



                   <div className="form-group d-flex align-items-end justify-content-end  mt-4 form-nav" >
                   <button  onClick={() => setRegSection(true)} className="rounded-pill  btn-lg btn outline fs-14 px-5 mx-2" type="button"
                        >Previous</button>

                      <button className={`rounded-pill btn btn-lg  btn-primary text-white fs-14 px-5 ${registrationStatus ? 'disabled' : null}`} type="submit"
                        >Register</button> 

                    </div>



               </div>  

                </div>

               </div>  


          </form>



       </div>
    </>
  )
}

export default Register;