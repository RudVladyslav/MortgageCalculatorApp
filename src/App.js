import {Route, Routes} from "react-router-dom";
import MortgageCalculator from "./Pages/MortgageCalculator";
import Banks from "./Pages/Banks";
import Header from "./Components/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Banks/>}/>
                <Route exact path="/calculate" element={<MortgageCalculator/>}/>
            </Routes>
        </div>
    );
}

export default App;
