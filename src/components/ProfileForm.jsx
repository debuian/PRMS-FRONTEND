import React, { useRef } from "react";
import { Container, Input, Button } from "@mantine/core";
import fetchAPIHelper from "../utlis/fetchAPIHelper";
import useRouteStore from "../hooks/useRouteStore";
import toast from "react-hot-toast";

const ProfileForm = ({ initialValue, submitAction, buttonLabel }) => {
  const pharmacyNameRef = useRef(initialValue.name);
  const pharmacyLocationRef = useRef(initialValue.location);
  const { setSelectedRoute } = useRouteStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pharmacyName = pharmacyNameRef.current.value;
    const pharmacyLocation = pharmacyLocationRef.current.value;
    const payload = { name: pharmacyName, location: pharmacyLocation };
    const response = await fetchAPIHelper(
      submitAction.url,
      submitAction.method,
      payload
    );
    console.log(response);
    toast.success(response.data.message);
    setSelectedRoute("Profile");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input.Wrapper label="Name of Pharmacy">
          <Input
            ref={pharmacyNameRef}
            defaultValue={initialValue.name}
            placeholder="eg Sarwanidaan Pharmacy PVT. LTD"
            style={{ marginTop: "5px" }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Location of Pharmacy">
          <Input
            ref={pharmacyLocationRef}
            defaultValue={initialValue.location}
            placeholder="eg Ghattekulo"
            style={{ marginTop: "5px" }}
          />
        </Input.Wrapper>
        <Button type="submit" style={{ marginTop: "5px" }}>
          {buttonLabel}
        </Button>
      </form>
    </Container>
  );
};

export default ProfileForm;
