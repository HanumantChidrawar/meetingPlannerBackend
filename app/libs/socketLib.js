const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./../libs/loggerLib');
const tokenLib = require('./../libs/tokenLib');
const check = require('./../libs/checkLib');
const response = require('./../libs/responseLib');
const UserModel = mongoose.model('User');
const MeetingModel = mongoose.model('Meeting');
const mailer = require('./../libs/mailerLib');

//for event driven programming
const events = require('events');
const eventEmitter = new events.EventEmitter();

//importing redisLibrary
const redisLib = require("./redisLib");

let setServer = (server) => {
    let io = socketio.listen(server);//collection of all the connections on server

    let myIo = io.of('');//global instance of io can be used for cross socket communication.

    //main event handler all events will be inside it.
    myIo.on('connection', (socket) => {
        socket.emit('verifyUser', 'user verified');
        //code to verify the user and setting him online

        socket.on('set-user', (authToken) => {
            tokenLib.verifyClaimsWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Incorrect AuthToken' });
                }
                else {
                    let currentUser = user.data;
                    socket.userId = currentUser.userId;// setting socket userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`;
                    let key = currentUser.userId;
                    let value = fullName;
                    let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsers", key, value, (err, result) => {
                        if (err) {
                            logger.error(err.message, "socketLib:SetANewOnlineUserInHash", 10);
                        }
                        else {

                            redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {

                                if (err) {
                                    console.log(err);
                                }
                                else {

                                    //placing every user in one global room
                                    socket.join("globalRoom");
                                    //socket.broadcast.to("globalRoom").emit('online-user-list', result);
                                    myIo.to("globalRoom").emit('online-user-list', result);

                                }
                            });

                        }
                    });//end setNewOnlineUsersInHash

                    socket.fullName = fullName;
                }
            });//end verifyClaimsWithoutSecret
        });//end set-user event

        socket.on('notify-user', (data) => {
            console.log("notify user");
            console.log(data);
            myIo.emit(data.userId, data);//end userid event
        });//end notifying the normal user.

        socket.on('email-notification', (data) => {
            eventEmitter.emit('send-mail', data);//end send email event
        });//end email notification.

        socket.on('disconnect', () => {
            //user will emit when disconnected
            //will remove user from online user list

            if (socket.userId) {
                redisLib.deleteUserFromHash('onlineUsers', socket.userId);
                redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
                    if (err) {
                        logger.error(err.message, "socketLib:getAllUsersInAHash", 10);
                    }
                    else {
                        socket.leave("globalRoom");
                        myIo.to("globalRoom").emit('online-user-list', result);
                    }
                });//end getAllUsersInAHash
            }
        });//end disconnect event
    });//end connection event
}//end setServer


