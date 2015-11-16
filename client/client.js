// Set up a collection to contain card information. On the server,
// it is backed by a MongoDB collection named "cards".

// improve this app so that:
// - instead of just 2 options, there can be as many options as defined for each card as saved in the database. 
// Find out how many options, show UI for each option

  Session.set("cardsReady",false);
  /*
  Meteor.subscribe("cards",function() {
    var cards = Cards.find().fetch(); //_.shuffle(Cards.find().fetch());
    console.log(cards);
    Session.set("cards", cards);
    getNextCard();
//    Session.set("cardsReady",true);
  });
  */
  Meteor.startup(function() {
    Session.set("haveCards",true);
    Session.set("done",false);
  });

