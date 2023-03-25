import { useState } from 'react'

const SearchResults = () => {
  const [locations, setLocations] = useState(JSON.parse(localStorage.getItem("locations")));
  const [filteredLocations, setFilteredLocations] = useState(locations);


  function handleChange(e) {
    let searchValue = e.target.value;
    setFilteredLocations(() => (
      locations.filter((location) => {
        return location["Name"].toLowerCase().includes(searchValue) || location["District"].toLowerCase().includes(searchValue);
      })
    ))
  }

  return (
    <div className="m-5">
      <p className="font-black text-xl">Pincode: {locations[0]["Pincode"]}</p>
      <form className="flex flex-col">
        <input onChange={handleChange} type="text" name="filter" id="filter" placeholder="Filter" className="border-2 border-gray-800 p-1 px-2 rounded-lg appearance-none ease-in-out duration-300 hover:shadow-md focus:outline-orange-600" />
      </form>

      <div id="locations" className="flex flex-wrap justify-center gap-2 mt-10">

        {
          filteredLocations.length > 0
          ?
          filteredLocations.map((location) => {
            return (
              <div key={location["Name"]} className="border w-64 p-2 rounded-lg shadow-sm hover:shadow-lg ease-out duration-300">
                <p><span className="font-semibold">Name:</span> {location["Name"]}</p>
                <p><span className="font-semibold">Branch</span> Type: {location["BranchType"]}</p>
                <p><span className="font-semibold">Delivery status:</span> {location["DeliveryStatus"]}</p>
                <p><span className="font-semibold">District:</span> {location["District"]}</p>
                <p><span className="font-semibold">Division:</span> {location["Division"]}</p>
              </div>
            )
          })
          :
          <p>Couldn’t find the postal data you’re looking for…</p>
        }
      </div>
    </div>
  )
}

export default SearchResults