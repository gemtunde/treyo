import {useSelector,useDispatch} from "react-redux";
import {useState,useEffect,useCallback} from 'react';
import {saveUserData,saveCurrentLocation} from "../../../../actions";
import {Link,Redirect,useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios  from "../../../../helpers/axios";
toast.configure();

const MainHeader = (props) => {

  const userData = useSelector((state) => state.userData.data);
  const currentLocation = JSON.parse(useSelector((state) => state.currentLocation));

  const mylocation = JSON.parse(localStorage.getItem('location'))
  //console.log(mylocation.data.user.state_id)


  const history = useHistory();
  const dispatch = useDispatch();
  const [states,setStates] = useState([]);

  const logout = () => {

    localStorage.removeItem('token');
    //localStorage.removeItem('location');
    dispatch(saveUserData({}));
    // return userData.contractor === null ? <Redirect to="/sub-contractor/login" /> : <Redirect to="/driver/login" />;
    toast.success("You are logged out",{theme: "colored"});

  }

  //testing
  const savemylocation =(e)=> {
   // dispatch(saveCurrentLocation(JSON.stringify(item)))
   dispatch(saveCurrentLocation(e.target.value))
    //localStorage.setItem('loca', e.target.value)
  }
  //const myloc = localStorage.getItem('loca')
  //const id = myloc.id
  //const {name} = id
  //console.log("locations ", id)
   //Initialize country data and vehicle types list 
  useEffect(() => {

    axios.get("account/country/nigeria-show").then((res) => {
  
         setStates(res.data.data.states);
      

        res.data.data.states.map((item) => item.id == userData.state_id ? dispatch(saveCurrentLocation(JSON.stringify(item))) : null)
       //  res.data.data.states.map((item) => item.id == userData.state_id ? savemylocation(item) : null)
       
        // console.log(res.data.data.states)
         //console.log(currentLocation)
    });


  },[])



  return (<><header style={{position:"sticky",top:"0",zIndex:"1000"}}>
              <nav className="navbar navbar-expand-lg navbar-light bg-white m-0 border-bottom">
                <div className="container-fluid">
                  <Link className="navbar-brand pc fw-600" to={userData.vehicle === null ? "/sub-Contractor/dashboard" : "/driver/dashboard" }>
                    <img src="/asset/images/logo.png" alt="Logo" height="50" className="ms-2" />
                  </Link>

                  <div className="d-flex">
                 

                  <div className="d-block d-lg-none d-flex">

                  {userData.vehicle !== null ?  
                    <div class="nav-item px-2 position-relative">
                        <Link class="nav-link fs-14  rounded-circle bg-light" style={{padding: '10px 15px'}} to="#"><img src='/../asset/images/bell-icon.png' /></Link>
                         <span class="position-absolute start-50 text-white rounded-pill bg-danger px-1 1h-1 fs-9" style={{top:"5px"}}>3</span>
                      </div>
                  : null}

                      <div class="nav-item px-2 position-relative">
                        <Link class="nav-link fs-14 rounded-circle bg-light" style={{padding: '10px 15px'}} to="#"><img src='/../asset/images/mail-icon.png' width="16"  /> </Link>
                        <span class="position-absolute start-50 text-white rounded-pill bg-danger px-1 1h-1 fs-9" style={{top:"5px"}}>3</span>
                      </div>
                  </div>

                   <button className="navbar-toggler" type="button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offSidebar" aria-controls="offSidebar">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  </div>


                  <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                      {/*<li className=" mx-3" style={{width: "235px"}}>
                              <select className="nav-item form-select rounded-10 g2 w-100 d-inline-block">
                                <option selected>Ghana</option>
                              </select>
                      </li>*/}
                      
                      {userData.vehicle !== null ?  

                       <li className="nav-item px-2 position-relative">
                        <a className="nav-link fs-14  rounded-circle bg-light" style={{padding: '10px 15px'}} href="#"><img src='/../asset/images/bell-icon.png' /></a>
                         <span className="position-absolute start-50 text-white rounded-pill bg-danger px-1 1h-1 fs-9" style={{top:"5px"}}>3</span>
                      </li>

                      : null }

                      <li className="nav-item px-2 position-relative">
                        <a className="nav-link fs-14 rounded-circle bg-light" style={{padding: '10px 15px'}} href="#"><img src='/../asset/images/mail-icon.png' width="16"  /> </a>
                        <span className="position-absolute start-50 text-white rounded-pill bg-danger px-1 1h-1 fs-9" style={{top:"5px"}}>4</span>
                      </li>
                      
                      <li className="nav-item px-2">
                        <a className="nav-link fs-14 d-flex" href="#" >
                          <img src={userData.selfie_image_path} height="35" width="35" className="rounded-circle" /> 
                          <div className="right px-2 d-flex flex-column justify-content-center dropdown">
                            <div id="navbarDropdown" className="dropdown-toggle fw-600" role="button" data-bs-toggle="dropdown" aria-expanded="false">{userData.name}</div>
                            <div className="fs-12 text-capitalize">{userData.vehicle === null ? "Contractor" : "Driver" }</div>


                              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#" onClick={()=> logout()}>Logout</a></li>
                              </ul>
                          </div>

                        </a>
                      </li>
                    </ul>
                  </div>
              </div>
            </nav>
  </header>



  

    <div class="my-3 d-block d-flex justify-content-center row">
                <div className="col-10 col-md-6">
                            <select className="form-select  g2 bg-light" 
                           // onChange={(e) => dispatch(saveCurrentLocation(e.target.value))}
                            onChange={(e) => savemylocation(e)}
                            //onChange={(e) => localStorage.setItem("changeState",e.target.value)}>
                            //{ console.log(localStorage.getItem("changeState"))}
                            >
                                <option >Choose Current Location</option>
                                {states.map((item) => {
                                  if(currentLocation.length != 0){

                                    if(currentLocation.id == item.id){
                                         return <option value={JSON.stringify(item)} selected>{item.name}</option>
                                    }else{
                                       return <option value={JSON.stringify(item)} >{item.name}</option>
                                    }
                                   
                                  }else{

                                    if(userData.state_id == item.id){
                                         return <option value={JSON.stringify(item)} selected>{item.name}</option>
                                    }else{
                                       return <option value={JSON.stringify(item)} >{item.name}</option>
                                    }
                                  }
                                  
                                })}
                              </select>

                </div>

      </div>
  </>
  )
}

export default MainHeader;