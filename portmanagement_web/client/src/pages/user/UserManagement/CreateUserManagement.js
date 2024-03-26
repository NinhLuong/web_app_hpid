import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { IoMdCreate } from "react-icons/io";
import {
  isFormCreateValid,
  isValidEmail,
} from "../../../validations/UserValidation";
import { postUser } from "../../../services/UserService";

export default function CreateUserManagement(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [show, setShow] = useState(false);
  const { handleUpdateTable } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
  };
  const handleShow = () => setShow(true);
  const token = localStorage.token
    ? JSON.parse(localStorage.token)?.token
    : null;

  const handleCreateUser = async () => {
    if (isFormCreateValid(username, email, group) && isValidEmail(email)) {
      try {
        const res = await postUser(username, email, group, token);
        console.log(res);

        if (res === "User already") {
          toast.error("User already exists");
        } else if (res === "Add user succeed") {
          handleClose();
          toast.success("User created successfully!");
          await handleUpdateTable({
            username,
            email,
            group,
          });
        } else {
          toast.error("Error!");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Error creating user");
      }
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <IoMdCreate />
      </Button>
      <Modal show={show} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
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
            onClick={handleCreateUser}
            disabled={!isFormCreateValid(username, email, group)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
