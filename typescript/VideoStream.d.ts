declare module "react-native-voximplant" {
    namespace Voximplant {

        /*
        * Class that represents a video stream within a call.
        * */
        export class VideoStream {

            /*
            * The video stream id.
            * */
            id: string;

            /*
            * True if video stream is local, false otherwise.
            * */
            isLocal: boolean;
        }
    }
}
