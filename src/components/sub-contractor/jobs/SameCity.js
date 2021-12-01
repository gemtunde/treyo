import React,{useState,useEffect} from 'react';
import {Link,Redirect,useHistory} from "react-router-dom";
import axios from "../../../helpers/axios";
import Loading from "../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {saveNewRegistration} from "../../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../../reuse/dashboard/headers/MainHeader";
import SideBar from "../../reuse/dashboard/headers/SideBar";

toast.configure();


const SameCity = (props) => {

  const [formData, setFormData] = useState({
   countryId : "",
   stateId : "",
   cityId : "",
   budget : "",
   description:"",
   payment_type:"",
   pickup_address : "",
   delivery_address : "",
   item:"",
   number_of_vehicle:"",
   vehicle_capacity:"",
   vehicle_type_id:"",
   states: [],
   cities: [],
   errors : [],
   registrationStatus: false,
  });
  const {countryId,stateId,cityId,budget,description,pickup_address,delivery_address,cities,errors,confirmId,registrationStatus,payment_type,item,number_of_vehicle,vehicle_capacity,vehicle_type_id} = formData;

  const [loading,setLoading] = useState(false);
  const [vehicleTypes,setVehicleTypes] = useState([]);
  const [vehicleCapacity,setvehicleCapacity] = useState([]);
  const currentLocation = JSON.parse(useSelector((state) => state.currentLocation));
  const userData = useSelector((state) => state.userData.data);

  const history = useHistory();


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



  useEffect(() => {

     axios.get("account/vehicle-type/list").then((res) => {

          if(res.data.status == "success"){
             setVehicleTypes(res.data.data);

          }  

    });

     var data = [];
     for (var i = 5; i <= 200; i++) {
       data.push(i);
     }
     setvehicleCapacity(data);

  },[])

   const handleCreateJobs = (e) => {
    
  e.preventDefault();

  var params = new FormData();
  params.append('to_country_id', currentLocation.country_id);
  params.append('to_state_id', currentLocation.id);
  params.append('to_city_id', cityId);
  params.append('budget', budget);
  params.append('vehicle_type_id', vehicle_type_id);
  params.append('description', description);
  params.append('payment_type', payment_type);
  params.append('pickup_address', pickup_address);
  params.append('delivery_address', delivery_address);
  params.append('type', "intra-state");
  params.append('item', item);
  params.append('number_of_vehicle', number_of_vehicle);
  params.append('vehicle_capacity', vehicle_capacity);

  setLoading(true);
  axios({
  method: "POST",
  url: "transaction/job/contractor/create",
  data: params
  }).then((res) => {
     if(res.data.status == "success"){

       toast.success("Job has been posted successfully",{theme: "colored"}); 

       e.target.reset();

       history.push("/sub-contractor/dashboard");

     }

     setLoading(false);

  })
  .catch((err) => {

    if(err.response){

      if(err.response.data.status == "fail"){
        toast.error(err.response.data.data,{theme: "colored"});
        if(err.response.data.errors != undefined){
            setFormData({...formData, errors: err.response.data.errors})
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

      <SideBar active="post-job" type={props.type}/>
        

        <div className="col-md-9">
          <div className="card card-body">
              <div className="row g-4">
                <div className="col-md-12">
                    <div className="pc fs-24 fw-700 py-3">Post a Job </div>


            
<div id="truck-carousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/../asset/images/dashboard3.png" class="d-block w-100 rounded-10" alt="" height="228" />
    </div>
    <div class="carousel-item">
      <img src="/../asset/images/dashboard3.png" class="d-block w-100 rounded-10" alt="" height="228" />
    </div>
    <div class="carousel-item">
      <img src="/../asset/images/dashboard3.png" class="d-block w-100 rounded-10" alt="" height="228" />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#truck-carousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#truck-carousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

                   
                        

                </div>

    
                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">

                   <div className="pc fs-24 fw-700 pb-4">Same City Booking Form</div>
                   <form className="register-wrapper row" onSubmit={(e) => handleCreateJobs(e)}>

                   {/*<div className="form-group col-md-6">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control form-control-lg" id="name" placeholder="Enter Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        {errors.name != undefined ? <span className="fs-12 text-danger">{errors.name[0]}</span> : null}
                    </div>


                      <div className="form-group col-md-6">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control form-control-lg" id="email" placeholder="user@email.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        {errors.email != undefined ? <span className="fs-12 text-danger">{errors.email[0]}</span> : null}
                    </div>

                     <div className="col-md-6">
                      <div className="form-group input-group">
                       <label for="phone" className="form-label" style={{zIndex:"5"}}>Phone</label>
                      <span class="input-group-text bg-light">+234</span>
                      <input type="text" class="form-control form-control-lg" style={{zIndex:"1"}} placeholder="Username" aria-label="Enter Phone" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                        {errors.phone_number != undefined ? <span className="fs-12 text-danger">{errors.phone_number[0]}</span> : null}
                      </div>
                    </div>*/}

                    <div className="form-group col-md-6">
                        <label for="budget" className="form-label">Budget</label>
                        <input type="text" className="form-control form-control-lg" id="budget" placeholder="Enter your Budget" onChange={(e) => setFormData({...formData, budget: e.target.value})}/>
                        {errors.budget != undefined ? <span className="fs-12 text-danger">{errors.budget[0]}</span> : null}
                    </div>

                     <div className="form-group col-md-6">
                        <label for="item" className="form-label">What are you moving?</label>
                        <input type="text" className="form-control form-control-lg" id="item" placeholder="What are you moving?" onChange={(e) => setFormData({...formData, item: e.target.value})}/>
                        {errors.item != undefined ? <span className="fs-12 text-danger">{errors.item[0]}</span> : null}
                    </div>

                     <div className="form-group col-md-6">
                        <label for="budget" className="form-label">Pickup Address</label>
                        <input type="text" className="form-control form-control-lg" id="budget" placeholder="Enter Location" onChange={(e) => setFormData({...formData, pickup_address: e.target.value})}/>
                        {errors.pickup_address != undefined ? <span className="fs-12 text-danger">{errors.pickup_address[0]}</span> : null}
                    </div>

                    <div className="form-group col-md-6">
                        <label for="budget" className="form-label">Delivery Location</label>
                        <input type="text" className="form-control form-control-lg" id="budget" placeholder="Enter Location" onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}/>
                        {errors.delivery_address != undefined ? <span className="fs-12 text-danger">{errors.delivery_address[0]}</span> : null}
                    </div>

                  
                   <div className="form-group col-md-6">
                        <label for="about-us" className="form-label">Vehicle Type</label>
                          <select class="form-select" onChange={(e) => setFormData({...formData, vehicle_type_id: e.target.value})}>
                          <option selected>Select Vehicle Type</option>
                          {vehicleTypes.length == 0 ? null : vehicleTypes.map((item) => 
                               <option value={item.id} key={item.id}>{item.name}</option>
                            )}
                        </select>
                        {errors.vehicle_type_id != undefined ? <span className="fs-12 text-danger">{errors.vehicle_type_id[0]}</span> : null}
                    </div>


                     <div className="form-group col-md-6">
                        <label for="about-us" className="form-label">Payment Type</label>
                        <select class="form-select"  onChange={(e) => setFormData({...formData, payment_type: e.target.value})}>
                          <option selected>Choose payment Type</option>
                               <option value="pod">POD</option>
                               <option value="wallet">Wallet</option>
                        </select>
                        {errors.payment_type != undefined ? <span className="fs-12 text-danger">{errors.payment_type[0]}</span> : null}
                    </div>


                    <div className="form-group col-md-6">
                        <label for="about-us" className="form-label">Number of Truck</label>
                        <select class="form-select"  onChange={(e) => setFormData({...formData, number_of_vehicle: e.target.value})}>
                          <option selected>Choose number of truck</option>

                          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item) => 
                               <option value={item} key={item}>{item}</option>
                            )}
                         
                        </select>
                        {errors.number_of_vehicle != undefined ? <span className="fs-12 text-danger">{errors.number_of_vehicle[0]}</span> : null}
                    </div>


                   {/*  <div className="form-group col-md-6">
                        <label for="about-us" className="form-label">Country</label>
                        <select class="form-select"  onChange={(e) => setFormData({...formData, countryId: e.target.value})}>
                          <option selected>Select Country</option>
                          {countries.length == 0 ? null : countries.map((item) => 
                               <option value={item.id} key={item.id}>{item.name}</option>
                            )}
                         
                        </select>
                        {errors.to_country_id != undefined ? <span className="fs-12 text-danger">{errors.to_country_id[0]}</span> : null}
                    </div>


                   <div className="form-group col-md-6">
                        <label for="about-us" className="form-label">State</label>
                        <select class="form-select" onChange={(e) => setFormData({...formData, stateId: e.target.value})}>
                          <option selected>Select State</option>
                          {states.length == 0 ? null : states.map((item) => <option value={item.id} key={item.id}>{item.name}</option> )}
                        </select>
                        {errors.to_state_id != undefined ? <span className="fs-12 text-danger">{errors.to_state_id[0]}</span> : null}
                    </div>*/}


                  <div className="form-group col-md-6">
                        <label for="about-us" className="form-label">City</label>
                        <select class="form-select" onChange={(e) => setFormData({...formData, cityId: e.target.value})}>
                          <option selected>Select City</option>
                          {currentLocation.length == 0 ? null : currentLocation.cities.map((item) => <option value={item.id} key={item.id}>{item.name}</option> )}
                        </select>
                        {errors.to_city_id != undefined ? <span className="fs-12 text-danger">{errors.to_city_id[0]}</span> : null}
                    </div>


                    <div className="form-group col-md-6">
                        <label for="about-us" className="form-label">Truck Capacity</label>
                        <select class="form-select"  onChange={(e) => setFormData({...formData, vehicle_capacity: e.target.value})}>
                          <option selected>Choose truck capacity</option>

                          {vehicleCapacity.map((item) => 
                               <option value={item + 'tons'} key={item}>{item} Tons</option>
                            )}
                         
                        </select>
                        {errors.vehicle_capacity != undefined ? <span className="fs-12 text-danger">{errors.vehicle_capacity[0]}</span> : null}
                    </div>


                     <div className="form-group col-md-6">
                        <label for="description" className="form-label">Description</label>
                        <input type="text" className="form-control form-control-lg" id="description" placeholder="Describe your goals" onChange={(e) => setFormData({...formData, description: e.target.value})}/>
                        {errors.description != undefined ? <span className="fs-12 text-danger">{errors.description[0]}</span> : null}
                    </div>



                    <div className="form-group" >
                        <button className="btn-lg rounded-pill btn btn-primary text-white fs-14 px-4" type="submit">Post Job Request</button>
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

export default SameCity;