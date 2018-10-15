import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var firebase;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  itemsList = [];
  //inputs = [];
  item = {
    _key : '',
    name : ''
  };

  name:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.getDataFromDB();
  }

  ionViewDidLoad() {
    //this.getDataFromDB();
    console.log('ionViewDidLoad HomePage');
  }

  getDataFromDB(){
    firebase.database().ref('/TBL_shoppingList/').on('value', (snapshot) =>
    {
      snapshot.forEach((snap) => 
      { 
        //Initializing Item;
        /*this.item._key = snap.key;
        this.item.name = snap.val().c_itemName;*/
        //Adding Item to itemsList
        this.itemsList.push({_key : snap.key, name : snap.val().c_itemName});
       
        return false;
      });
    });

    console.log(this.itemsList);
  }

  /*bAdd(){
    //this.navCtrl.push('AddPage');
    
  }*/

  addToDBList(itemName){
    //this.shopingList.itemName = this.itemName;

    var database = firebase.database();
    //var name = this.cuisine.name;
    database.ref('/TBL_shoppingList/').push({c_itemName: itemName});

    this.navCtrl.setRoot("HomePage");
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Enter a name of your item",
      inputs : [
        {
          name: 'itemName',
          placeholder: 'Item Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            //console.log('Saved clicked');
            this.addToDBList(data.itemName);
            
          }
        }
      ]
    });
    prompt.present();
  }

  updateItem(item){
    //console.log('Name = '+item.name+' key '+item._key);
    var database = firebase.database();
    database.ref('/TBL_shoppingList/'+item._key).set({c_itemName:item.name});
    this.itemsList = [];
    this.getDataFromDB();
  }

  removeItem(item){
    var database= firebase.database();
    database.ref('/TBL_shoppingList/'+item._key).remove();
    this.itemsList = [];
    this.getDataFromDB();
  }

  showUpdatePrompt(item) {
    const prompt = this.alertCtrl.create({
      title: 'Update Item',
      message: "Do you want to update Item \' " +item.name+" \'",
      inputs : [
        {
          name : 'itemName',
          placeholder: 'Item Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            //console.log('Saved clicked');
            item = {name : data.itemName, _key:item._key};
            this.updateItem(item);
            
          }
        }
      ]
    });
    prompt.present();
  }

}
