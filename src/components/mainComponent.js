import React, { useEffect } from "react";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";

function MainComponent(props) {
  const { getUsers, userState, addUser,deleteUser } = props;

  const handleSubmit = ({ name, email }) => {
    addUser({ name, email });
  }
  
  
  
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div id="main-container-wrapper">
      <InputHandler onSubmit={handleSubmit} />
      <SimpleTable dataSource={userState.users} onD />
    </div>
  );
};

export default MainComponent;
