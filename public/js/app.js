
angular.module('app.service', []);
angular.module('app.controller', ['app.service'])
angular.module('app.directive', ['app.service'])
angular.module('app.filter', ['app.service'])


angular.module('app', [
  'app.service',
  'app.controller',
  'app.directive',
  'app.filter',
  'ui.router',
  'ui.bootstrap'
])