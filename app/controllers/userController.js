const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const mailer = require('./../libs/mailerLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const passwordLib = require('./../libs/passwordLib');
const token = require('./../libs/tokenLib');

/* Models */
const UserModel = mongoose.model('User');
const AuthModel = mongoose.model('Auth');


// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput = () => {

        return new Promise((resolve, reject) => {
            if (req.body.email) {

                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, "Email does not meet the requirements", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, "Password parameter is missing", 400, null);
                    reject(apiResponse);
                }
                else {
                    resolve(req);
                }

            }
            else {
                logger.error('Field Missing during User Creation', 'userContoller: createUser()', 10);
                let apiResponse = response.generate("true", "one or more parameter(s) are missing", 500, null);
                reject(apiResponse);
            }
        });
    }//end validateUserInput

    let createUser = () => {

        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, "userController:createUser()", 10);
                        let apiResponse = response.generate("true", "Failed to create user", 500, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(retrievedUserDetails)) {
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || ' ',
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpassword(req.body.password),
                            userName: req.body.userName,
                            country: req.body.country,
                            userVerified: false,
                            isAdmin: req.body.isAdmin,
                            createdOn: time.now()
                        });
                        newUser.save((err, newUser) => {
                            if (err) {
                                logger.error(err.message, "userController: createUser()", 10);
                                let apiResponse = response.generate("true", "failed to create user", 500, null);
                                reject(apiResponse);
                            }
                            else {
                                let newUserObj = newUser.toObject();
                                mailer.autoEmail(newUserObj.email, `<h2>Welcome to Meeting Planner Application</h2><br>
                                <a href='http://meetingplannerapp.hanumantpatil.co/verifyUser/${newUser.userId}'>Click here to verify yourself</a><br>
                                <p>If You have not the one who signed up for Meeting Planner App.<strong>Please ignore this mail.</strong></p>`);
                                resolve(newUserObj);
                            }
                        });
                    } else {
                        logger.error("user cannot be created, user already present", "userController: createUser()", 10);
                        let apiResponse = response.generate("true", "Failed to create user", 500, null);
                        reject(apiResponse);
                    }
                });
        });
    }//end createUser

    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password;
            let apiResponse = response.generate("false", "User Created", 200, resolve);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.send(err);
        });


}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {
    let findUser = () => {

        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    /* handle the error if the user is not found */
                    if (err) {
                        logger.error('Failed to retrieve user Data', "userController: findUser()", 10);
                        let apiResponse = response.generate(true, "failed to find the user with given email", 500, null);
                        reject(apiResponse);
                    }/* if company details is not found */
                    else if (check.isEmpty(userDetails)) {
                        logger.error("No User Found", "userController: findUser()", 10);
                        let apiResponse = response.generate(true, "No user Details Found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("user found", "userController: findUser()", 10);
                        resolve(userDetails);
                    }
                });
            }
            else {
                let apiResponse = response.generate(true, "email parameter is missing", 500, null);
                reject(apiResponse);
            }
        });
    }//end findUser()

    let isVerified = (userDetails) =>{

        return new Promise((resolve, reject) => {

            if( userDetails.userVerified == false){
                logger.error("User not Verified", "userController: isVerified()", 10);
                        let apiResponse = response.generate(true, "User not Verified", 500, null);
                        reject(apiResponse);
            }
            else{
                logger.info("User Verified", "userController: isVerified()", 10);
                        resolve(userDetails);
            }
        });//end Promise
    }//end isVerified

    let validatePassword = (retrievedUserDetails) => {
        return new Promise((resolve, reject) => {
            if(req.body.password){

                passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                    if (err) {
                        logger.error(err.message, "userController:ValidatePassword", 10);
                        let apiResponse = response.generate(true, "Login Failed", 500, null);
                        reject(apiResponse);
                    }
                    else if (isMatch) {
                        let retrievedUserDetailsObj = retrievedUserDetails.toObject();
                        delete retrievedUserDetailsObj.password;
                        delete retrievedUserDetailsObj._id;
                        delete retrievedUserDetailsObj.__v;
                        delete retrievedUserDetailsObj.createdOn;
                        delete retrievedUserDetailsObj.modifiedOn;
                        resolve(retrievedUserDetailsObj);
                    }
                    else {
                        logger.info('login Failed due to invalid password', "userController: validatePassword()", 10);
                        let apiResponse = response.generate(true, "Password is incorrect", 500, null);
                        reject(apiResponse);
                    }
                });

            }else{
                let apiResponse = response.generate(true, "password parameter is missing", 500, null);
                reject(apiResponse);
            }
        });//end promise
    }//end validateUser()

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, "Failed to generate Token", 500, null);
                    reject(apiResponse);
                }
                else {
                    tokenDetails.userId = userDetails.userId;
                    tokenDetails.userDetails = userDetails;
                    resolve(tokenDetails);
                }
            });
        });
    }//end generateToken

    let saveToken = (tokenDetails) => {

        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error(err.message, "userController: saveToken()", 10);
                    let apiResponse = response.generate(true, "Failed To Generate Token", 500, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    });
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(err.message, "userController: saveToken()", 10);
                            let apiResponse = response.generate(true, "Failed To save Token", 500, null);
                            reject(apiResponse);
                        }
                        else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody);
                        }
                    });
                }
                else {
                    retrievedTokenDetails.authToken = tokenDetails.token;
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret;
                    retrievedTokenDetails.tokenGenerationTime = time.now();

                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(err.message, "userController: saveToken", 10);
                            let apiResponse = response.generate(true, "Failed To Generate Token", 500, null);
                            reject(apiResponse);
                        }
                        else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody);
                        }
                    });
                }
            });
        });
    }//end of saveToken()

    findUser(req, res)
        .then(isVerified)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, "login Successful", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });
}// end of the login function 

