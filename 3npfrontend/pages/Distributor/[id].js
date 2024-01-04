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
import DisNavbar from "../components/Distributor/disnavbar";
import Footer from "../components/footer";
import { useRouter } from "next/router";

export default function Distributor() {
  const listinfos = [
    "Show Products",
    "Redlisted Industry",
    "Delivered Products",
    "Report",
    "License Verification",
    "Industries",
    "Distributors",
    "Admins",
    "profile",
    "Overview",
    "Current Product Prices",
  ];
  const [alertVisible, setAlertVisible] = useState(true);
  const router = useRouter();

  return (
    <>
      <DisNavbar />
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
