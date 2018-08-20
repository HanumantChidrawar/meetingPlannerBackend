define({ "api": [
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/:meetingId/deleteMeeting",
    "title": "to delete the meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>Id of the Meeting. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n                \"error\": true,\n                \"message\": \"Meeting deleted\",\n                \"status\": 200,\n                \"data\": {\n                    \"n\": 1,\n                    \"ok\": 1\n                }\n            }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": string,\n                \"status\": 500,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsMeetingidDeletemeeting"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/:meetingId/meetingDetails",
    "title": "to get the details of meetings.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>Id of the Meeting. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n                \"error\": false,\n                \"message\": \"Meeting Details found\",\n                \"status\": 200,\n                \"data\": {\n                    \"_id\": \"5b76b27b1892ac2584045317\",\n                    \"__v\": 0,\n                    \"modifiedOn\": \"2018-08-17T13:22:10.000Z\",\n                    \"createdOn\": \"2018-08-17T11:33:15.000Z\",\n                    \"meetingWithName\": \"Krishna Patil\",\n                    \"meetingWithId\": \"KUej1lid4\",\n                    \"purpose\": \"Nothing\",\n                    \"venue\": \"Some Where\",\n                    \"title\": \"Dummy2\",\n                    \"endDate\": 1534505944840,\n                    \"startDate\": 1534505875342,\n                    \"hostName\": \"Hanumant Patil\",\n                    \"hostId\": \"XG85kXrYu\",\n                    \"meetingId\": \"ChoCXKZC5\"\n                }\n            }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": string,\n                \"status\": 500,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsMeetingidMeetingdetails"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/:userId/getMeetings",
    "title": "to get all the meetings of particular  user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meetings found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5b76b27b1892ac2584045317\",\n            \"__v\": 0,\n            \"modifiedOn\": \"2018-08-17T13:22:10.000Z\",\n            \"createdOn\": \"2018-08-17T11:33:15.000Z\",\n            \"meetingWithName\": \"Krishna Patil\",\n            \"meetingWithId\": \"KUej1lid4\",\n            \"purpose\": \"Nothing\",\n            \"venue\": \"Some Where\",\n            \"title\": \"Dummy2\",\n            \"endDate\": 1534505944840,\n            \"startDate\": 1534505875342,\n            \"hostName\": \"Hanumant Patil\",\n            \"hostId\": \"XG85kXrYu\",\n            \"meetingId\": \"ChoCXKZC5\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": string,\n                \"status\": 500,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "GetApiV1MeetingsUseridGetmeetings"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/createMeeting",
    "title": "api to Schedule a Meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "hostName",
            "description": "<p>Name of the user who is hosting the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "hostId",
            "description": "<p>Id of the user who is hosting the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingWithName",
            "description": "<p>Name of the user who is joining the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingWithId",
            "description": "<p>Id of the user who is joining the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "venue",
            "description": "<p>Place of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start Date/Time of the Meeting converted in number of milliseconds. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "endDate",
            "description": "<p>End Date/Time of the Meeting converted in number of milliseconds. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": \"False\",\n    \"message\": \"Meeting Arranged\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5b7939364108733044f57c1c\",\n        \"modifiedOn\": \"2018-08-19T09:32:38.000Z\",\n        \"createdOn\": \"2018-08-19T09:32:38.000Z\",\n        \"meetingWithName\": \"Krishna Patil\",\n        \"meetingWithId\": \"KUej1lid4\",\n        \"purpose\": \"Nothing\",\n        \"venue\": \"No where\",\n        \"title\": \"Dummy5\",\n        \"endDate\": 12345678902,\n        \"startDate\": 12345678901,\n        \"hostName\": \"Hanumant Patil\",\n        \"hostId\": \"XG85kXrYu\",\n        \"meetingId\": \"49HMgKJQs\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsCreatemeeting"
  },
  {
    "group": "meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meetings/:meetingId/updateMeeting",
    "title": "api to Re-Schedule a Meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>Id of the Meeting. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "hostName",
            "description": "<p>Name of the user who is hosting the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "hostId",
            "description": "<p>Id of the user who is hosting the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingWithName",
            "description": "<p>Name of the user who is joining the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingWithId",
            "description": "<p>Id of the user who is joining the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "venue",
            "description": "<p>Place of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start Date/Time of the Meeting converted in number of milliseconds. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "endDate",
            "description": "<p>End Date/Time of the Meeting converted in number of milliseconds. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"meeting updated\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meetings",
    "name": "PostApiV1MeetingsMeetingidUpdatemeeting"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:email/getUser",
    "title": "to get all details about the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of user whoose details will be returned. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5b724d82a11d030f24dcfffb\",\n            \"__v\": 0,\n            \"createdOn\": \"2018-08-14T03:33:22.000Z\",\n            \"isAdmin\": false,\n            \"userVerified\": true,\n            \"country\": \"India\",\n            \"userName\": \"Krishna\",\n            \"mobileNumber\": \"8920014205\",\n            \"email\": \"hanmantchidrawar@gmail.com\",\n            \"password\": \"$2a$10$9nM0HSCZqCdeiK0UaihUwuk.dtvTanqb1USTeCAmxT33VU4G9B7Uq\",\n            \"lastName\": \"Patil\",\n            \"firstName\": \"Krishna\",\n            \"userId\": \"KUej1lid4\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": string,\n                \"status\": 500,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetApiV1UsersEmailGetuser"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/getUsers",
    "title": "to get all the users who are not admin.",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n                \"error\": false,\n                \"message\": \"Users found\",\n                \"status\": 200,\n                \"data\": [\n                    {\n                        \"_id\": \"5b724d82a11d030f24dcfffb\",\n                        \"__v\": 0,\n                        \"createdOn\": \"2018-08-14T03:33:22.000Z\",\n                        \"isAdmin\": false,\n                        \"userVerified\": true,\n                        \"country\": \"India\",\n                        \"userName\": \"Krishna\",\n                        \"mobileNumber\": \"8920014205\",\n                        \"email\": \"hanmantchidrawar@gmail.com\",\n                        \"password\": \"$2a$10$9nM0HSCZqCdeiK0UaihUwuk.dtvTanqb1USTeCAmxT33VU4G9B7Uq\",\n                        \"lastName\": \"Patil\",\n                        \"firstName\": \"Krishna\",\n                        \"userId\": \"KUej1lid4\"\n                    }\n                ]\n            }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": string,\n                \"status\": 500,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetApiV1UsersGetusers"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:email/forgotPassword",
    "title": "to send an reset email to user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": \"Mail sent successfully\"\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersEmailForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/verifyUser",
    "title": "to mark user as verified.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"user found & verified\",\n    \"status\": 200,\n    \"data\": \"User Verified Successfully\"\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridVerifyuser"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjdGUzdtQ1lXTyIsImlhdCI6MTUzNDY1ODQzNDcxOSwic3ViIjoiYXV0aFRva2VuIiwiZXhwIjoxNTM0NzQ0ODM0LCJpc3MiOiJHcm91cENoYXRBcHAiLCJkYXRhIjp7ImlzQWRtaW4iOmZhbHNlLCJ1c2VyVmVyaWZpZWQiOnRydWUsImNvdW50cnkiOiJJbmRpYSIsInVzZXJOYW1lIjoiS3Jpc2huYSIsIm1vYmlsZU51bWJlciI6Ijg5MjAwMTQyMDUiLCJlbWFpbCI6Imhhbm1hbnRjaGlkcmF3YXJAZ21haWwuY29tIiwibGFzdE5hbWUiOiJQYXRpbCIsImZpcnN0TmFtZSI6IktyaXNobmEiLCJ1c2VySWQiOiJLVWVqMWxpZDQifX0.JtdeEqX5dE4Area0PLrqIDt29xXvBKIGmTDPY6Z7OU0\",\n        \"userDetails\": {\n            \"isAdmin\": false,\n            \"userVerified\": true,\n            \"country\": \"India\",\n            \"userName\": \"Krishna\",\n            \"mobileNumber\": \"1234567890\",\n            \"email\": \"hanmantchidrawar@gmail.com\",\n            \"lastName\": \"Patil\",\n            \"firstName\": \"Krishna\",\n            \"userId\": \"KUej1lid4\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "to change the password of user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>New password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Mail sent Successfully\",\n    \"status\": 200,\n    \"data\": \"Password reset successfull\"\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500r,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user SignUp.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>type of user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>Country name of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": \"false\",\n    \"message\": \"User Created\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5b790288d6ed7d064cd59b24\",\n        \"createdOn\": \"2018-08-19T05:39:20.000Z\",\n        \"isAdmin\": true,\n        \"userVerified\": false,\n        \"country\": \"India\",\n        \"userName\": \"Krrish\",\n        \"mobileNumber\": \"911234567890\",\n        \"email\": \"hanumantchidrawar@gmail.com\",\n        \"lastName\": \"Patil\",\n        \"firstName\": \"Hanumant\",\n        \"userId\": \"Cr3Dtr_MG\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"User logged Out\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": string,\n                \"status\": 500,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersUseridLogout"
  }
] });
