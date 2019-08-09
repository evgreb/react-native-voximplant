/// <reference path="Interfaces.d.ts" />
/// <reference path="Endpoint.d.ts" />
/// <reference path="EventHandlers.d.ts" />
declare module "react-native-voximplant" {
    namespace Voximplant {
        type CallEventsMap = {
            [Voximplant.CallEvents.Connected]: CallEventWithHeaders,
            [Voximplant.CallEvents.Disconnected]: Disconnected,
            [Voximplant.CallEvents.EndpointAdded]: EndpointAdded,
            [Voximplant.CallEvents.Failed]:  Failed,
            [Voximplant.CallEvents.ICECompleted]: CallEvent,
            [Voximplant.CallEvents.ICETimeout]: CallEvent,
            [Voximplant.CallEvents.InfoReceived]: InfoReceived,
            [Voximplant.CallEvents.LocalVideoStreamAdded]: LocalVideoStreamAdded,
            [Voximplant.CallEvents.LocalVideoStreamRemoved]: LocalVideoStreamRemoved,
            [Voximplant.CallEvents.MessageReceived]: MessageReceived,
            [Voximplant.CallEvents.ProgressToneStart]: CallEventWithHeaders,
            [Voximplant.CallEvents.ProgressToneStop]: CallEvent,
        }

        /*
        * Class that may be used for call operations like answer, reject, hang up abd mid-call operations like hold, start/stop video and others.
        * */
        export class Call {

            /**
             * Answer the incoming call.
             */
            answer(callSettings?: CallSettings): void;

            /**
             * Reject incoming call on all devices, where this user logged in.
             * @param {object} [headers] - Optional custom parameters (SIP headers) that should be sent after rejecting incoming call.
             * Parameter names must start with "X-" to be processed by application
             */
            decline(headers?: object): void;

            /*
            * Get all current Endpoints in the call.
            * */
            getEndpoints(): Array<Endpoint>;

            /**
             * Hangup the call
             * @param {object} [headers] - Optional custom parameters (SIP headers) that should be sent after disconnecting/cancelling call. Parameter names must start with "X-" to be processed by application
             */
            hangup(headers?: object): void;

            /**
             * Hold or unhold the call
             * @param {boolean} enable - True if the call should be put on hold, false for unhold
             */
            hold(enable: boolean): Promise<void | CallOperationFailed>;

            /**
             * Remove a handler for the specified call event.
             * @param {@link Voximplant.CallEvents} event
             * @param {function} handler - Handler function. If not specified, all handlers for the event will be removed.
             */
            off<T extends keyof CallEventsMap>(event: T, handler: (event: CallEventsMap[T]) => void): void;

            /**
             * Register a handler for the specified call event.
             * One event can have more than one handler.
             * Use the {@link Voximplant.Call#off} method to delete a handler.
             * @param {@link Voximplant.CallEvents} event
             * @param {function} handler - Handler function. A single parameter is passed - object with event information
             */
            on<T extends keyof CallEventsMap>(event: T, handler: (event: CallEventsMap[T]) => void): void;

            /**
             * Start receive video if video receive was disabled before. Stop receiving video during the call is not supported.
             */
            receiveVideo(): Promise<void|CallOperationFailed>;

            /**
             * Reject incoming call on the part of Web SDK.
             * If a call is initiated from the PSTN, the network will receive "reject" command.
             * In case of a call from another Web SDK client, it will receive the CallEvents.Failed event with the 603 code.
             */
            reject(headers?: object): void;

            /**
             * Enables or disables audio transfer from microphone into the call.
             * @param {boolean} enable - True if audio should be sent, false otherwise
             */
            sendAudio(enable: boolean): void;

            /**
             * Send Info (SIP INFO) message inside the call.
             * You can get this message via the Voxengine {@link https://voximplant.com/docs/references/websdk/voximplant/callevents#inforeceived CallEvents.InfoReceived}
             * event in the Voximplant cloud.
             * You can get this message in Web SDK on other side via the {@link CallEvents.InfoReceived} event; see the similar
             * events for the {@link https://voximplant.com/docs/references/websdk Web},
             * {@link https://voximplant.com/docs/references/iossdk iOS} and {@link https://voximplant.com/docs/references/androidsdk Android} SDKs.
             * @param {string} mimeType -  MIME type of the message, for example "text/plain", "multipart/mixed" etc.
             * @param {string} body - Message content
             * @param {object} [extraHeaders] - Optional custom parameters (SIP headers) that should be sent after rejecting incoming call. Parameter names must start with "X-" to be processed by application
             */
            sendInfo(mimeType: string, body: string, extraHeaders?: object): void;

            /**
             * Send text message. It is a special case of the {@link Voximplant.Call#sendInfo} method as it allows to send messages only of "text/plain" type.
             * You can get this message via the Voxengine {@link https://voximplant.com/docs/references/websdk/voximplant/callevents#messagereceived CallEvents.MessageReceived} event in our cloud.
             * You can get this message in Web SDK on other side via the {@link CallEvents#MessageReceived} event; see the similar
             * events for the {@link https://voximplant.com/docs/references/websdk Web},
             * {@link https://voximplant.com/docs/references/iossdk iOS} and {@link https://voximplant.com/docs/references/androidsdk Android} SDKs.
             * @param {string} message - Message text
             */
            sendMessage(message: string): void;

            /**
             * Send tone (DTMF). It triggers the {@link https://voximplant.com/docs/references/appengine/CallEvents.html#CallEvents_ToneReceived CallEvents.ToneReceived} event in the Voximplant cloud.
             * @param {string} key - Send tone according to pressed key: 0-9 , * , #
             */
            sendTone(key: string): void;

            /**
             * Start/stop sending video from a call.
             * In case of a remote participant uses a React Native SDK client, it will receive either
             * the {@link EndpointEvents#RemoteVideoStreamAdded} or {@link EndpointEvents#RemoteVideoStreamRemoved} event accordingly.
             * @param {boolean} enable - True if video should be sent, false otherwise
             */
            sendVideo(enable: boolean): Promise<void|CallOperationFailed>;

            /**
             * The call id
             */
            callId: string;
        }

    }
}
