import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { isFormEditValid } from "../../../validations/UserValidation";
import { patchUser } from "../../../services/UserService";
import { toast } from "react-toastify";

export default function EditUserManagement(props) {
  const [username, setUsername] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [show, setShow] = useState(false);
  const { dataUserEdit, handleUpdateUserFromModal } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      setUsername(dataUserEdit.username);
      setNewUsername(dataUserEdit.username);
      setEmail(dataUserEdit.email);
      setGroup(dataUserEdit.group);
    }
  }, [dataUserEdit, show]);
  const token = localStorage.token
    ? JSON.parse(localStorage.token)?.token
    : null;
  // const handleEditUser = async () => {
  //   // console.log(username);
  //   // console.log(newusername);
  //   // console.log(email);
  //   // console.log(group);
  //   const response = await patchUser(username, newusername, email, group);
  //   if (response && response === "Edit user done") {
  //     handleUpdateUserFromModal({
  //       username: username,
  //       newusername: newusername,
  //       id: dataUserEdit.id,
  //       email: email,
  //       group: group,
  //     });
  //   }
  //   handleClose();
  //   toast.success("User edited successfully!");
  //   console.log(response);
  // };

  const handleEditUser = async () => {
    try {
      const response = await patchUser(
        username,
        newusername,
        email,
        group,
        token
      );

      if (response === "Edit user done") {
        handleUpdateUserFromModal({
          username,
          newusername,
          id: dataUserEdit.id,
          email,
          group,
        });
        toast.success("User edited successfully!");
      } else if (response === "User already") {
        toast.error("User already exists");
      } else {
        toast.error("Failed to edit user");
      }

      handleClose();
    } catch (error) {
      console.error("Error editing user:", error.message);
      toast.error("An error occurred while editing user");
    }
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3 d-none">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={newusername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Group</label>
              <input
                type="text"
                className="form-control"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={handleEditUser}
            disabled={!isFormEditValid(username, email, group)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
