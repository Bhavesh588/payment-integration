import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PaymentReceipt() {
    const [status, setStatus] = useState("");
    useEffect(() => {
        if (window.location.search.substring(1).split("=")[1]) {
            setStatus(window.location.search.substring(1).split("=")[1]);
        }
    }, []);

    return (
        <div>
            <h1>Payment Receipt</h1>
            <div className="d-flex justify-content-center">
                <div style={{ width: "fit-content" }}>
                    {status !== "" ? (
                        status === "success" ? (
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
                        <span>1</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Customer Name</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>Bhavesh</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Amount</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>300</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Transaction ID</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>25DC2cv54</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Payment ID</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>123485</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Date/Time</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start p-1">
                        <span>12-12-24</span>
                    </div>
                    <div className="col-5 d-flex justify-content-start p-1">
                        <span>Status</span>
                    </div>
                    <div className="col-7 d-flex justify-content-start">
                        <span>{status === "success" ? "Successful" : "Failed"}</span>
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
