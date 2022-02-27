
import Api from '../../Api';
import { api } from '../../services/api';

export async function actionLoginGoogle(){

     let result = Api.googleLogInto();
   //   let idToken = (await result).user.getIdToken
   //   api.get(`users/getByUidExternal/${idToken}`).then(data => console.log(data))

  }