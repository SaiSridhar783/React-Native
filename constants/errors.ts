export const ERRORS_MAP: any = {
	ADMIN_ONLY_OPERATION: "admin-restricted-operation",
	ARGUMENT_ERROR: "argument-error",
	APP_NOT_AUTHORIZED: "app-not-authorized",
	APP_NOT_INSTALLED: "app-not-installed",
	CAPTCHA_CHECK_FAILED: "captcha-check-failed",
	CODE_EXPIRED: "code-expired",
	CORDOVA_NOT_READY: "cordova-not-ready",
	CORS_UNSUPPORTED: "cors-unsupported",
	CREDENTIAL_ALREADY_IN_USE: "credential-already-in-use",
	CREDENTIAL_MISMATCH: "custom-token-mismatch",
	CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
	DYNAMIC_LINK_NOT_ACTIVATED: "dynamic-link-not-activated",
	EMAIL_CHANGE_NEEDS_VERIFICATION: "email-change-needs-verification",
	EMAIL_EXISTS: "email-already-in-use",
	EMAIL_NOT_FOUND: "email-not-found",
	EMULATOR_CONFIG_FAILED: "emulator-config-failed",
	EXPIRED_OOB_CODE: "expired-action-code",
	EXPIRED_POPUP_REQUEST: "cancelled-popup-request",
	INTERNAL_ERROR: "internal-error",
	INVALID_API_KEY: "invalid-api-key",
	INVALID_APP_CREDENTIAL: "invalid-app-credential",
	INVALID_APP_ID: "invalid-app-id",
	INVALID_AUTH: "invalid-user-token",
	INVALID_AUTH_EVENT: "invalid-auth-event",
	INVALID_CERT_HASH: "invalid-cert-hash",
	INVALID_CODE: "invalid-verification-code",
	INVALID_CONTINUE_URI: "invalid-continue-uri",
	INVALID_CORDOVA_CONFIGURATION: "invalid-cordova-configuration",
	INVALID_CUSTOM_TOKEN: "invalid-custom-token",
	INVALID_DYNAMIC_LINK_DOMAIN: "invalid-dynamic-link-domain",
	INVALID_EMAIL: "invalid-email",
	INVALID_IDP_RESPONSE: "invalid-credential",
	INVALID_MESSAGE_PAYLOAD: "invalid-message-payload",
	INVALID_MFA_SESSION: "invalid-multi-factor-session",
	INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
	INVALID_OAUTH_PROVIDER: "invalid-oauth-provider",
	INVALID_OOB_CODE: "invalid-action-code",
	INVALID_ORIGIN: "unauthorized-domain",
	INVALID_PASSWORD: "wrong-password",
	INVALID_PERSISTENCE: "invalid-persistence-type",
	INVALID_PHONE_NUMBER: "invalid-phone-number",
	INVALID_PROVIDER_ID: "invalid-provider-id",
	INVALID_RECIPIENT_EMAIL: "invalid-recipient-email",
	INVALID_SENDER: "invalid-sender",
	INVALID_SESSION_INFO: "invalid-verification-id",
	INVALID_TENANT_ID: "invalid-tenant-id",
	MFA_INFO_NOT_FOUND: "multi-factor-info-not-found",
	MFA_REQUIRED: "multi-factor-auth-required",
	MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
	MISSING_APP_CREDENTIAL: "missing-app-credential",
	MISSING_AUTH_DOMAIN: "auth-domain-config-required",
	MISSING_CODE: "missing-verification-code",
	MISSING_PASSWORD: "password-is-missing",
	MISSING_CONTINUE_URI: "missing-continue-uri",
	MISSING_IFRAME_START: "missing-iframe-start",
	MISSING_IOS_BUNDLE_ID: "missing-ios-bundle-id",
	MISSING_OR_INVALID_NONCE: "missing-or-invalid-nonce",
	MISSING_MFA_INFO: "missing-multi-factor-info",
	MISSING_MFA_SESSION: "missing-multi-factor-session",
	MISSING_PHONE_NUMBER: "missing-phone-number",
	MISSING_SESSION_INFO: "missing-verification-id",
	MODULE_DESTROYED: "app-deleted",
	NEED_CONFIRMATION: "account-exists-with-different-credential",
	NETWORK_REQUEST_FAILED: "network-request-failed",
	NULL_USER: "null-user",
	NO_AUTH_EVENT: "no-auth-event",
	NO_SUCH_PROVIDER: "no-such-provider",
	OPERATION_NOT_ALLOWED: "operation-not-allowed",
	OPERATION_NOT_SUPPORTED: "operation-not-supported-in-this-environment",
	POPUP_BLOCKED: "popup-blocked",
	POPUP_CLOSED_BY_USER: "popup-closed-by-user",
	PROVIDER_ALREADY_LINKED: "provider-already-linked",
	QUOTA_EXCEEDED: "quota-exceeded",
	REDIRECT_CANCELLED_BY_USER: "redirect-cancelled-by-user",
	REDIRECT_OPERATION_PENDING: "redirect-operation-pending",
	REJECTED_CREDENTIAL: "rejected-credential",
	SECOND_FACTOR_ALREADY_ENROLLED: "second-factor-already-in-use",
	SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
	TENANT_ID_MISMATCH: "tenant-id-mismatch",
	TIMEOUT: "timeout",
	TOKEN_EXPIRED: "user-token-expired",
	TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
	UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
	UNSUPPORTED_FIRST_FACTOR: "unsupported-first-factor",
	UNSUPPORTED_PERSISTENCE: "unsupported-persistence-type",
	UNSUPPORTED_TENANT_OPERATION: "unsupported-tenant-operation",
	UNVERIFIED_EMAIL: "unverified-email",
	USER_CANCELLED: "user-cancelled",
	USER_DELETED: "user-not-found",
	USER_DISABLED: "user-disabled",
	USER_MISMATCH: "user-mismatch",
	USER_SIGNED_OUT: "user-signed-out",
	WEAK_PASSWORD: "weak-password",
	WEB_STORAGE_UNSUPPORTED: "web-storage-unsupported",
};

