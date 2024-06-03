import { Injectable } from "@nestjs/common";
import admin from "./config";

// Push-Notification options.
const options = {
    contentAvailable: true,
    priority: "high",
    timeToLive: 60 * 60 * 24
};

interface notification {
    notification: {
        title: string,
        body: string
    }
}

@Injectable()
export class NotificationService {

    /*
     * To Send push-notification. 
    */
    async SendNotifications(registrationToken: string, payload: notification) {
        return new Promise(async (resolve) => {
            await admin.messaging().sendToDevice(registrationToken, payload, options)
                .then(response => {
                    console.log('notification send to Device! ', response.results);
                    resolve(true);
                })
                .catch(error => {
                    console.log('notification error! ', error);
                    resolve(error);
                });
        });
    }
}