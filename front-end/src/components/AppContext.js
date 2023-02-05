import { createContext } from "react";

//export const UidContext = createContext();

export const UidContext = createContext([
  {
    uid: { _id: null, role: "" },
    setUid: () => {},
  },
]);

//export const UidContext = createContext({}, () => {});
