if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);


  Template.hello.onRendered(function (){

    function ticker (){
      var ONE_PERCENT_OF_DAY_IN_MINUTES = 14.4;
      var TOTAL_HOURS_IN_DAY = 24;
      var TOTAL_MINUTES_IN_HOUR = 60;
      var TOTAL_MINUTES_IN_DAY = 1440;
      var date = new Date(Date.now());
      var numberOfMinutesPassedInHour = date.getMinutes();
      var numberOfHoursPassed = date.getHours();
      var numberOfMinutePassed = (numberOfHoursPassed * 60) + numberOfMinutesPassedInHour; 
      var percentOfDayPast = numberOfMinutePassed / TOTAL_MINUTES_IN_DAY ;
      return percentOfDayPast;
    }

    Meteor.setInterval(function (){
      console.log('ticker', ticker());
      Session.set('time', ticker());
    },5000);

  });

     
  Template.hello.helpers({

    clockTimer: function (){
      var time = Session.get('time');
      console.log('time', time);
      return Session.get('time'); 
    }

  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
