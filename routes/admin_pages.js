const express = require('express');
const router = express.Router();
const authController = require('../controllers/admin_auth_control');
const adminTasks = require('../controllers/admin_tasks');

router.get('/', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.locals.title = "Welcome Admin";
        res.render('./admin/index');
    } else {
        res.redirect('./admin/login');
    }  
  });

router.get('/login', authController.isLoggedIn, (req, res) => {
    if(req.user ) {
        res.redirect('./admin/index');
    } else {
        res.locals.title = "Admin Login";
        res.render('./admin/login');
    }
});
router.get('/customers', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.locals.title = "Customer Management";
        adminTasks.viewAllCustomers(req,res);
    } else {
        res.redirect('./admin/login');
    }
});

router.get('/viewcustomer/:id', authController.isLoggedIn, (req,res)=>{
    if(req.user){
        adminTasks.viewCustomer(req,res);
    }
    else {
        res.redirect('../login');
    }
});

router.get('/customers/unregistered',authController.isLoggedIn, (req, res) => {
    if(req.user){
        adminTasks.viewUnregisteredCustomer(req,res);
    }
    else {
        res.redirect('../login');
    }
}  );

module.exports = router;