import takeLatest from "redux-saga"
import { handlerGetUser } from "./handlers/user"
import GET_USER  from "../ducks/user"


// export function* watcherSaga(){
//     yield takeLatest(GET_USER,handlerGetUser);
// }