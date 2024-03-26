import React, { useState, useEffect } from "react";
import "./PortScheduler.scss";
import SetSchedule from "./SetSchedule";
import ReactPaginate from "react-paginate";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getPortScheduler,
  deletePortScheduler,
} from "../../../services/PortSchedulerSevice";
import { toast } from "react-toastify";

export default function PortScheduler() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [selectedItems, setSelectedItems] = useState([]);
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
  //       const schedulerData = await getPortScheduler(token);
  //       setData(schedulerData);
  //     } catch (error) {
  //       console.error("Error fetching scheduler data:", error);
  //     }
  //   };
  //   fetchDataAndUpdateState();
  // }, [token, currentPage]);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const schedulerData = await getPortScheduler(token);
        if (Array.isArray(schedulerData)) {
          setData(schedulerData);
        } else {
          console.error("Invalid admin scheduler format:", schedulerData);
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching scheduler data:", error);
      }
    };
    fetchDataAndUpdateState();
  }, [token, currentPage]);

  const handleUpdateTable = (scheduler) => {
    setData([scheduler, ...data]);
  };

  const handleSelect = (scheduler) => {
    if (selectedItems.includes(scheduler)) {
      setSelectedItems(selectedItems.filter((item) => item !== scheduler));
    } else {
      setSelectedItems([...selectedItems, scheduler]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data);
    }
  };

  const deleteSelectedAdmin = () => {
    deletePortScheduler(selectedItems, token)
      .then(() => {
        getPortScheduler(token).then((schedulerData) => {
          setData(schedulerData);
          setSelectedItems([]);
        });
        toast.success("Scheduler deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting admins:", error);
      });
  };

  return (
    <>
      <div className="data-table">
        <h2>Port Scheduler</h2>
        <div className="button-action">
          <div className="btn-delete-add">
            <button
              className="btn btn-danger d-flex align-items-center"
              onClick={() => {
                if (window.confirm("Are You Sure?")) {
                  deleteSelectedAdmin();
                }
              }}
              disabled={selectedItems.length === 0}
            >
              <AiFillDelete />
            </button>
            <div>
              <SetSchedule handleUpdateTable={handleUpdateTable} />
            </div>
          </div>
        </div>
        {data ? (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className="col-1">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === data.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="col-3 name-col">DATE TIME</th>
                    <th className="col-3 name-col">LAYOUT NAME</th>
                    <th className="col-2 name-col">PORT</th>
                    <th className="col-2 name-col">USER</th>
                    <th className="col-1 name-col">CHANGE TO</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data
                      .slice(
                        currentPage * itemsPerPage,
                        (currentPage + 1) * itemsPerPage
                      )
                      .map((scheduler) => (
                        <tr key={scheduler.id}>
                          <td className="table-data">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(scheduler)}
                              onChange={() => handleSelect(scheduler)}
                            />
                          </td>
                          <td className="table-data">{scheduler.datetime}</td>
                          <td className="table-data">
                            {scheduler.port?.[0]?.layout?.[0]?.layoutname}
                          </td>
                          <td className="table-data">
                            {scheduler.port?.[0]?.portname || ""}
                          </td>
                          <td className="table-data">
                            {scheduler.port?.[0]?.user?.[0]?.username || ""}
                          </td>
                          <td className="table-data">
                            {scheduler.changeto !== undefined
                              ? scheduler.changeto
                              : " "}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
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
