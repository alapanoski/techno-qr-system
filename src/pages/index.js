import { useState, useEffect, useContext } from "react";
import Hero from "../components/Hero/Hero";
import Dashboard from "./dashboard";
import Head from "next/head";
import supabaseClient from "../utils/supabaseClient";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/router";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  if (user) {
    router.push("/dashboard");
  }
  return (
    <>
      <Head>
        <title>Techno QR System</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container" style={{ padding: "0px 0 0px 0" }}>
        {/* {!user ? <Hero /> : <Dashboard />} */}
        <Hero />
      </div>
    </>
  );
}
