import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { SIGNIN } from '../global/routes';
import { isAuth } from './auth';

/**
 * @author      Nandani.V.Patel
 * @date        05 Feb 2025
 * @description private root component check user is authenticated or not.
 * @param
 * @response
**/

export const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();
  const auth = isAuth();

  useEffect(() => {
    if (!auth) {
      navigate(SIGNIN);
    }
  }, [auth, navigate]);
  return auth ? <Outlet/> : null
}

export default PrivateRoute;
