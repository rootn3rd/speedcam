import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FacebookAuth, AuthLoginResult } from '@ionic/cloud-angular';

import { HomePage } from '../home/home';


/**
 * Generated class for the Login page.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loginResult: AuthLoginResult;

  constructor(
    private facebook: FacebookAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  async loginViaFacebook(): Promise<void> {

    console.log('Logging in via facebook..');
    try {
      const token = await this.facebook.getToken();
      if (token) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.loginResult = await this.facebook.login();
        if (this.loginResult.token) {

          await this.facebook.storeToken(this.loginResult.token);
          this.navCtrl.setRoot(HomePage);

        }
      }
    } catch (e) {
      console.error(e);
    }

  }

}
