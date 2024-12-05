import React, { useEffect, useState } from "react";
import { Container, Table, Switch } from "@mantine/core";
import updateIsVerified from "./utils/updateIsVerified";
import fetchAllPharmacyDetails from "./utils/fetchAllPharmacyDetails";

const DisplayPharmacyDetails = () => {
  const [pharmacyData, setPharamacyData] = useState([]);

  const handleSwitchChange = async (id, checked) => {
    setPharamacyData((prevData) =>
      prevData.map((data) =>
        data.id === id ? { ...data, isverified: checked } : data
      )
    );

    await updateIsVerified(id, checked);
  };
  const rows = pharmacyData.map((data) => (
    <Table.Tr key={data.id}>
      <Table.Td>{data.email}</Table.Td>
      <Table.Td>
        <Switch
          checked={data.isverified}
          onChange={(event) => {
            handleSwitchChange(data.id, event.currentTarget.checked);
          }}
        />
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    fetchAllPharmacyDetails().then((data) => setPharamacyData(data.data.data));
  }, []);
  return (
    <>
      <Container>
        <Table withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Email</Table.Th>
              <Table.Th>isverified</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Container>
    </>
  );
};

export default DisplayPharmacyDetails;
