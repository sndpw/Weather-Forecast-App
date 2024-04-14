import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
      <Link href="/">
        <h1>Weather Forecast</h1>
      </Link>
      <p>2024 Weather Forecast</p>
    </div>
  );
}

export default Footer;
