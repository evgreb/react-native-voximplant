/// <reference path="Interfaces.d.ts" />
/// <reference path="Call.d.ts" />
/// <reference path="Conversation.d.ts" />
/// <reference path="Enums.d.ts" />
/// <reference path="VideoStream.d.ts" />
declare module "react-native-voximplant" {
    export interface AuthResult {

        /*
        * Auth result error code
        * */
        code: number,

        /*
        * Authorized user's display name
        * */
        displayName: string,

        /*
        * This parameter is used to calculate hash parameter for {@link Voximplant.Client.loginWithOneTimeKey} method.
        * AuthResult with the key dispatched after {@link Voximplant.Client.requestOneTimeLoginKey} method was called.
        * */
        key: string,

        /*
        * Name of the event
        * */
        name: string,

        /*
        * True in case of success, false - otherwise
        * */
        result: boolean,

        /*
        * New tokens structure
        * */
        tokens: LoginTokens
    }
    export interface AuthTokenResult {

        /*
        * Error code
        * */
        code: number,

        /*
        * string name
        * */
        name: string,

        /*
        * True in case of success, false - otherwise
        * */
        result: boolean,

        /*
        * New tokens structure
        * */
        tokens: LoginTokens
    }
    export interface CallEvent {
        /*
        * Call that triggered the event
        * */
        call: Voximplant.Call,
        /*
        * Name of the event
        * */
        name: string
    }
    export interface CallEventWithHeaders {

        /*
        * Call that triggered the event
        * */
        call: Voximplant.Call,

