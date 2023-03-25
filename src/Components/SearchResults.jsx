import { useState, useEffect } from 'react'

const SearchResults = () => {
  const [locations, setLocations] = useState(JSON.parse(sessionStorage.getItem("locations")));

  useEffect(() => {
    console.log(locations);
  }, [])
  return (
    <div className="mx-5">
      <p className="font-black text-xl">Pincode: {locations[0]["Pincode"]}</p>
      <form className="flex flex-col">
        <input type="text" name="filter" id="filter" placeholder="Filter" className="border-2 border-gray-800 p-1 px-2 rounded-lg appearance-none" />
      </form>

      <div className="flex flex-wrap justify-center gap-2 mt-10">

        {
          locations.map((location) => {
            return (
              <div className="border w-64">
                <p>Name: {location["Name"]}</p>
                <p>Branch Type: { }</p>
                <p>Delivery status: {location["DeliveryStauts"]}</p>
                <p>District: {location["District"]}</p>
                <p>Division: {location["Division"]}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SearchResults