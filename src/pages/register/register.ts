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
  @ViewChild('username') username
  @ViewChild('password') password
  @ViewChild('name') name
  @ViewChild('lastName') lastName

  currentEmail : any
  currentPassword: any
  currentName : any
  currentLastName : any
  currentUserName : any
  createUserFlag : boolean 
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public firebase: AngularFireDatabase,
              private fireAuth: AngularFireAuth) 
              {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    let abc
    
  }

  register(){
      this.currentEmail = this.email.value,
      this.currentUserName  = this.username.value,
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

  alertRegisterUnsuccessful(text){
    let alert = this.alertCtrl.create({
      title: "Registration Failed",
      subTitle: text,
      buttons: ['Ok']
    })
    alert.present()
  }

  clearInputs(){
    this.email.value = ""
    this.name.value = ""
    this.lastName.value = ""
    this.password.value = ""
    this.username.value = ""
  }

  validateRegister() : boolean{
    if(this.email.value == ""){
    }
    return false
  }

  createUser(){
    this.createUserFlag = true
    let abc
    console.log(this.currentUserName)
    this.firebase.object("Users").valueChanges().subscribe(data => {
      abc = data
      for (let key in abc) { // retrieving usernames from firebase for validation
        let value = data[key];
        if(value.username == this.currentUserName){
         this.createUserFlag = false; break;
        }
      }

      if(this.createUserFlag){
        this.fireAuth.auth.createUserWithEmailAndPassword(this.currentEmail, this.currentPassword).then( data => {
          this.fireAuth.auth.signInWithEmailAndPassword(this.currentEmail,this.currentPassword).then(data => {
            let key = this.fireAuth.auth.currentUser.uid.toString()
            let user = {
              username: this.currentUserName,
              name: this.currentName,
              lastName: this.currentLastName,
              password: this.currentPassword
            }
            const itemsRef = this.firebase.database.ref("Users/"+key).set(user).then(data => {
            this.alertRegisterSuccessful()
            }).catch(err => {
            let errorCode = err.code
            let errorMessage = err.message
            console.log(errorCode)
            console.log(errorMessage)
            })
          })
        }).catch(err => {
          let errorCode = err.code
          let errorMessage = err.message
          console.log(errorCode)
          this.alertRegisterUnsuccessful(errorMessage)
          console.log(errorMessage)
          })
      } // closing flag conditional
      else{
        console.log(this.createUserFlag)
        this.alertRegisterUnsuccessful("Check username")
      }
    })
    
  }
   

}
