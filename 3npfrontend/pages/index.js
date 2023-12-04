import Head from "next/head";
import Link from "next/link";
import Header from "./components/Distributor/header";
import Login from "./components/Distributor/login";

export default function Home() {
  return (
    <>
      <Header title="DistributorHome" />
      <h1>Wellcome to the website!</h1>
      <Link href="Distributor/distributor">Go to distributor page</Link>
      <Login suppressHydrationWarning />
    </>
  );
}
