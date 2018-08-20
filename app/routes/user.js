const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    // params: firstName, lastName, email, mobileNumber, password, userName, country, isAdmin
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
         * @apiGroup users
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/signup api for user SignUp.
         *
         * @apiParam {string} firstName First Name of the user. (body params) (required)
         * @apiParam {string} lastName Last Name of the user. (body params) (required)
         * @apiParam {string} email email of the user. (body params) (required)
         * @apiParam {string} password password of the user. (body params) (required)
         * @apiParam {string} mobileNumber Mobile Number of the user. (body params) (required)
         * @apiParam {string} userName User Name of the user. (body params) (required)
         * @apiParam {Boolean} isAdmin type of user. (body params) (required)
         * @apiParam {string} country Country name of the user. (body params) (required)
         *  
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": "false",
                "message": "User Created",
                "status": 200,
                "data": {
                    "__v": 0,
                    "_id": "5b790288d6ed7d064cd59b24",
                    "createdOn": "2018-08-19T05:39:20.000Z",
                    "isAdmin": true,
                    "userVerified": false,
                    "country": "India",
                    "userName": "Krrish",
                    "mobileNumber": "911234567890",
                    "email": "hanumantchidrawar@gmail.com",
                    "lastName": "Patil",
                    "firstName": "Hanumant",
                    "userId": "Cr3Dtr_MG"
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }        
        */


    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);
     /**
        * @apiGroup users
        * @apiVersion  1.0.0
        * @api {post} /api/v1/users/login api for user login.
        *
        * @apiParam {string} email email of the user. (body params) (required)
        * @apiParam {string} password password of the user. (body params) (required)
        *
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "login Successful",
                "status": 200,
                "data": {
                    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjdGUzdtQ1lXTyIsImlhdCI6MTUzNDY1ODQzNDcxOSwic3ViIjoiYXV0aFRva2VuIiwiZXhwIjoxNTM0NzQ0ODM0LCJpc3MiOiJHcm91cENoYXRBcHAiLCJkYXRhIjp7ImlzQWRtaW4iOmZhbHNlLCJ1c2VyVmVyaWZpZWQiOnRydWUsImNvdW50cnkiOiJJbmRpYSIsInVzZXJOYW1lIjoiS3Jpc2huYSIsIm1vYmlsZU51bWJlciI6Ijg5MjAwMTQyMDUiLCJlbWFpbCI6Imhhbm1hbnRjaGlkcmF3YXJAZ21haWwuY29tIiwibGFzdE5hbWUiOiJQYXRpbCIsImZpcnN0TmFtZSI6IktyaXNobmEiLCJ1c2VySWQiOiJLVWVqMWxpZDQifX0.JtdeEqX5dE4Area0PLrqIDt29xXvBKIGmTDPY6Z7OU0",
                    "userDetails": {
                        "isAdmin": false,
                        "userVerified": true,
                        "country": "India",
                        "userName": "Krishna",
                        "mobileNumber": "1234567890",
                        "email": "hanmantchidrawar@gmail.com",
                        "lastName": "Patil",
                        "firstName": "Krishna",
                        "userId": "KUej1lid4"
                    }
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }   
       */

   
    // auth token params: userId.
    app.post(`${baseUrl}/:userId/logout`, userController.logout);
    /**
         * @apiGroup users
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/:userId/logout to logout user.
         *
         * @apiParam {string} userId userId of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": true,
                "message": "User logged Out",
                "status": 200,
                "data": {
                    "n": 0,
                    "ok": 1
                }
            }
          *  @apiErrorExample {json} Error-Response:
          *
          * {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }
     */

    app.get(`${baseUrl}/:userId/verifyUser`, userController.verifyUser);
    /**
         * @apiGroup users
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:userId/verifyUser to mark user as verified.
         *
         * @apiParam {string} userId Id of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
                {
                    "error": false,
                    "message": "user found & verified",
                    "status": 200,
                    "data": "User Verified Successfully"
                }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }        
        */
    app.get(`${baseUrl}/:email/forgotPassword`, userController.sendResetLink);
    /**
         * @apiGroup users
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:email/forgotPassword to send an reset email to user.
         *
         * @apiParam {string} email Email of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
                {
                    "error": false,
                    "message": "User Details Found",
                    "status": 200,
                    "data": "Mail sent successfully"
                }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }        
        */
    app.get(`${baseUrl}/:email/getUser`, userController.getUser)
    /**
         * @apiGroup user
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:email/getUser to get all details about the user.
         *
         * @apiParam {string} email email of user whoose details will be returned. (route params) (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "User found",
                "status": 200,
                "data": [
                    {
                        "_id": "5b724d82a11d030f24dcfffb",
                        "__v": 0,
                        "createdOn": "2018-08-14T03:33:22.000Z",
                        "isAdmin": false,
                        "userVerified": true,
                        "country": "India",
                        "userName": "Krishna",
                        "mobileNumber": "8920014205",
                        "email": "hanmantchidrawar@gmail.com",
                        "password": "$2a$10$9nM0HSCZqCdeiK0UaihUwuk.dtvTanqb1USTeCAmxT33VU4G9B7Uq",
                        "lastName": "Patil",
                        "firstName": "Krishna",
                        "userId": "KUej1lid4"
                    }
                ]
            }            
          *  @apiErrorExample {json} Error-Response:
          *
          * {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }
        */

    app.get(`${baseUrl}/getUsers`, userController.getUsers)
    /**
         * @apiGroup user
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/getUsers to get all the users who are not admin.
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
         * {
                "error": false,
                "message": "Users found",
                "status": 200,
                "data": [
                    {
                        "_id": "5b724d82a11d030f24dcfffb",
                        "__v": 0,
                        "createdOn": "2018-08-14T03:33:22.000Z",
                        "isAdmin": false,
                        "userVerified": true,
                        "country": "India",
                        "userName": "Krishna",
                        "mobileNumber": "8920014205",
                        "email": "hanmantchidrawar@gmail.com",
                        "password": "$2a$10$9nM0HSCZqCdeiK0UaihUwuk.dtvTanqb1USTeCAmxT33VU4G9B7Uq",
                        "lastName": "Patil",
                        "firstName": "Krishna",
                        "userId": "KUej1lid4"
                    }
                ]
            }   
         *  @apiErrorExample {json} Error-Response:
         *
         * {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }
        */

    app.post(`${baseUrl}/resetPassword`, userController.resetPassword);

    /**
         * @apiGroup users
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/resetPassword to change the password of user.
         *
         * @apiParam {string} userId Id of the user. (body params) (required)
         * @apiParam {string} password New password of the user. (body params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
                {
                    "error": false,
                    "message": "Mail sent Successfully",
                    "status": 200,
                    "data": "Password reset successfull"
                }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 500r,
                "data": null
            }        
        */
}
