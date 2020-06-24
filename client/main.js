import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Images } from "/lib/Images.js"
import './main.html';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
window.Images = Images
Meteor.subscribe("images");

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

Router.route('/userDAta',function(){
  console.log("you hit /userData ");
  if(Meteor.user()){
    if(Images.find().count() > 0){
      this.render('userData',{to: "main"});
    }
    else{
      this.render('noImage',{to: "main"});
    }
  }
  else{
    this.render('loginFirst',{to:"main"});
  }
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

Template.userData.helpers({
  images(){
    return Images.find({},{sort:{createdAt:-1}});
  },
  
});

//==============================events==============================================

$(document).click(function() {
  $('.navbar-collapse').collapse('hide');
});

Template.userData.events({
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