        /*
        * Optional SIP headers are received with the event
        * */
        headers: object,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface CallOperationFailed {

        /*
        * Error code
        * */
        code: Voximplant.CallError,

        /*
        * Error description
        * */
        message: string,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface CameraDisconnected {

        /*
        * Name of the event
        * */
        name: string
    }
    export interface CameraError {

        /*
        * Description of error occurred
        * */
        error: string,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface CameraSwitchDone {

        /*
        * True if new camera is front facing camera
        * */
        isFrontCamera: boolean,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface CameraSwitchError {

        /*
        * Description of error occurred.
        * */
        error: string,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface ConnectionClosed {

        /*
        * Name of the event
        * */
        name: string
    }
    export interface ConnectionEstablished {

        /*
        * Name of the event
        * */
        name: string
    }
    export interface ConnectionFailed {

        /*
        * Failure reason description
        * */
        message: string,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface ConversationEvent {

        /*
        * Action that triggered this event.
        * */
        action: Voximplant.MessengerAction,

        /*
        * Object with conversation information
        * */
        conversation: Messaging.Conversation, //TODO realise class Conversation

        /*
        * Messenger event type.
        * */
        eventType: Voximplant.MessengerEventTypes,

        /*
        * The IM id for the user that initiated the event.
        * */
        imUserId: number,

        /*
        * Sequence number of this event
        * */
        sequence: number,

        /*
        * UNIX timestamp (seconds) that specifies the time the conversation event was provoked
        * */
        timestamp: number
    }
    export interface ConversationListEvent {

        /*
        * Action that triggered this event.
        * */
        action: Voximplant.MessengerAction,

        /*
        * Array of conversations UUIDs.
        * */
        conversationList: string[],

        /*
        * Messenger event type.
        * */
        eventType: Voximplant.MessengerEventTypes,

        /*
        * The IM id for the user that initiated the event.
        * */
        imUserId: number

    }
    export interface ConversationServiceEvent {

        /*
        * Action that triggered this event.
        * */
        action: Voximplant.MessengerAction,

        /*
        * The conversation UUID associated with this event.
        * */
        conversationUUID: string,

        /*
        * Messenger event type.
        * */
        eventType: Voximplant.MessengerEventTypes,

        /*
        * The IM id for the user that initiated the event.
        * */
        imUserId: number,

        /*
        * The sequence number of the event that was marked as read by the user initiated this event.
        * Only available for {@link MessengerEventTypes.Read}.
        * */
        sequence: number
    }
    export interface DeviceChanged {

        /*
        * Audio device to be used
        * */
        currentDevice: Voximplant.AudioDevice,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface DeviceListChanged {

        /*
        * Name of the event
        * */
        name: string,

        /*
        * List of currently available audio devices.
        * */
        newDeviceList: Voximplant.AudioDevice[]
    }
    export interface Disconnected {

        /*
        * True if the call was answered on another device via SIP forking, false otherwise
        * */
        answeredElsewhere: boolean,

        /*
        * Call that triggered the event
        * */
        call: Voximplant.Call,

        /*
        * Optional SIP headers are received with the event
        * */
        headers: object,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface EndpointAdded {

        /*
        * Call that triggered the event
        * */
        call: Voximplant.Call,

        /*
        * New endpoint
        * */
        endpoint: Voximplant.Endpoint,

        /*
        * Name of the event
        * */
        name: string
    }

    /*
    * Interface that represents error messenger events.
    * */
    export interface ErrorEvent {

        /*
        * Action that triggered this event.
        * */
        action: Voximplant.MessengerAction,

        /*
        * Error code
        * Error codes and their descriptions:
        *
        * 0 - Something went wrong. Please check your input or required parameters.
        * 1 - Transport message structure is wrong.
        * 2 - Event name is unknown.
        * 3 - User is not authorized.
        * 8 - Conversation does not exist
        * 10 - Message with this UUID does not exist in the conversation.
        * 11 - Message with this UUID is deleted from the conversation.
        * 12 - ACL error.
        * 13 - User is already in the participants list.
        * 15 - Public join is not available for this conversation.
        * 16 - Conversation with this UUID is deleted.
        * 18 - User validation error.
        * 19 - User is not in the participants list.
        * 21 - Number of requested objects is 0 or larger than allowed by the service.
        * 22 - Number of requested objects is larger than allowed by the service.
        * 23 - Message size exceeds the limit of 5000 symbols.
        * 24 - The 'seq' parameter value is greater than currently possible.
        * 25 - User is not found.
        * 26 - The notification event is incorrect.
        * 28 - The 'from' field value is greater than the 'to' field value.
        * 30 - IM service is not available. Try again later.
        * 32 - N messages per second limit reached. Please try again later.
        * 33 - N messages per minute limit reached. Please try again later.
        * 34 - Direct conversation cannot be public or uber.
        * 35 - Direct conversation is allowed between two users only.
        * 36 - Passing the 'eventsFrom', 'eventsTo' and 'count' parameters simultaneously is not allowed. You should use only two of these parameters.
        * 37 - Adding participant to direct conversation is not allowed.
        * 38 - Removing participant from direct conversation is not allowed.
        * 39 - Joining direct conversation is not allowed.
        * 40 - Leaving direct conversation is not allowed.
        * 41 - Specify at least two parameters: eventsFrom, eventsTo, count.
        * 500 - Internal error.
        * 10000 - Method calls within 10s interval from the last call are discarded.
        * 10001 - Invalid argument(s). | Message text exceeds the length limit.
        * 10002 - Response timeout.
        * 10003 - Client is not logged in.
        * 10004 - Failed to process response.
        * */
        code: number,

        /*
        * Error description
        * */
        description: string,

        /*
        * Messenger event type.
        * */
        eventType: Voximplant.MessengerEventTypes
    }
    export interface Failed {

        /*
        * Call that triggered the event
        * */
        call: Voximplant.Call,

        /*
        * Call status code
        * */
        code: number,

        /*
        * Optional SIP headers are received with the event
        * */
        headers: object,

        /*
        * Name of the event
        * */
        name: string,

        /*
        * Status message of a call failure (i.e. Busy Here)
        * */
        reason: string
    }
    export interface IncomingCall {

        /*
        * Incoming call instance.
        * */
        call: Voximplant.Call,

        /*
        * Optional SIP headers received with the event
        * */
        headers: object,

        /*
        * Name of the event
        * */
        name: string,

        /*
        * True if the caller initiated video call
        * */
        video: boolean

    }
    export interface InfoReceived {

        /*
        * Content of the message
        * */
        body: string,

        /*
        * Call that triggered the event
        * */
        call: Voximplant.Call,

        /*
        * Optional SIP headers are received with the event
        * */
        headers: object,

        /*
        * MIME type of INFO message
        * */
        mimeType: string,

        /*
        * Name of the event
        * */
        name: string
    }
    export interface InfoUpdated {

        /*
        * Call which endpoint belongs to
        * */
        call: Voximplant.Call,

        /*
        * Endpoint that triggered the event
        * */
        endpoint: Voximplant.Endpoint,

        /*
        * Name of the event
        * */
        name: string

    }
    export interface LocalVideoStreamAdded {

        /*
        * Call that triggered the event
        * */
        call: Voximplant.Call,

        /*
        * Name of the event
        * */
        name: string,

        /*
        * Local video stream
        * */
        videoStream: Voximplant.VideoStream,
    }
    export interface LocalVideoStreamRemoved {

        /*
        * Call that triggered the event
        * */
        call: Voximplant.Call,

        /*
        * Name of the event
        * */
        name: string,

        /*
        * Local video stream
        * */
        videoStream: Voximplant.VideoStream,
    }
    export interface MessageEvent {

        /*
        * Action that triggered this event.
        * */
        action: Voximplant.MessengerAction,

        /*
        * Messenger event type.
        * */
        eventType: Voximplant.MessengerEventTypes,

        /*
        * The IM id for the user that initiated the event.
        * */
        imUserId: number,

        /*
        * Message object.
        * */
        message: Messaging.Message,

        /*
        * The sequence number for this event.
        * */
        sequence: number,

        /*
        * The UNIX timestamp (seconds) that specifies the time the message event was provoked.
        * */
        timestamp: number
    }
}
