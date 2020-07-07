import { FilesCollection } from 'meteor/ostrio:files';

export const Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: true,
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    alert('Please upload image, with size equal or less than 10MB');
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    if(Meteor.user()){
      return Images.find({userId: Meteor.user()._id}).cursor;
    }
  });
}