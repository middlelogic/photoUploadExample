if (Meteor.isClient) {

  Meteor.startup(function () {
    // Filter Defaults
    var defaultFilter = "Both";
    Session.set('genderFilter', defaultFilter);
    $('input:radio[value="' + defaultFilter + '"]').attr('checked', 'checked');

  });

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
    },
    'change input:radio[name=genderFilter]': function (event) {
      Session.set('genderFilter', event.target.value);
    }
  });

  Template.cardLayout.helpers({
    photoCount: function () {
      return Photos.find().count();
    },
    genderFilter: function() {
      return Session.get('genderFilter');
    }
  })

  Template.cardLayout.rendered = function() {
    // Semantic UI Dropdown
    $('select.dropdown').dropdown();
    // Semantic UI Radio Buttons
    $('.ui.radio.checkbox').checkbox();
  };

  Template.photoGrid.helpers({
    photos: function () {
      switch(Session.get('genderFilter')) {
        case 'Both'   : return Photos.find(); break;
        case 'Male'   : return Photos.find({ 'metadata.gender': 'Male' }); break;
        case 'Female' : return Photos.find({ 'metadata.gender': 'Female' }); break;
        default       : return Photos.find(); break;
      }
    }
  });

  Template.owlCarousel.helpers({
    photos: function () {
      switch(Session.get('genderFilter')) {
        case 'Both'   : return Photos.find(); break;
        case 'Male'   : return Photos.find({ 'metadata.gender': 'Male' }); break;
        case 'Female' : return Photos.find({ 'metadata.gender': 'Female' }); break;
        default       : return Photos.find(); break;
      }
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
