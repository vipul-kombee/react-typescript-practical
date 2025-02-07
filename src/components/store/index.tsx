import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./effect/index";
import { rootReducer } from "./reducer/index";

const sagaMiddleware = createSagaMiddleware();

const devToolsEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any) => f;

const enhancer = compose(applyMiddleware(sagaMiddleware), devToolsEnhancer);

export const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);
