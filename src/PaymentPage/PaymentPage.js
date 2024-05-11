import React, { useRef, useState } from "react";
import { Field, Formik } from "formik";
import CryptoJS from "crypto-js";

function PaymentPage() {
    const transaction_id = useState("mtx" + new Date().getTime());
    const formrefAllPrice = useRef();

    const validate = (values) => {
        const errors = {};

        if (!values.customer_ID) errors.customer_ID = "Requerido";
        if (!values.customer_Name) errors.customer_Name = "Requerido";
        if (values.amount === 0) errors.amount = "Requerido";

        return errors;
    };

    const initialValues = {
        customer_Name: "",
        customer_ID: "",
        amount: 0,
    };

    const onSubmit = async (values) => {
        const hashString = `4xfC5J|${transaction_id[0]}|${values.amount}|iPhone|${values.customer_Name}|test@gmail.com|||||||||||lu20ODPp37Mjc5rfcWSue2A3o13BIV1B`;
        const hash = CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex);
        document.getElementsByName("hash")[0].value = hash;
        document.getElementById("final_btn").click();
    };

    return (
        <div>
            <h1>Payment Form</h1>
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} enableReinitialize={true} innerRef={formrefAllPrice}>
                {(props) => (
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <label htmlFor="customer_ID">Customer ID*</label>
                            <Field
                                style={{
                                    marginLeft: 10,
                                    borderColor: props.touched.customer_ID && props.errors.customer_ID && "red",
                                    padding: "5px 5px",
                                    borderRadius: 5,
                                }}
                                type="text"
                                id="customer_ID"
                                name="customer_ID"
                                value={props.values.customer_ID}
                                placeholder="Type Here"
                            />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <label htmlFor="customer_Name">Customer Name*</label>
                            <Field
                                style={{
                                    marginLeft: 10,
                                    borderColor: props.touched.customer_Name && props.errors.customer_Name && "red",
                                    padding: "5px 5px",
                                    borderRadius: 5,
                                }}
                                type="text"
                                id="customer_Name"
                                name="customer_Name"
                                value={props.values.customer_Name}
                                placeholder="Type Here"
                            />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <label htmlFor="amount">Amount*</label>
                            <Field
                                style={{
                                    marginLeft: 10,
                                    borderColor: props.touched.amount && props.errors.amount && "red",
                                    padding: "5px 5px",
                                    borderRadius: 5,
                                }}
                                type="number"
                                id="amount"
                                name="amount"
                                value={props.values.amount}
                            />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <button
                                type="submit"
                                onClick={() => onSubmit(props.values)}
                                style={{ padding: 10, fontWeight: 600, background: "#A9C50F", border: 0, borderRadius: 5, color: "white" }}
                            >
                                Pay With PayU
                            </button>
                        </div>
                        <form action="https://test.payu.in/_payment" method="post">
                            <input type="hidden" name="key" value="4xfC5J" />
                            <input type="hidden" name="txnid" value={transaction_id[0]} />
                            <input type="hidden" name="productinfo" value="iPhone" />
                            <input type="hidden" name="amount" value={props.values.amount} />
                            <input type="hidden" name="email" value="test@gmail.com" />
                            <input type="hidden" name="firstname" value={props.values.customer_Name} />
                            <input
                                type="hidden"
                                name="surl"
                                value={`https://payment-api252.netlify.app/paymentreceipt?status=success&customer_id=${props.values.customer_ID}`}
                                // value={`http://localhost:5000/.netlify/functions/api/paymentreceipt/success?customer_id=${props.values.customer_ID}`}
                            />
                            <input
                                type="hidden"
                                name="furl"
                                value={`https://payment-api252.netlify.app/paymentreceipt?status=failure&customer_id=${props.values.customer_ID}`}
                                // value={`http://localhost:5000/.netlify/functions/api/paymentreceipt/failure?customer_id=${props.values.customer_ID}`}
                            />
                            <input type="hidden" name="phone" value="9988776655" />
                            <input type="hidden" name="hash" />
                            <input id="final_btn" type="submit" value="submit" style={{ visibility: "hidden" }} />{" "}
                        </form>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default PaymentPage;
