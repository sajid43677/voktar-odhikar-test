import Head from "next/head";
import Link from "next/link";
import Header from "../components/Distributor/header";
import NumberAnalyzer from "../components/numbergames";
import { useState } from "react";
import ListInfo from "../components/Distributor/listInfo";
import AlertDis from "../components/Distributor/alert";
import MyCardDis from "../components/Distributor/cardDis";

export default function Distributor() {
  const listinfos = [
    "Delivered Products",
    "Request Products",
    "Stored Products",
    "Add Products",
    "Redlist Status",
    "Send Report",
  ];
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <>
      <Header title="DistributorHome" />
      {alertVisible && (
        <AlertDis alertType="success" onClose={() => setAlertVisible(false)}>
          Successfully logged in as <strong>Distributor</strong>
        </AlertDis>
      )}
      <h1>Wellcome to distributor site</h1>
      <br />
      <MyCardDis items={listinfos} textSize="22" />
    </>
  );
}
