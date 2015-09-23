var createSquareThumb = function(fileObj, readStream, writeStream) {
  var size = Meteor.settings.public.uploads.options.thumbs.size;
  gm(readStream).autoOrient().resize(size, size + '^')
  .gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
};

var thumbStore = new FS.Store.FileSystem("thumbs", {
  transformWrite: createSquareThumb,
  path: Meteor.settings.public.uploads.folders.root + Meteor.settings.public.uploads.folders.thumbs
});
var photoStore = new FS.Store.FileSystem("photos", {
  path: Meteor.settings.public.uploads.folders.root + Meteor.settings.public.uploads.folders.photos
});

Photos = new FS.Collection("photos", {
  stores: [ thumbStore, photoStore ]
});
