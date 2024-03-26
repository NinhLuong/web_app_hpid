import React, { useEffect, useState } from "react";
import "../../../App.scss";
import AssignRight from "./AssignRight";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserRight } from "../../../services/UserService";
// import { toast } from "react-toastify";
import _ from "lodash";

function UserRightistrator() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  // const [selectedItems, setSelectedItems] = useState([]);
  const [editingUserRightId, setEditingUserRightId] = useState(null);
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
  //       const userData = await getUserRight(token);
  //       setData(userData);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchDataAndUpdateState();
  // }, [token, currentPage]);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const userData = await getUserRight(token);
        if (Array.isArray(userData)) {
          setData(userData);
        } else {
          console.error("Invalid admin user format:", userData);
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchDataAndUpdateState();
  }, [token, currentPage]);

  const handleEditUserRight = (userId) => {
    setEditingUserRightId(userId);
  };

  // const handleUpdateTable = (user) => {
  //   setData([user, ...data]);
  // };

  const handleUpdateUserRightFromModal = (user) => {
    let cloneData = _.cloneDeep(data);
    let index = data.findIndex((item) => item.id === user.id);
    cloneData[index].right = user.right;
    setData(cloneData);
    // console.log(">> Check handleUpdateUserRightFromModal:", user);
    // console.log(">> Check data:", data);
    // console.log(">> Check cloneData:", cloneData);
    // console.log(">> Check index:", index);
  };

  return (
    <>
      <div className="data-table">
        <h2>Right Assignment</h2>
        {data ? (
          <>
            <table>
              <thead>
                <tr>
                  <th className="col-3 name-col">USER NAME</th>
                  <th className="col-3 name-col">EMAIL</th>
                  <th className="col-3 name-col">GROUP</th>
                  <th className="col-3 name-col">RIGHT</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((user) => (
                    <tr key={user.id}>
                      <td className="table-data adminname-item">
                        {editingUserRightId === user.id ? (
                          <>
                            <span onClick={() => handleEditUserRight(user.id)}>
                              {user.username}
                            </span>
                            <div>
                              <AssignRight
                                handleUpdateUserRightFromModal={
                                  handleUpdateUserRightFromModal
                                }
                                dataUserRightEdit={user}
                              />
                            </div>
                          </>
                        ) : (
                          <span onClick={() => handleEditUserRight(user.id)}>
                            {user.username}
                          </span>
                        )}
                      </td>
                      <td className="table-data">{user.email}</td>
                      <td className="table-data">{user.group}</td>
                      <td className="table-data">{user.right[0].right}</td>
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

export default UserRightistrator;
