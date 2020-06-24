import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker'; 
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Images = new Mongo.Collection("images");

Images.attachSchema(new SimpleSchema({
  imgUrl:{
    type: String,
    label: "Image url"
  },
  createdAt: {
    type: Date,
    autoValue: function(){
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  },
  createdBy: {
    type: String,
    autoValue: function(){
      if(Meteor.user()){
        return Meteor.user()._id;
      }
      else{
        return null;
      }
    },
    autoform: {
      type: "hidden"
    }
  }
}, {tracker: Tracker},
));
