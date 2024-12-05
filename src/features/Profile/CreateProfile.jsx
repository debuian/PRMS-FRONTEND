import React from "react";
import ProfileForm from "../../components/ProfileForm";

const CreateProfile = ({ data }) => {
  const submitAction = {
    url: "http://localhost:3000/CreatePharmacyProfile",
    method: "POST",
  };

  return (
    <>
      <h1>Create Profile</h1>
      <ProfileForm
        initialValue=""
        submitAction={submitAction}
        buttonLabel="Submit"
      />
    </>
  );
};

export default CreateProfile;
