import Head from "next/head";
import Link from "next/link";
import Header from "../components/Distributor/header";
import NumberAnalyzer from "../components/numbergames";
import { useState } from "react";
import ListInfo from "../components/Distributor/listInfo";
import AlertDis from "../components/Distributor/alert";
import MyCardDis from "../components/Distributor/cardDis";
import Sidebar from "../components/Distributor/sidebar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Distributor() {
  const listinfos = [
    "Show Products",
    "Redlisted Industry",
    "Delivered Produscts",
    "Report",
    "License Verification",
  ];
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <>
      <Navbar />
      {/* {alertVisible && (
        <AlertDis alertType="success" onClose={() => setAlertVisible(false)}>
          Successfully logged in as <strong>Distributor</strong>
        </AlertDis>
      )} */}
      <Sidebar items={listinfos} textSize="30" />
      <Footer />
    </>
  );
}
