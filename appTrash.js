console.log("loaded");

function home(){
  var $body = $('body');
  $body.empty();

  var $html = $("<h3 class='ui center aligned header'>Welcome to your Restaurant Management System Cary!</h3><div><button onclick=location.href='#/manage' class = 'manage'>Manage your Restaurants</button></div><div><button onclick= location.href='#/developer' class = 'developer'>About the Developer</button></div>");

  $body.append($html);
}

function developer(){
  var $body = $('body');
  $body.empty();

  var $homeButton = $("<button onclick=location.href='#/home' class='home'>Home</button>");

  var $html = $("<h1>This will talk about your developer!</h1>");

  $body.append($homeButton);
  $body.append($html);
}

function manage(){
  var $body = $('body');
  $body.empty();

  var $homeButton = $("<button onclick=location.href='#/home' class='home'>Home</button>");
  
  var $html = $("<h1>This is where your restaurants will be.</h1>");

  $body.append($homeButton);
  $body.append($html);
  var template = $('script[data-id="template"]').text();

  $.ajax({
  method: "GET",
  url: "/restaurants"
}).done(function(restaurants) {
  // .map is equivalent to the code below... it is a shortcut

  // var debtEls = debts.map(function(debt) {
  //   return Mustache.render(template, debt);
  // })

  var restaurantEls = [];

  restaurants.forEach(function(restaurant) {
    var html = Mustache.render(template, restaurant);
    restaurantEls.push(html);
  });

  //

  $body.append(restaurantEls);
});
}

var routes = {
    "/home": home,
    "/developer": developer,
    "/manage": manage
};

var router = Router(routes);

router.init();

//   <script type="text/template" data-id="template">
//     <tr data-id='{{id}}'>
//       <td data-attr='client_name' contenteditable='true' >
//         {{client_name}}
//       </td>
//       <td >
//         <i class='icon dollar'></i>
//         <span data-attr='amount' contenteditable='true'>{{amount}}</span>
//       </td>
//       <td>
//         <button data-action='save' class='ui button small green'>Save</button>
//         <button data-action='delete' class='ui button small red'>Iced</button>
//       </td>
//     </tr>
//   </script>

// $.ajax({
//   method: "GET",
//   url: "/debts"
// }).done(function(debts) {
  // .map is equivalent to the code below... it is a shortcut

  // var debtEls = debts.map(function(debt) {
  //   return Mustache.render(template, debt);
  // })

//   var debtEls = [];

//   debts.forEach(function(debt) {
//     var html = Mustache.render(template, debt);
//     debtEls.push(html);
//   });

//   //

//   $('tbody').append(debtEls);
// });

// $('.ui.label.blue').on('click', function() {
//   $.ajax({
//     method: "POST",
//     url: "/debts",
//     data: JSON.stringify({client_name:'',amount: 0}),
//     contentType: 'application/json'
//   }).done(function(weGotData) {
//     var html = Mustache.render(template, weGotData);
//     console.log('hello! ' + weGotData)

    // weGotData= {
    //   client_name: "",
    //   amount: 0,
    //   id: 'dkhjgflewgflaef-jhweg32783h-jkx'
    // }



//     $('tbody').append(html);
//   });
// });


// ANNA'S Notes:
// console.log('main.js is linked!')

// $buttonbutts.on(function(event) {

  //the function below looks for a parent anywhere in the DOM of the thing we clicked. I makes sure it matches the class "add_div".

  // var $theDivIWant = $(event.target).parents('.add_div')
  

  //Now that we have the DEEV we VANT, we can pull out the value of the "data-restaurantId" attribute using .attr() !!!!!

  // var myIdNumber = $theDivIWant.attr('data-restaurantId') 

  //make a render object
    // {
    //   restaurantId: myIdNumber,
    //   name: whateverIPulledOutOfMyForm,
    //   price: youKnowTheDrill
    // }
  //AJAAAXX

// });

// myIdNumber

// > "dlkfhaof-adsfjhbdfkbds-dfkjadlf"

// < div class ="add_div" data-restaurantId ="dlkfhaof-adsfjhbdfkbds-dfkjadlf" > 
//   <button>HI!</button>

// < /div>