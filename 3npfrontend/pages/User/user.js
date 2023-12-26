import Head from "next/head";
import Link from "next/link";
import Header from "../components/Distributor/header";
import NumberAnalyzer from "../components/numbergames";
import { useState } from "react";
import Sidebar from "../components/User/sidebar";
import Footer from "../components/footer";
import { useRouter } from "next/router";
import UserNavbar from "../components/User/usernavbar";

export default function User() {
  const listinfos = [
    "Industry",
    "Redlisted Industry",
    "Distributor",
    "Redlisted Distributor",
    "Report",
    "profile",
    "Distributor Products"
  ];
  const [alertVisible, setAlertVisible] = useState(true);
  const router = useRouter();

  return (
    <>
      <UserNavbar/>
      {/* {alertVisible && (
        <AlertDis alertType="success" onClose={() => setAlertVisible(false)}>
          Successfully logged in as <strong>Distributor</strong>
        </AlertDis>
      )} */}
      <Sidebar items={listinfos} textSize="22" />
      <Footer />
    </>
  );
}

