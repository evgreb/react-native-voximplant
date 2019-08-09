/// <reference path="Enums.d.ts" />
declare module "react-native-voximplant" {
  export interface CallSettings {
    /*
     * Custom string associated with the call session.
     * It can be passed to the cloud to be obtained
     * from the CallAlerting event or Call History using HTTP API.
     * Use the Call.sendMessage method to pass a string over the limit;
     * in order to pass a large data use media_session_access_url on your backend.
     * @remarks Maximum size is 200 bytes.
     * */
    customData?: string;
    /*
     * Optional custom parameter (SIP headers) that should be passes with call (INVITE) message.
     * Parameter names must start with "X-" to be processed.
     * @remarks Headers size limit is 200 bytes
     * */
    extraHeaders?: boolean;
    /*
     * Preferred video codec for a particular call that this CallSettings are applied to.
     * @default {@link VideoCodec.AUTO}
     * @remarks For android, overrides ClientConfig.preferredVideoCodec global configuration.
     * */
    preferredVideoCodec?: Voximplant.VideoCodec;
    /*
     * Specify if the outgoing call on iOS will be made with CallKit.
     * Applicable only for outgoing calls.
     * @remarks IOS ONLY.
     * */
    setupCallKit?: boolean;
    /*
     * Tells if video should be supported for the call
     * */
    video?: VideoFlags;
  }

  export interface ClientConfig {
    /*
     * Application bundle id/package name for iOS/Android respectively.
     * You need to set this only if you are going to send push notifications
     * across several mobile apps on a specific platform (Android or iOS)
     * using a single Voximplant application.
     * */
    bundleId?: string;
    /*
     * Enable/disable front facing camera mirroring.
     * @default true
     * @remarks ANDROID ONLY
     * */
    enableCameraMirroring?: boolean;
    /*
     * Enable debug logging.
     * @default false
     * @remarks ANDROID ONLY
     * */
    enableDebugLogging?: boolean;
    /*
     * Enable hardware video acceleration. Should be set to false, if provideLocalFramesInByteBuffers is set to true.
     * @default true
     * @remarks ANDROID ONLY
     * */
    enableHWAcceleration?: boolean;
    /*
     * Enable log output to logcat.
     * @default true
     * @remarks ANDROID ONLY
     * */
    enableLogcatLogging?: boolean;
    /*
     * Enable video functionality.
     * @default true
     * @remarks ANDROID ONLY
     * */
    enableVideo?: boolean;
    /*
     * Log levels.
     * @remarks IOS ONLY
     * */
    logLevel?: Voximplant.LogLevel;
    /*
     * Preferred video codec for all video calls.
     * Can be overridden for a particular call via CallSettings.preferredVideoCodec.
     * @default {@link VideoCodec.VP8}
     * @remarks ANDROID ONLY
     * */
    preferredVideoCodec?: Voximplant.VideoCodec;
    /*
     * Request video frames from camera in I420 format with byte buffers.
     * If set to false, video frames from camera will be provided in I420 format with textures.
     * @default false
     * @remarks ANDROID ONLY
     * */
    provideLocalFramesInByteBuffers?: boolean;
    /*
    * Specifies when the audio focus request is performed: when a call is started or established.
    * @default {@link RequestAudioFocusMode.REQUEST_ON_CALL_START}
    * */
    requestAudioFocusMode?: Voximplant.RequestAudioFocusMode;
  }

  export interface ConnectOptions {
    /*
     * Checks whether UDP traffic will flow correctly between device and the Voximplant cloud.
     * This check reduces connection speed
     * */
    connectivityCheck?: boolean;
    /*
     * Server name of particular media gateway for connection
     * */
    servers?: string[];
  }

  export interface LoginTokens {
    /*
     * Seconds to access token expire
     * */
    accessExpire: number;
    /*
     * Access token that can be used to login before accessExpire
     * */
    accessToken: string;
    /*
     * Seconds to refresh token expire
     * */
    refreshExpire: number;
    /*
     * Refresh token that can be used one time before refresh token expired
     * */
    refreshToken: string;
  }

  export interface VideoFlags {
    /*
     * Set true if video receive is enabled for a call.
     * @default true
     * */
    receiveVideo: boolean;
    /*
     * Set true if video send is enabled for a call.
     * @default false
     * */
    sendVideo: boolean;
  }
}
