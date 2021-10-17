import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
    const user = useSelector((state) => state.user.user);

    return (
        <header>
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <div className="logo">
                <Link to="/">
                    <h1>Logo</h1>
                </Link>
            </div>
            <nav>
                <ul>
                    <Link to="/announcements">Announcements</Link>
                </ul>
                <div>
                    <Link to="/announcement/add">Add announcement</Link>
                </div>
            </nav>
            <div>{user?.email}</div>
        </header>
    );
};

export default Header;