import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import { WatchlistProvider } from "./WatchlistContext"; // Import the context provider

function App() {
  return (
    <WatchlistProvider>
      {" "}
      {/* Wrap BrowserRouter with WatchlistProvider */}
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Banner /> */}
                <Movies />
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;
