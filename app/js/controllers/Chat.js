'use strict';

function ChatCtrl($scope, syncData) {
	$scope.newMessage = null;

	// constrain number of messages by limit into syncData
	// add the array into $scope.messages
	$scope.messages = syncData('messages', 10);

	// add new messages to the list
	$scope.addMessage = function() {
		if( $scope.newMessage ) {
			$scope.messages.$add({text: $scope.newMessage});
			$scope.newMessage = null;
		}
	};
}
