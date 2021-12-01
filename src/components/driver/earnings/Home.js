import React,{useState} from 'react';
import {Link,Redirect,useHistory} from "react-router-dom";
import axios  from "../../../helpers/axios";
import Loading from "../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {saveNewRegistration} from "../../../actions";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../../reuse/dashboard/headers/MainHeader";
import SideBar from "../../reuse/dashboard/headers/SideBar";

toast.configure();


const City = (props) => {

  const newRegistration = useSelector((state) => state.saveNewRegistration);
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

      <SideBar active={props.active} type="driver"/>
        

        <div className="col-md-9">
             <div className="pc fs-29 fw-700 py-3">Earning</div>
          <div className="card card-body green-2-bg ">

          <div className="pc fs-24 fw-700 pb-4">Overview</div>


     <div className="pc fs-24 fw-700 pb-4">Statistics</div>
      <div className="table-responsive bg-white">
          <div className=" register-wrapper row rounded-0 d-flex justify-content-end align-items-center p-2 py-3" style={{background:"#B5CFEC"}}>
               <div className="form-group col-md-3 mb-0">
                      <input type="text" className="form-control rounded-10 border ps-5" placeholder="Search User" style={{background:"#B5CFEC"}}/>
                      <a role="button" style={{left:"25px",top:"5px"}}><img src="/../../asset/images/search.png"  /></a>
                       <a role="button" style={{right:"25px",top:"5px"}} className="rounded-circle px-2 shadow"><img src="/../../asset/images/more.png"  /></a>
               </div>
          </div>
          <table className="table table-striped fs-14">
               <thead style={{background:"#B5CFEC"}} >
                    <tr>
                         <th className="border-0 border-top">Date</th>
                         <th className="border-0 border-top">Contractor</th>
                         <th className="border-0 border-top">Category</th>
                         <th className="border-0 border-top">Type</th>
                         <th className="border-0 border-top">Earning</th>
                         <th className="border-0 border-top">Status</th>
                    </tr>
               </thead>
               <tbody>
                    <tr>
                         <td>11/09/2021</td>
                         <td>Derek Peter</td>
                         <td>Food Stuff</td>
                         <td>Within State</td>
                         <td>N42.000</td>
                         <td><button className="btn lh-1 text-white primary-color-bg">Delivered</button></td>
                    </tr>

                     <tr>
                         <td>11/09/2021</td>
                         <td>Derek Peter</td>
                         <td>Food Stuff</td>
                         <td>Within State</td>
                         <td>N42.000</td>
                         <td><button className="btn lh-1 text-white primary-color-bg">Delivered</button></td>
                    </tr>


                     <tr>
                         <td>11/09/2021</td>
                         <td>Derek Peter</td>
                         <td>Food Stuff</td>
                         <td>Within State</td>
                         <td>N42.000</td>
                         <td><button className="btn lh-1 text-white primary-color-bg">Delivered</button></td>
                    </tr>


               </tbody>
          </table>
     </div>
           



            </div>
       </div>
    </div>
  </div>
       </div>
    </>
  )
}

export default City;