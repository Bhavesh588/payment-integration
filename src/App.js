import PaymentPage from "./PaymentPage/PaymentPage";
import PaymentReceipt from "./PaymentPage/PaymentReceipt";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<PaymentPage />} />
                    <Route exact path="/paymentreceipt" element={<PaymentReceipt />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
