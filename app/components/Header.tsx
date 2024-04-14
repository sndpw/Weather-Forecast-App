"use client";
import React from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        padding: 4,
      }}
    >
      <div
        style={{ marginLeft: 30, cursor: "pointer" }}
        onClick={() => {
          router.push("/");
        }}
      >
        <Typography
          variant={"h4"}
          sx={{
            fontWeight: "bold",
            fontFamily: "Monospace",
            lineHeight: 3,
            textTransform: "uppercase",
          }}
        >
          Weather Forecast
        </Typography>
      </div>
    </div>
  );
}

export default Header;
