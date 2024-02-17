"use client";
import { createContext, ReactNode, useContext } from "react";


const GeneralContext = createContext<any>(null);

const values = {
    avatar: "images/avatars/6.png"
}

export const GeneralContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <GeneralContext.Provider value={values}>{children}</GeneralContext.Provider>
  );
};

export const useGeneral = () => {
    const context = useContext(GeneralContext);

    if(context === undefined) {
        throw new Error('useGeneral must be used within a Context')
    }

    return context
}
