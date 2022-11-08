import {call,put} from 'redux-saga/effects'
import { setUser } from '../../ducks/user';
import { requestGetUser } from '../requests/user';



export function* handlerGetUser(action:any){
    try {
      const response = call(requestGetUser)
      const data=response
      yield put(setUser(data))
    } catch (error:any) {
        console.log(error);
        
    }
}