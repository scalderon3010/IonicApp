import { Component, ViewChild } from '@angular/core';
import { ActionSheetController , IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map'

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {


  CurrentUser
  CurrentUserName
  message : any
  messages = []
  CurrentMessage
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public firebase: AngularFireDatabase,
              private fireAuth: AngularFireAuth,
              public actionSheetCtrl: ActionSheetController) {
                let abc : any
                this.firebase.object("/Chats").valueChanges().subscribe(data => {
                  this.messages = []
                  abc = data
                   Object.keys(abc).map((key, index) => {
                    //console.log(abc[key])
                    this.CurrentMessage = abc[key]
                    this.messages.push(this.CurrentMessage)
                 })
                 //console.log(this.messages)
                })
              
              }

  ionViewDidLoad() {
    this.currentUser()
    this.CurrentUser = this.fireAuth.auth.currentUser.uid
  }

  sendMessage(){
    //console.log("click")
    //console.log(this.CurrentUserName)
    this.firebase.list("/Chats").push({
      username: this.CurrentUserName,
      message : this.message
    }).then( data => {
      this.clearInput()
      //console.log("Message sent!")
    })

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Submenu',
      buttons: [
        {
          text: 'View Connected Users',
          role: 'destructive',
          handler: () => {
            this.connectedUsersSubMenu()
          }
        }/*,{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        }*//*,{
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }*/
      ]
    });
    actionSheet.present();
  }

  connectedUsersSubMenu(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Connected Users',
      buttons: [
        {
          text: 'scalderon3010',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'erickal28',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'steven96',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
      ]
    });
    actionSheet.present();
  }


  currentUser(){
    let abc : any
    this.firebase.object("Users/"+this.fireAuth.auth.currentUser.uid.toString()).valueChanges().subscribe(data => {
      abc = data
      console.log(abc.name + " "+ abc.lastName)
      this.CurrentUser = abc.name + " "+ abc.lastName
      this.CurrentUserName = abc.username
    })
  }

  clearInput(){
    this.message = ""
  }

  
  }

    
    

    
  



