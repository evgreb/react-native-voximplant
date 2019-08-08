/// <reference path="Enums.d.ts" />
declare module "react-native-voximplant" {
    import * as React from "react";
    import * as ReactNative from "react-native";
    namespace Voximplant {
        export function getInstance(clientConfig?: ClientConfig): Client;
        export const VideoView: React.ComponentType<VideoViewProps>;
    }

    export interface ClientConfig {
        bundleId?: string;
        enableCameraMirroring?: boolean;
        enableDebugLogging?: boolean;
        enableHWAcceleration?: boolean;
        enableLogcatLogging?: boolean;
        enableVideo?: boolean;
        logLevel?: Voximplant.LogLevel;
        preferredVideoCodec?: Voximplant.VideoCodec;
        provideLocalFramesInByteBuffers?: boolean;
        requestAudioFocusMode?: Voximplant.RequestAudioFocusMode;
    }

    export interface VideoViewProps extends ReactNative.ViewProps {
        scaleType?: Voximplant.RenderScaleType;
        showOnTop?: boolean;
        videoStreamId?: string;
    }

    interface Client {
    }
}
