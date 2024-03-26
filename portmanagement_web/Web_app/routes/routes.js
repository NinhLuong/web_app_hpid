const express = require('express');

const router = express.Router()
const AdminManagement = require("../web_api/admin")
const UserManagement = require("../web_api/user")
const LayoutManagement = require("../web_api/layout")
const RightManagement = require("../web_api/right")
const SchedulerManagement = require("../web_api/scheduler")
const PortManagement = require("../web_api/port")
const DeviceManagement = require("../web_api/device")
const Logger = require("../web_api/log")
const Auth = require("../middleware/auth");
const uploadcsvMiddleware = require("../middleware/csvUpload.js");
const uploadimageMiddleware = require("../middleware/imageUpload.js");
const Log = require("../log/log");
module.exports = router;

router.post('/login', AdminManagement.login)

router.post('/admin', Auth, Log, AdminManagement.addAdmin)
router.get('/admin', Auth, Log, AdminManagement.listAdmin)
router.patch('/admin', Auth, Log, AdminManagement.editAdmin)
router.delete('/admin', Auth, Log, AdminManagement.deleteAdmin)

router.post('/user', Auth, uploadcsvMiddleware.single("file"), Log, UserManagement.addUser)
router.get('/user', Auth, Log, UserManagement.listUser)
router.patch('/user', Auth, Log, UserManagement.editUser)
router.delete('/user', Auth, Log, UserManagement.deleteUser)

router.post('/layout', Auth, uploadimageMiddleware.single("file"), Log, LayoutManagement.addLayout)
router.get('/layout', Auth, Log, LayoutManagement.listLayout)
router.patch('/layout', Auth, uploadimageMiddleware.single("file"), Log, LayoutManagement.editLayout)
router.delete('/layout', Auth, Log, LayoutManagement.deleteLayout)

router.post('/scheduler', Auth, Log, SchedulerManagement.addScheduler)
router.get('/scheduler', Auth, Log, SchedulerManagement.listScheduler)
router.delete('/scheduler', Auth, Log, SchedulerManagement.deleteScheduler)

router.post('/port', Auth, Log, PortManagement.addPort)
router.get('/port', Auth, Log, PortManagement.listPort)
router.patch('/port', Auth, Log, PortManagement.editPort)
router.delete('/port', Auth, Log, PortManagement.deletePort)

router.get('/device', Auth, Log, DeviceManagement.listMac)


router.get('/log', Auth, Log, Logger.listLog)
router.get('/right', Auth, Log, RightManagement.listRight)

