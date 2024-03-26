import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { IoMdCreate } from "react-icons/io";
import { postLayout } from "../../../services/LayoutService";
import { isFormCreateValid } from "../../../validations/LayoutValidation";
export default function CreateLayoutManagement(props) {
  const [layoutname, setLayoutname] = useState("");
  // const [layoutdir, setLayoutdir] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const { handleUpdateTable } = props;
  const token = localStorage.token
    ? JSON.parse(localStorage.token)?.token
    : null;

  const handleClose = () => {
    setShow(false);
    setLayoutname("");
    setImage(null);
  };

  const handleShow = () => setShow(true);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setImage(selectedFile);
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageContainer = document.getElementById("image-container");
        imageContainer.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image" />`;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      toast.error("Please select an image.");
    }
  };

  const handleCreateLayout = () => {
    if (layoutname && image) {
      postLayout(layoutname, image, token)
        .then((res) => {
          console.log(">>> Response create Layout: ", res);
          if (res === "Add layout succeed") {
            toast.success("Layout created successfully!");
            handleClose();
            handleUpdateTable({
              layoutname,
              layoutdir: image.name,
            });
            window.location.reload();
          } else if (res === "Layout already") {
            toast.error("Layout already exists");
          } else {
            toast.error("Error!");
          }
        })
        .catch((error) => {
          console.error(">> Error:", error);
          toast.error("Error!");
        });
    } else {
      toast.error("Please enter a layout name and select an image.");
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <IoMdCreate />
      </Button>
      <Modal show={show} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Layout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">Layout Name</label>
              <input
                type="text"
                className="form-control"
                value={layoutname}
                onChange={(e) => setLayoutname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Layout Image</label>
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={handleImageUpload}
              />
            </div>
            <div id="image-container"></div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateLayout}
            disabled={!isFormCreateValid(layoutname)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