let verifyUser = (req,res) =>{

    if (check.isEmpty(req.params.userId)) {
        logger.error("UserId is missing", "UserController: verifyUser()", 10);
        let apiResponse = response.generate(true, "userId is missing", 500, null);
        res.send(apiResponse);
    } else {
        UserModel.update({ userId: req.params.userId }, { userVerified: true }, { multi: true }, (err, result) => {

            if (err) {
                logger.error("Failed to verify User ", "userController: verifyUser()", 10);
                let apiResponse = response.generate(true, "Failed to verify user", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(result)) {
                logger.error("User Not found", "userController: verifyUser()", 10);
                let apiResponse = response.generate(true, "User not found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("User Verified", "userController: verifyUser()", 10);
                //mailer.autoEmail(result.email, `<b> Hi ${result.firstName} ${result.lastName}, your can now login to Meeting Planner app</b>`);
                let apiResponse = response.generate(false, "user found & verified", 200,"User Verified Successfully");
                res.send(apiResponse);
            }
        });
    }
}//end verifyUser

let sendResetLink = (req, res) => {
    if (check.isEmpty(req.params.email)) {
        logger.error("Email is missing", "UserController: sendResetLink()", 10);
        let apiResponse = response.generate(true, "Email is missing", 500, null);
        res.send(apiResponse);
    } else {
        UserModel.findOne({ email: req.params.email }, (err, userDetails) => {
            /* handle the error if the user is not found */
            if (err) {
                logger.error('Failed to retrieve user Data', "userController: sendResetLink()", 10);
                let apiResponse = response.generate(true, "failed to find the user with given email", 500, null);
                res.send(apiResponse);
            }/* if company details is not found */
            else if (check.isEmpty(userDetails)) {
                logger.error("No User Found", "userController: sendResetLink()", 10);
                let apiResponse = response.generate(true, "No user Details Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Reset Link send to user", "userController: sendResetLink()", 10);
                mailer.autoEmail(req.params.email, `<a href='http://meetingplanneapp.hanumantpatil.co/resetPassword/${userDetails.userId}'>click here to reset password</a>`);
                let apiResponse = response.generate(false, "Reset Link Sent Succesfully", 200, "Mail sent successfully");
                res.send(apiResponse);
            }
        });
    }
}//sendResetLink

let resetPassword = (req, res) => {

    let findUser = () => {

        return new Promise((resolve, reject) => {
            if (req.body.userId) {
                UserModel.findOne({ userId: req.body.userId }, (err, userDetails) => {
                    /* handle the error if the user is not found */
                    if (err) {
                        logger.error('Failed to retrieve user Data', "userController: resetPassword()", 10);
                        let apiResponse = response.generate(true, "failed to find the user with given email", 500, null);
                        reject(apiResponse);
                    }/* if company details is not found */
                    else if (check.isEmpty(userDetails)) {
                        logger.error("No User Found", "userController: resetPassword()", 10);
                        let apiResponse = response.generate(true, "No user Details Found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("user found", "userController: findUser()", 10);
                        resolve(userDetails);
                    }
                });
            }
            else {
                let apiResponse = response.generate(true, "UserId parameter is missing", 500, null);
                reject(apiResponse);
            }
        });
    }//end findUser()

    let updatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.password)) {
                logger.error("password is missing", "UserController: resetPassword()", 10);
                let apiResponse = response.generate(true, "Password is missing", 500, null);
                reject(apiResponse);
            } else {
                UserModel.update({ userId: req.body.userId }, { password: passwordLib.hashpassword(req.body.password) }, { multi: true }, (err, result) => {

                    if (err) {
                        logger.error("Failed to change Password ", "userController: resetPassword()", 10);
                        let apiResponse = response.generate(true, "Failed to change Password", 500, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(result)) {
                        logger.error("User Not found", "userController: resetPassword()", 10);
                        let apiResponse = response.generate(true, "User not found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("Password updated", "userController: resetPassword()", 10);
                        mailer.autoEmail(userDetails.email, `<b> Hi ${userDetails.firstName} ${userDetails.lastName}, your password has been changed succesfully</b>`);
                        resolve("Password reset successfull");
                    }
                });
            }
        });
    }//end update password

    findUser(req, res)
        .then(updatePassword)
        .then((message) => {
            let apiResponse = response.generate(false, "Mail sent Successfully", 200, message);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });


}//end reset password


