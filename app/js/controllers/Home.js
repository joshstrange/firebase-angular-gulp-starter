'use strict';

function HomeCtrl($scope, syncData) {
	syncData('syncedValue').$bind($scope, 'syncedValue');
}