import { useGeneral } from "@/contexts/GeneralContext";
import React from "react";
import Email from "./main/Email";
import Password from "./main/Password";
import BlockList from "./main/BlockList";
import CloseYourAccount from "./main/CloseYourAccount";

interface MainProps {
  // Define props here
}

const Main: React.FC<MainProps> = () => {
  //! States
  const { settingsTabValue } = useGeneral();
  //!
  //todo Functions

  //todo
  //? useEffect

  //?
  //* consoleLogs

  //*

  switch (settingsTabValue) {
    case 0:
      return <Email />;
      break;

    case 1:
      return <Password />;
      break;

    case 2:
      //@ts-ignore
      return <BlockList />;
      break;

    case 3:
      return <CloseYourAccount />;
      break;
  }
};

export default Main;
