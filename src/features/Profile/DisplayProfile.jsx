import { Container, TextInput, Input, Button } from "@mantine/core";

import React, { useEffect, useState } from "react";

const DisplayProfile = ({ data }) => {
  const handleChange = (e) => {
    e.preventDefault();
    // Log the name and value pair correctly
    console.log({ [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <>
      <h1>Profile</h1>
      <form>
        <Input.Wrapper label="Name of Pharmacy">
          <Input
            placeholder="eg Sarwanidaan Pharmacy PVT. LTD"
            value={data.name}
            onChange={handleChange}
            style={{ marginTop: "5px" }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Location of Pharmacy">
          <Input
            placeholder="eg Sarwanidaan Pharmacy PVT. LTD"
            value={data.location}
            onChange={handleChange}
            style={{ marginTop: "5px" }}
          />
        </Input.Wrapper>
      </form>
    </>
  );
};

export default DisplayProfile;
