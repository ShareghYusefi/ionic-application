import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  LocalNotifications,
  PermissionStatus,
  ScheduleOptions,
  LocalNotificationSchema,
} from '@capacitor/local-notifications';
import { EmailComposer, HasAccountResult } from 'capacitor-email-composer';
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  constructor(private router: Router) {}

  nagivateToContact() {
    this.router.navigate(['/tabs/tab3']);
  }

  openEmail() {
    EmailComposer.hasAccount()
      .then((result: HasAccountResult) => {
        // if result is truthy, user has mail account setup
        if (result) {
          //open the email composer
          EmailComposer.open({
            to: ['sharegh.yusefi@robogarden.ca'],
            subject: 'Email Button clicked!',
            body: 'This is a test email from the Ionic appliaction.',
          });
        }
      })
      .catch((error) => {
        console.error('Error checking email account: ', error);
      });
  }

  async openSetting(setting: string) {
    let androidOption = AndroidSettings.ApplicationDetails;
    let iosOption = IOSSettings.App;

    switch (setting) {
      case 'settings':
        androidOption = AndroidSettings.Settings;
        iosOption = IOSSettings.App;
        break;
      case 'wifi':
        androidOption = AndroidSettings.Wifi;
        iosOption = IOSSettings.WiFi;
        break;
      case 'bluetooth':
        androidOption = AndroidSettings.Bluetooth;
        iosOption = IOSSettings.Bluetooth;
        break;

      default:
        console.log('Invalid Setting, will default to App settings.');
        break;
    }

    await NativeSettings.open({
      optionAndroid: androidOption,
      optionIOS: iosOption,
    });
  }

  async requestPermission() {
    // request permission for sending notification
    let permissionStatus: PermissionStatus =
      await LocalNotifications.requestPermissions();
    // if permissionStatus display value is Not 'granted'
    if (permissionStatus.display != 'granted') {
      console.log('Permission not granted!');
    }
  }

  async scheduleNotification(seconds: number) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'You have a Task coming up!',
            body: 'Clean up the floors before the sun goes down.',
            schedule: {
              at: new Date(
                // get current time
                new Date().getTime() +
                  // add 3 seconds
                  seconds * 1000
              ),
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error scheduling notification: ', error);
    }
  }
}
