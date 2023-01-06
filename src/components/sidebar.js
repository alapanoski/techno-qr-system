import { Button } from "@mui/material";
import supabaseClient from "../utils/supabaseClient";
import logo from "../assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-start h-full gap-10 p-4 overflow-x-hidden bg-gray-300 md:w-72">
      <div>
        <Image src={logo} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          Home
        </div>
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/checkin")}
        >
          Check In
        </div>
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/food")}
        >
          Food
        </div>
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/points")}
        >
          Add Points
        </div>
        <Button
          onClick={() => {
            supabaseClient.auth.signOut();
          }}
          variant="contained"
          style={{
            backgroundColor: "red",
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
