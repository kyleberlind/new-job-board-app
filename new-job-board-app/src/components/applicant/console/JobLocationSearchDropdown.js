import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Dropdown, Message } from "semantic-ui-react";
import { GET_LOCATIONS } from "../../../services/graphql/queries/ApplicantQueries";

const JobLocationSearchDropdown = (props) => {
  const [whereSearchInput, setWhereSearchInput] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
    variables: { filter: whereSearchInput },
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data) {
      setOptions(
        data.locations.map((location) => {
          return {
            key: `${location.city}, ${location.stateId}`,
            text: `${location.city}, ${location.stateId}`,
            value: `${location.city}, ${location.stateId}`,
          };
        })
      );
    }
  }, [data]);

  if (error) {
    return <Message content="Error loading locations" negative />;
  } else {
    const handleLocationSelect = (event, data) => {
      let currentSelectedLocations = [...props.selectedLocations];
      currentSelectedLocations = currentSelectedLocations.concat(data.value);
      props.setSelectedLocations(currentSelectedLocations);
      const currentOptions = options.filter((location) => {
        return location.key !== data.value[0];
      });
      setOptions(currentOptions);
    };

    return (
      <Dropdown
        fluid
        loading={loading}
        multiple
        selection
        search
        labeled
        value={[]}//keep the selected values empty so they don't build up in the search bar
        onChange={handleLocationSelect}
        onSearchChange={(event) => setWhereSearchInput(event.target.value)}
        searchQuery={whereSearchInput}
        placeholder="Add Locations"
        options={options}
      />
    );
  }
};

export default JobLocationSearchDropdown;
