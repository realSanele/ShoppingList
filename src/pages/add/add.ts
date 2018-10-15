import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  itemName:string;

  /*shopingList = {
    //_itemKey : '',
    itemName: ''
  }*/

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  addToDBList(){
    //this.shopingList.itemName = this.itemName;

    var database = firebase.database();
    //var name = this.cuisine.name;
    database.ref('/TBL_shoppingList/').push({c_itemName:this.itemName});

    this.navCtrl.setRoot("HomePage");
  }

}
