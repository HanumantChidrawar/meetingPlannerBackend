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
const MeetingModel = mongoose.model('Meeting');

//create meeting function
let createMeeting = (req, res) => {

    let newMeeting = new MeetingModel({
        meetingId: shortid.generate(),
        hostId: req.body.hostId,
        hostName: req.body.hostName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        title: req.body.title,
        purpose: req.body.purpose,
        venue: req.body.venue,
        meetingWithId: req.body.meetingWithId,
        meetingWithName: req.body.meetingWithName,
        createdOn: time.now(),
        modifiedOn: time.now()
    });
    console.log(newMeeting);
    newMeeting.save((err, newMeeting) => {
        if (err) {
            logger.error(err.message, "meetingController: createMeeting()", 10);
            let apiResponse = response.generate("true", "failed to create Meeting", 500, null);
            res.send(apiResponse);
        }
        else {
            logger.info("Meeting created", "meetingController: createMeeting()", 10);
            let apiResponse = response.generate("False", "Meeting Arranged", 200, newMeeting);
            res.send(apiResponse);
            console.log(apiResponse);
        }
    })//end save method
}//end createMeeting

let getMeeting = (req, res) => {

    if (check.isEmpty(req.params.meetingId)) {
        logger.error("meetingId is missing", "meetingController: getMeeting()", 10);
        let apiResponse = response.generate(true, "meetingId is missing", 500, null);
        res.send(apiResponse);
    }
    else {
        MeetingModel.findOne({ meetingId: req.params.meetingId }, (err, meetingDetails) => {
            if (err) {
                logger.error('Failed to retrieve meeting Data', "meetingController: getMeeting()", 10);
                let apiResponse = response.generate(true, "failed to find the meeting", 500, null);
                res.send(apiResponse);
            }/* if company details is not found */
            else if (check.isEmpty(meetingDetails)) {
                logger.error("No Meeting Found", "meetingController: getMeeting()", 10);
                let apiResponse = response.generate(true, "No Meeting Found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Meeting Details Found", "meetingController: getMeeting()", 10);
                let apiResponse = response.generate(false, "Meeting Details found", 200, meetingDetails);
                res.send(apiResponse);
            }
        });//end findone
    }
}//end getMeeting

let getMeetings = (req, res) => {

    let fetchDetails = (req, res) => {

        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.userId)) {
                logger.error("userId is missing", "meetingController: getMeetings()", 10);
                let apiResponse = response.generate(true, "userId is missing", 500, null);
                reject(apiResponse);
            }
            else {
                UserModel.findOne({ userId: req.params.userId }, (err, userDetails) => {
                    if (err) {
                        logger.error('Failed to retrieve user Data', "meetingController: getMeetings()", 10);
                        let apiResponse = response.generate(true, "failed to find the user details", 500, null);
                        reject(apiResponse);
                    }/* if company details is not found */
                    else if (check.isEmpty(userDetails)) {
                        logger.error("No User Found", "meetingController: getMeetings()", 10);
                        let apiResponse = response.generate(true, "No User Found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("User Found", "meetingController: getMeetings()", 10);
                        resolve(userDetails);
                    }
                });//end findone
            }
        })//end promise
    }//end fetchDetails

    let fetchMeetings = (userDetails) => {

        return new Promise((resolve, reject) => {

            if (userDetails.isAdmin) {
                MeetingModel.find({ hostId: userDetails.userId }, (err, meetingDetails) => {
                    if (err) {
                        logger.error('Failed to retrieve meetings Data', "meetingController: adminMeetings()", 10);
                        let apiResponse = response.generate(true, "failed to find the meetings for Admin", 500, null);
                        reject(apiResponse);
                    }/* if company details is not found */
                    else if (check.isEmpty(meetingDetails)) {
                        logger.error("No Meetings Found", "meetingController: adminMeetings()", 10);
                        let apiResponse = response.generate(true, "No Meetings Found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("Meetings Found", "meetingController: adminMeetings()", 10);
                        let apiResponse = response.generate(false, "Meetings found", 200, meetingDetails);
                        resolve(apiResponse);
                    }
                });//end findone
            }
            else {
                MeetingModel.find({ meetingWithId: userDetails.userId }, (err, meetingDetails) => {
                    if (err) {
                        logger.error('Failed to retrieve meetings Data', "meetingController: userMeetings()", 10);
                        let apiResponse = response.generate(true, "failed to find the meetings for user", 500, null);
                        reject(apiResponse);
                    }/* if company details is not found */
                    else if (check.isEmpty(meetingDetails)) {
                        logger.error("No Meetings Found", "meetingController: userMeetings()", 10);
                        let apiResponse = response.generate(true, "No Meetings Found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("Meetings Found", "meetingController: userMeetings()", 10);
                        let apiResponse = response.generate(false, "Meetings found", 200, meetingDetails);
                        resolve(apiResponse);
                    }
                });//end findone
            }
        })//end promise
    }//end fetchMeetings

    fetchDetails(req, res)
        .then(fetchMeetings)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });

}//end getMeetings

let deleteMeeting = (req, res) => {

    if (check.isEmpty(req.params.meetingId)) {
        logger.error(err.message, "meetingController:deleteMeeting()", 10);
        let apiResponse = response.generate("true", "Meeting by given Id not found", 500, null);
        res.send(apiResponse);
    } else {

        MeetingModel.remove({ meetingId: req.params.meetingId }, (err, meetingDetails) => {
            if (err) {
                logger.error(err.message, "meetingController:deleteMeeting()", 10);
                let apiResponse = response.generate("true", "Failed to Meeting", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(meetingDetails)) {
                logger.error(err.message, "MeetingController:deleteMeeting()", 10);
                let apiResponse = response.generate("true", "No Meeting found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Meeting deleted", "MeetingController: deleteMeeting()", 10);
                let apiResponse = response.generate(true, "Meeting deleted", 200, meetingDetails);
                res.send(apiResponse);
            }
        });//end remove
    }
}//end delete meeting

let updateMeeting = (req, res) => {
    if (check.isEmpty(req.params.meetingId)) {
        logger.error("MeetingId is missing", "MeetingController: updateMeeting()", 10);
        let apiResponse = response.generate(true, "meetingId is missing", 500, null);
        res.send(apiResponse);
    } else {
        let options = {
            hostName: req.body.hostName,
            hostId: req.body.hostId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            title: req.body.title,
            purpose: req.body.purpose,
            venue: req.body.venue,
            meetingWithId: req.body.meetingWithId,
            meetingWithName: req.body.meetingWithName,
            modifiedOn: time.now()
        }
        MeetingModel.update({ meetingId: req.params.meetingId }, options, { multi: true }, (err, meetingDetails) => {

            if (err) {
                logger.error("Failed to update Meeting", "meetingController: updateMeeting()", 10);
                let apiResponse = response.generate(true, "Failed to update Meeting", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(meetingDetails)) {
                logger.error("Meeting not found", "meetingController: updateMeeting()", 10);
                let apiResponse = response.generate(true, "Meeting not found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Meeting Updated", "meetingController: updateMeeting", 10);
                let apiResponse = response.generate(false, "meeting updated", 200, meetingDetails);
                res.send(apiResponse);
            }
        });
    }
}//end updateMeeting

module.exports = {

    createMeeting: createMeeting,
    getMeeting: getMeeting,
    getMeetings: getMeetings,
    updateMeeting: updateMeeting,
    deleteMeeting: deleteMeeting

}// end exports