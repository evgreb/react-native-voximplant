/// <reference path="Enums.d.ts" />
/// <reference path="Interfaces.d.ts" />
/// <reference path="Hardware.d.ts" />
/// <reference path="Messaging.d.ts" />
declare module "react-native-voximplant" {
    import * as React from "react";
    import * as ReactNative from "react-native";
    namespace Voximplant {
        export function getInstance(clientConfig?: ClientConfig): Client;
        export const VideoView: React.ComponentType<VideoViewProps>;

        /*
        * The Client class is used to control platform functions.
        * Can't be instantiated directly (singleton),
        * so use the {@link Voximplant#getInstance} method to get the class instance.
        * */
        class Client {
            /**
             * Create outgoing call.
             *
             * Important: There is a difference between resolving the Voximplant.Client.call promise and handling Voximplant.CallEvents.
             * If the promise is resolved, the SDK sends a call to the cloud. However, it doesn't mean that a call is connected;
             * to catch this call state, subscribe to the Voximplant.CallEvents.Connected event.
             * If the promise is rejected, that indicates the issues in the application's code (e.g., a try to make a call without login to the Voximplant cloud);
             * in case of the CallFailed event is triggered, that means a telecom-related issue (e.g., another participant rejects a call).
             *
             * @param {string} number - The number to call. For SIP compatibility reasons it should be a non-empty string even if the number itself is not used by a Voximplant cloud scenario.
             * @param {Voximplant.CallSettings} [callSettings] - Optional call settings
             */
            call(number: string, callSettings?: CallSettings): Promise<Voximplant.Call>;

            /**
             * Create call to a dedicated conference without proxy session. For details see [the video conferencing guide](https://voximplant.com/blog/video-conference-through-voximplant-media-servers).
             *
             * Important: There is a difference between resolving the Voximplant.Client.callConference promise and handling Voximplant.CallEvents.
             * If the promise is resolved, the SDK sends a call to the cloud. However, it doesn't mean that a call is connected;
             * to catch this call state, subscribe to the Voximplant.CallEvents.Connected event.
             * If the promise is rejected, that indicates the issues in the application's code (e.g., a try to make a call without login to the Voximplant cloud);
             * in case of the CallFailed event is triggered, that means a telecom-related issue (e.g., another participant rejects a call).
             *
             * @param {string} number - The number to call. For SIP compatibility reasons it should be a non-empty string even if the number itself is not used by a Voximplant cloud scenario.
             * @param {Voximplant.CallSettings} [callSettings] - Optional call settings
             */
            callConference(number: string, callSettings?: CallSettings): Promise<Voximplant.Call>;

            /**
             * Connect to the Voximplant Cloud
             * @param {Voximplant.ConnectOptions} [options] - Connection options
             */
            connect(options?: ConnectOptions): Promise<ConnectionEstablished|ConnectionFailed>;

            /**
             * Disconnect from the Voximplant Cloud
             */
            disconnect(): Promise<ConnectionClosed>;

            /**
             * Get current client state
             */
            getClientState(): Promise<Voximplant.ClientState>;

            /**
             * Handle incoming push notification
             */
            handlePushNotification(notification: object): void;

            /**
             * Login to specified Voximplant application with password.
             * @param {string} username - Fully-qualified username that includes Voximplant user, application and account names. The format is: "username@appname.accname.voximplant.com".
             * @param {string} password - User password
             */
            login(username: string, password: string): Promise<AuthResult>;

            /**
             * Login to specified Voximplant application using 'onetimekey' auth method. Hash should be calculated with the key received in AuthResult event.
             * Please, read {@link http://voximplant.com/docs/quickstart/24/automated-login/ howto page}
             * @param {string} username - Fully-qualified username that includes Voximplant user, application and account names. The format is: "username@appname.accname.voximplant.com".
             * @param {string} hash - Hash that was generated using following formula: MD5(oneTimeKey+"|"+MD5(user+":voximplant.com:"+password)).
             * Please note that here user is just a user name, without app name, account name or anything else after "@".
             * So if you pass myuser@myapp.myacc.voximplant.com as a username, you should only use myuser while computing this hash.
             */
            loginWithOneTimeKey(username: string, hash: string): Promise<AuthResult>;

