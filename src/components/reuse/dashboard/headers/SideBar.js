import {useSelector,useDispatch} from "react-redux";
import {Link,Redirect,useHistory} from "react-router-dom";
import {saveUserData} from "../../../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const SidebarItems = (props) => {

   const userData = useSelector((state) => state.userData.data);

   const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {

    localStorage.removeItem('token');
    dispatch(saveUserData({}));
    // return userData.contractor === null ? <Redirect to="/sub-contractor/login" /> : <Redirect to="/driver/login" />;
    toast.success("You are logged out",{theme: "colored"});

  }



    return ( <div className="card card-body sidebar-md" style={{position:"sticky",top:"100px",zIndex:"1000",overflowY:"scroll",height:'80vh'}}>

                <div className="mb-3 pc text-center fw-700 fs-24 d-none d-md-block">Treyos</div>
 
                <div class="px-2 dropdown mb-3 d-block d-md-none  pb-3" style={{borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <div class="fs-14 d-flex"  >
                          <img src={userData.selfie_image_path} className="rounded-circle" height="50" width="50"/> 
                          <div className="right ps-3 d-flex flex-column justify-content-center">
                            <div className="fw-600" role="button" >{userData.name}</div>
                            <div className="fs-12">{userData.vehicle === null ? "Contractor" : "Driver" }</div>
                          </div>
                        </div>
                </div>

             

                <Link to={`${userData.vehicle == null ? "/sub-contractor/dashboard" : "/driver/dashboard" }`} className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'overview' ? 'active' : null} `}> <i className="fas fa-home"></i> <div className="ms-3">Overview</div></Link>


                {userData.vehicle != null ? 

                <Link to="/driver/jobs/outside" className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'quote' ? 'active' : null}`}> <i className="fas fa-tasks"></i> <div className="ms-3">Return Jobs</div></Link>

                : null}

                {userData.vehicle == null ? 
                <Link to="/sub-contractor/jobs/same-city" className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'post-job' ? 'active' : null}`}><i className="fas fa-plus"></i> <div className="ms-3">Post a Job</div></Link>
                : null}


              {userData.vehicle == null ? 

                <Link to={`${userData.vehicle == null ? "/sub-contractor/history" : "/driver/history" }`} className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'myjobs' ? 'active' : null}`}>

                 <i className="fas fa-plus"></i> <div className="ms-3"> My Jobs</div></Link>

                 : null}

{/*
                <Link to={`${userData.vehicle == null ? "/sub-contractor/transaction-history" : "/driver/transaction-history" }`} className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'history' ? 'active' : null}`}><i className="fa fa-history"></i>  <div className="ms-3">History</div></Link>*/}

               {/* <Link to="#" className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'wallet' ? 'active' : null}`}><img src="/../asset/images/dark-home.png" className="img-1" height={props.screen === 'big' ? '' : '16'}/> <img src="/../asset/images/light-home.png" className="img-2" height={props.screen === 'big' ? '' : '16'}/> <div className="ms-3">e-Wallet</div></Link>
*/}
               {/*  <Link to={`${userData.vehicle == null ? "/sub-contractor/card" : "/driver/card" }`} className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'card' ? 'active' : null}`}><img src="/../asset/images/dark-home.png" className="img-1" height={props.screen === 'big' ? '' : '16'}/> <img src="/../asset/images/light-home.png" className="img-2" height={props.screen === 'big' ? '' : '16'}/> <div className="ms-3">Add Card</div></Link>
*/}

                  <Link to={`${userData.vehicle == null ? "/sub-contractor/orders" : "/driver/orders" }`} className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'orders' ? 'active' : null}`}><i className="fas fa-shopping-cart"></i> <div className="ms-3">Orders</div></Link>

                  {/* <Link to={`${userData.vehicle == null ? "/sub-contractor/support" : "/driver/support" }`} className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'support' ? 'active' : null}`}><img src="/../asset/images/dark-home.png" className="img-1" height={props.screen === 'big' ? '' : '16'}/> <img src="/../asset/images/light-home.png" className="img-2" height={props.screen === 'big' ? '' : '16'}/> <div className="ms-3">Support</div></Link>*/}

                    <Link to={`${userData.vehicle == null ? "/sub-contractor/setting/update-profile" : "/driver/setting/update-profile" }`} className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 ${props.active == 'settings' ? 'active' : null}`}><i className="fas fa-user-plus"></i> <div className="ms-3">Profile</div></Link>

                     <Link  role="button" to="javascript:void(0)" onClick={()=> logout() } className={`d-block d-flex align-items-center ${props.screen === 'big' ? 'fs-18' : 'fs-16'} rounded py-3 mb-4  px-3 `}><i className="fas fa-power-off"></i> <div className="ms-3">Logout</div></Link>

            </div>)
}



const SideBar = (props) => {

  const userData = useSelector((state) => state.userData);
   const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {

    localStorage.removeItem('token');
    dispatch(saveUserData({}));
    history.replace("/sub-contractor/login");
    toast.success("You are logged out",{theme: "colored"});
  }

  return (<>
        <div className="col-md-3 sidebar d-none d-md-block">
           <SidebarItems screen="big" active={props.active}/>
        </div>

        <div class="offcanvas sidebar offcanvas-start ps-0"  tabindex="-1" id="offSidebar" aria-labelledby="offSidebarLabel"  >
          <div class="offcanvas-header px-5">
            <h5 class="offcanvas-title pc fw-700" id="offSidebarLabel">Treyos</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
           <SidebarItems screen="small"/>
        </div>
        </>)
}



export default SideBar;