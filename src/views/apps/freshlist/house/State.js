import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const State = ({ city, selected, SelectedSupplierCity, sendDataToParent }) => {
  console.log(city);
  console.log(selected);
  console.log(SelectedSupplierCity);
  //   console.log(sendDataToParent);
  const [SelectedCity, setSelectedCity] = useState([]);
  let citylist = city;
  const onSelect = (selectedOption) => {
    console.log(selectedOption);
    setSelectedCity(selectedOption);
    sendDataToParent(selectedOption);
    // Implement your onSelect logic here
    // You can update the selectedValues state or perform any other actions
  };

  const onRemove = (removedOption) => {
    console.log(removedOption);
    setSelectedCity(removedOption);
    sendDataToParent(removedOption);
  };

  return (
    <div>
      <Multiselect
        options={city} // Options to display in the dropdown
        selectedValues={selected || SelectedSupplierCity} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="state_title" // Property name to display in the dropdown options
      />
    </div>
  );
};
export default State;
