/* -*- Mode: javascript; indent-tabs-mode: nil; c-basic-offset: 2 -*- */

(function() {
  'use strict';

  angular
    .module('SOGo.SchedulerUI')
    .directive('sgCalendarMonthEvent', sgCalendarMonthEvent);

  sgCalendarMonthEvent.$inject = ['$filter', 'Calendar', 'Component', 'Preferences', 'sgSettings'];

  function sgCalendarMonthEvent($filter, Calendar, Component, Preferences, sgSettings) {
    // Controller
    function CalendarMonthEventController($scope) {
      var vm = this;
      var shell = Preferences.get('shell');

      vm.showEventActions = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.onShowActions({
          $event: $event,
          $component: vm.component,
          $shell: shell
        });
      };
    }

    // Link function
    function link(scope, iElement, iAttrs, vm) {
      if (vm.component) {
        vm.isEvent = vm.component.isEvent;
        vm.isTask = vm.component.isTask;
        vm.isMultiday = vm.component.isMultiday;
        vm.showCalendarName = Calendar.activeUser.login !== vm.component.c_owner;
        vm.displayAsSingleBox = sgSettings.SOGoCalendarDisplayMultiDayEventsAsSingleBox();

        // Add class for user's participation state
        if (vm.userState)
          iElement.addClass('sg-event--' + vm.userState);

        // Set background color
        iElement.addClass('bg-folder' + vm.component.pid);
        iElement.addClass('contrast-bdr-folder' + vm.component.pid);
        iElement.addClass('contrast-bg-folder' + vm.component.pid);

        // Add class for transparency
        if (vm.component.c_isopaque === 0)
          iElement.addClass('sg-event--transparent');

        // Add class for cancelled event
        if (vm.component.c_status === 0)
          iElement.addClass('sg-event--cancelled');
      }
    }

    return {
      restrict: 'E',
      replace: true,
      scope: {
        component: '=sgComponent',
        userState: '@sgUserState',
        onShowActions: '&sgShowActions'
      },
      controller: CalendarMonthEventController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'UI/Templates/Scheduler/sgCalendarMonthEvent.html',
      link: link
    };
  }
})();
