console.log("hellooo");

// var template = $('script[data-id="template"]').text();

var $body = $('body');

$body.on('click', '.manage', function(){
  console.log("button clicked");
  var $body = $('body');
  $body.empty();

  var $homeButton = $("<button class='home'>Home</button>");

  var $ul = $("<ul></ul>");
  $ul.append("<li>test 1</li>");
  $ul.append("<li>test 2</li>");

  $body.append($homeButton);
  $body.append($ul);

});

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