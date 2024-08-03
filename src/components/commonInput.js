import React, { useState } from "react";
import { Button, Input, message } from 'antd';

const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      message.error("Both name and email are required.");
      return;
    }

    if (!isValidEmail(email)) {
      message.error("Invalid email format.");
      return;
    }

    onSubmit({ name, email });

    
    setName("");
    setEmail("");
  };

  return (
    <div className="header-box">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="primary" onClick={handleSubmit}>
        {editMode ? "Edit User" : "Add User"}
      </Button>
    </div>
  );
};

export default InputHandler;