            /**
             * Login to specified Voximplant application using accessToken
             * @param {string} username - Fully-qualified username that includes Voximplant user, application and account names. The format is: "username@appname.accname.voximplant.com".
             * @param {string} token - Access token that was obtained in AuthResult event
             */
            loginWithToken(username: string, token: string): Promise<AuthResult>;

            /**
             * Register handler for specified client event.
             * Use {@link Voximplant.Client#off} method to delete a handler.
             * @param {Voximplant.ClientEvents} event
             * @param {function} handler - Handler function
             */
            on<T extends keyof ClientEventsMap>(event: T, handler: (event: ClientEventsMap[T]) => void): void;

            /**
             * Remove handler for specified event
             * @param {Voximplant.ClientEvents} event
             * @param {function} handler - Handler function. If not specified, all handlers for the event will be removed.
             */
            off<T extends keyof ClientEventsMap>(event: T, handler: (event: ClientEventsMap[T]) => void): void;

            /**
             * Register Apple Push Notifications token for IM push notifications.
             *
             * See [React Native PushNotificationIOS](https://facebook.github.io/react-native/docs/pushnotificationios#addeventlistener)
             * for more details.
             *
             * IM push notification token for Android is the same as VoIP push notification token and should be registered once via
             * {@link Voximplant.Client#registerPushNotificationsToken}
             *
             * @param {string} token - The APNS token for IM push notifications.
             * @remarks IOS ONLY
             */
            registerIMPushNotificationsTokenIOS(token: string): void;

            /**
             * Unregister from push notifications. Application will no longer receive push notifications from the Voximplant server
             * @param {string} token - Push registration token
             */
            registerPushNotificationsToken(token: string): void;

            /**
             * Request a key for 'onetimekey' auth method. Server will send the key in AuthResult event with code 302
             * @param {string} username Fully - qualified username that includes Voximplant user, application and account names.
             * The format is: "username@appname.accname.voximplant.com".
             */
            requestOneTimeLoginKey(username: string): Promise<AuthResult>;

            /**
             * Set outer logging callback. The method allows integrating logging pipeline of the Voximplant React Native SDK into
             * your own logger i.e. the method call sends all events to your function.
             */
            setLoggerCallback(callback: (logLevel: Voximplant.LogLevel, message: string) => void): void;

            /**
             * Refresh expired access token
             * @param {string} username - Fully-qualified username that includes Voximplant user, application and account names.
             * The format is: "username@appname.accname.voximplant.com".
             * @param {string} refreshToken - Refresh token that was obtained in AuthResult event
             */
            tokenRefresh(username: string, refreshToken: string): Promise<AuthTokenResult>

            /**
             * Unregister from push notifications. Application will no longer receive push notifications from the Voximplant server
             * @param {string} token - Push registration token
             */
            unregisterPushNotificationsToken(token: string): void;
        }
    }

    export interface VideoViewProps extends ReactNative.ViewProps {
        scaleType?: Voximplant.RenderScaleType;
        showOnTop?: boolean;
        videoStreamId?: string;
    }

    type ClientEventsMap = {
        [Voximplant.ClientEvents.AuthResult]: AuthResult;
        [Voximplant.ClientEvents.ConnectionClosed]: void;
        [Voximplant.ClientEvents.ConnectionEstablished]: void;
        [Voximplant.ClientEvents.ConnectionFailed]: ConnectionFailed;
        [Voximplant.ClientEvents.IncomingCall]: IncomingCall;
        [Voximplant.ClientEvents.RefreshTokenResult]: AuthTokenResult;
    }
}
