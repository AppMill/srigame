// Set up a collection to contain card information. On the server,
// it is backed by a MongoDB collection named "cards".


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
