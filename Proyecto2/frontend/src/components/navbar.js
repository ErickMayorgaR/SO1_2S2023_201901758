"use client";


import React from "react";
import { useNavigate } from "next/navigation";
import Link from "next/link";
import "./navbar.css";

const Navbar = () => {

  return (

    <ul className="navbar-nav">
      <li>
        <Link href="/mysql">
          mysql
        </Link>
      </li>
      <li>
        <Link href="/redis">
          redis
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
