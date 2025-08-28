import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  EmailComposer,
  HasAccountResult,
  OpenOptions,
} from 'capacitor-email-composer';

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
}
