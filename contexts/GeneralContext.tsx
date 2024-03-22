"use client";
import { createContext, ReactNode, useContext,useEffect,useState } from "react";
import Cookies from 'js-cookie'




const GeneralContext = createContext<any>(null);




export const GeneralContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [tabValue, setTabValue] = useState(0);
  const [verticalTabvalue, setVerticalTabValue] = useState(0);
  const [profilePage, setProfilePage] = useState(0)
  const [inputFocus, setInputFocus] = useState(null)
  const [settingsTabValue, setSettingsTabValue] = useState(0);
  const [searchTabValue, setSearchTabValue] = useState(0)
  const [isMe, setIsMe] = useState<null | Boolean>(null)
  const [profileLoading, setProfileLoading] = useState<null | Boolean>(true)

 

  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangeVertical = (event: React.SyntheticEvent, newValue: number) => {
    setVerticalTabValue(newValue);
  };

  const handleChangeSettings = (event: React.SyntheticEvent, newValue: number) => {
    setSettingsTabValue(newValue);
  };

  const handleChangeSearch = (event: React.SyntheticEvent, newValue: number) => {
    setSearchTabValue(newValue);
  };

  const values = {
    tabValue: tabValue,
    handleChange: handleChange,
    verticalTabvalue: verticalTabvalue,
    setVerticalTabValue: setVerticalTabValue,
    handleChangeVertical: handleChangeVertical,
    isMe: isMe,
    setIsMe: setIsMe,
    profilePage: profilePage,
    setProfilePage: setProfilePage,
    inputFocus: inputFocus,
    setInputFocus: setInputFocus,
    settingsTabValue: settingsTabValue,
    setSettingsTabValue: setSettingsTabValue,
    handleChangeSettings: handleChangeSettings,
    searchTabValue: searchTabValue,
    setSearchTabValue:setSearchTabValue,
    handleChangeSearch:handleChangeSearch,
    profileLoading: profileLoading,
    setProfileLoading: setProfileLoading
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
