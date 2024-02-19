import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">
                            Suffa Coaching Center - Sagardina
                        </h1>
                        <p className="lead text-body-secondary">
                            Something short and leading about the collection
                            below—its contents, the creator, etc. Make it short
                            and sweet, but not too short so folks don’t simply
                            skip over it entirely.
                        </p>
                        <b>Annual Exam 2024 Result Available</b>
                        <p>
                            <Link to="/result" className="btn btn-success my-2">
                                Check Your Result
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
