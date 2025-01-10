import React from "react";

const defaultValue = {
   
    user: {},
    setUser: () => {},

};

const AppStateContext = React.createContext(defaultValue);

export const useAppState = () => React.useContext(AppStateContext);

export default AppStateContext;
