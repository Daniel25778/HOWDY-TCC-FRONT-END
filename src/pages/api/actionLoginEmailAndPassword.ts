import Api from '../../ApiGoogle';
import { api } from '../../services/api';

interface actionLoginEmailAndPasswordProps{
    email: string;
    password: string;
}

export async function actionLoginEmailAndPassword({email, password}: actionLoginEmailAndPasswordProps) {
    let resultGoogle = Api.googleLogInto();
}
