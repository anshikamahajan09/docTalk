import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

export default function RoomPage() {
  const { currentUser } = useSelector((state) => state.user);

  const { appointmentId } = useParams();

  const myMeeting = async (element) => {
    const appId = 729234025;
    const serverSecret = "62b4ca2df6ab94847df43eb34da56185";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      appointmentId,
      currentUser._id,
      currentUser.name
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: window.location.href,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <div className="flex justify-center items-center w-full  h-screen overflow-hidden">
      <div
        ref={myMeeting}
        className="w-full h-full flex justify-center items-center"
      />
    </div>
  );
}
