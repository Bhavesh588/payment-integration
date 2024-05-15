import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import CryptoJS from "crypto-js";
// import { v4 as uuidv4 } from "uuid";

function PaymentPage() {
    const [all_payment, setAllPayment] = useState([]);
    const transaction_id = useState("mtx" + new Date().getTime());
    const formref = useRef();

    useEffect(() => {
        axios.get("https://payment-api-production.up.railway.app/api/paymentreceipt").then((res_payment) => setAllPayment(res_payment.data));
        // axios.get("http://localhost:5000/api/paymentreceipt").then((res_payment) => setAllPayment(res_payment.data));
    }, []);

    const validate = (values) => {
        const errors = {};

        // if (!values.customer_ID) errors.customer_ID = "Requerido";
        if (!values.customer_Name) errors.customer_Name = "Requerido";
        if (!values.amount || values.amount === 0) errors.amount = "Requerido";

        return errors;
    };

    const initialValues = {
        customer_Name: "",
        // customer_ID: uuidv4(),
        amount: 0,
        gateway: "",
    };

    const onSubmit = async (values) => {
        if (values.gateway === "PayU") {
            const hashString = `4xfC5J|${transaction_id[0]}|${values.amount}|iPhone|${values.customer_Name}|test@gmail.com|||||||||||lu20ODPp37Mjc5rfcWSue2A3o13BIV1B`;
            const hash = CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex);
            document.getElementsByName("hash")[0].value = hash;
            document.getElementById("final_btn").click();
        } else if (values.gateway === "N-Genius") {
            await axios.get("https://payment-api-production.up.railway.app/api/ngenius").then(async (response) => {
                localStorage.setItem("access_token", response.data.access_token);
                await axios
                    .post(`https://payment-api-production.up.railway.app/api/ngenius/order`, {
                        token: response.data.access_token,
                        customer_name: values.customer_Name,
                        // customer_id: values.customer_ID,
                        amount: values.amount,
                    })
                    .then(async (order_res) => {
                        window.location.replace(order_res.data._links.payment.href);
                    });
            });
        }
    };

    return (
        <div>
            <h1>Payment Form</h1>
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} enableReinitialize={true} innerRef={formref}>
                {(props) => (
                    <Form>
                        {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                        </div> */}
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
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="m-2">
                                <button
                                    type="submit"
                                    onClick={() => (props.values.gateway = "PayU")}
                                    // onClick={() => onSubmit(props.values, props.errors)}
                                    style={{ padding: 10, fontWeight: 600, background: "#A9C50F", border: 0, borderRadius: 5, color: "white" }}
                                >
                                    Pay With PayU
                                </button>
                            </div>
                            <div className="m-2">
                                <button
                                    type="submit"
                                    onClick={() => (props.values.gateway = "N-Genius")}
                                    // onClick={() => onSubmit(props.values, props.errors)}
                                    style={{ padding: 10, fontWeight: 600, background: "#FF5859", border: 0, borderRadius: 5, color: "white" }}
                                >
                                    Pay With N-Genius
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <form action="https://test.payu.in/_payment" method="post">
                <input name="key" value="4xfC5J" />
                <input name="txnid" value={transaction_id[0]} />
                <input name="productinfo" value="iPhone" />
                <input name="amount" value={formref.current ? formref.current?.values.amount : ""} />
                <input name="email" value="test@gmail.com" />
                <input name="firstname" value={formref.current ? formref.current?.values.customer_Name : ""} />
                <input
                    type="hidden"
                    name="surl"
                    value={`https://payment-api-production.up.railway.app/api/paymentreceipt/success?gateway=PayU`}
                    // value={`https://payment-api-production.up.railway.app/api/paymentreceipt/success?customer_id=${
                    //     formref.current ? formref.current?.values.customer_ID : ""
                    // }&gateway=PayU`}
                    // value={`http://localhost:5000/api/paymentreceipt/success?customer_id=${
                    //     formref.current ? formref.current?.values.customer_ID : ""
                    // }&gateway=PayU`}
                />
                <input
                    type="hidden"
                    name="furl"
                    value={`https://payment-api-production.up.railway.app/api/paymentreceipt/failure?gateway=PayU`}
                    // value={`https://payment-api-production.up.railway.app/api/paymentreceipt/failure?customer_id=${
                    //     formref.current ? formref.current?.values.customer_ID : ""
                    // }&gateway=PayU`}
                    // value={`http://localhost:5000/api/paymentreceipt/failure?customer_id=${
                    //     formref.current ? formref.current?.values.customer_ID : ""
                    // }&gateway=PayU`}
                />
                <input name="phone" value="9988776655" />
                <input name="hash" />
                <input id="final_btn" type="button" value="submit" style={{ visibility: "hidden" }} />{" "}
            </form>
            {/* {console.log(all_payment)} */}
            {all_payment.length !== 0 ? (
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment ID</th>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Gateway</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all_payment?.map((pay, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    {pay.createdAt.split("T")[0]} {pay.createdAt.split("T")[1].split(".")[0]}
                                </td>
                                <td>{pay.Payment_id}</td>
                                <td>{pay.Transaction_id}</td>
                                <td>{pay.customer.Name}</td>
                                <td>{pay.Amount}</td>
                                <td>{pay.Gateway}</td>
                                <td>
                                    <span
                                        className={`${pay.Status.toUpperCase() === "SUCCESS" ? "bg-success" : "bg-danger"} text-light`}
                                        style={{ padding: "3px 10px", fontWeight: 600, borderRadius: "5px" }}
                                    >
                                        {pay.Status.toUpperCase() === "SUCCESS" ? "Success" : "Failed"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
}

export default PaymentPage;
