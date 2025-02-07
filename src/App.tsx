import { Provider } from "react-redux";
import { store } from "./components/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  SIGNIN,
  DASHBOARD,
  USERS,
  NOTFOUND,
  ADD_USERS,
  EDIT_USERS,
  ID,
  ACTIVITY_LOG,
} from "./global/routes";

import Login from "./components/login";
import Users from "./components/users";
import NotFound from "./components/notFound";
import UserForm from "./components/users/usersForm";
import Activitylog from "./components/activitylog";

import PrivateRoute from "./utils/privateRoute";
import LayoutWrapper from "./layoutWrapper";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path={SIGNIN} element={<Login />} />

            <Route path="/" element={<PrivateRoute />}>
              <Route element={<LayoutWrapper />}>
                <Route
                  path={DASHBOARD}
                  element={<Navigate to={USERS} replace />}
                />
                <Route path={USERS} element={<Users />} />
                <Route path={`${USERS}${ADD_USERS}`} element={<UserForm />} />
                <Route
                  path={`${USERS}${EDIT_USERS}${ID}`}
                  element={<UserForm />}
                />
                <Route path={ACTIVITY_LOG} element={<Activitylog />} />
              </Route>
            </Route>

            <Route path={NOTFOUND} element={<NotFound />} />
            <Route path="*" element={<Navigate to={NOTFOUND} replace />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
