const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meetings`;

    //this is a get request for getting all the meeting for Particular user/Admin.
    app.get(`${baseUrl}/:userId/getMeetings`, meetingController.getMeetings);
    /**
         * @apiGroup meetings
         * @apiVersion  1.0.0
         * @api {get} /api/v1/meetings/:userId/getMeetings to get all the meetings of particular  user.
         *
         * @apiParam {string} userId userId of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Meetings found",
                "status": 200,
                "data": [
                    {
                        "_id": "5b76b27b1892ac2584045317",
                        "__v": 0,
                        "modifiedOn": "2018-08-17T13:22:10.000Z",
                        "createdOn": "2018-08-17T11:33:15.000Z",
                        "meetingWithName": "Krishna Patil",
                        "meetingWithId": "KUej1lid4",
                        "purpose": "Nothing",
                        "venue": "Some Where",
                        "title": "Dummy2",
                        "endDate": 1534505944840,
                        "startDate": 1534505875342,
                        "hostName": "Hanumant Patil",
                        "hostId": "XG85kXrYu",
                        "meetingId": "ChoCXKZC5"
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

    //this is a get request for getting details of the meeting.
    app.get(`${baseUrl}/:meetingId/meetingDetails`, meetingController.getMeeting);
    /**
         * @apiGroup meetings
         * @apiVersion  1.0.0
         * @api {get} /api/v1/meetings/:meetingId/meetingDetails to get the details of meetings.
         *
         * @apiParam {string} meetingId Id of the Meeting. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
         * {
                "error": false,
                "message": "Meeting Details found",
                "status": 200,
                "data": {
                    "_id": "5b76b27b1892ac2584045317",
                    "__v": 0,
                    "modifiedOn": "2018-08-17T13:22:10.000Z",
                    "createdOn": "2018-08-17T11:33:15.000Z",
                    "meetingWithName": "Krishna Patil",
                    "meetingWithId": "KUej1lid4",
                    "purpose": "Nothing",
                    "venue": "Some Where",
                    "title": "Dummy2",
                    "endDate": 1534505944840,
                    "startDate": 1534505875342,
                    "hostName": "Hanumant Patil",
                    "hostId": "XG85kXrYu",
                    "meetingId": "ChoCXKZC5"
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

    //this is a post request for updating the meeting.
    app.post(`${baseUrl}/:meetingId/updateMeeting`, meetingController.updateMeeting);
    /**
         * @apiGroup meetings
         * @apiVersion  1.0.0
         * @api {post} /api/v1/meetings/:meetingId/updateMeeting api to Re-Schedule a Meeting.
         *
         * @apiParam {string} meetingId Id of the Meeting. (route params) (required)
         * @apiParam {string} hostName Name of the user who is hosting the meeting. (body params) (required)
         * @apiParam {string} hostId Id of the user who is hosting the meeting. (body params) (required)
         * @apiParam {string} meetingWithName Name of the user who is joining the meeting. (body params) (required)
         * @apiParam {string} meetingWithId Id of the user who is joining the meeting. (body params) (required)
         * @apiParam {string} title Title of the Meeting. (body params) (required)
         * @apiParam {string} purpose Purpose of the Meeting. (body params) (required)
         * @apiParam {string} venue Place of the Meeting. (body params) (required)
         * @apiParam {Number} startDate Start Date/Time of the Meeting converted in number of milliseconds. (body params) (required)
         * @apiParam {Number} endDate End Date/Time of the Meeting converted in number of milliseconds. (body params) (required)
         *  
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "meeting updated",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
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

    //this is a get request for deleting the meeting.
    app.get(`${baseUrl}/:meetingId/deleteMeeting`, meetingController.deleteMeeting);
    /**
         * @apiGroup meetings
         * @apiVersion  1.0.0
         * @api {get} /api/v1/meetings/:meetingId/deleteMeeting to delete the meeting.
         *
         * @apiParam {string} meetingId Id of the Meeting. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
         * {
                "error": true,
                "message": "Meeting deleted",
                "status": 200,
                "data": {
                    "n": 1,
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

    //this is a post request for creating the meeting.
    app.post(`${baseUrl}/createMeeting`, meetingController.createMeeting);
    /**
         * @apiGroup meetings
         * @apiVersion  1.0.0
         * @api {post} /api/v1/meetings/createMeeting api to Schedule a Meeting.
         *
         * @apiParam {string} hostName Name of the user who is hosting the meeting. (body params) (required)
         * @apiParam {string} hostId Id of the user who is hosting the meeting. (body params) (required)
         * @apiParam {string} meetingWithName Name of the user who is joining the meeting. (body params) (required)
         * @apiParam {string} meetingWithId Id of the user who is joining the meeting. (body params) (required)
         * @apiParam {string} title Title of the Meeting. (body params) (required)
         * @apiParam {string} purpose Purpose of the Meeting. (body params) (required)
         * @apiParam {string} venue Place of the Meeting. (body params) (required)
         * @apiParam {Number} startDate Start Date/Time of the Meeting converted in number of milliseconds. (body params) (required)
         * @apiParam {Number} endDate End Date/Time of the Meeting converted in number of milliseconds. (body params) (required)
         *  
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": "False",
                "message": "Meeting Arranged",
                "status": 200,
                "data": {
                    "__v": 0,
                    "_id": "5b7939364108733044f57c1c",
                    "modifiedOn": "2018-08-19T09:32:38.000Z",
                    "createdOn": "2018-08-19T09:32:38.000Z",
                    "meetingWithName": "Krishna Patil",
                    "meetingWithId": "KUej1lid4",
                    "purpose": "Nothing",
                    "venue": "No where",
                    "title": "Dummy5",
                    "endDate": 12345678902,
                    "startDate": 12345678901,
                    "hostName": "Hanumant Patil",
                    "hostId": "XG85kXrYu",
                    "meetingId": "49HMgKJQs"
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

}