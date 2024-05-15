import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

function PaymentReceipt() {
    const [customer_id, setCustomer_ID] = useState("");
    const [customer_name, setCustomer_Name] = useState("");
    const [amount, setAmount] = useState(0);
    const [transaction_id, setTransaction_ID] = useState("");
    const [payment_id, setPayment_ID] = useState("");
    const [date_time, setDate_Time] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (window.location.search.substring(1).split("=")[1]) {
            const searchParams = new URLSearchParams(window.location.search);
            for (const param of searchParams) {
                if (param[0] === "customer_id") setCustomer_ID(param[1]);
                if (param[0] === "customer_name") setCustomer_Name(param[1]);
                if (param[0] === "amount") setAmount(param[1]);
                if (param[0] === "transaction_id") setTransaction_ID(param[1]);
                if (param[0] === "payment_id") setPayment_ID(param[1]);
                if (param[0] === "date_time") setDate_Time(param[1]);
                if (param[0] === "status") setStatus(param[1]);

                // if (param[0] === "ref") getOrderData(param[1]);
            }
        }
    }, []);

    return (
        <div>
            <h1>Payment Receipt</h1>
            <div className="d-flex justify-content-center">
                <div style={{ width: "fit-content" }}>
                    {status !== "" ? (
                        status.toUpperCase() === "SUCCESS" ? (
                            <div
                                className="bg-success"
                                style={{
                                    margin: 5,
                                    padding: "10px 20px",
                                    borderRadius: 5,
                                    color: "white",
                                    fontWeight: 700,
                                }}
                            >
                                <span>Your Payment is Successful</span>
                            </div>
                        ) : (
                            <div
                                className="bg-danger"
                                style={{
                                    margin: 5,
                                    padding: "10px 20px",
                                    borderRadius: 5,
                                    color: "white",
                                    fontWeight: 700,
                                    backgroundColor: "red",
                                }}
                            >
                                <span>Your Payment Failed</span>
                            </div>
                        )
                    ) : null}
                </div>
            </div>
            <div className="container" style={{ maxWidth: 350 }}>
                <div className="row">
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Customer ID</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>{customer_id}</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Customer Name</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>{customer_name}</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Amount</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>{amount}</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Transaction ID</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>{transaction_id}</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Payment ID</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>{payment_id}</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Date/Time</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>{date_time}</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Status</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>{status.toUpperCase() === "SUCCESS" ? "Successful" : "Failed"}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to="/" className="btn btn-primary">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentReceipt;
