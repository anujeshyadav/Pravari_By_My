import React, { useEffect, useState } from "react";
import UserContext from "./Context";

const State = (props) => {
  const [UserData, setUserData] = useState({});
  const [AllAstroList, setAllAstroList] = useState([]);
  const [viewOneAstro, setviewOneAstro] = useState({});
  const data = [{ value: "dummy", age: "32" }];
  let userCredential = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // let userCredential = JSON.parse(localStorage.getItem("userData"));
    // console.log(userCredential);
    let data = [{ name: "text", id: "1" }];
    setUserData(data);
  }, []);

  return (
    <UserContext.Provider value={{ UserData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default State;
