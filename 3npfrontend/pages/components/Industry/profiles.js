import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./useauth";

export default function Profiles() {
  const headerColumns = ["","", "Name", "Email", "Phone", "region","", ""];
  const [industryProfiles, setIndustryProfiles] = useState([]);
  const [adminProfiles, setAdminProfiles] = useState([]);
  const [distributorProfiles, setDistributorProfiles] = useState([]);
  const [isIndustryProfile, setIsIndustryProfile] = useState(false);
  const [isAdminProfile, setIsAdminProfile] = useState(false);
  const [isDistributorProfile, setIsDistributorProfile] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchIndustryProfiles = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_API_End + "industry/getallindustry/",
          {
            withCredentials: true,
          }
        );

        if (res.status >= 200 && res.status <= 300) {
          setIndustryProfiles(res.data);
          setIsIndustryProfile(true);
        }
      } catch (error) {
        console.log(
          error.hasOwnProperty("response")
            ? error.response.data.message
            : error.message
        );
      }
    };

    const fetchDistributorProfiles = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_API_End + "industry/getalldistributor/",
          {
            withCredentials: true,
          }
        );

        if (res.status >= 200 && res.status <= 300) {
          setDistributorProfiles(res.data);
          setIsDistributorProfile(true);
        }
      } catch (error) {
        console.log(
          error.hasOwnProperty("response")
            ? error.response.data.message
            : error.message
        );
      }
    };

    const fetchAdminProfiles = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_API_End + "industry/getalladmin/",
          {
            withCredentials: true,
          }
        );

        if (res.status >= 200 && res.status <= 300) {
          setAdminProfiles(res.data);
          setIsAdminProfile(true);
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
      fetchIndustryProfiles();
      fetchDistributorProfiles();
      fetchAdminProfiles();
    }
  }, [user]);

  return (
    <>
      <div>
        <div className="overflow-x-auto">
  
          {/* Industry Table */}
          {isIndustryProfile && (
            <table className="table table-xs table-pin-rows table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th colSpan={headerColumns.length} className="text-xl font-semibold mb-6 text-center text-white">
                    Industry Profiles
                  </th>
                </tr>
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
                {industryProfiles.map((content, index) => (
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
                      {content.email}
                      <br />
                      <div className="badge badge-ghost badge-sm"></div>
                    </td>
                    <td>{content.phone_number}</td>
                    <td>{content.region}</td>
                    <th></th>
                    <th></th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
  
          <br/><br/>
  
          {/* Distributor Table */}
          {isDistributorProfile && (
            <table className="table table-xs table-pin-rows table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th colSpan={headerColumns.length} className="text-xl font-semibold mb-6 text-center text-white">
                    Distributor Profiles
                  </th>
                </tr>
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
                {distributorProfiles.map((content, index) => (
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
                      {content.email}
                      <br />
                      <span className="badge badge-ghost badge-sm"></span>
                    </td>
                    <td>{content.phone_number}</td>
                    <td>{content.region}</td>
                    <th></th>
                    <th></th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <br/><br/>
          
          {/* Admin Table */}
          {isAdminProfile && (
            <table className="table table-xs table-pin-rows table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th colSpan={headerColumns.length} className="text-xl font-semibold mb-6 text-center text-white">
                    Admin Profiles
                  </th>
                </tr>
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
                {adminProfiles.map((content, index) => (
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
                      {content.email}
                      <br />
                      <span className="badge badge-ghost badge-sm"></span>
                    </td>
                    <td>{content.phone_number}</td>
                    <td>{content.region}</td>
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