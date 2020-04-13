/* eslint-disable jsx-a11y/media-has-caption */
import Decoration11 from '@jiaminghi/data-view-react/es/decoration11';

import Decoration12 from '../keyboard/decoration12';
import React, { useEffect, useRef, useState } from 'react';

export default function FWatcher() {
  const videoRef = useRef<any>();
  const [videoStyle, setVideoStyle] = useState({ width: '360px', height: '360px' });
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
  const calculateWidth = () => {
    const winWidth = document.body.clientWidth;
    const w = Math.floor(winWidth * 0.4);
    setVideoStyle({
      width: `${w}px`,
      height: `${w}px`,
    });
  };
  useEffect(() => {
    calculateWidth();
    openVideo();
  }, []);
  return (
    <div className="watcher">
      <div>
        <Decoration11 style={{ height: '80px' }}>请直视摄像头</Decoration11>
      </div>
      <div className="w-flex">
        <Decoration12 style={videoStyle} dur={4}>
          <div>
            <video ref={videoRef} autoPlay playsInline />
          </div>
        </Decoration12>
      </div>
    </div>
  );
}
