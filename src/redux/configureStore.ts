import { combineReducers,createStore,applyMiddleware } from "redux";

import createSagaMiddleware from 'redux-saga'


import userReducer from "./ducks/user";
// import { watcherSaga } from "./sagas/rootSaga";



const reducer = combineReducers({
  user: userReducer,
});


 const sagaMiddleware=createSagaMiddleware()
 const midlleware=[sagaMiddleware]


// const store = createStore(reducer,{},applyMiddleware(...midlleware));
// sagaMiddleware.run(watcherSaga )
// export default store;
