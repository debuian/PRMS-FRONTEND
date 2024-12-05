import React, { useEffect, useState } from "react";
import fetchAPIHelper from "../../utlis/fetchAPIHelper";
import CreateProfile from "../../features/Profile/CreateProfile";
import DisplayProfile from "../../features/Profile/DisplayProfile";
import { Button, Container } from "@mantine/core";
import useRouteStore from "../../hooks/useRouteStore";

const Profile = () => {
  const { setSelectedRoute } = useRouteStore();
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchAPIHelper(" http://localhost:3000/GetPharmacyProfile", "GET").then(
      (data) => setData(data.data.data[0])
    );
  }, []);

  return (
    <>
      <Container>
        {data ? (
          <DisplayProfile data={data} />
        ) : (
          <Button
            style={{ marginTop: "5px" }}
            onClick={() => setSelectedRoute("CreateProfile")}
          >
            Create Profile
          </Button>
        )}
        {data != null ? (
          <Button
            style={{ marginTop: "5px" }}
            onClick={() => setSelectedRoute("UpdateProfile", { data })}
          >
            Update Profile
          </Button>
        ) : null}
      </Container>
    </>
  );
};

export default Profile;
