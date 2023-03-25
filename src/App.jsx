import {  Routes, Route} from "react-router-dom";

// Import the pages
import Search from './Components/Search'
import SearchResults from './Components/SearchResults'

// Import css
// import "./app.css"

function App() {
return (
	<div className="App">
		<Routes>
			<Route path="/" element={<Search />} />
			<Route path="/searchresults" element={<SearchResults />} />
		</Routes>
	</div>
);
}
export default App;
