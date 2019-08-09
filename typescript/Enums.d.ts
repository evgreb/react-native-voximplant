/// <reference path="EventHandlers.d.ts" />
declare module "react-native-voximplant" {
    namespace Voximplant {

        /*
         * Call related errors
         * */
        export enum CallError {
            /*
             * The call is already in requested state
             * */
            ALREADY_IN_THIS_STATE = "ALREADY_IN_THIS_STATE",
            /*
             * Requested functionality is disabled
             * */
            FUNCTIONALITY_IS_DISABLED = "FUNCTIONALITY_IS_DISABLED",
            /*
             * Operation is incorrect, for example reject outgoing call
             * */
            INCORRECT_OPERATION = "INCORRECT_OPERATION",
            /*
             * Internal error occurred
             * */
            INTERNAL_ERROR = "INTERNAL_ERROR",
            /*
             * Operation can't be performed due to the call is on hold. Unhold the call and repeat the operation
             * */
            MEDIA_IS_ON_HOLD = "MEDIA_IS_ON_HOLD",
            /*
             * Operation can't be performed due to missing permission
             * */
            MISSING_PERMISSION = "MISSING_PERMISSION",
            /*
             * Operation can't be performed due to the client is not logged in
             * */
            NOT_LOGGED_IN = "NOT_LOGGED_IN",
            /*
             * Operation is rejected
             * */
            REJECTED = "REJECTED",
            /*
             * Operation is not completed in time
             * */
            TIMEOUT = "TIMEOUT"
        }

        /**
         * The events that are triggered by {@link Call} instance.
         * Use {@link Call#on} to subscribe on any of these events.
         */
        export enum CallEvents {
            /**
             * Event is triggered when a realible connection is established for the call.
             * Depending on network conditions there can be a 2-3 seconds delay between first audio data and this event.
             * Handler function receives {@link EventHandlers.CallEventWithHeaders} object as an argument.
             */
            Connected = 'Connected',
            /**
             * Event is triggered when a call was disconnected.
             * Handler function receives {@link EventHandlers.Disconnected} object as an argument.
             */
            Disconnected = 'Disconnected',
            /**
             * Event is triggered when a new Endpoint is created. {@link Voximplant.Endpoint} represents an another participant in your call or conference.
             * Handler function receives {@link EventHandlers.EndpointAdded} object as an argument.
             */
            EndpointAdded = 'EndpointAdded',
            /**
             * Event is triggered due to a call failure.
             * Handler function receives {@link EventHandlers.Failed} object as an argument.
             */
            Failed = 'Failed',
            /**
             * Event is triggered when ICE connection is complete.
             * Handler function receives {@link EventHandlers.CallEvent} object as an argument.
             */
            ICECompleted = 'ICECompleted',
            /**
             * Event is triggered when connection was not established due to a network connection problem between 2 peers.
             * Handler function receives {@link EventHandlers.CallEvent} object as an argument
             */
            ICETimeout = 'ICETimeout',
            /**
             * Event is triggered when INFO message is received.
             * Handler function receives {@link EventHandlers.InfoReceived} object as an argument.
             */
            InfoReceived = 'InfoReceived',
            /**
             * Event is triggered when local video is added to the call.
             * Handler function receives {@link EventHandlers.LocalVideoStreamAdded} object as an argument.
             */
            LocalVideoStreamAdded = 'LocalVideoStreamAdded',
            /**
             * Event is triggered when local video is removed from the call.
             * Handler function receives {@link EventHandlers.LocalVideoStreamRemoved} object as an argument.
             */
            LocalVideoStreamRemoved = 'LocalVideoStreamRemoved',
            /**
             * Event is triggered when a text message is received.
             * Handler function receives {@link EventHandlers.MessageReceived} object as an argument.
             */
            MessageReceived = 'MessageReceived',
            /**
             * Event is triggered when a progress tone playback starts.
             * Handler function receives {@link EventHandlers.CallEventWithHeaders} object as an argument.
             */
            ProgressToneStart = 'ProgressToneStart',
            /**
             * Event is triggered when a progress tone playback stops.
             * Handler function receives {@link EventHandlers.CallEvent} object as an argument.
             */
            ProgressToneStop = 'ProgressToneStop'
        }

