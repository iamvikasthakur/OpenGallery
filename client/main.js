import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Images } from "/lib/Images.js"
import './main.html';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
window.Images = Images
Meteor.subscribe("allowedData");

//================================================================

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

//========================routes===================================

Router.route('/',function(){
  console.log("you hit / ");
  this.render('landing',{to: "main"});
});

Router.route('/login',function(){
  console.log("you hit /login ");
  this.render('login',{to: "main"});
  this.render('database', {to:"item1"});
});

Router.route('/insert',function(){
  console.log("you hit /insert");
  this.render('insertImageForm',{to: "main"});
  
});

AutoForm.addHooks(null, {
  onSuccess: function() {
    alert('Submit Successfully');
  },  
});

//================================helpers==============================================

Template.database.helpers({
  images(){
    return Images.find();
  },
  
});

//==============================events==============================================

Template.database.events({
  'click .js-del-image':function(event){
      Images.remove({"_id":this._id}); 
 },
});


Template.insertImageForm.events({
  'submit #insertImageForm': function(event){
    if(!Meteor.user()){
      alert("login in first");
    }
  }
});

// Template.login.events({

// });