export const ERRORS = {
	[ERRORS_MAP.ADMIN_ONLY_OPERATION]:
		"This operation is restricted to administrators only.",
	[ERRORS_MAP.ARGUMENT_ERROR]: "",
	[ERRORS_MAP.APP_NOT_AUTHORIZED]:
		"This app, identified by the domain where it's hosted, is not " +
		"authorized to use Firebase Authentication with the provided API key. " +
		"Review your key configuration in the Google API console.",
	[ERRORS_MAP.APP_NOT_INSTALLED]:
		"The requested mobile application corresponding to the identifier (" +
		"Android package name or iOS bundle ID) provided is not installed on " +
		"this device.",
	[ERRORS_MAP.CAPTCHA_CHECK_FAILED]:
		"The reCAPTCHA response token provided is either invalid, expired, " +
		"already used or the domain associated with it does not match the list " +
		"of whitelisted domains.",
	[ERRORS_MAP.CODE_EXPIRED]:
		"The SMS code has expired. Please re-send the verification code to try " +
		"again.",
	[ERRORS_MAP.CORDOVA_NOT_READY]: "Cordova framework is not ready.",
	[ERRORS_MAP.CORS_UNSUPPORTED]: "This browser is not supported.",
	[ERRORS_MAP.CREDENTIAL_ALREADY_IN_USE]:
		"This credential is already associated with a different user account.",
	[ERRORS_MAP.CREDENTIAL_MISMATCH]:
		"The custom token corresponds to a different audience.",
	[ERRORS_MAP.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]:
		"This operation is sensitive and requires recent authentication. Log in " +
		"again before retrying this request.",
	[ERRORS_MAP.DYNAMIC_LINK_NOT_ACTIVATED]:
		"Please activate Dynamic Links in the Firebase Console and agree to the terms and " +
		"conditions.",
	[ERRORS_MAP.EMAIL_CHANGE_NEEDS_VERIFICATION]:
		"Multi-factor users must always have a verified email.",
	[ERRORS_MAP.EMAIL_EXISTS]:
		"The email address is already in use by another account.",
	[ERRORS_MAP.EMAIL_NOT_FOUND]: "Enter a valid email or create an account.",
	[ERRORS_MAP.EMULATOR_CONFIG_FAILED]:
		"Auth instance has already been used to make a network call. Auth can " +
		"no longer be configured to use the emulator. Try calling " +
		'"useEmulator()" sooner.',
	[ERRORS_MAP.EXPIRED_OOB_CODE]: "The action code has expired.",
	[ERRORS_MAP.EXPIRED_POPUP_REQUEST]:
		"This operation has been cancelled due to another conflicting popup being opened.",
	[ERRORS_MAP.INTERNAL_ERROR]: "An internal AuthError has occurred.",
	[ERRORS_MAP.INVALID_APP_CREDENTIAL]:
		"The phone verification request contains an invalid application verifier." +
		" The reCAPTCHA token response is either invalid or expired.",
	[ERRORS_MAP.INVALID_APP_ID]:
		"The mobile app identifier is not registed for the current project.",
	[ERRORS_MAP.INVALID_AUTH]:
		"This user's credential isn't valid for this project. This can happen " +
		"if the user's token has been tampered with, or if the user isn't for " +
		"the project associated with this API key.",
	[ERRORS_MAP.INVALID_AUTH_EVENT]: "An internal AuthError has occurred.",
	[ERRORS_MAP.INVALID_CODE]:
		"The SMS verification code used to create the phone auth credential is " +
		"invalid. Please resend the verification code sms and be sure use the " +
		"verification code provided by the user.",
	[ERRORS_MAP.INVALID_CONTINUE_URI]:
		"The continue URL provided in the request is invalid.",
	[ERRORS_MAP.INVALID_CORDOVA_CONFIGURATION]:
		"The following Cordova plugins must be installed to enable OAuth sign-in: " +
		"cordova-plugin-buildinfo, cordova-universal-links-plugin, " +
		"cordova-plugin-browsertab, cordova-plugin-inappbrowser and " +
		"cordova-plugin-customurlscheme.",
	[ERRORS_MAP.INVALID_CUSTOM_TOKEN]:
		"The custom token format is incorrect. Please check the documentation.",
	[ERRORS_MAP.INVALID_DYNAMIC_LINK_DOMAIN]:
		"The provided dynamic link domain is not configured or authorized for the current project.",
	[ERRORS_MAP.INVALID_EMAIL]: "The email address is badly formatted.",
	[ERRORS_MAP.INVALID_API_KEY]:
		"Your API key is invalid, please check you have copied it correctly.",
	[ERRORS_MAP.INVALID_CERT_HASH]:
		"The SHA-1 certificate hash provided is invalid.",
	[ERRORS_MAP.INVALID_IDP_RESPONSE]:
		"The supplied auth credential is malformed or has expired.",
	[ERRORS_MAP.INVALID_MESSAGE_PAYLOAD]:
		"The email template corresponding to this action contains invalid characters in its message. " +
		"Please fix by going to the Auth email templates section in the Firebase Console.",
	[ERRORS_MAP.INVALID_MFA_SESSION]:
		"The request does not contain a valid proof of first factor successful sign-in.",
	[ERRORS_MAP.INVALID_OAUTH_PROVIDER]:
		"EmailAuthProvider is not supported for this operation. This operation " +
		"only supports OAuth providers.",
	[ERRORS_MAP.INVALID_OAUTH_CLIENT_ID]:
		"The OAuth client ID provided is either invalid or does not match the " +
		"specified API key.",
	[ERRORS_MAP.INVALID_ORIGIN]:
		"This domain is not authorized for OAuth operations for your Firebase " +
		"project. Edit the list of authorized domains from the Firebase console.",
	[ERRORS_MAP.INVALID_OOB_CODE]:
		"The action code is invalid. This can happen if the code is malformed, " +
		"expired, or has already been used.",
	[ERRORS_MAP.INVALID_PASSWORD]:
		"The password is invalid or the user does not have a password.",
	[ERRORS_MAP.INVALID_PERSISTENCE]:
		"The specified persistence type is invalid. It can only be local, session or none.",
	[ERRORS_MAP.INVALID_PHONE_NUMBER]:
		"The format of the phone number provided is incorrect. Please enter the " +
		"phone number in a format that can be parsed into E.164 format. E.164 " +
		"phone numbers are written in the format [+][country code][subscriber " +
		"number including area code].",
	[ERRORS_MAP.INVALID_PROVIDER_ID]: "The specified provider ID is invalid.",
	[ERRORS_MAP.INVALID_RECIPIENT_EMAIL]:
		"The email corresponding to this action failed to send as the provided " +
		"recipient email address is invalid.",
	[ERRORS_MAP.INVALID_SENDER]:
		"The email template corresponding to this action contains an invalid sender email or name. " +
		"Please fix by going to the Auth email templates section in the Firebase Console.",
	[ERRORS_MAP.INVALID_SESSION_INFO]:
		"The verification ID used to create the phone auth credential is invalid.",
	[ERRORS_MAP.INVALID_TENANT_ID]: "The Auth instance's tenant ID is invalid.",
	[ERRORS_MAP.MISSING_ANDROID_PACKAGE_NAME]:
		"An Android Package Name must be provided if the Android App is required to be installed.",
	[ERRORS_MAP.MISSING_AUTH_DOMAIN]:
		"Be sure to include authDomain when calling firebase.initializeApp(), " +
		"by following the instructions in the Firebase console.",
	[ERRORS_MAP.MISSING_APP_CREDENTIAL]:
		"The phone verification request is missing an application verifier " +
		"assertion. A reCAPTCHA response token needs to be provided.",
	[ERRORS_MAP.MISSING_CODE]:
		"The phone auth credential was created with an empty SMS verification code.",
	[ERRORS_MAP.MISSING_PASSWORD]: "Please enter a password.",
	[ERRORS_MAP.MISSING_CONTINUE_URI]:
		"A continue URL must be provided in the request.",
	[ERRORS_MAP.MISSING_IFRAME_START]: "An internal AuthError has occurred.",
	[ERRORS_MAP.MISSING_IOS_BUNDLE_ID]:
		"An iOS Bundle ID must be provided if an App Store ID is provided.",
	[ERRORS_MAP.MISSING_OR_INVALID_NONCE]:
		"The request does not contain a valid nonce. This can occur if the " +
		"SHA-256 hash of the provided raw nonce does not match the hashed nonce " +
		"in the ID token payload.",
	[ERRORS_MAP.MISSING_MFA_INFO]: "No second factor identifier is provided.",
	[ERRORS_MAP.MISSING_MFA_SESSION]:
		"The request is missing proof of first factor successful sign-in.",
	[ERRORS_MAP.MISSING_PHONE_NUMBER]:
		"To send verification codes, provide a phone number for the recipient.",
	[ERRORS_MAP.MISSING_SESSION_INFO]:
		"The phone auth credential was created with an empty verification ID.",
	[ERRORS_MAP.MODULE_DESTROYED]:
		"This instance of FirebaseApp has been deleted.",
	[ERRORS_MAP.MFA_INFO_NOT_FOUND]:
		"The user does not have a second factor matching the identifier provided.",
	[ERRORS_MAP.MFA_REQUIRED]:
		"Proof of ownership of a second factor is required to complete sign-in.",
	[ERRORS_MAP.NEED_CONFIRMATION]:
		"An account already exists with the same email address but different " +
		"sign-in credentials. Sign in using a provider associated with this " +
		"email address.",
	[ERRORS_MAP.NETWORK_REQUEST_FAILED]:
		"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",
	[ERRORS_MAP.NO_AUTH_EVENT]: "An internal AuthError has occurred.",
	[ERRORS_MAP.NO_SUCH_PROVIDER]:
		"User was not linked to an account with the given provider.",
	[ERRORS_MAP.NULL_USER]:
		"A null user object was provided as the argument for an operation which " +
		"requires a non-null user object.",
	[ERRORS_MAP.OPERATION_NOT_ALLOWED]:
		"The given sign-in provider is disabled for this Firebase project. " +
		"Enable it in the Firebase console, under the sign-in method tab of the " +
		"Auth section.",
	[ERRORS_MAP.OPERATION_NOT_SUPPORTED]:
		"This operation is not supported in the environment this application is " +
		'running on. "location.protocol" must be http, https or chrome-extension' +
		" and web storage must be enabled.",
	[ERRORS_MAP.POPUP_BLOCKED]:
		"Unable to establish a connection with the popup. It may have been blocked by the browser.",
	[ERRORS_MAP.POPUP_CLOSED_BY_USER]:
		"The popup has been closed by the user before finalizing the operation.",
	[ERRORS_MAP.PROVIDER_ALREADY_LINKED]:
		"User can only be linked to one identity for the given provider.",
	[ERRORS_MAP.QUOTA_EXCEEDED]:
		"The project's quota for this operation has been exceeded.",
	[ERRORS_MAP.REDIRECT_CANCELLED_BY_USER]:
		"The redirect operation has been cancelled by the user before finalizing.",
	[ERRORS_MAP.REDIRECT_OPERATION_PENDING]:
		"A redirect sign-in operation is already pending.",
	[ERRORS_MAP.REJECTED_CREDENTIAL]:
		"The request contains malformed or mismatching credentials.",
	[ERRORS_MAP.SECOND_FACTOR_ALREADY_ENROLLED]:
		"The second factor is already enrolled on this account.",
	[ERRORS_MAP.SECOND_FACTOR_LIMIT_EXCEEDED]:
		"The maximum allowed number of second factors on a user has been exceeded.",
	[ERRORS_MAP.TENANT_ID_MISMATCH]:
		"The provided tenant ID does not match the Auth instance's tenant ID",
	[ERRORS_MAP.TIMEOUT]: "The operation has timed out.",
	[ERRORS_MAP.TOKEN_EXPIRED]:
		"The user's credential is no longer valid. The user must sign in again.",
	[ERRORS_MAP.TOO_MANY_ATTEMPTS_TRY_LATER]:
		"We have blocked all requests from this device due to unusual activity. " +
		"Try again later.",
	[ERRORS_MAP.UNAUTHORIZED_DOMAIN]:
		"The domain of the continue URL is not whitelisted.  Please whitelist " +
		"the domain in the Firebase console.",
	[ERRORS_MAP.UNSUPPORTED_FIRST_FACTOR]:
		"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
	[ERRORS_MAP.UNSUPPORTED_PERSISTENCE]:
		"The current environment does not support the specified persistence type.",
	[ERRORS_MAP.UNSUPPORTED_TENANT_OPERATION]:
		"This operation is not supported in a multi-tenant context.",
	[ERRORS_MAP.UNVERIFIED_EMAIL]: "The operation requires a verified email.",
	[ERRORS_MAP.USER_CANCELLED]:
		"The user did not grant your application the permissions it requested.",
	[ERRORS_MAP.USER_DELETED]:
		"There is no user record corresponding to this identifier. The user may " +
		"have been deleted.",
	[ERRORS_MAP.USER_DISABLED]:
		"The user account has been disabled by an administrator.",
	[ERRORS_MAP.USER_MISMATCH]:
		"The supplied credentials do not correspond to the previously signed in user.",
	[ERRORS_MAP.USER_SIGNED_OUT]: "",
	[ERRORS_MAP.WEAK_PASSWORD]:
		"The password must be 6 characters long or more.",
	[ERRORS_MAP.WEB_STORAGE_UNSUPPORTED]:
		"This browser is not supported or 3rd party cookies and data may be disabled.",
};
