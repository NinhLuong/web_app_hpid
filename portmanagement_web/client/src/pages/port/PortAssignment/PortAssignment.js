import React, { useEffect, useState } from "react";
// import "../../../App.scss";
import "./PortAssignment.scss"
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPort } from "../../../services/PortService";
import AssignPort from "./AssignPort";
import _ from "lodash";

function PortAssignment() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [editingPortId, setEditingPortId] = useState(null);
  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const token = localStorage.token
    ? JSON.parse(localStorage.token)?.token
    : null;

  // useEffect(() => {
  //   const fetchDataAndUpdateState = async () => {
  //     try {
  //       const portData = await getPort(token);
  //       setData(portData);
  //     } catch (error) {
  //       console.error("Error fetching port data:", error);
  //     }
  //   };
  //   fetchDataAndUpdateState();
  // }, [token, currentPage]);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const portData = await getPort(token);
        if (Array.isArray(portData)) {
          setData(portData);
        } else {
          console.error("Invalid admin port format:", portData);
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching port data:", error);
      }
    };
    fetchDataAndUpdateState();
  }, [token, currentPage]);

  const handleEditPort = (portId) => {
    setEditingPortId((prevPortId) => (prevPortId === portId ? null : portId));
  };

  const handleUpdatePortFromModal = (port) => {
    let cloneData = _.cloneDeep(data);
    let index = data.findIndex((item) => item.id === port.id);
    cloneData[index].layoutname = port.layout[0]?.layoutname;
    cloneData[index].username = port.user[0]?.username;
    cloneData[index].right = port.right[0]?.right;
    cloneData[index].status = port.status;
    setData(cloneData);
    // console.log(">> Check handleUpdateAdminFromModal:", admin);
    // console.log(">> Check data:", data);
    // console.log(">> Check cloneData:", cloneData);
    // console.log(">> Check index:", index);
  };

  return (
    <>
      <div className="data-table">
        <h2>Port Assignment</h2>
        <div className="button-action"></div>
        {data ? (
          <>
            <table className="port-table">
              <thead>
                <tr>
                  <th className="col-3 name-col">PORT NAME</th>
                  <th className="col-5 name-col">LAYOUT NAME</th>
                  <th className="col-2 name-col">USER</th>
                  <th className="col-2 name-col">RIGHT</th>
                  <th className="col-2 name-col">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((port) => (
                    <tr key={port.portid}>
                      <td className="table-data adminname-item">
                        {editingPortId === port.portid ? (
                          <>
                            <span onClick={() => handleEditPort(port.portid)}>
                              {port.portname}
                            </span>
                            <div>
                              <AssignPort
                                handleUpdatePortFromModal={
                                  handleUpdatePortFromModal
                                }
                                dataPortEdit={port}
                              />
                            </div>
                          </>
                        ) : (
                          <span onClick={() => handleEditPort(port.portid)}>
                            {port.portname}
                          </span>
                        )}
                      </td>

                      <td className="table-data">
                        {port.layout[0]?.layoutname}
                      </td>
                      <td className="table-data">{port.user[0]?.username}</td>
                      {/* <td className="table-data">{port.right[0]?.right}</td> */}
                      <td className="table-data">{port.user[0]?.username ? port.right[0]?.right : ""}</td>
                      <td className="table-data">{port.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </>
        ) : (
          <p className="text-load">Loading...</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default PortAssignment;
