import axios  from "../helpers/axios";

export const Profile =  () => {
  return new Promise(async (resolve,reject) => {
         const result = await axios.get("account/profile/show").catch(error => error.response);
         resolve(result.data);
  })
 
}

