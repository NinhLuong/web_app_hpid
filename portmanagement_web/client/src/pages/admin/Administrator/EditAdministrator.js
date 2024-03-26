import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { isFormEditValid } from "../../../validations/AdminValidation";
import { patchAdmin } from "../../../services/AdminService";
import { toast } from "react-toastify";

export default function EditAdministrator(props) {
  const [adminname, setAdminname] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [show, setShow] = useState(false);
  const { dataAdminEdit, handleUpdateAdminFromModal } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.token
  ? JSON.parse(localStorage.token)?.token
  : null;
  useEffect(() => {
    if (show) {
      setAdminname(dataAdminEdit.adminname);
      setEmail(dataAdminEdit.email);
      setFullname(dataAdminEdit.fullname);
    }
  }, [dataAdminEdit, show]);

  const handleEditAdmin = async () => {
    const response = await patchAdmin(adminname, email, fullname, token);
    if (response && response === "Edit admin done") {
      handleUpdateAdminFromModal({
        adminname: adminname,
        id: dataAdminEdit.id,
        email: email,
        fullname: fullname,
      });
    }
    handleClose();
    toast.success("Admin edited successfully!");
    console.log(response);
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Administrator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">Administrator</label>
              <input
                type="text"
                className="form-control"
                value={adminname}
                disabled
                onChange={(e) => setAdminname(e.target.value)}
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
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
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
            onClick={handleEditAdmin}
            disabled={!isFormEditValid(email, fullname)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
