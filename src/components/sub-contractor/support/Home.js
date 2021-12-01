import {useState} from 'react';
import {Link,useHistory} from "react-router-dom";
import axios from "../../../helpers/axios";
import Loading from "../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../../reuse/dashboard/headers/MainHeader";
import SideBar from "../../reuse/dashboard/headers/SideBar";

toast.configure();


const Home = (props) => {

  const [loading,setLoading] = useState(false);

  return (
    <>
      <Loading status={loading} />

       <div className="page-wrapper bg-white">
          <MainHeader />

  <div className="container-fluid mt-4">
  <div className="row">

      <SideBar active="support" type={props.type}/>
        

        <div className="col-md-9">
          <div className="card card-body">
              <div className="row g-4">
                <div className="col-md-12">
                    <div className="pc fs-36 fw-700">Support</div>
                </div>

    
                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">


                    <div className="pc fs-24 fw-700 pb-4">Reach out to us</div>

                    <div className="card card-body bg-white rounded-10 my-3">
                      <div className="fs-18 fw-600 mb-2">Follow Us on</div>
                        <div><a href="#" className="fs-14 pc"><img src="/../../asset/images/facebook.png" /> &nbsp; Treyos Hullage & Logistics</a></div>
                       <div><a href="#" className="fs-14 pc"><img src="/../../asset/images/twitter.png" /> &nbsp; Treyos Hullage & Logistics</a></div>
                        <div><a href="#" className="fs-14 pc"><img src="/../../asset/images/instagram.png" /> &nbsp; Treyos_Hullage_Logistics</a></div>
                       <div><a href="#" className="fs-14 pc"><img src="/../../asset/images/linkedin.png" /> &nbsp; Treyos_Hullage_Logistics</a></div>
                    </div>


                    <div className="card card-body bg-white rounded-10 my-3">
                      <div className="fs-18 fw-600 mb-2">Office Address</div>
                        <div><a href="#" className="fs-14 pc">Shop 25, Divine Grace shopping complex, besides Chicken Republic,Oke-ata, Ejigbo road, Isolo Lagos</a></div>
                       </div>

                  <div className="card card-body bg-white rounded-10 my-3">
                      <div className="fs-18 fw-600 mb-2">Email Address</div>
                        <div><a href="#" className="fs-14 pc">support@Treyos.com</a></div>
                   </div>


                   <div className="card card-body bg-white rounded-10 my-3">
                      <div className="fs-18 fw-600 mb-2">Phone Number</div>
                        <div><a href="#" className="fs-14 pc">+234 9078465732</a></div>
                   </div>

                   <div className="row">
                       <div className="form-group col-md-5" >

                      <div className="rounded-10 primary-color-bg text-white p-4 d-flex flex-column  justify-content-start align-items-start">
                      
                              <div className="fs-18 fw-600 mb-2">Drop us a line</div>
                              <div className="fs-16 fw-300 mb-2">We’re always available to listen to you</div>

                              <button className="rounded-pill btn bg-white pc text-white fs-14 px-4" >Contact Us</button>
                     </div>
                        
                    </div>
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