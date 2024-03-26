import React, { useEffect, useState } from "react";
import "../../../App.scss";
import CreateAdministrator from "./CreateAdministrator";
import EditAdministrator from "./EditAdministrator";
import ReactPaginate from "react-paginate";
import { AiFillDelete } from "react-icons/ai";
// import { MdCreateNewFolder } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAdmin, deleteAdmin } from "../../../services/AdminService";
import { toast } from "react-toastify";
import _ from "lodash";

function Administrator() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingAdminId, setEditingAdminId] = useState(null);
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
  //       const adminData = await getAdmin(token);
  //       setData(adminData);
  //     } catch (error) {
  //       console.error("Error fetching admin data:", error);
  //     }
  //   };
  //   fetchDataAndUpdateState();
  // }, [token, currentPage]);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const adminData = await getAdmin(token);
        if (Array.isArray(adminData)) {
          setData(adminData);
        } else {
          console.error("Invalid admin data format:", adminData);
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchDataAndUpdateState();
  }, [token, currentPage]);

  const handleEditAdmin = (adminId) => {
    setEditingAdminId(adminId);
  };

  const handleUpdateTable = (admin) => {
    setData([admin, ...data]);
  };

  const handleUpdateAdminFromModal = (admin) => {
    let cloneData = _.cloneDeep(data);
    let index = data.findIndex((item) => item.id === admin.id);
    cloneData[index].email = admin.email;
    cloneData[index].fullname = admin.fullname;
    setData(cloneData);
    // console.log(">> Check handleUpdateAdminFromModal:", admin);
    // console.log(">> Check data:", data);
    // console.log(">> Check cloneData:", cloneData);
    // console.log(">> Check index:", index);
  };

  const handleSelect = (admin) => {
    if (selectedItems.includes(admin)) {
      setSelectedItems(selectedItems.filter((item) => item !== admin));
    } else {
      setSelectedItems([...selectedItems, admin]);
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
    deleteAdmin(selectedItems, token)
      .then(() => {
        getAdmin(token).then((adminData) => {
          setData(adminData);
          setSelectedItems([]);
        });
        toast.success("Admin deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting admins:", error);
      });
  };

  return (
    <>
      <div className="data-table">
        <h2>Administrator Management</h2>
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
              <CreateAdministrator handleUpdateTable={handleUpdateTable} />
            </div>
          </div>
        </div>
        {data ? (
          <>
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
                  <th className="col-3 name-col">ADMINISTRATOR</th>
                  <th className="col-3 name-col">EMAIL</th>
                  <th className="col-3 name-col">FULL NAME</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((admin) => (
                    <tr key={admin.id}>
                      <td className="table-data">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(admin)}
                          onChange={() => handleSelect(admin)}
                        />
                      </td>
                      <td className="table-data adminname-item">
                        {editingAdminId === admin.id ? (
                          <>
                            <span onClick={() => handleEditAdmin(admin.id)}>
                              {admin.adminname}
                            </span>
                            <div>
                              <EditAdministrator
                                handleUpdateAdminFromModal={
                                  handleUpdateAdminFromModal
                                }
                                dataAdminEdit={admin}
                              />
                            </div>
                          </>
                        ) : (
                          <span onClick={() => handleEditAdmin(admin.id)}>
                            {admin.adminname}
                          </span>
                        )}
                      </td>
                      <td className="table-data">{admin.email}</td>
                      <td className="table-data">{admin.fullname}</td>
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

export default Administrator;
