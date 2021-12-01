import {useState,useEffect} from 'react';
import {Link,useHistory} from "react-router-dom";
import axios from "../../../../helpers/axios";
import Loading from "../../../Loading";
import {useSelector,useDispatch} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../headers/MainHeader";
import SideBar from "../headers/SideBar";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

toast.configure();


const AddCard = (props) => {

   const [passwordStatus,setPasswordStatus] = useState(true);
   const userData = useSelector((state) => state.userData.data);
    const [formData, setFormData] = useState({
     cardNumber: "",
     cardExpiry: "",
     name: "",
     cvv : "",
     cardType : "",
     errors : [],
     registrationStatus: false,
    });
  const {cardNumber,cardExpiry,name,cvv,cardType,errors,registrationStatus} = formData;

  const [loading,setLoading] = useState(false);
  const [cards,setCards] = useState([]);
  const [isEditStatus,setIsEditStatus] = useState(false);
  const [editedData,setEditedData] = useState([]);


  const handleAddCard = (e) => {
    
  e.preventDefault();

  var params = new FormData();
  params.append('card_number', cardNumber);
  params.append('card_name', name);
  params.append('expire_date', cardExpiry);
  params.append('cvv', cvv);
  params.append('card_type', cardType);
  if(isEditStatus){
    params.append('user_card_id', editedData[0].id);
  }



  setLoading(true);
  axios({
  method: "POST",
  url: isEditStatus ? "payment/card/update" : "payment/card/create",
  data: params
  }).then((res) => {
     if(res.data.status == "success"){

       toast.success(`Card has been ${isEditStatus ? 'edited' : 'added'} Successfully`,{theme: "colored"}); 

       setCards([...cards,res.data.data])
       e.target.reset();
        
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



  //Initialize List of Cards 
  useEffect(() => {

    axios.get("payment/card/list").then((res) => {
  
      if(res.data.status == "success"){
         setCards(res.data.data)
      }else{
         setCards([])
      }
    });


  },[])


const editCard = (id) => {
  setIsEditStatus(true);
  let data = cards.filter((item) => item.id === id) 
  setEditedData(data)

  setFormData({...formData, cardNumber: data[0].card_number,cardExpiry: data[0].expire_date,name:data[0].card_name,cvv:data[0].cvv,cardType:data[0].card_type})


}


const deleteCard = (id) => {


  confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {

              axios({
                method: "DELETE",
                url: `/payment/card/${id}/delete`,
                }).then((res) => {
                
                    if(res.data.status == "success"){
                       toast.success("Card has been deleted",{theme: "colored"}); 
                        const newCards = cards.filter((item) => item.id !== id); 
                        setCards(newCards); //Remove Card from state
                    }

               });


          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });




}
  



  return (
    <>
      <Loading status={loading} />

       <div className="page-wrapper bg-white">
          <MainHeader />

  <div className="container-fluid mt-4">
  <div className="row">

      <SideBar active="card" type={props.type}/>
        

        <div className="col-md-9">
          <div className="card card-body">
              <div className="row g-4">
                <div className="col-md-12">
                <Link to={userData.role.name === 'driver' ? "/driver/card" :  "/sub-contractor/card"} className="btn rounded-pill btn-primary text-white "><i className="fas fa-chevron-left"></i> Back</Link>
                    <div className="pc fs-36 fw-700 py-3">Add Card</div>
                </div>

    
                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">

                   <div className="pc fs-24 fw-700 pb-4">Add Card Details</div>


                    <form className={`register-wrapper row`} onSubmit={(e) =>  handleAddCard(e)}>

                   <div className="form-group col-md-6">
                        <label for="card-number" className="form-label">Card Number</label>
                        <input type="text" className="form-control" id="card-number" defaultValue={cardNumber} placeholder="0000 0000 0000" onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} />
                        {errors.card_number != undefined ? <span className="fs-12 text-danger">{errors.card_number[0]}</span> : null}
                    </div>


                    <div className="form-group col-md-6">
                        <label for="expiry" className="form-label">Card Expiry</label>
                        <input type="text" className="form-control" id="expiry" defaultValue={cardExpiry} placeholder="MM/YY" onChange={(e) => setFormData({...formData, cardExpiry: e.target.value})} />
                        {errors.expire_date != undefined ? <span className="fs-12 text-danger">{errors.expire_date[0]}</span> : null}
                    </div>


                     <div className="form-group col-md-6">
                        <label for="name" className="form-label">Name on Card</label>
                        <input type="text" className="form-control" id="name" defaultValue={name} placeholder="Enter Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        {errors.card_name != undefined ? <span className="fs-12 text-danger">{errors.card_name[0]}</span> : null}
                    </div>


                      <div className="form-group col-md-6">
                        <label for="cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" id="cvv" placeholder="123"defaultValue={cvv}  onChange={(e) => setFormData({...formData, cvv: e.target.value})} />
                        {errors.cvv != undefined ? <span className="fs-12 text-danger">{errors.cvv[0]}</span> : null}
                    </div>


                    <div className="form-group col-md-6">
                        <label for="about-us" className="form-label">Card Type</label>
                        <select class="form-select"  value={cardType} onChange={(e) => setFormData({...formData, cardType: e.target.value})}>
                          <option>Select Card Type</option>
                          <option value="visa">Visa</option>
                          <option value="verve">Verve</option>
                          <option value="master">Master</option>

                        </select>
                        {errors.card_type != undefined ? <span className="fs-12 text-danger">{errors.card_type[0]}</span> : null}
                    </div>



                    <div className="form-group d-flex " >
                        <button className="rounded-pill btn btn-primary text-white fs-14 px-4" type="submit">{isEditStatus ? 'Edit' : 'Add'} Card Details</button>

                        <button className={`${isEditStatus ? 'd-block' : 'd-none'} ms-2 rounded-pill btn btn-danger text-white fs-14 px-4`} type="reset" onClick={()=> setIsEditStatus(false)}>Cancel</button>
                    </div>


                    </form>


                   </div>
                </div>

    
                <div className="col-md-12">
                   <div className="p-4 rounded-10 green-2-bg">

                   <div className="pc fs-24 fw-700 pb-4">List of Cards</div>

                  
                   <div className="table-responsive bg-white">
          <table className="table table-striped fs-14">
               <thead style={{background:"#B5CFEC"}} >
                    <tr>
                         <th className="border-0 border-top">Card Name</th>
                         <th className="border-0 border-top">Card Number</th>
                         <th className="border-0 border-top">Created At</th>
                         <th className="border-0 border-top">Action</th>
                    </tr>
               </thead>
               <tbody>

               { cards.length == 0 ? null : 
                cards.map((item) => 
                        <tr>
                         <td>{item.card_name}</td>
                         <td>{item.card_number}</td>
                         <td>{item.created_at}</td>
                         <td>

                         <button className="btn btn-sm text-info" onClick={() => editCard(item.id)}><i className="fas fa-pen"></i></button>

                         <button className="btn btn-sm text-danger" onClick={() => deleteCard(item.id)}><i className="fas fa-trash"></i></button></td>
                        </tr>
                        )
              }

              


               </tbody>
          </table>
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

export default AddCard;