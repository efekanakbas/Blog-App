"use client";
import { createContext, ReactNode, useContext,useState } from "react";




const GeneralContext = createContext<any>(null);




export const GeneralContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [tabValue, setTabValue] = useState(0);
  const [verticalTabvalue, setVerticalTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangeVertical = (event: React.SyntheticEvent, newValue: number) => {
    setVerticalTabValue(newValue);
  };

  const values = {
    avatar: "/images/avatars/6.png",
    name: 'Efekan Akbaş',
    tabValue: tabValue,
    handleChange: handleChange,
    verticalTabvalue: verticalTabvalue,
    handleChangeVertical: handleChangeVertical
}


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
