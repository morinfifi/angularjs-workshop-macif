// import pour effet de bord
import 'babel-polyfill';
import angular from 'angular';
import home from './components/home/Home';

angular.module('wine', [home.name]);
angular.element(document).ready(() => {
  // strictDi = pas d'injection implicite
  angular.bootstrap(document, ['wine'], { strictDi: true });
});
