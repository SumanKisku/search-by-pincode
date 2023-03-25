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
            sessionStorage.setItem("locations", JSON.stringify(data[0]["PostOffice"]));
            navigate("/searchresults");
          }
        })
    }
  }

  return (
    <div className="mx-5">
      <p className="font-black text-xl">Enter Pincode</p>
      <form className="flex flex-col">
        <input onChange={handleInput} type="number" name="pincode" id="pincode" placeholder="Pincode" className="border-2 border-gray-800 p-1 px-2 rounded-lg appearance-none" />
        <button className="text-white flex  bg-orange-600 py-2 px-6 rounded-2xl mt-2 cursor-pointer w-min disabled:opacity-75 disabled:bg-slate-500" onClick={handleClick} disabled={isLoading}>
          {isLoading 
          ? 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-spin w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
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