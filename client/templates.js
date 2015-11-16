var getNextCard = function() {
  var cards = Session.get("cards");
  var card = cards.shift();
  //console.log(card.options[0].label);
  card.options[0].points = 5;
  card.options[1].points = 5;
  Session.set("cards",cards);
  Session.set("card", card);
  Session.set("points1",card.options[0].points);
  Session.set("points2",card.options[1].points);
  Session.set("haveCards",cards.length > 0);
};


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
