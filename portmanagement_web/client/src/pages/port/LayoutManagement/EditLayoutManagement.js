import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { patchLayout } from "../../../services/LayoutService";

export default function EditLayoutManagement(props) {
  const [id, setId] = useState("");
  const [layoutname, setLayoutname] = useState("");
  const [layoutdir, setLayoutdir] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const { dataLayoutEdit, handleUpdateAdminFromModal } = props;
  const token = localStorage.token
  ? JSON.parse(localStorage.token)?.token
  : null;
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setId("");
    setLayoutname("");
    setLayoutdir("");
    setImage(null);
    setSelectedFileName("");
  };

  useEffect(() => {
    if (show && dataLayoutEdit) {
      setId(dataLayoutEdit.id);
      setLayoutname(dataLayoutEdit.layoutname);
      setLayoutdir(dataLayoutEdit.layoutdir);
      setSelectedFileName(
        dataLayoutEdit.layoutdir
          ? dataLayoutEdit.layoutdir.split("/").pop()
          : ""
      );
      if (dataLayoutEdit.layoutdir) {
        const img = new Image();
        img.src = dataLayoutEdit.layoutdir;
        img.onload = () => {
          setImage(img);
        };
      }
    }
  }, [dataLayoutEdit, show]);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setImage(selectedFile);
      setLayoutdir(URL.createObjectURL(selectedFile));
      setSelectedFileName(selectedFile.name);
    } else {
      setSelectedFileName("");
      setLayoutdir("");
      setImage(null);
    }
  };

  const handleEditLayout = () => {
    console.log(id);
    console.log(layoutname);
    console.log(layoutdir);
    console.log(image);
    if (layoutname) {
      if (image) {
        patchLayout(id, layoutname, image, token)
          .then((res) => {
            console.log(">>> Response edit Layout: ", res);
            if (res === "Edit layout done") {
              handleUpdateAdminFromModal({
                layoutname: layoutname,
                id: dataLayoutEdit.id,
                layoutdir: image.name,
              });
              toast.success("Layout edited successfully!");
              handleClose();
              window.location.reload();
            } else {
              console.error("Unexpected response:", res);
              toast.error("Error! Unexpected response");
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error! Check console for details");
          });
      } else {
        patchLayout(id, layoutname, null, token)
          .then((res) => {
            if (res === "Edit layout done") {
              handleUpdateAdminFromModal({
                layoutname: layoutname,
                id: dataLayoutEdit.id,
                layoutdir: null,
              });
              toast.success("Layout edited successfully!");
              handleClose();
              window.location.reload();
            } else {
              console.error("Unexpected response:", res);
              toast.error("Error! Unexpected response");
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error! Check console for details");
          });
      }
    } else {
      toast.error("Please enter a layout name.");
    }
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Layout</Modal.Title>
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
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={selectedFileName}
                  readOnly
                />
                <label className="input-group-text" htmlFor="fileInput">
                  Choose file
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="form-control visually-hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div id="image-container">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="preview-image"
                />
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleEditLayout}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
