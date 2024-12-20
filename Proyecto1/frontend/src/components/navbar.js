"use client";


import React from "react";
import { useNavigate } from "next/navigation";
import Link from "next/link";
import "./navbar.css";

const Navbar = () => {

  return (

    <ul className="navbar-nav">
      <li>
        <Link href="/monitoreoHistorico">
          Monitoreo histórico
        </Link>
      </li>
      <li>
        <Link href="/monitoreoTiempoReal">
          Monitoreo en tiempo real
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
