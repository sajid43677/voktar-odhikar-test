import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./useauth";

export default function Redlisted() {
  const headerColumns = ["","", "Name", "Issuer", "Reason", "Role","", ""];
  const [industryRed, setIndustryRed] = useState([]);
  const [distributorRed, setDistributorRed] = useState([]);
  const [isIndustryRed, setIsIndustryRed] = useState(false);
  const [isDistributorRed, setIsDistributorRed] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchIndustryRed = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_API_End + "industry/redlistedindustry/",
          {
            withCredentials: true,
          }
        );

        if (res.status >= 200 && res.status <= 300) {
          setIndustryRed(res.data);
          setIsIndustryRed(true);
        }
      } catch (error) {
        console.log(
          error.hasOwnProperty("response")
            ? error.response.data.message
            : error.message
        );
      }
    };

    const fetchDistributorRed = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_API_End + "industry/redlisteddistributors/",
          {
            withCredentials: true,
          }
        );

        if (res.status >= 200 && res.status <= 300) {
          setDistributorRed(res.data);
          setIsDistributorRed(true);
        }
      } catch (error) {
        console.log(
          error.hasOwnProperty("response")
            ? error.response.data.message
            : error.message
        );
      }
    };

    if (user) {
      fetchIndustryRed();
      fetchDistributorRed();
    }
  }, [user]);

  const combinedRed = [...industryRed, ...distributorRed];

  return (
    <>
      <div>
        <div className="overflow-x-auto">
  
          {/* Industry Table */}
          {isIndustryRed && (
            <table className="table table-xs table-pin-rows table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th colSpan={headerColumns.length} className="text-center text-xl">
                    Redlisted Industrys and Distributors
                  </th>
                </tr>
                <tr><br/><br/></tr>
                <tr>
                  {headerColumns.map((column, index) => (
                    <th key={index} className="text-xl">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {combinedRed.map((content, index) => (
                  <tr key={index}>
                    <th></th>
                    <th></th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{content.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {content.issuer}
                      <br />
                      <span className="badge badge-ghost badge-sm"></span>
                    </td>
                    <td>{content.reason}</td>
                    <td>{content.role}</td>
                    <th></th>
                    <th></th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
}