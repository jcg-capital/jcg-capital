/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters

var filters = {

  myFilter: function () {
    // do something
    this.next()
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      alert('Please Log In First.')
      this.stop();
    }
  }

}

Router.onBeforeAction(filters.myFilter, {only: ['algorithms']});

// Routes

Router.map(function() {
  //****************************************//
  // Algorithms
  //****************************************//

  this.route('algorithms', {
    waitOn: function () {
      return Meteor.subscribe('allAlgorithms');
    },
    data: function () {
      return {
        algorithms: Algorithms.find()
      };
    }
  });

  this.route('algorithm', {
    path: '/algorithms/:_id',
    waitOn: function () {
      return Meteor.subscribe('singleAlgorithm', this.params._id);
    },
    data: function () {
      return {
        algorithm: Algorithms.findOne(this.params._id)
      };
    }
  });
  //****************************************//
  // Quandl
  //****************************************//
  this.route('server', {
    data: function() {
      return {
        query: HTTP.post('server',{'hoodee':'hoo'})
      }
    }
  })

  //****************************************//
  // Pages
  //****************************************//

  this.route('landingPage', {
    path: '/'
  });

  this.route('siteMap', {
    path: 'siteMap'
  });

  this.route('content');

  this.route('charts');
  this.route('textEditor');
  this.route('buttonRow');
  this.route('modalTrigger');
  this.route('brand');
  this.route('quandlJcg')
  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

});
