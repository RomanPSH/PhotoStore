import React, { useContext } from "react";
import {Route, Routes} from 'react-router-dom'
import { useAuthState} from 'react-firebase-hooks/auth'
import { privateRoutes, publicRoutes } from './routes';
import { Context } from '.';

const AppRoutes = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    console.log(user)
    return (
        user ? 
        (
            <Routes>
                {privateRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
            </Routes>
           
        )
        :
        (
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
            </Routes>
        )
        
    );
};

export default AppRoutes;