        /**
         * The events that are triggered by Client instance. See {@link Voximplant#getInstance}.
         */
        export enum ClientEvents {
            /**
             * The event is triggered after connection to the Voximplant Cloud was established successfully.
             * See {@link Client#connect} method.
             * Handler function receives no arguments.
             */
            ConnectionEstablished = 'ConnectionEstablished',
            /**
             * The event is triggered if a connection to the Voximplant Cloud couldn't be established.
             * See {@link Client#connect} method.
             * Handler function receives {@link EventHandlers.ConnectionFailed} object as an argument.
             */
            ConnectionFailed = 'ConnectionFailed',
            /**
             * The event is triggered if a connection to the Voximplant Cloud was closed because of network problems.
             * See {@link Client#connect} method.
             * Handler function receives no arguments.
             */
            ConnectionClosed = 'ConnectionClosed',
            /**
             * Event is triggered after
             * {@link Client#login},
             * {@link Client#loginWithOneTimeKey},
             * {@link Client#requestOneTimeLoginKey},
             * {@link Client#loginWithToken} methods.
             * Handler function receives {@link EventHandlers.AuthResult} object as an argument.
             */
            AuthResult = 'AuthResult',
            /**
             * The event is triggered after the {@link Client#tokenRefresh} method call.
             * Handler function receives {@link EventHandlers.AuthTokenResult} object as an argument.
             */
            RefreshTokenResult = 'RefreshTokenResult',
            /**
             * The event is triggered when there is a new incoming call to current user.
             * Handler function receives {@link EventHandlers.IncomingCall} object as an argument.
             */
            IncomingCall = 'IncomingCall'
        }

        /*
         * The client states
         * */
        export enum ClientState {
            /*
             * The client is currently connected
             * */
            DISCONNECTED = "disconnected",
            /*
             * The client is currently connecting
             * */
            CONNECTING = "connecting",
            /*
             * The client is currently disconnected
             * */
            CONNECTED = "connected",
            /*
             * The client is currently logged in
             * */
            LOGGING_IN = "logging_in",
            /*
             * The client is currently logging in
             * */
            LOGGED_IN = "logged_in"
        }

        /**
         * Events that are triggered when Endpoint is updated/edited, removed or started/stopped to receive stream from another Endpoint.
         */
        export enum EndpointEvents {
            /**
             * Event is triggered when endpoint information such as display name, user name and sip uri is updated.
             * Handler function receives {@link EventHandlers.InfoUpdated} object as an argument.
             */
            InfoUpdated = 'InfoUpdated',
            /**
             * Event is triggered after endpoint added video stream to the call.
             * Handler function receives {@link EventHandlers.RemoteVideoStreamAdded} object as an argument.
             */
            RemoteVideoStreamAdded = 'RemoteVideoStreamAdded',
            /**
             * Event is triggered after endpoint removed video stream from the call. Event is not triggered on call end.
             * Handler function receives {@link EventHandlers.RemoteVideoStreamRemoved} object as an argument.
             */
            RemoteVideoStreamRemoved = 'RemoteVideoStreamRemoved',
            /**
             * Event is triggered when an Endpoint is removed.
             * Handler function receives {@link EventHandlers.Removed} object as an argument.
             */
            Removed = 'Removed'
        }

        /*
         * Enum of log levels.
         * @remarks IOS ONLY
         * @default {@link LogLevel.INFO}
         * */
        export enum LogLevel {
            /*
             * Log verbosity level to include debug messages
             * */
            ERROR = "error",
            /*
             * Log verbosity level, to include only error messages
             * */
            WARNING = "warning",
            /*
             * Default log verbosity level, to include informational messages
             * */
            INFO = "info",
            /*
             * Log verbosity level to include verbose messages
             * */
            DEBUG = "debug",
            /*
             * Log verbosity level to include warning messages
             * */
            VERBOSE = "verbose"
        }

        /*
         * Types of video rendering scaling
         * */
        export enum RenderScaleType {
            /*
             * Video frame is scaled to fill the size of the view by maintaining the aspect ratio.
             * Some portion of the video frame may be clipped.
             * */
            SCALE_FILL = "fill",
            /*
             * Video frame is scaled to be fit the size of the view by maintaining the aspect ratio
             * (black borders may be displayed).
             * */
            SCALE_FIT = "fit"
        }

        /*
         * Request audio focus modes.
         * */
        export enum RequestAudioFocusMode {
            /*
             * Request of audio focus is performed when a call is established.
             * */
            REQUEST_ON_CALL_START = "REQUEST_ON_CALL_START",
            /*
             * Request of audio focus is performed when a call is started.
             * */
            REQUEST_ON_CALL_CONNECTED = "REQUEST_ON_CALL_CONNECTED"
        }

        /*
         * Enum representing supported video codecs
         * */
        export enum VideoCodec {
            /*
             * Video codec for call will be chosen automatically
             * */
            VP8 = "VP8",
            /*
             * H264 video codec
             * */
            H264 = "H264",
            /*
             * VP8 video codec
             * */
            AUTO = "AUTO"
        }
    }
}
