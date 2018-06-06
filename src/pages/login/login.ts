import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email
  @ViewChild('password') password
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl:AlertController,
              public firebase: AngularFireDatabase,
              private fireAuth: AngularFireAuth) 
              {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
   this.fireAuth.auth.signInWithEmailAndPassword(this.email.value,this.password.value).then(data => {
       this.alertSignInCorrect()
       this.goToChat()
    }).catch(err =>{
      this.alertSignInIncorrect()
    })
    //this.goToChat()
  }

  /** Correct signed In alert with Ok Button */
  alertSignInCorrect(){
    let alert = this.alertCtrl.create({
      title: "Login Successful!",
      subTitle: "You're logged In",
      buttons: ['OK']

    })
    alert.present()
  }

/** Incorrect signed In alert with Ok Button */
  alertSignInIncorrect(){
    let alert = this.alertCtrl.create({
      title: "Error",
      subTitle: "Check your email and password",
      buttons: ['OK']

    })
    alert.present()
  }

  goToChat(){
    this.navCtrl.push(ChatPage)
  }

}
