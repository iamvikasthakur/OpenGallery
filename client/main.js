import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Images } from "/lib/Images.js"
import './main.html';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import { ReactiveVar } from 'meteor/reactive-var';
window.Images = Images
Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});
var  event , template, c = 1;

//================================================================

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

//========================routes===================================

Router.route('/',function(){
  this.render('landing',{to: "main"});
  c = 0;
});

Router.route('/file',function(){
  c = 0;
  if(Meteor.user()){
    if(Images.find().count() > 0){
      this.render('file',{to:"main"});
    }
    else{
      this.render("noImage",{to:"main"});
    }
  }
  else{
    this.render('loginFirst',{to:"main"});
  }
});

Router.route('/upload',function(){
  this.render('uploadForm',{to: "main"});
  
});


//================================helpers==============================================

Template.uploadForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.file.helpers({
  imageFile() {
    return Images.find();
  },
});

//==============================events==============================================

$(document).click(function() {
  $('.navbar-collapse').collapse('hide');
});

Template.file.events({
  'click .js-del-image': function(){
    Images.remove({"_id": this._id});
  },
  'click .openModal': function(){
    var size = this.size/1024;
    if(size > 1024){
      size = Math.round(size/1024)+" MB";
    }
    else{ 
      size = Math.round(size)+" KB";
    }

    $('.modalContent').attr({"src":"/cdn/storage/Images/"+this._id+"/original/"+this._id+this.extensionWithDot});
    $('#caption').html("<strong>Size :</strong> "+size+"<br><strong>Name :</strong> "+this.name+"<br><strong>Date :</strong> "+this.meta.createdAt);
    $('#myModal').css({"display":"block"});
  },
  'click .close': function(){
    $('#myModal').css({"display":"none"});
  }
});


Template.uploadForm.events({
  'change #fileInput': function(e, t){
      event = e;
      template = t;
      c = 1;
  },
  'click #Input':function(){
      if(!Meteor.user()){
        alert("Login First :)");
      }
      else{
        if(!event || c == 0){
          alert("Choose image first :)");
        }
        else if (event.currentTarget.files && Meteor.user()) {
          c = 0;
          for(var i = 0; i < event.currentTarget.files.length; i++) {
              const upload = Images.insert({
                file: event.currentTarget.files[i],
                streams: 'dynamic',
                chunkSize: 'dynamic',
                meta: {
                  createdAt: new Date(),
                }
              },false);
    
              upload.on('start', function () {
                template.currentUpload.set(this);
              });
        
              upload.on('end', function (error, fileObj) {
                if (error) {
                  alert('Error during upload: ' + error);
                } else {
                  alert('File "' + fileObj.name + '" successfully uploaded');
                }
                template.currentUpload.set(false);
              });
              upload.start();
            }
          }
          event = 0;
        }
    }
});

