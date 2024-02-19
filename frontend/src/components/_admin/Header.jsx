import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav
            className="navbar navbar-expand-lg bg-dark border-bottom border-body"
            data-bs-theme="dark"
        >
            <div className="container">
                <Link className="navbar-brand" to="/admin">
                    Admin
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/admin"
                        >
                            Home
                        </Link>
                        <Link className="nav-link" to="student">
                            Students
                        </Link>
                        <Link className="nav-link" to="class">
                            Class
                        </Link>
                        <Link className="nav-link" to="exam">
                            Exams
                        </Link>
                        <Link className="nav-link" to="result">
                            Result
                        </Link>
                        <Link className="nav-link" to="payment">
                            Payments
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
