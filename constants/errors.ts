export type IERROR = {
	[key: string]: { title: string; message: string };
};

const ERRORS: IERROR = {
	ADMIN_ONLY_OPERATION: {
		title: "admin-restricted-operation",
		message: "This operation is restricted to administrators only.",
	},
	ARGUMENT_ERROR: {
		title: "argument-error",
		message: "",
	},
	APP_NOT_AUTHORIZED: {
		title: "app-not-authorized",
		message:
			"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
	},
	APP_NOT_INSTALLED: {
		title: "app-not-installed",
		message:
			"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
	},
	CAPTCHA_CHECK_FAILED: {
		title: "captcha-check-failed",
		message:
			"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
	},
	CODE_EXPIRED: {
		title: "code-expired",
		message:
			"The SMS code has expired. Please re-send the verification code to try again.",
	},
	CORDOVA_NOT_READY: {
		title: "cordova-not-ready",
		message: "Cordova framework is not ready.",
	},
	CORS_UNSUPPORTED: {
		title: "cors-unsupported",
		message: "This browser is not supported.",
	},
	CREDENTIAL_ALREADY_IN_USE: {
		title: "credential-already-in-use",
		message:
			"This credential is already associated with a different user account.",
	},
	CREDENTIAL_MISMATCH: {
		title: "custom-token-mismatch",
		message: "The custom token corresponds to a different audience.",
	},
	CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
		title: "requires-recent-login",
		message:
			"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
	},
	DYNAMIC_LINK_NOT_ACTIVATED: {
		title: "dynamic-link-not-activated",
		message:
			"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
	},
	EMAIL_CHANGE_NEEDS_VERIFICATION: {
		title: "email-change-needs-verification",
		message: "Multi-factor users must always have a verified email.",
	},
	EMAIL_EXISTS: {
		title: "email-already-in-use",
		message: "The email address is already in use by another account.",
	},
	EMAIL_NOT_FOUND: {
		title: "email-not-found",
		message: "Enter a valid email or create an account.",
	},
	EMULATOR_CONFIG_FAILED: {
		title: "emulator-config-failed",
		message:
			'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "useEmulator()" sooner.',
	},
	EXPIRED_OOB_CODE: {
		title: "expired-action-code",
		message: "The action code has expired.",
	},
	EXPIRED_POPUP_REQUEST: {
		title: "cancelled-popup-request",
		message:
			"This operation has been cancelled due to another conflicting popup being opened.",
	},
	INTERNAL_ERROR: {
		title: "internal-error",
		message: "An internal AuthError has occurred.",
	},
	INVALID_API_KEY: {
		title: "invalid-api-key",
		message:
			"Your API key is invalid, please check you have copied it correctly.",
	},
	INVALID_APP_CREDENTIAL: {
		title: "invalid-app-credential",
		message:
			"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
	},
	INVALID_APP_ID: {
		title: "invalid-app-id",
		message:
			"The mobile app identifier is not registed for the current project.",
	},
	INVALID_AUTH: {
		title: "invalid-user-token",
		message:
			"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
	},
	INVALID_AUTH_EVENT: {
		title: "invalid-auth-event",
		message: "An internal AuthError has occurred.",
	},
	INVALID_CERT_HASH: {
		title: "invalid-cert-hash",
		message: "The SHA-1 certificate hash provided is invalid.",
	},
	INVALID_CODE: {
		title: "invalid-verification-code",
		message:
			"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
	},
	INVALID_CONTINUE_URI: {
		title: "invalid-continue-uri",
		message: "The continue URL provided in the request is invalid.",
	},
	INVALID_CORDOVA_CONFIGURATION: {
		title: "invalid-cordova-configuration",
		message:
			"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
	},
	INVALID_CUSTOM_TOKEN: {
		title: "invalid-custom-token",
		message:
			"The custom token format is incorrect. Please check the documentation.",
	},
	INVALID_DYNAMIC_LINK_DOMAIN: {
		title: "invalid-dynamic-link-domain",
		message:
			"The provided dynamic link domain is not configured or authorized for the current project.",
	},
	INVALID_EMAIL: {
		title: "invalid-email",
		message: "The email address is badly formatted.",
	},
	INVALID_IDP_RESPONSE: {
		title: "invalid-credential",
		message: "The supplied auth credential is malformed or has expired.",
	},
	INVALID_MESSAGE_PAYLOAD: {
		title: "invalid-message-payload",
		message:
			"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
	},
	INVALID_MFA_SESSION: {
		title: "invalid-multi-factor-session",
		message:
			"The request does not contain a valid proof of first factor successful sign-in.",
	},
	INVALID_OAUTH_CLIENT_ID: {
		title: "invalid-oauth-client-id",
		message:
			"The OAuth client ID provided is either invalid or does not match the specified API key.",
	},
	INVALID_OAUTH_PROVIDER: {
		title: "invalid-oauth-provider",
		message:
			"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
	},
	INVALID_OOB_CODE: {
		title: "invalid-action-code",
		message:
			"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
	},
	INVALID_ORIGIN: {
		title: "unauthorized-domain",
		message:
			"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
	},
	INVALID_PASSWORD: {
		title: "wrong-password",
		message:
			"The password is invalid or the user does not have a password.",
	},
	INVALID_PERSISTENCE: {
		title: "invalid-persistence-type",
		message:
			"The specified persistence type is invalid. It can only be local, session or none.",
	},
	INVALID_PHONE_NUMBER: {
		title: "invalid-phone-number",
		message:
			"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
	},
	INVALID_PROVIDER_ID: {
		title: "invalid-provider-id",
		message: "The specified provider ID is invalid.",
	},
	INVALID_RECIPIENT_EMAIL: {
		title: "invalid-recipient-email",
		message:
			"The email corresponding to this action failed to send as the provided recipient email address is invalid.",
	},
	INVALID_SENDER: {
		title: "invalid-sender",
		message:
			"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
	},
	INVALID_SESSION_INFO: {
		title: "invalid-verification-id",
		message:
			"The verification ID used to create the phone auth credential is invalid.",
	},
	INVALID_TENANT_ID: {
		title: "invalid-tenant-id",
		message: "The Auth instance's tenant ID is invalid.",
	},
	MFA_INFO_NOT_FOUND: {
		title: "multi-factor-info-not-found",
		message:
			"The user does not have a second factor matching the identifier provided.",
	},
	MFA_REQUIRED: {
		title: "multi-factor-auth-required",
		message:
			"Proof of ownership of a second factor is required to complete sign-in.",
	},
	MISSING_ANDROID_PACKAGE_NAME: {
		title: "missing-android-pkg-name",
		message:
			"An Android Package Name must be provided if the Android App is required to be installed.",
	},
	MISSING_APP_CREDENTIAL: {
		title: "missing-app-credential",
		message:
			"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
	},
	MISSING_AUTH_DOMAIN: {
		title: "auth-domain-config-required",
		message:
			"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
	},
	MISSING_CODE: {
		title: "missing-verification-code",
		message:
			"The phone auth credential was created with an empty SMS verification code.",
	},
	MISSING_PASSWORD: {
		title: "password-is-missing",
		message: "Please enter a password.",
	},
	MISSING_CONTINUE_URI: {
		title: "missing-continue-uri",
		message: "A continue URL must be provided in the request.",
	},
	MISSING_IFRAME_START: {
		title: "missing-iframe-start",
		message: "An internal AuthError has occurred.",
	},
	MISSING_IOS_BUNDLE_ID: {
		title: "missing-ios-bundle-id",
		message:
			"An iOS Bundle ID must be provided if an App Store ID is provided.",
	},
	MISSING_OR_INVALID_NONCE: {
		title: "missing-or-invalid-nonce",
		message:
			"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
	},
	MISSING_MFA_INFO: {
		title: "missing-multi-factor-info",
		message: "No second factor identifier is provided.",
	},
	MISSING_MFA_SESSION: {
		title: "missing-multi-factor-session",
		message:
			"The request is missing proof of first factor successful sign-in.",
	},
	MISSING_PHONE_NUMBER: {
		title: "missing-phone-number",
		message:
			"To send verification codes, provide a phone number for the recipient.",
	},
	MISSING_SESSION_INFO: {
		title: "missing-verification-id",
		message:
			"The phone auth credential was created with an empty verification ID.",
	},
	MODULE_DESTROYED: {
		title: "app-deleted",
		message: "This instance of FirebaseApp has been deleted.",
	},
	NEED_CONFIRMATION: {
		title: "account-exists-with-different-credential",
		message:
			"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
	},
	NETWORK_REQUEST_FAILED: {
		title: "network-request-failed",
		message:
			"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",
	},
	NULL_USER: {
		title: "null-user",
		message:
			"A null user object was provided as the argument for an operation which requires a non-null user object.",
	},
	NO_AUTH_EVENT: {
		title: "no-auth-event",
		message: "An internal AuthError has occurred.",
	},
	NO_SUCH_PROVIDER: {
		title: "no-such-provider",
		message: "User was not linked to an account with the given provider.",
	},
	OPERATION_NOT_ALLOWED: {
		title: "operation-not-allowed",
		message:
			"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
	},
	OPERATION_NOT_SUPPORTED: {
		title: "operation-not-supported-in-this-environment",
		message:
			'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
	},
	POPUP_BLOCKED: {
		title: "popup-blocked",
		message:
			"Unable to establish a connection with the popup. It may have been blocked by the browser.",
	},
	POPUP_CLOSED_BY_USER: {
		title: "popup-closed-by-user",
		message:
			"The popup has been closed by the user before finalizing the operation.",
	},
	PROVIDER_ALREADY_LINKED: {
		title: "provider-already-linked",
		message:
			"User can only be linked to one identity for the given provider.",
	},
	QUOTA_EXCEEDED: {
		title: "quota-exceeded",
		message: "The project's quota for this operation has been exceeded.",
	},
	REDIRECT_CANCELLED_BY_USER: {
		title: "redirect-cancelled-by-user",
		message:
			"The redirect operation has been cancelled by the user before finalizing.",
	},
	REDIRECT_OPERATION_PENDING: {
		title: "redirect-operation-pending",
		message: "A redirect sign-in operation is already pending.",
	},
	REJECTED_CREDENTIAL: {
		title: "rejected-credential",
		message: "The request contains malformed or mismatching credentials.",
	},
	SECOND_FACTOR_ALREADY_ENROLLED: {
		title: "second-factor-already-in-use",
		message: "The second factor is already enrolled on this account.",
	},
	SECOND_FACTOR_LIMIT_EXCEEDED: {
		title: "maximum-second-factor-count-exceeded",
		message:
			"The maximum allowed number of second factors on a user has been exceeded.",
	},
	TENANT_ID_MISMATCH: {
		title: "tenant-id-mismatch",
		message:
			"The provided tenant ID does not match the Auth instance's tenant ID",
	},
	TIMEOUT: {
		title: "timeout",
		message: "The operation has timed out.",
	},
	TOKEN_EXPIRED: {
		title: "user-token-expired",
		message:
			"The user's credential is no longer valid. The user must sign in again.",
	},
	TOO_MANY_ATTEMPTS_TRY_LATER: {
		title: "too-many-requests",
		message:
			"We have blocked all requests from this device due to unusual activity. Try again later.",
	},
	UNAUTHORIZED_DOMAIN: {
		title: "unauthorized-continue-uri",
		message:
			"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
	},
	UNSUPPORTED_FIRST_FACTOR: {
		title: "unsupported-first-factor",
		message:
			"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
	},
	UNSUPPORTED_PERSISTENCE: {
		title: "unsupported-persistence-type",
		message:
			"The current environment does not support the specified persistence type.",
	},
	UNSUPPORTED_TENANT_OPERATION: {
		title: "unsupported-tenant-operation",
		message: "This operation is not supported in a multi-tenant context.",
	},
	UNVERIFIED_EMAIL: {
		title: "unverified-email",
		message: "The operation requires a verified email.",
	},
	USER_CANCELLED: {
		title: "user-cancelled",
		message:
			"The user did not grant your application the permissions it requested.",
	},
	USER_DELETED: {
		title: "user-not-found",
		message:
			"There is no user record corresponding to this identifier. The user may have been deleted.",
	},
	USER_DISABLED: {
		title: "user-disabled",
		message: "The user account has been disabled by an administrator.",
	},
	USER_MISMATCH: {
		title: "user-mismatch",
		message:
			"The supplied credentials do not correspond to the previously signed in user.",
	},
	USER_SIGNED_OUT: {
		title: "user-signed-out",
		message: "",
	},
	WEAK_PASSWORD: {
		title: "weak-password",
		message: "The password must be 6 characters long or more.",
	},
	WEB_STORAGE_UNSUPPORTED: {
		title: "web-storage-unsupported",
		message:
			"This browser is not supported or 3rd party cookies and data may be disabled.",
	},
};

export default ERRORS;
