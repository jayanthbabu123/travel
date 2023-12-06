import React from 'react';
import './About-Us.css'
const AboutUs = () => {
    return (
        // ... (previous code)
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8">
                        <h2>About Us</h2>
                        <p className="lead">Welcome to Travel Blog, your go-to source for unforgettable travel experiences. We're dedicated to providing you with the best travel stories, tips, and services, with a focus on quality, uniqueness, and customer satisfaction.</p>
                        <p>Founded in 2010, Travel Blog has come a long way from its beginnings. We now serve customers all over the world and are thrilled to be a part of the adventurous wing of the travel industry.</p>
                        <p>We hope you enjoy our blogs and services as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
                    </div>
                    <div className="col-lg-4">
                        <img
                            src="images/img_3.jpg"
                            className="img-fluid rounded-circle rounded-image"
                            alt="Team"
                        />
                    </div>
                </div>

                <hr className="my-4" />

                <h2 className="mb-4">Our Team</h2>
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <div className="card h-100">
                            <img
                                src="images/person_1.jpg"
                                className="card-img-top rounded-circle rounded-image"
                                alt="Team Member 1"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">John Doe</h5>
                                <p className="card-text">Founder & CEO</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <div className="card h-100">
                            <img
                                src="images/person_2.jpg"
                                className="card-img-top rounded-circle rounded-image"
                                alt="Team Member 2"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Jane Smith</h5>
                                <p className="card-text">Head of Operations</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <div className="card h-100">
                            <img
                                src="images/person_3.jpg"
                                className="card-img-top rounded-circle rounded-image"
                                alt="Team Member 3"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Robert Johnson</h5>
                                <p className="card-text">Lead Travel Blogger</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <h2 className="mb-4">Contact Us</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="contactName" className="form-label">Your Name</label>
                        <input type="text" className="form-control" id="contactName" placeholder="John Doe" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactEmail" className="form-label">Your Email</label>
                        <input type="email" className="form-control" id="contactEmail" placeholder="john@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactMessage" className="form-label">Your Message</label>
                        <textarea className="form-control" id="contactMessage" rows="4" placeholder="Type your message here..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
            <footer className="bg-dark text-light text-center py-3 mt-5">
                <div className="container">&copy; 2023 Travel Blog. All rights reserved.</div>
            </footer>
        </>
    );
}

export default AboutUs;
