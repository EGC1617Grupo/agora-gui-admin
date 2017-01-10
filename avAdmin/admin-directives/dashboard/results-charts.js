angular.module('avAdmin')
  .directive('resultsCharts', function (AddDotsToIntService, PercentVotesService, $i18next) {
    function resultsChartsController($scope) {
      $scope.vm = { q: $scope.question };
      var vm = $scope.vm;
      vm.participationOptions = {
        chart: {
          type: 'pieChart',
          height: 300,
          width: 300,
          x: function (d) { return d.key; },
          y: function (d) { return d.y; },
          showLabels: false,
          duration: 500,
          labelThreshold: 0.01,
          legend: {
            margin: {
              top: 5,
              right: 35,
              bottom: 5,
              left: 0
            }
          }
        }
      };
      vm.answerOptions = {
        chart: {
          type: 'pieChart',
          height: 300,
          width: 300,
          donut: true,
          x: function (d) { return d.key; },
          y: function (d) { return d.y; },
          showLabels: false,
          pie: {
            startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2; },
            endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2; }
          },
          duration: 500,
          legend: {
            margin: {
              top: 25,
              right: 70,
              bottom: 5,
              left: 0
            }
          }
        }
      };
      var participationoptionvotes = $i18next('avAdmin.dashboard.optionvotes');
      var participationBlankVotes = $i18next('avAdmin.dashboard.blankvotes');
      var participationNullVotes  = $i18next('avAdmin.dashboard.nullvotes');

      vm.answerData = vm.q.answers.map(function(answer){
        var perc = PercentVotesService(answer.total_count, vm.q);
        return {key: answer.text, y:perc.substring(0, perc.length - 1)};
      });
      vm.participationData = [
        {key: participationoptionvotes, y: AddDotsToIntService(vm.q.totals.valid_votes)},
        {key: participationBlankVotes,  y: AddDotsToIntService(vm.q.totals.blank_votes)},
        {key: participationNullVotes,   y: AddDotsToIntService(vm.q.totals.null_votes)}
      ];
    }
    return {
      restrict: 'E',
      link: resultsChartsController,
      templateUrl: 'avAdmin/admin-directives/dashboard/results-charts.html',
      scope: {
        question: '='
      }
    };
  });
