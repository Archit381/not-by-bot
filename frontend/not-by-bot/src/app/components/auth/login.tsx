"use client";

import React, { useState } from "react";

import { Input, Button } from "@nextui-org/react";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: 'center' }}>
      <h1 className="text-3xl font-bold text-black">Login User</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Input
          size="sm"
          type="email"
          label="Email Address"
          style={{ width: "100%" }}
          value={email}
          onValueChange={setEmail}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Input
          size="sm"
          type="password"
          label="Password"
          value={password}
          onValueChange={setPassword}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Button variant="ghost" color="primary" size="sm">
          Login
        </Button>
      </div>
    </div>
  );
};

export default login;
