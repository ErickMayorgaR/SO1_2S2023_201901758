"use client";


import React from "react";
import { useNavigate } from "next/navigation";
import Link from "next/link";

const Navbar = () => {

  return (

    <ul>
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
    // <nav>
    //   <h2>
    //     <Link href="/">Inicio</Link>
    //   </h2>
    //   <h2><Link href="/funcionalidad/monitoreoTiempoReal">Monitoreo en tiempo real</Link></h2>
    //   <h2><Link href="/components/monitoreoHistorico">Monitoreo a lo largo del tiempo</Link></h2>
    // </nav>
  );
};

export default Navbar;
