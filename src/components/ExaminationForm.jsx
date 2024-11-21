import React, { useEffect, useState } from "react";
import {
  TextInput,
  Combobox,
  useCombobox,
  InputBase,
  Input,
  ComboboxDropdown,
} from "@mantine/core";
import fetchReportTypeAPI from "../containers/fetchReportTypesAPI";

const ExaminationForm = ({
  name,
  setName,
  category,
  setCategory,
  normalRangeMin,
  setNormalRangeMin,
  normalRangeMax,
  setNormalRangeMax,
  unit,
  setUnit,
  reportTypes,
  setreportTypes,
  selectedReportTypeId,
  setSelectedReportTypeId,
  selectedReportTypeName,
  setSelectedReportTypeName,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchReportTypeAPI();
      setreportTypes(result);
      const selectedType = result.find(
        (item) => item.id === selectedReportTypeId
      );
      if (selectedType) {
        setSelectedReportTypeName(selectedType.name);
      }
    };
    fetchData();
  }, []);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {},
  });
  const options = reportTypes.map((item) => (
    <Combobox.Option value={item.name} key={item.name}>
      {item.name}
    </Combobox.Option>
  ));

  return (
    <form>
      <TextInput
        label="Examination Name:"
        placeholder="ex. Hematology"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        label="Examination Category:"
        placeholder="ex. Hematology"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextInput
        label="Examination Normal Range Min:"
        placeholder="ex. 3.5"
        value={normalRangeMin}
        onChange={(e) => setNormalRangeMin(e.target.value)}
      />
      <TextInput
        label="Examination Normal Range Max:"
        placeholder="ex. 3.5"
        value={normalRangeMax}
        onChange={(e) => setNormalRangeMax(e.target.value)}
      />
      <TextInput
        label="Examination Unit:"
        placeholder="ex. mg/dL"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <div>
        <Combobox
          store={combobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            const reportId = reportTypes.find((item) => item.name === val);
            setSelectedReportTypeId(reportId.id);
            setSelectedReportTypeName(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              pointer
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {selectedReportTypeName || (
                <Input.Placeholder>Select Report Type</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>
          <ComboboxDropdown>{options}</ComboboxDropdown>
        </Combobox>
      </div>
    </form>
  );
};

export default ExaminationForm;