let logout = (req, res) => {
  
    if (check.isEmpty(req.params.userId)) {
        logger.error("UserId is missing", "UserController: logOut", 10);
        let apiResponse = response.generate(true, "UserId is missing", 500, null);
        res.send(apiResponse);
    } else {
        AuthModel.remove({ userId: req.params.userId }, (err, result) => {
            if (err) {
                logger.error("Failed to logOut user", "UserController: logout", 10);
                let apiResponse = response.generate(true, "Failed to logOut user", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(result)) {
                logger.error("Invalid AuthToken/ authToken expired", "UserController: logout", 10);
                let apiResponse = response.generate(true, "Invalid AuthToken/ authToken expired", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("User Logged Out", "UserController: logoutr", 10);
                let apiResponse = response.generate(true, "User logged Out", 200, result);
                res.send(apiResponse);
            }
        });
    }

} // end of the logout function.

let getUser = (req, res) => {

    if (check.isEmpty(req.params.email)) {
        logger.info('email parameter missing', 'userController: getUserr', 9)
        let apiResponse = response.generate(true, 'email parameter missing.', 403, null)
        res.send(apiResponse)
    }
    else {
        UserModel.find({email: req.params.email}, (err, userDetails) => {
            /* handle the error if the user is not found */
            if (err) {
                logger.error('Failed to find user', "userController: getUser", 10);
                let apiResponse = response.generate(true, "failed to find the user", 500, null);
                res.send(apiResponse);
            }/* if company details is not found */
            else if (check.isEmpty(userDetails)) {
                logger.error("No user Found", "UserController: getUser", 10);
                let apiResponse = response.generate(true, "No User Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("User found", "UserController: getUser", 10);
                let apiResponse = response.generate(false, "User found", 200, userDetails);
                res.send(apiResponse);

            }
        });
    }
}//end getUser

let getUsers = (req, res) => {

    
        UserModel.find({isAdmin: false}, (err, userDetails) => {
            /* handle the error if the user is not found */
            if (err) {
                logger.error('Failed to find users', "userController: getUsers()", 10);
                let apiResponse = response.generate(true, "failed to find the users", 500, null);
                res.send(apiResponse);
            }/* if company details is not found */
            else if (check.isEmpty(userDetails)) {
                logger.error("No users Found", "UserController: getUsers()", 10);
                let apiResponse = response.generate(true, "No User Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Users found", "UserController: getUsers()", 10);
                let apiResponse = response.generate(false, "Users found", 200, userDetails);
                res.send(apiResponse);
            }
        });
    
}//end getUsers

module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    sendResetLink: sendResetLink,
    resetPassword: resetPassword,
    verifyUser: verifyUser,
    getUser: getUser,
    getUsers: getUsers,
    logout: logout

}// end exports