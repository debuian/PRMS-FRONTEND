import React from "react";
import ProfileForm from "../../components/ProfileForm";

const UpdateProfile = ({ data }) => {
  const submitAction = {
    url: "http://localhost:3000/UpdatePharmacyProfile",
    method: "PUT",
  };

  return (
    <>
      <h1>Update Profile</h1>
      <ProfileForm
        initialValue={data}
        submitAction={submitAction}
        buttonLabel="Update"
      />
    </>
  );
};

export default UpdateProfile;
