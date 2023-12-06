import React, { useState, useEffect } from 'react';
import { Breadcrumb, Spinner, Table, Button, Modal, Pagination, Form } from 'react-bootstrap';
import axios from '../../axios'

const MyTrips = () => {
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tripsPerPage] = useState(5); // Set the number of trips per page
    const [editTrip, setEditTrip] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [myTrips, setMyTrips] = useState([])

    const fetchMyTrips = async () => {
        try {
            const response = await axios.get("/my-trips")
            setLoading(false);
            setMyTrips(response.data)
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyTrips()
    }, [])


    // const trips = [
    //     { name: 'Trip to Machu Picchu', status: 'Featured', date: '2023-12-15', location: 'Peru', price: '$500' },
    //     { name: 'Amazon Rainforest Expedition', status: 'Completed', date: '2023-11-20', location: 'Brazil', price: '$700' },
    //     { name: 'Trip to Machu Picchu', status: 'Featured', date: '2023-12-15', location: 'Peru', price: '$500' },
    //     { name: 'Amazon Rainforest Expedition', status: 'Completed', date: '2023-11-20', location: 'Brazil', price: '$700' },
    //     { name: 'Trip to Machu Picchu', status: 'Featured', date: '2023-12-15', location: 'Peru', price: '$500' },
    //     { name: 'Amazon Rainforest Expedition', status: 'Completed', date: '2023-11-20', location: 'Brazil', price: '$700' },
    //     { name: 'Trip to Machu Picchu', status: 'Featured', date: '2023-12-15', location: 'Peru', price: '$500' },
    //     { name: 'Amazon Rainforest Expedition', status: 'Completed', date: '2023-11-20', location: 'Brazil', price: '$700' },
    //     { name: 'Trip to Machu Picchu', status: 'Featured', date: '2023-12-15', location: 'Peru', price: '$500' },
    //     { name: 'Amazon Rainforest Expedition', status: 'Completed', date: '2023-11-20', location: 'Brazil', price: '$700' },
    //     // Add more trips as needed
    // ];
    // Get current trips
    const indexOfLastTrip = currentPage * tripsPerPage;
    const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;

    const currentTrips = myTrips?.slice(indexOfFirstTrip, indexOfLastTrip);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        // Simulate loading and show table when data is ready
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulating 2 seconds of loading

        // Clear the timeout on component unmount
        return () => clearTimeout(timeout);
    }, []);


    const handleEdit = (trip) => {
        console.log(trip)
        setEditTrip(trip);
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setEditTrip(null);
        setShowEditModal(false);
    };

    const handleEditSubmit = (updatedTripData) => {
        // Handle updating trip data (e.g., send to server)
        console.log('Updated Trip Data:', updatedTripData);
        // Close the edit modal
        handleEditModalClose();
    };

    const openDeleteModal = (trip) => {
        console.log(trip)
        setSelectedTrip(trip)
        setShowDeleteModal(true);

    };

    const closeDeleteModal = () => {
        axios.put(`/my-trips/${selectedTrip._id}`, { ...selectedTrip, status: "Cancelled" })
            .then(res => {
                fetchMyTrips()
                setSelectedTrip(null)
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
        setShowDeleteModal(false);
    };



    return (
        <div className="container mt-5">
            {/* <Breadcrumb className="mb-5">
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">My Trips</Breadcrumb.Item>
                <Breadcrumb.Item active>Current Trip</Breadcrumb.Item>
            </Breadcrumb> */}
            <h1 className="mb-4">My Trips</h1>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                </div>
            )}

            {!loading && (
                <>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Trip Name</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTrips.map((trip, index) => (
                                <tr key={index}>
                                    <td>
                                        {trip.name}
                                        {trip.status && <span className={`badge bg-${trip.status === 'Completed' ? 'primary' : trip.status === 'Cancelled' ? 'danger' : 'success'}`}>{trip.status}</span>}
                                    </td>
                                    <td>{trip.date}</td>
                                    <td>{trip.location}</td>
                                    <td>{trip.price}</td>
                                    <td>
                                        {trip.status !== "Cancelled" && <Button variant="danger" onClick={() => openDeleteModal(trip)}>Cancel</Button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Pagination */}

                    {/* Pagination */}
                    <div className="d-flex justify-content-end mb-5">
                        <Pagination>
                            <Pagination.First onClick={() => paginate(1)} />
                            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

                            {[...Array(Math.ceil(myTrips.length / tripsPerPage)).keys()].map((number) => (
                                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(myTrips.length / tripsPerPage)} />
                            <Pagination.Last onClick={() => paginate(Math.ceil(myTrips.length / tripsPerPage))} />
                        </Pagination>
                    </div>


                    {/* Edit Modal */}
                    <Modal show={showEditModal} onHide={handleEditModalClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title className='text-primary'>Edit Trip</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Edit Trip Form */}
                            <Form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(editTrip); }}>
                                <Form.Group controlId="formTripName">
                                    <Form.Label>Trip Name</Form.Label>
                                    <Form.Control type="text" placeholder="Edit trip name" value={editTrip?.name} onChange={(e) => setEditTrip({ ...editTrip, name: e.target.value })} />
                                </Form.Group>
                                <Form.Group controlId="formTripDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Edit trip date"
                                        value={editTrip?.date.split('-').reverse().join('-')}
                                        onChange={(e) => setEditTrip({ ...editTrip, date: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTripName">
                                    <Form.Label> Location</Form.Label>
                                    <Form.Control type="text" placeholder="Enter trip Location" value={editTrip?.location} onChange={(e) => setEditTrip({ ...editTrip, location: e.target.value })} />
                                </Form.Group>
                                <div className='text-end mt-3'>
                                    <Button variant="primary" type="submit">
                                        Save Changes
                                    </Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Delete Modal */}
                    <Modal show={showDeleteModal} onHide={closeDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Trip</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>  <p>Are you sure you want to delete the trip: <span className='text-primary'>{selectedTrip?.name}?</span></p>

                            <p>This action cannot be undone.</p></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeDeleteModal}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={closeDeleteModal}>
                                Cancel Trip
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default MyTrips;
