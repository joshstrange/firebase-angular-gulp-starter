'use strict';

function AccountCtrl($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL) {
	$scope.syncAccount = function() {
		$scope.user = {};
		syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
			$scope.unBindAccount = unBind;
		});
	};
	// set initial binding
	$scope.syncAccount();

	$scope.logout = function() {
		loginService.logout();
	};

	$scope.oldpass = null;
	$scope.newpass = null;
	$scope.confirm = null;

	$scope.reset = function() {
		$scope.err = null;
		$scope.msg = null;
		$scope.emailerr = null;
		$scope.emailmsg = null;
	};

	$scope.updatePassword = function() {
		$scope.reset();
		loginService.changePassword(buildPwdParms());
	};

	$scope.updateEmail = function() {
		$scope.reset();
		// disable bind to prevent junk data being left in firebase
		$scope.unBindAccount();
		changeEmailService(buildEmailParms());
	};

	function buildPwdParms() {
		return {
			email: $scope.auth.user.email,
			oldpass: $scope.oldpass,
			newpass: $scope.newpass,
			confirm: $scope.confirm,
			callback: function(err) {
				if( err ) {
					$scope.err = err;
				}
				else {
					$scope.oldpass = null;
					$scope.newpass = null;
					$scope.confirm = null;
					$scope.msg = 'Password updated!';
				}
			}
		};
	}
	function buildEmailParms() {
		return {
			newEmail: $scope.newemail,
			pass: $scope.pass,
			callback: function(err) {
				if( err ) {
					$scope.emailerr = err;
					// reinstate binding
					$scope.syncAccount();
				}
				else {
					// reinstate binding
					$scope.syncAccount();
					$scope.newemail = null;
					$scope.pass = null;
					$scope.emailmsg = 'Email updated!';
				}
			}
		};
	}

}