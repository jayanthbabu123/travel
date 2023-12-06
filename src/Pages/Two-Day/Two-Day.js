import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import './Two-Day.css'; // Import custom styles

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "../../Components/Stripe-payment"; // import the Stripe payment form component
const stripePromise = loadStripe("pk_test_CqOkKhGgnK8DRlhPkEIWd7yY00UxtzqFBg");
const TwoDayTrip = () => {
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [numPeople, setNumPeople] = useState(1);
    const navigate = useNavigate()
    const trips = [
        {
            "id": 1,
            "place": "Mountain Retreat",
            "durationDays": 2,
            "price": 120,
            "description": "Escape to the mountains for a tranquil two-day retreat. Enjoy breathtaking views, hiking trails, and cozy accommodations.",
            "tripImage": "images/slider-1.jpg"
        },
        {
            "id": 2,
            "place": "Coastal Getaway",
            "durationDays": 2,
            "price": 150,
            "description": "Experience a relaxing coastal getaway with a two-day trip. Explore sandy beaches, seaside towns, and savor seafood delights.",
            "tripImage": "images/slider-2.jpg"
        },
        {
            "id": 3,
            "place": "Cultural Immersion",
            "durationDays": 2,
            "price": 100,
            "description": "Immerse yourself in the local culture with a two-day cultural tour. Visit historical sites, attend cultural events, and interact with locals.",
            "tripImage": "images/slider-3.jpg"
        },
        {
            "id": 4,
            "place": "Adventure Weekend",
            "durationDays": 2,
            "price": 180,
            "description": "Embark on an adventurous weekend with a two-day trip. Try thrilling activities, explore nature, and stay in comfortable lodges.",
            "tripImage": "images/slider-4.jpg"
        },
        {
            "id": 5,
            "place": "Winery Tour",
            "durationDays": 2,
            "price": 130,
            "description": "Sip and savor on a two-day winery tour. Visit picturesque vineyards, taste exquisite wines, and enjoy gourmet meals.",
            "tripImage": "images/slider-5.jpg"
        }
    ]


    // Function to handle booking modal open
    const handleBookTrip = trip => {
        console.log(trip)
        setSelectedTrip(trip);
        setNumPeople(1); // Reset the number of people input
    };

    // Function to handle booking
    // Function to handle booking
    const handleConfirmBooking = () => {
        const payload = {
            "name": selectedTrip.place,
            "status": "Confirmed",
            "date": moment(new Date()).format("DD-MM-YYYY"),
            "location": selectedTrip.place,
            "price": (numPeople * selectedTrip.price).toString()
        }

        axios.post("/my-trips", payload)
            .then(res => {
                navigate("/my-trips")
                setSelectedTrip(null)
                setNumPeople(1)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        console.log(payload)
        // Implement your booking logic here
        // You can access the selectedTrip and numPeople states to get the details
        // For simplicity, just logging the details to the console for now
        console.log(`Booking ${numPeople} people for ${selectedTrip.place}`);
        // Add further logic as needed
        handleCloseModal();
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedTrip(null);
    };
    const handlePaymentSuccess = (details, data) => {
        console.log("Payment Successful", details, data);
    
        // Here, you can send the booking details to your server
        const payload = {
          name: selectedTrip.place,
          status: "Confirmed",
          date: moment(new Date()).format("DD-MM-YYYY"),
          location: selectedTrip.place,
          price: (numPeople * selectedTrip.price).toString(),
        };
        axios
          .post("/my-trips", payload)
          .then((res) => {
            navigate("/my-trips");
            setSelectedTrip(null);
            setNumPeople(1);
          })
          .catch((err) => {
            console.error(err);
          });
    
        handleCloseModal();
      };
    return (
        <div className="trip-details container">
            <img src="images/slider-2.jpg" alt="Long Trip" className="trip-image" />
            <h2 className="trip-title">Two Day Trip: Journey into Tranquility</h2>
            <p className="trip-description">
                Immerse yourself in a two-day escape into tranquility with our Two Day Trip. Explore scenic
                landscapes, unwind in nature, and create unforgettable memories.
            </p>
            <h3 className="section-title">Amenities:</h3>
            <ul className="amenities-list">
                <li>Overnight Stay in Cozy Accommodations</li>
                <li>Scenic Hiking Trails</li>
                <li>Delicious Meals with Local Flavors</li>
                <li>Cultural Workshops and Events</li>
            </ul>
            <p className="trip-description">
                The Two Day Trip offers a perfect balance of adventure and relaxation. Experience the best of
                nature and culture over this two-day journey.
            </p>
            <h3 className="section-title">Additional Information:</h3>
            <p className="trip-description">
                Participants are advised to bring suitable clothing for varying weather conditions. Comfortable
                footwear is recommended for outdoor activities.
            </p>
            <h1 className="mb-4">Two Day Trips</h1>
            <div className="row">
                {trips.map((trip) => (
                    <div key={trip.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card">
                            <img src={trip.tripImage} className="card-img-top" alt={trip.place} />
                            <div className="card-body">
                                <h5 className="card-title">{trip.place}</h5>
                                <p className="card-text">{trip.description}</p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Duration: {trip.durationDays} days</li>
                                    <li className="list-group-item">Price: ${trip.price}</li>
                                </ul>
                                <div className="card-body">
                                    <button className="btn btn-success" onClick={() => handleBookTrip(trip)}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Booking Modal */}
            <Modal show={!!selectedTrip} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">Book Trip - {selectedTrip?.place}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Enter the number of people for the trip to {selectedTrip?.place}.
                    </p>
                    <p>
                        Price per person: ${selectedTrip?.price}
                    </p>
                    <Form>
                        <Form.Group controlId="numPeople">
                            <Form.Label>Number of People</Form.Label>
                            <Form.Control min={1} type="number" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <p className="mt-3">Total Price: <span className='text-primary'>${selectedTrip?.price * numPeople}</span></p>
                    <Elements stripe={stripePromise}>
            <StripePaymentForm
              amount={selectedTrip?.price * numPeople}
              onSuccessfulPayment={handlePaymentSuccess}
            />
          </Elements>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TwoDayTrip;
