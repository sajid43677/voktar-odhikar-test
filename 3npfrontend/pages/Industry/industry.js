import Head from "next/head";
import Link from "next/link";
import Header from "../components/Distributor/header";
import { useState } from "react";
import ListInfo from "../components/Distributor/listInfo";
import AlertDis from "../components/Distributor/alert";
import MyCardDis from "../components/Distributor/cardDis.js";
import Sidebar from "../components/Industry/sidebar";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import IndNavbar from "../components/Industry/indNavbar";

export default function industry() {
  const listinfos = [
    "Industry",
    "Distributors",
    "Admin",
    "Available Products",
    "License File",
    "Product Requests",
    "Redlist",
    "Report and Notice",
    "User Profile",
  ];
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <>
      <IndNavbar/>
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
