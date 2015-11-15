// Set up a collection to contain card information. On the server,
// it is backed by a MongoDB collection named "cards".

// improve this app so that:
// - instead of just 2 options, there can be as many options as defined for each card as saved in the database. 
// Find out how many options, show UI for each option

Cards = new Mongo.Collection("cards");

if (Meteor.isClient) {
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
  var getNextCard = function() {
    var cards = Session.get("cards");
    var card = cards.shift();
    console.log(card.options[0].label);
    card.options[0].points = 5;
    card.options[1].points = 5;
    Session.set("cards",cards);
    Session.set("card", card);
    Session.set("points1",card.options[0].points);
    Session.set("points2",card.options[1].points);
    Session.set("haveCards",cards.length > 0);
  };
  
  Meteor.startup(function() {
    Session.set("haveCards",true);
    Session.set("done",false);
  });

  Template.game.events({
    'click .nextcard': function () {
      //console.log("get next card");
      getNextCard();
    },
    'click .done': function() {
      Session.set("done",true);
    }
  });

  Template.game.helpers({
    cards: function() {
      var cards = Cards.find().fetch(); 
      _.shuffle(cards);
      //console.log(cards);
      Session.set("cards", cards);
      return cards;
    },
    haveCards: function() {
      return Session.get("haveCards");
    },
    done: function() {
      return Session.get("done");
    }
  });
  
  Template.card.helpers({
    card: function () {
      var c = Session.get("card");
      console.log(c);
      return c;
    },
    option1: function() {
      return this.options[0].label;
    },
    option2: function() {
      return this.options[1].label;
    },
    points1: function() {
      return Session.get("points1");
    },
    points2: function() {
      return Session.get("points2");
    }
  });

  Template.card.events({
    'click .inc': function (evt) {
      var which = evt.target.id - 1;
      var other = 1 - which;
      var points = this.options[which].points;

      points++;
      if ( points > 10 ) points = 10;
      this.options[which].points = points;
      this.options[other].points = 10 - this.options[which].points;
      var option = this.options[which];
      Session.set("points"+(which+1),this.options[which].points);
      Session.set("points"+(other+1),this.options[other].points);
      console.log(option.label +" is now " + option.points);
      //Meteor.users.update({"_id":Meteor.userId},)
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Cards.find().count() === 0) {
      var cards = [{"options":[{"label":"fat","points":0},{"label":"smart","points":0}]},
                   {"options":[{"label":"rich","points":0},{"label":"fat","points":0}]},
                   {"options":[{"label":"rich","points":0},{"label":"white teeth","points":0}]}
                  ];
      _.each(cards, function (card) {
        card.votes = [];
        Cards.insert(card);
        console.log("inserted : " + card);
      });
    }
  });
}
