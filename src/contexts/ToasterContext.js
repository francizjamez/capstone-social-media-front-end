import { useToast } from "@chakra-ui/react";
import { createContext } from "react";

const toasterContext = createContext({});

export default toasterContext;

export function ToasterProvider({ children }) {
  const toast = useToast();
  const makeToast = (title, status = "success", isClosable = true) => {
    toast({ title, status, isClosable });
  };

  return (
    <toasterContext.Provider value={{ makeToast }}>
      {children}
    </toasterContext.Provider>
  );
}
