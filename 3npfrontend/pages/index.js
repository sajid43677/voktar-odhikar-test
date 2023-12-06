import Head from "next/head";
import Link from "next/link";
import Header from "./components/Distributor/header";
import Login from "./components/Distributor/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="relative overflow-x-auto z-1 ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td className="w-500 text-base-100 text-3xl">
                <img
                  className="mx-auto w-auto h-auto"
                  src="landingpage.png"
                  alt="landing Page"
                />
              </td>
              <td className=" text-xl text-white right-0">
                Welcome to our website dedicated to upholding 'Vhoktar Odhikar,'
                the rights and principles that form the bedrock of justice. We
                stand as advocates for fairness, champions of rights, and
                guardians of legal liberties.
              </td>
            </tr>
            <tr>
              <td className="w-500 text-base-100 text-3xl">
                <img
                  className="mx-auto w-auto h-auto"
                  src="landingpageindustry.png"
                  alt="landing Page"
                />
              </td>
              <td className=" text-xl text-white right-0">
                In the bridge between industry and distributors lies the
                embodiment of 'Vhoktar Odhikar' application - a synergy where
                legal expertise meets commerce. Empowering distributors with
                legal guidance fosters a harmonious relationship, ensuring fair
                practices and upholding the rights that bind both industry and
                distributor, creating a framework of trust and integrity.
              </td>
            </tr>
            <tr>
              <td className="w-500 text-base-100 text-3xl">
                <img
                  className="mx-auto w-auto h-auto"
                  src="landingpagedistributor.png"
                  alt="landing Page"
                />
              </td>
              <td className=" text-xl text-white right-0">
                Embracing the role of a distributor isn't just about
                transactions; it's about empowering connections. As
                distributors, we bridge the gap between 'Vhoktar Odhikar'
                application and consumers, ensuring that justice and legal
                rights reach every doorstep, empowering individuals through
                accessibility and representation.
              </td>
            </tr>
            <tr>
              <td className="w-500 text-base-100 text-3xl">
                <img
                  className="mx-auto w-auto h-auto"
                  src="landingpageadmin.png"
                  alt="landing Page"
                />
              </td>
              <td className=" text-xl text-white right-0">
                Administering the gateway to justice, the vigilant administrator
                oversees user grievances, ensuring every complaint finds its
                path to resolution, upholding the sanctity of 'Vhoktar Odhikar.'
                With an eagle eye on market dynamics, prices, and product
                integrity, they fortify the legal landscape, fostering a fair
                and transparent legal ecosystem within the industry for all
                stakeholders involved.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
