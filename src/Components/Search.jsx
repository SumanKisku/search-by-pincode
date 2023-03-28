import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// React toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
  const [pincode, setPincode] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleInput(e) {
    setPincode(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    // making sure if pincode is entered, and isn't too short or too long
    if (pincode.length == 0) {
      toast.error("Please enter a pincode");
    } else if (pincode.length < 6) {
      toast.error("Pincode length is too short");
    } else if (pincode.length > 6) {
      toast.error("Pincode length is too long");
    } else {
      // all input validation good
      // then simply fetching data
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((response) => {
          // start loading animaiton
          setLoading(true);
          return response.json()
        })
        .then((data) => {
          // stop loading animation
          setLoading(false);
          // no records found
          if (data[0]["Status"] === "Error") {
            toast.error(data[0]["Message"]);
          }
          // records found
          else {
            localStorage.setItem("locations", JSON.stringify(data[0]["PostOffice"]));
            navigate("/searchresults");
          }
        })
    }
  }

  return (
    <div className="m-5">
      <p className="font-black text-xl">Enter Pincode</p>
      <form className="flex flex-col">
        <input onChange={handleInput} type="number" name="pincode" id="pincode" placeholder="Pincode" className="border-2 border-gray-800 p-1 px-2 rounded-lg appearance-none ease-in-out duration-300 hover:shadow-md focus:outline-orange-600" />
        <button className="text-white flex  bg-orange-600 py-2 px-6 rounded-2xl mt-2 cursor-pointer w-min disabled:opacity-75 disabled:bg-slate-500 ease-in-out duration-300 hover:shadow-lg hover:scale-110" onClick={handleClick} disabled={isLoading}>
          {isLoading
            ?
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            :
            "Lookup"}
        </button>
      </form>
      {/* Loader animation */}


      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>

  )
}

export default Search