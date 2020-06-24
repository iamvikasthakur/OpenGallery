import { Images } from "/lib/Images.js"


Meteor.startup(function(){
  // code to run on server at startup
  if(Images.find().count() == 0){
    console.log("you hit the startup code");
    // Images.insert({"text":" Your need to login to insert and see your own images."});
  }
});

Meteor.publish("images",function(){
    return Images.find({createdBy:this.userId});
});
