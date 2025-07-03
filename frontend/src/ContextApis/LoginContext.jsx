// steps to create an context api
// create an file
// build an context provider 
// add an context provider to parent or root of the child components
// access an global states from components

import { createContext } from "react";
export const LoginContext = createContext([{},"",false, () => {}]);
