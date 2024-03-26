"use client";

import React, { useState } from "react";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

const signUp = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <h1 className="text-3xl font-bold text-black">Create Account</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 40,
          alignItems: "center",
        }}
      >
        <Input
          size="sm"
          type="text"
          label="Full Name"
          style={{ width: "100%" }}
          value={name}
          onValueChange={setName}
        />

        <div className="ml-5">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">{gender}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={(key) => setGender(key + "")}
            >
              <DropdownItem key="Male" className="text-black">
                Male
              </DropdownItem>
              <DropdownItem key="Female" className="text-black">
                Female
              </DropdownItem>
              <DropdownItem key="Neutral" className="text-black">
                Prefer Not to Say
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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
          label="Create a Password"
          //   style={{ width: "100%" }}
          value={password}
          onValueChange={setPassword}
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
        <RadioGroup
          label="Select your Occupation"
          value={occupation}
          onValueChange={setOccupation}
        >
          <Radio value="employer" style={{marginTop: 5}}>Employer</Radio>
          <Radio value="author" style={{marginTop: 5}}>Content Writer</Radio>
          <Radio value="user" style={{marginTop: 5}}>Other</Radio>
        </RadioGroup>
      </div>

      <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Button variant="ghost" color="primary" size="sm">Register Account</Button>
      </div>
    </div>
  );
};

export default signUp;
