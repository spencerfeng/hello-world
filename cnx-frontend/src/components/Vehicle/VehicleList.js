import React from "react";
import { useParams } from "react-router-dom";
import { Table, Spinner, Alert } from "react-bootstrap";

import Vehicle from "./Vehicle";
import { LOADING_STATUS } from "../../constants";
import { useFetchData } from "../../hooks/useFetchData";

const VehicleList = () => {
    const { id } = useParams();

    const { data, loadingStatus, errorText } = useFetchData(
        `/api/vehicles/${id}`,
        3
    );

    return (
        <>
            <h2>List of Vehicles</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>BAC</th>
                        <th>Vin</th>
                        <th>Ctp Status</th>
                        <th>Onstar Status</th>
                        <th>Create Time</th>
                        <th>Color</th>
                        <th>Stock Number</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((vehicle, index) => (
                        <Vehicle vehicle={vehicle} key={index} />
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

export default VehicleList;
