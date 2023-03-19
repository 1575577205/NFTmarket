import "./App.css";
import "./reputation.css";
import "./grade.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Login, Error, Mint, Market, Regist, Connect } from "./pages";
import { Header, NFTList, Details, Reputation, Grade } from "./components";

function App() {
  return (
    <>
      <Connect />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/market" element={<Market />} />
          <Route path="/init" element={<Mint />} />
          <Route
            path="/profile/nfts"
            element={<Header NFTList={<NFTList />} Details={<Details />} />}
          />
          <Route
            path="/profile/reputation"
            element={<Header Reputation={<Reputation />} Grade={<Grade />} />}
          />

          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
