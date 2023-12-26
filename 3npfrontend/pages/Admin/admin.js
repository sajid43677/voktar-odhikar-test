import Head from "next/head";
import Link from "next/link";
import Header from "../components/Distributor/header";
import NumberAnalyzer from "../components/numbergames";
import { useState } from "react";
import ListInfo from "../components/Distributor/listInfo";
import AlertDis from "../components/Distributor/alert";
import MyCardDis from "../components/Distributor/cardDis";
import Sidebar from "../components/Admin/sidebar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AdminNavbar from "../components/Admin/adminnavbar";

export default function Distributor() {
  const listinfos = [
    "All Admin",
    "Send Notice and Report",
    "See All Industry",
    "See All Distributor",
    "Verify Own Profile",
    "Red Listed Distributor",
    "Red Listed Industry",
    "See Verification Requests",
    "View Profile",
  ];
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <>
      <AdminNavbar />
      {/* {alertVisible && (
        <AlertDis alertType="success" onClose={() => setAlertVisible(false)}>
          Successfully logged in as <strong>Distributor</strong>
        </AlertDis>
      )} */}
      <Sidebar items={listinfos} textSize="20" />
      <Footer />
    </>
  );
}