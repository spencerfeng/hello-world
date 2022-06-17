import React from "react";
import { Table, Spinner, Alert } from "react-bootstrap";

import Dealer from "./Dealer";
import { LOADING_STATUS } from "../../constants";
import { useFetchData } from "../../hooks/useFetchData";

const DealerList = () => {
    const { data, loadingStatus, errorText } = useFetchData("/api/dealers", 3);

    return (
        <>
            <h2> List of Dealers</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>BAC</th>
                        <th>Brand</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((dealer, index) => (
                        <Dealer dealer={dealer} key={index} />
                    ))}
                </tbody>
            </Table>
            {loadingStatus === LOADING_STATUS.LOADING && (
                <Spinner animation="border" />
            )}
            <Alert key="danger" variant="danger" show={!!errorText}>
                {errorText}
            </Alert>
            {!data.length && loadingStatus === LOADING_STATUS.SUCCEEDED && (
                <div>No Record</div>
            )}
        </>
    );
};

export default DealerList;
