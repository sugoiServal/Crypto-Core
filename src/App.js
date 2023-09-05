
import { Routes, Route, Redirect } from "react-router-dom";
import CoinPg from './routes/CoinPg'
import Navbar from "./components/Navbar";
import Coins from "./components/Coins";
function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Coins/>}/> 
        <Route path="/coin" element={<CoinPg/>}> 
          <Route path=":coinId" element={<CoinPg/>}/>
        </Route>
      </Routes>
      <footer className="mt-[20vh] text-center  w-full">Powered by CoinGecko</footer>
      
    </div>
  );
}

export default App;
