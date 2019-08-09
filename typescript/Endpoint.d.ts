/// <reference path="Interfaces.d.ts" />
declare module "react-native-voximplant" {
    namespace Voximplant {
        type EndpointEventsMap = {
            [Voximplant.EndpointEvents.InfoUpdated]: InfoUpdated,
            [Voximplant.EndpointEvents.RemoteVideoStreamAdded]: RemoteVideoStreamAdded,
            [Voximplant.EndpointEvents.RemoteVideoStreamRemoved]: RemoteVideoStreamRemoved,
            [Voximplant.EndpointEvents.Removed]: Removed
        }

        /*
        * Class that represents any remote media unit in a call. Current endpoints can be retrieved via the {@link Call#getEndpoints} method.
        * */
        export class Endpoint {

            /*
            * User display name of the endpoint.
            * */
            displayName: string;

            /*
            * The endpoint id
            * */
            id: string;

            /*
            * SIP URI of the endpoint
            * */
            sipUri: string;

            /*
            * User name of the endpoint.
            * */
            userName: string;

            /**
             * Register a handler for the specified endpoint event.
             * One event can have more than one handler.
             * Use the {@link Voximplant.Endpoint#off} method to delete a handler.
             * @param {Voximplant.EndpointEvents} event
             * @param {function} handler
             */
            on<T extends keyof EndpointEventsMap>(event: T, handler: (event: EndpointEventsMap[T]) => void): void

            /**
             * Remove a handler for the specified endpoint event.
             * @param {Voximplant.EndpointEvents} event
             * @param {function} handler - Handler function. If not specified, all handlers for the event will be removed.
             */
            off<T extends keyof EndpointEventsMap>(event: T, handler: (event: EndpointEventsMap[T]) => void): void
        }
    }
}
