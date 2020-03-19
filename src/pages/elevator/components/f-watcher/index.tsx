/* eslint-disable jsx-a11y/media-has-caption */
import Decoration11 from '@jiaminghi/data-view-react/es/decoration11';
import Decoration9 from '@jiaminghi/data-view-react/es/decoration9';
import React, { useEffect, useRef } from 'react';

export default function FWatcher() {
  const videoRef = useRef<any>();
  const openVideo = () => {
    // 媒体对象
    navigator.getUserMedia(
      {
        video: true, // 使用摄像头对象
        audio: false, // 不适用音频
      },
      stream => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.autoplay = true;
          videoRef.current.playsinline = true;
          videoRef.current.srcObject = stream;
        }
      },
      error => {
        // error.code
        console.log(error);
      },
    );
  };
  useEffect(() => {
    openVideo();
  }, []);
  return (
    <div className="watcher">
      <Decoration11 style={{ height: '80px' }}>请直视摄像头</Decoration11>

      <Decoration9 style={{ width: '500px', height: '500px' }} dur={4}>
        <div>
          <video ref={videoRef} autoPlay playsInline />
        </div>
      </Decoration9>
    </div>
  );
}
