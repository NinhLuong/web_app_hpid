// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
// import { changePassAdmin } from "../../../services/AdminService";
// import { isFormChangePassValid } from "../../../validations/AdminValidation";

// export default function ChangePasswordAdmin(props) {
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmpassword] = useState("");
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleEditAdmin = async () => {
//     if (password !== confirmpassword) {
//       toast.error("Password and Confirm Password must match");
//     } else {
//       const response = await changePassAdmin(password, confirmpassword);
//       if (response && response === "Edit password done") {
//         console.log(response);
//       }
//       toast.success("Admin edited successfully!");
//       console.log(response);
//       handleClose();
//       delete localStorage.token;
//       // window.location.reload();
//     }
//   };

//   return (
//     <>
//       <div onClick={handleShow}>Change Password</div>
//       <Modal show={show} onHide={handleClose} className="form-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>Change Password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <div className="mb-3">
//               <label className="form-label">New Password</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Confirm New Password</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={confirmpassword}
//                 onChange={(e) => setConfirmpassword(e.target.value)}
//               />
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleEditAdmin}
//             disabled={!isFormChangePassValid(password, confirmpassword)}
//           >
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { changePassAdmin } from "../../../services/AdminService";
import { isFormChangePassValid } from "../../../validations/AdminValidation";

export default function ChangePasswordAdmin(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.token
  ? JSON.parse(localStorage.token)?.token
  : null;
  const handleEditAdmin = async () => {
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must match");
    } else {
      try {
        const response = await changePassAdmin(password, token);
        console.log(response);
        toast.success("Admin edited successfully!");
        handleClose();
        delete localStorage.token;
        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to edit admin");
      }
    }
  };

  return (
    <>
      <div onClick={handleShow}>Change Password</div>
      <Modal show={show} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleEditAdmin}
            disabled={!isFormChangePassValid(password, confirmPassword)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}