//saving chats to database.
eventEmitter.on('send-mail', (data) => {

    if (data.email && data.notifyUser) {
        message = `<h3>Hi ${data.firstName},</h3>
                <p>This is reminder for your Meeting ${data.title} will start in less than a minute.</p><br>
                <table class="table table-bordered">

            <thead>
              <tr>
                <th colspan = "2" > Meeting Details </th>
              </tr>
            </thead>
          
            <tbody>
              <tr>
                <td>
                  Host:
                </td>
                <td>
                  ${ data.hostName}
                </td>
              </tr>
              <tr>
                <td>
                  Title:
                </td>
                <td>
                  ${ data.title}
                </td>
              </tr>
              <tr>
                <td>
                  Venue:
                </td>
                <td>
                  ${ data.venue}
                </td>
              </tr>
              <tr>
                <td>
                  Purpose:
                </td>
                <td>
                  ${data.purpose}
                </td>
              </tr>
            </tbody>
          
          </table>`
        mailer.autoEmail(data.email, message);
        UserModel.findOne({ userId: data.meetingWithId }, (err, userDetails) => {
            if (err) {
                logger.error("Unable to find user", "socketLib: sendMail()", 10);
            }
            else if (check.isEmpty(userDetails)) {
                logger.error("No user Found", "socketLib: sendmail()", 10);
            }
            else {
                logger.info("user found & mail sent.", "userController: findUser()", 10);
                let message;
                console.log(userDetails);
                message = `<h3>Hi ${userDetails.firstName},</h3>
                    <p>This is reminder for your Meeting ${data.title} will start in less than a minute.</p><br>
                    <table class="table table-bordered">
    
                <thead>
                  <tr>
                    <th colspan = "2" > Meeting Details </th>
                  </tr>
                </thead>
              
                <tbody>
                  <tr>
                    <td>
                      Host:
                    </td>
                    <td>
                      ${ data.hostName}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Title:
                    </td>
                    <td>
                      ${ data.title}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Venue:
                    </td>
                    <td>
                      ${ data.venue}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Purpose:
                    </td>
                    <td>
                      ${data.purpose}
                    </td>
                  </tr>
                </tbody>
              
              </table>`
                mailer.autoEmail(userDetails.email, message);
            }
        });//find details

    }
    else if (data.email) {
        message = `<h3>Hi ${data.firstName},</h3>
                <p>This is reminder for your Meeting ${data.title} will start in less than a minute.</p><br>
                <table class="table table-bordered">

            <thead>
              <tr>
                <th colspan = "2" > Meeting Details </th>
              </tr>
            </thead>
          
            <tbody>
              <tr>
                <td>
                  Host:
                </td>
                <td>
                  ${ data.hostName}
                </td>
              </tr>
              <tr>
                <td>
                  Title:
                </td>
                <td>
                  ${ data.title}
                </td>
              </tr>
              <tr>
                <td>
                  Venue:
                </td>
                <td>
                  ${ data.venue}
                </td>
              </tr>
              <tr>
                <td>
                  Purpose:
                </td>
                <td>
                  ${data.purpose}
                </td>
              </tr>
            </tbody>
          
          </table>`
        mailer.autoEmail(data.email, message);
    }
    else {

        UserModel.findOne({ userId: data.meetingWithId }, (err, userDetails) => {
            if (err) {
                logger.error("Unable to find user", "socketLib: sendMail()", 10);
            }
            else if (check.isEmpty(userDetails)) {
                logger.error("No user Found", "socketLib: sendmail()", 10);
            }
            else {
                logger.info("user found & mail sent.", "userController: findUser()", 10);
                let message;
                console.log(userDetails);
                if (data.type == 'create') {
                    message = `<h3>Hi ${userDetails.firstName},</h3>
                            <p>Meeting ${data.title} has been scheduled with ${data.hostName}. for more details check Meeting Planner App.</p>`;
                }
                else if (data.type == 'update') {
                    message = `<h3>Hi ${userDetails.firstName},</h3>
                            <p>Meeting ${data.title} has been Re-Scheduled with ${data.hostName}. for more details check Meeting Planner App.</p>`
                }
                else if(data.type == 'delete') {
                    message = `<h3>Hi ${userDetails.firstName},</h3>
                            <p>Meeting ${data.title} has been Cancelled with ${data.hostName}. for more details check Meeting Planner App.</p>`
                }
                else{
                        message = `<h3>Hi ${userDetails.firstName},</h3>
                            <p>This is reminder for your Meeting ${data.title} will start in less than a minute.</p><br>
                            <table class="table table-bordered">
            
                        <thead>
                          <tr>
                            <th colspan = "2" > Meeting Details </th>
                          </tr>
                        </thead>
                      
                        <tbody>
                          <tr>
                            <td>
                              Host:
                            </td>
                            <td>
                              ${ data.hostName}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Title:
                            </td>
                            <td>
                              ${ data.title}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Venue:
                            </td>
                            <td>
                              ${ data.venue}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Purpose:
                            </td>
                            <td>
                              ${data.purpose}
                            </td>
                          </tr>
                        </tbody>
                      
                      </table>`
                }

                mailer.autoEmail(userDetails.email, message);
            }
        });//find details

    }


});//end eventEmitter

module.exports = {
    setServer: setServer
}
