import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { Login } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fullName: string;
  profilePicture: string;

  constructor(
    private facebook: FacebookAuth,
    private user: User,
    public navCtrl: NavController
  ) {

  }

  ionViewWillLoad() {
    this.fullName = this.user.social.facebook.data.full_name;
    this.profilePicture = this.user.social.facebook.data.profile_picture;
  }

  async logout(): Promise<void> {
    await this.facebook.logout();
    this.navCtrl.setRoot(Login);
  }
}
