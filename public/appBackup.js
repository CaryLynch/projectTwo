console.log("LINKED");

//this variable is to grab the text from the script 'template' that is in the html. It has an id of 'template'. We will be mustaching in all the new info that is put into the database into this script chucnk of code in the html
// var template = $('script[data-id="rest_template"]').text();


//when 'Add New Restaurant' is clicked, then a new empty array will be created in the restaurants section of the database so that it can then be updated on the 'Save' click with it's info
function createRestaurantId() {

  var template = $('script[data-id="rest_template"]').text();
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
  
    var template = $('script[data-id="item_template"]').text();

    var row = $(e.target).parents('tr');
    var id = row.attr('data-id');
    var name = row.find('[data-attr="name"]').text();
    var $heading = $("h1").text();
    console.log($heading);

    // $('<h1>').append($heading);
    $.ajax({
      method: "GET",
      url: "/restaurants/"+id+"/items"
    }).done(function(items) {
        console.log(id);
        var itemEls = [];

    items.forEach(function(item) {
      var html = Mustache.render(template, item);
      itemEls.push(html);
    });
    $('tbody').empty();
    $('tbody').append(itemEls);
  });
}


function getAllRestaurants(){

  var template = $('script[data-id="rest_template"]').text();
  $.ajax({
    method: "GET",
    url: "/restaurants"
  }).done(function(restaurants) {
    // .map is equivalent to the code below... it is a shortcut

    // var restaurantsEls = restaurants.map(function(restaurants) {
    //   return Mustache.render(template, restaurants);
    // })

    var restaurantEls = [];

    restaurants.forEach(function(restaurant) {
      var html = Mustache.render(template, restaurant);
      restaurantEls.push(html);
    });

    //


    $('tbody').append(restaurantEls);
  });
}


$(document).ready(function(){
  
  console.log('Ready');

  getAllRestaurants();

  var $createRestaurantButton = $('.ui.label.blue');

  var $buttons = $('tbody');

  $createRestaurantButton.on('click', function(){
    console.log("clicked")
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

});





// v2:

// console.log("LINKED");

// //this variable is to grab the text from the script 'template' that is in the html. It has an id of 'template'. We will be mustaching in all the new info that is put into the database into this script chucnk of code in the html
// // var template = $('script[data-id="rest_template"]').text();


// //when 'Add New Restaurant' is clicked, then a new empty array will be created in the restaurants section of the database so that it can then be updated on the 'Save' click with it's info
// function createRestaurantId() {

//   var template = $('script[data-id="rest_template"]').text();
//   $.ajax({
//     method: "POST",
//     url: "/restaurants",
//     data: JSON.stringify({name:'',location: ''}),
//     contentType: 'application/json'
//   }).done(function(newRestaurant) {
//     var html = Mustache.render(template, newRestaurant);
//     console.log('Creating ' + newRestaurant);

//     $('tbody').append(html);
//   });
// }


// function saveNewRestaurant(e) {

//   var template = $('script[data-id="rest_template"]').text();
//   var row = $(e.target).parents('tr');
//   var id = row.attr('data-id');

//   var name = row.find('[data-attr="name"]').text();
//   var location = row.find('[data-attr="location"]').text();

//   var payload = JSON.stringify({name: name, location: location});

//   $.ajax({
//     method: "PATCH",
//     url: "/restaurants/" + id,
//     data: payload,
//     contentType: 'application/json'
//   }).done(function() {

//     alert('Saved!');
//   });
// }


// function updateExistingRestaurant(e) {

//   var template = $('script[data-id="rest_template"]').text();
//   var row = $(e.target).parents('tr');
//   var id = row.attr('data-id');

//   var name = row.find('[data-attr="name"]').text();
//   var location = row.find('[data-attr="location"]').text();

//   var payload = JSON.stringify({name: name, location: location});

//   $.ajax({
//     method: "PATCH",
//     url: "/restaurants/" + id,
//     data: payload,
//     contentType: 'application/json'
//   }).done(function() {

//     alert('Updated!');
//   });
// }


// function deleteRestaurant(e) {

//   var template = $('script[data-id="rest_template"]').text();
//   var row = $(e.target).parents('tr');
//   var id = row.attr('data-id');

//   $.ajax({
//     method: "DELETE",
//     url: '/restaurants/' + id
//   }).done(function() {

//     row.remove();
//   });
// }


// function getAllItems(e) {
  
//     var template = $('script[data-id="item_template"]').text();

//     var row = $(e.target).parents('tr');
//     var id = row.attr('data-id');
//     var name = row.find('[data-attr="name"]').text();
//     $.ajax({
//       method: "GET",
//       url: "/restaurants/"+id+"/items"
//     }).done(function(items) {
//         console.log(id);
//         var itemEls = [];

//     items.forEach(function(item) {
//       var html = Mustache.render(template, item);
//       itemEls.push(html);
//     });
//     $('main').empty();
//     var mainEls = ('<main class="ui page grid"><section class="eight column wide centered"><h1 class="heading">Restaurant Items</h1><table class="ui table celled striped"><thead><th>Menu item</th><th>Price</th><th>Order Count</th><th>Actions</th></thead><tbody></tbody></table><a class="ui label blue2"><i class="plus icon"></i>Add New Menu Item</a></section></main>');
//     $('main').append(mainEls);
//     $('tbody').empty();
//     $('tbody').append(itemEls);
//   });
// }


// function getAllRestaurants(){

//   var template = $('script[data-id="rest_template"]').text();
//   $.ajax({
//     method: "GET",
//     url: "/restaurants"
//   }).done(function(restaurants) {
//     // .map is equivalent to the code below... it is a shortcut

//     // var restaurantsEls = restaurants.map(function(restaurants) {
//     //   return Mustache.render(template, restaurants);
//     // })

//     var restaurantEls = [];

//     restaurants.forEach(function(restaurant) {
//       var html = Mustache.render(template, restaurant);
//       restaurantEls.push(html);
//     });

//     //


//     $('tbody').append(restaurantEls);
//   });
// }


// $(document).ready(function(){
  
//   console.log('Ready');

//   getAllRestaurants();

//   var $createRestaurantButton = $('.ui.label.blue');

//   var $buttons = $('tbody');

//   $createRestaurantButton.on('click', function(){
//     console.log("clicked");
//     createRestaurantId();
//   });

//   $buttons.on('click', '[data-action="save"]', function(e){
//     saveNewRestaurant(e);
//   });

//   $buttons.on('click', '[data-action="update"]', function(e){
//     updateExistingRestaurant(e);
//   });

//   $buttons.on('click', '[data-action="delete"]', function(e){
//     deleteRestaurant(e);
//   });

//   $buttons.on('click', '[data-action="menu"]', function(e){
//     getAllItems(e);
//   });

// });