import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import {
  patchPort,
  getLayoutOptions,
  getUserOptions,
} from "../../../services/PortService";
import { isFormCreateValid } from "../../../validations/PortValidation";

export default function AssignPort(props) {
  const [portname, setPortname] = useState("");
  const [layoutname, setLayoutname] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const [layoutOptions, setLayoutOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const { dataPortEdit, handleUpdatePortFromModal } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show && dataPortEdit) {
      setPortname(dataPortEdit.portname);
      if (
        dataPortEdit.layout &&
        dataPortEdit.layout.length > 0 &&
        dataPortEdit.layout[0].layoutname
      ) {
        setLayoutname(dataPortEdit.layout[0].layoutname);
      } else {
        setLayoutname("");
      }
      if (
        dataPortEdit.user &&
        dataPortEdit.user.length > 0 &&
        dataPortEdit.user[0].username
      ) {
        setUsername(dataPortEdit.user[0].username);
      } else {
        setUsername("");
      }
      setStatus(dataPortEdit.status);
    }
  }, [dataPortEdit, show]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const layoutOptions = await getLayoutOptions();
        const userOptions = await getUserOptions();
        setLayoutOptions(layoutOptions);
        setUserOptions(userOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }
    fetchOptions();
  }, []);

  const handleEditUser = async () => {
    console.log("portname: ", portname);
    console.log("layoutname: ", layoutname);
    console.log("username: ", username);
    console.log("status: ", status);

    const token = localStorage.token
      ? JSON.parse(localStorage.token)?.token
      : null;

    const response = await patchPort(
      portname,
      layoutname,
      username,
      status,
      token
    );
    if (response && response.username) {
      handleUpdatePortFromModal({
        portname: portname,
        layoutname: layoutname,
        username: username,
        id: dataPortEdit._id,
        status: status,
      });
    }
    console.log(response);
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Assign Port</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">Port Name</label>
              <input
                type="text"
                className="form-control"
                value={portname}
                disabled
                onChange={(e) => setPortname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Layout Name</label>
              <select
                className="form-select"
                value={layoutname}
                onChange={(e) => setLayoutname(e.target.value)}
              >
                {layoutOptions.map((option) => (
                  <option key={option.id} value={option.layoutname}>
                    {option.layoutname}
                  </option>
                ))}
                {layoutname === "" && (
                  <option value="" disabled>
                    Set Layout Name
                  </option>
                )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <select
                className="form-select"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                {userOptions.map((option) => (
                  <option key={option.id} value={option.username}>
                    {option.username}
                  </option>
                ))}
                {username === "" && (
                  <option value="" disabled>
                    Set User Name
                  </option>
                )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {status === "DOWN" ? (
                  <>
                    <option value="DOWN">DOWN</option>
                    <option value="UP">UP</option>
                  </>
                ) : (
                  <>
                    <option value="UP">UP</option>
                    <option value="DOWN">DOWN</option>
                  </>
                )}
              </select>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="btn btn-secondary"
          >
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={handleEditUser}
            disabled={!isFormCreateValid(layoutname, username, status)}
            className="btn btn-primary"
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
