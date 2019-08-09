/// <reference path="Interfaces.d.ts" />
/// <reference path="Call.d.ts" />
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
}
