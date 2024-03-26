import React, { useEffect, useState } from "react";
import "./LayoutManagement.scss";
// import "../../../App.scss";
import CreateLayoutManagement from "./CreateLayoutManagement";
import EditLayoutManagement from "./EditLayoutManagement";
import ReactPaginate from "react-paginate";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLayout, deleteLayout } from "../../../services/LayoutService";
import { toast } from "react-toastify";

function LayoutManagement() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingLayoutId, setEditingLayoutId] = useState(null);
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
  //       const layoutData = await getLayout(token);
  //       setData(layoutData);
  //     } catch (error) {
  //       console.error("Error fetching layout data:", error);
  //     }
  //   };
  //   fetchDataAndUpdateState();
  // }, [token, currentPage]);
  
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const layoutData = await getLayout(token);
        if (Array.isArray(layoutData)) {
          setData(layoutData);
        } else {
          console.error("Invalid layout data format:", layoutData);
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching layout data:", error);
      }
    };
    fetchDataAndUpdateState();
  }, [token, currentPage]);

  const handleEditLayout = (adminId) => {
    setEditingLayoutId(adminId);
  };

  const handleUpdateTable = (layout) => {
    setData([layout, ...data]);
  };

  const handleUpdateAdminFromModal = (layout) => {
    // console.log(">>> Check handleUpdateLayoutFromModal:", layout);
    // console.log(">> Check data: ", data);
    console.log(layout);
  };

  const handleSelect = (layout) => {
    if (selectedItems.includes(layout)) {
      setSelectedItems(selectedItems.filter((item) => item !== layout));
    } else {
      setSelectedItems([...selectedItems, layout]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data);
    }
  };

  const deleteSelectedLayout = () => {
    deleteLayout(selectedItems, token)
      .then(() => {
        getLayout(token).then((layoutData) => {
          setData(layoutData);
          setSelectedItems([]);
        });
        toast.success("Layout deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting admins:", error);
      });
  };

  return (
    <>
      <div className="layout-table data-table">
        <h2>Layout Management</h2>
        <div className="button-action">
          <div className="btn-delete-add">
            <button
              className="btn btn-danger d-flex align-items-center"
              onClick={() => {
                if (window.confirm("Are You Sure?")) {
                  deleteSelectedLayout();
                }
              }}
              disabled={selectedItems.length === 0}
            >
              <AiFillDelete />
            </button>
            <div>
              <CreateLayoutManagement handleUpdateTable={handleUpdateTable} />
            </div>
          </div>
          {/* <button className="btn btn-success d-flex align-items-center">
            <MdCreateNewFolder />
          </button> */}
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
                    <th className="col-4 name-col">LAYOUT NAME</th>
                    <th className="col-7 name-col">LAYOUT PLAN</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .slice(
                      currentPage * itemsPerPage,
                      (currentPage + 1) * itemsPerPage
                    )
                    .map((layout) => (
                      <tr key={layout.id}>
                        <td className="table-data">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(layout)}
                            onChange={() => handleSelect(layout)}
                          />
                        </td>
                        <td className="table-data adminname-item">
                          {editingLayoutId === layout.id ? (
                            <>
                              <span onClick={() => handleEditLayout(layout.id)}>
                                {layout.layoutname}
                              </span>
                              <div>
                                <EditLayoutManagement
                                  handleUpdateAdminFromModal={
                                    handleUpdateAdminFromModal
                                  }
                                  dataLayoutEdit={layout}
                                />
                              </div>
                            </>
                          ) : (
                            <span onClick={() => handleEditLayout(layout.id)}>
                              {layout.layoutname}
                            </span>
                          )}
                        </td>
                        <td className="table-data">
                          <img
                            className="img-layout"
                            src={`${process.env.REACT_APP_API_URL_IMAGE}/${layout.layoutdir}`}
                            alt={layout.layoutname}
                          />
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

export default LayoutManagement;
