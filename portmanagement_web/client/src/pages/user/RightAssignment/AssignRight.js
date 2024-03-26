import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEdit } from "react-icons/ai";
import { patchUserRight, getOptions } from "../../../services/UserService";
// import {isFormEditRightValid} from "../../../validations/RightValidation"
import { toast } from "react-toastify";

export default function AssignRight(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [right, setRight] = useState("");
  const [show, setShow] = useState(false);
  const { dataUserRightEdit, handleUpdateUserRightFromModal } = props;
  const [rightOptions, setRightOptions] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.token ? JSON.parse(localStorage.token)?.token : null;
  useEffect(() => {
    if (show && dataUserRightEdit) {
      setUsername(dataUserRightEdit.username);
      setEmail(dataUserRightEdit.email);
      setRight(dataUserRightEdit.right[0].right);
    }
  }, [dataUserRightEdit, show]);

  const handleEditUser = async () => {
    try {
      const response = await patchUserRight(username, right, token);
      if (response && response === "Edit right done") {
        handleUpdateUserRightFromModal({
          username: username,
          email: email,
          id: dataUserRightEdit.id,
          right: right,
        });
      }
      handleClose();
      toast.success("User edited successfully!");
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchOptions() {
      try {
        const rightOptions = await getOptions();
        setRightOptions(rightOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }
    fetchOptions();
  }, []);

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Assign Right</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={username}
                disabled
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Right</label>
              <select
                className="form-select"
                value={right}
                onChange={(e) => setRight(e.target.value)}
              >
                {rightOptions.map((option) => (
                  <option key={option.id} value={option.layoutname}>
                    {option.right}
                  </option>
                ))}
              </select>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
