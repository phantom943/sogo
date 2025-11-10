
(function() {
  'use strict';

  angular
    .module('SOGo.SchedulerUI')
    .factory('sgSettings', sgSettings);

  sgSettings.$inject = ['Preferences'];

  function sgSettings(Preferences) {
    var settings = Preferences.get('scheduler');

    return {
      SOGoCalendarDisplayMultiDayEventsAsSingleBox: function() {
        return settings.SOGoCalendarDisplayMultiDayEventsAsSingleBox === 'YES';
      }
    };
  }
})();
