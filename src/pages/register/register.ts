import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') email
  @ViewChild('password') password
  @ViewChild('name') name
  @ViewChild('lastName') lastName

  currentEmail : any
  currentPassword: any
  currentName : any
  currentLastName : any

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public firebase: AngularFireDatabase,
              private fireAuth: AngularFireAuth) 
              {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
   
      this.currentEmail = this.email.value,
      this.currentName =  this.name.value,
      this.currentLastName =  this.lastName.value,
      this.currentPassword =  this.password.value

    this.createUser()

  }

  alertRegisterSuccessful(){
    let alert = this.alertCtrl.create({
      title: "Register Successful",
      subTitle: "Confirm Your Email",
      buttons: ['Ok']
    })
    alert.present()
    this.clearInputs()
  }

  clearInputs(){
    this.email.value = ""
    this.name.value = ""
    this.lastName.value = ""
    this.password.value = ""
  }

  validateRegister() : boolean{
    if(this.email.value == ""){
    }
    return false
  }

  createUser(){
    this.fireAuth.auth.createUserWithEmailAndPassword(this.currentEmail, this.currentPassword).then( data => {
      this.fireAuth.auth.signInWithEmailAndPassword(this.currentEmail,this.currentPassword).then(data => {
        let key = this.fireAuth.auth.currentUser.uid.toString()
        let user = {
          name: this.currentName,
          lastName: this.currentLastName,
          password: this.currentPassword
        }
        const itemsRef = this.firebase.database.ref("Users/"+key).set(user).then(data => {
        this.alertRegisterSuccessful()
        }).catch(err => {
          var errorCode = err.code
          var errorMessage = err.message
          console.log(errorCode)
          console.log(errorMessage)
        })
      })
    })
  } 

}
