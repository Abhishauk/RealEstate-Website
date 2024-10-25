import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";
import AddPropertyModal from "../../components/AddPropertyModal/AddPropertyModal"; // Adjust the import path as necessary

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [properties, setProperties] = useState([]); // Local state to hold properties

  // UseEffect to set initial properties from API data
  useEffect(
    () => {
      if (data) {
        setProperties(data);
      }
    },
    [data]
  );

  // Function to handle adding a new property
  const handleAddProperty = newProperty => {
    setProperties(prev => [...prev, newProperty]); // Immediately add the new property to state
    setModalOpened(false); // Close the modal
  };

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {properties
            .filter(
              property =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => <PropertyCard card={card} key={i} />)}
        </div>

        <button onClick={() => setModalOpened(true)}>Add Property</button>

        <AddPropertyModal
          opened={modalOpened}
          setOpened={setModalOpened}
          onAddProperty={handleAddProperty}
        />
      </div>
    </div>
  );
};

export default Properties;
