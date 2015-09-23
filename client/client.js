if (Meteor.isClient) {

  Template.cardLayout.events({
    'change #genderSelect': function(event, template) {
      var gender = template.find('#genderSelect').value;
      if(gender !== "") {
        $('.selectPhotoBtn').removeClass('disabled');
      }
    },
    'change #selectPhoto': function(event, template) {
      isUploading = true;
      FS.Utility.eachFile(event, function(photo) {
        var newPhoto = new FS.File(photo);
        newPhoto.metadata = { gender: template.find('#genderSelect').value };
        Photos.insert(newPhoto, function (err, photoObj) {
          if(err) {
            console.log(err);
          }
        });
      });
    }
  });

  Template.cardLayout.helpers({
    photoCount: function () {
      return Photos.find().count();
    },
    isUploading: function () {
      return false;
    }
  })

  Template.cardLayout.rendered = function() {
    // Semantic UI Dropdown
    $('select.dropdown').dropdown();
  };

  Template.photoGrid.helpers({
    photos: function () {
      return Photos.find();
    }
  });

  Template.owlCarousel.helpers({
    photos: function () {
      return Photos.find();
    }
  });

  Template.owlCarousel.rendered = function() {

      Meteor.setTimeout(function(){
        $("#owl-demo").owlCarousel({
            navigation : true,
            slideSpeed : 300,
            paginationSpeed : 400,
            items : 1,
            itemsDesktop : false,
            itemsDesktopSmall : false,
            itemsTablet: false,
            itemsMobile : false
        });
      }, 1000);

  };

}
