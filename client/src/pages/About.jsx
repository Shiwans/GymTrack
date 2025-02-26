import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>Temperoary for just changing pages</h1>
      <ul>
        <li>
          <Link to="/admin/members">members</Link>
        </li>
        <li>
          <Link to="/dashboard">dashboard</Link>
        </li>
        <li>
          <Link to="/add-members">Add member</Link>
        </li>
        <li>
          <Link to="/mark-attendance">Attendance</Link>
        </li>
      </ul>
    </div>
  );
};

export default About;
