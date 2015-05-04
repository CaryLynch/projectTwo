console.log("LINKED");

//this variable is to grab the text from the script 'template' that is in the html. It has an id of 'template'. We will be mustaching in all the new info that is put into the database into this script chucnk of code in the html
// var template = $('script[data-id="rest_template"]').text();


//when 'Add New Restaurant' is clicked, then a new empty array will be created in the restaurants section of the database so that it can then be updated on the 'Save' click with it's info
function createRestaurantId() {

  var template = $('script[data-id="rest_row_template"]').text();
  $.ajax({
    method: "POST",
    url: "/restaurants",
    data: JSON.stringify({name:'',location: ''}),
    contentType: 'application/json'
  }).done(function(newRestaurant) {
    var html = Mustache.render(template, newRestaurant);
    console.log('Creating ' + newRestaurant);

    $('tbody').append(html);
  });
}


function saveNewRestaurant(e) {

  var template = $('script[data-id="rest_template"]').text();
  var row = $(e.target).parents('tr');
  var id = row.attr('data-id');

  var name = row.find('[data-attr="name"]').text();
  var location = row.find('[data-attr="location"]').text();

  var payload = JSON.stringify({name: name, location: location});

  $.ajax({
    method: "PATCH",
    url: "/restaurants/" + id,
    data: payload,
    contentType: 'application/json'
  }).done(function() {

    alert('Saved!');
  });
}


function updateExistingRestaurant(e) {

  var template = $('script[data-id="rest_template"]').text();
  var row = $(e.target).parents('tr');
  var id = row.attr('data-id');

  var name = row.find('[data-attr="name"]').text();
  var location = row.find('[data-attr="location"]').text();

  var payload = JSON.stringify({name: name, location: location});

  $.ajax({
    method: "PATCH",
    url: "/restaurants/" + id,
    data: payload,
    contentType: 'application/json'
  }).done(function() {

    alert('Updated!');
  });
}


function deleteRestaurant(e) {

  var template = $('script[data-id="rest_template"]').text();
  console.log(template);
  var row = $(e.target).parents('tr');
  var id = row.attr('data-id');

  $.ajax({
    method: "DELETE",
    url: '/restaurants/' + id
  }).done(function() {

    row.remove();
  });
}


function getAllItems(e) {
    var row = $(e.target).parents('tr');
    var id = row.attr('data-id');
    // var name = row.find('[data-attr="name"]').text();

    $.ajax({
        method: "GET",
        url: "/restaurants/"+id+"/items"
      }).done(function(items) {
        console.log(items);   
             
      var itemTemp = $('script[data-id ="item_template"]').text();
      var html = Mustache.render(itemTemp, {items: items});
        console.log(html);

      $('#main-container').empty();
      $('#main-container').append(html);
    });

      var itemTemp = $('script[data-id ="item_template"]').text();
      var $createItemButton = $('.ui.label.blue');

    $createItemButton.on('click', function(){
      console.log("clicked");

      var template = $('script[data-id="item_row_template"]').text();
      $.ajax({
      method: "POST",
      url: "/items" + id,
      data: JSON.stringify({restaurantId:'{{id}}',name: '', price: '', order_count: ''}),
      contentType: 'application/json'
    }).done(function(newItem) {
      var html = Mustache.render(template, newItem);
      console.log('Creating ' + newItem);

    $('tbody2').append(html);
  });
});
}


function getAllRestaurants(funkshun){
    
  $.ajax({
    method: "GET",
    url: "/restaurants"
  }).done(function(restaurants) {
    console.log(restaurants);

    var template = $('script[data-id="rest_template"]').text();
    var html = Mustache.render(template, {restaurants: restaurants});
      console.log(html);

    $('#main-container').empty();
    $('#main-container').append(html);
    funkshun();
  });
}

function aboutDeveloper(){
    var template = $('script[data-id="developer_template"]').text();

  $("#about-developer").append(template);
}

$(document).ready(function(){
  console.log('Ready');

  //getAllRestaurants(); runs the function to get all the restaurants on the inital page load, but we have to use a callback so that we envoke the function before it reads the button functions below.

    getAllRestaurants(function(){  
      var $createRestaurantButton = $('.ui.label.blue');

      var $buttons = $('tbody');
      var $devButton = $('#about-developer');

      //these buttons create new (to be updated with new restauarant info), saves that info, can update that info or delete that info on click of the buttons data-action by running the function for that on click

      $createRestaurantButton.on('click', function(){
        console.log("clicked");
        createRestaurantId();
      });

      $buttons.on('click', '[data-action="save"]', function(e){
        saveNewRestaurant(e);
      });

      $buttons.on('click', '[data-action="update"]', function(e){
        updateExistingRestaurant(e);
      });

      $buttons.on('click', '[data-action="delete"]', function(e){
        deleteRestaurant(e);
      });

      $buttons.on('click', '[data-action="menu"]', function(e){
        getAllItems(e);
      });

      $devButton.on('click', '[data-action="about"]', function(e){
        aboutDeveloper(e);
      });

    });


//These buttons are for the items script only


    // $itembuttons.on('click', '[data-action="save"]', function(e){
    //   saveNewRestaurant(e);
    // });

    // $itembuttons.on('click', '[data-action="update"]', function(e){
    //   updateExistingRestaurant(e);
    // });

    // $itembuttons.on('click', '[data-action="delete"]', function(e){
    //   deleteRestaurant(e);
    // });

    // $itembuttons.on('click', '[data-action="menu"]', function(e){
    //   getAllItems(e);
    // });

});

var routes = {
    "/": restaurants,
    "/developer": developer,
    "/restaurants": restaurants,
    "/menu": menu
};

var router = Router(routes);

router.init();
