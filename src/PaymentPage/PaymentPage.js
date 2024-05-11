import React, { useRef } from "react";
import { Field, Form, Formik } from "formik";
import CryptoJS from "crypto-js";

function PaymentPage() {
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

    const onSubmit = async (values, { resetForm }) => {
        const key = "4xfC5J";
        const txnid = "mtx" + new Date().getTime();
        const amount = values.amount;
        const phone = "9988776655";
        const firstname = values.customer_Name;
        const email = "test@example.com";
        const salt = "lu20ODPp37Mjc5rfcWSue2A3o13BlV1B";
        const productinfo = "Test Product";
        const surl = "https://payment-integration252.netlify.app/paymentreceipt?status=success";
        const furl = "https://payment-integration252.netlify.app/paymentreceipt?status=failure";
        const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||"${salt}`;
        const hash = CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex);
        const my_string = `key=${key}&txnid=${txnid}&amount=${amount}&firstname=${firstname}&email=${email}&phone=${phone}&productinfo=${productinfo}&surl=${surl}&furl=${furl}&hash=${hash}`;
        window.open("https://test.payu.in/_payment?" + my_string, "_self");
    };

    return (
        <div>
            <h1>Payment Form</h1>
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} enableReinitialize={true} innerRef={formrefAllPrice}>
                {(props) => (
                    <Form>
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
                                style={{ padding: 10, fontWeight: 600, background: "#A9C50F", border: 0, borderRadius: 5, color: "white" }}
                            >
                                Pay With PayU
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PaymentPage;
