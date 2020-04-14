/* eslint-disable jsx-a11y/media-has-caption */
import Decoration11 from '@jiaminghi/data-view-react/es/decoration11';

import React, { useEffect, useRef, useState } from 'react';
import Decoration12 from '../keyboard/decoration12';
// declare const navigator: any;
// 访问用户媒体设备的兼容方法
// function getUserMedia(constrains: any, success: any, error: any) {
//   if (navigator.mediaDevices.getUserMedia) {
//     // 最新标准API
//     navigator.mediaDevices
//       .getUserMedia(constrains)
//       .then(success)
//       .catch(error);
//   } else if (navigator.webkitGetUserMedia) {
//     // webkit内核浏览器
//     navigator
//       .webkitGetUserMedia(constrains)
//       .then(success)
//       .catch(error);
//   } else if (navigator.mozGetUserMedia) {
//     // Firefox浏览器
//     navagator
//       .mozGetUserMedia(constrains)
//       .then(success)
//       .catch(error);
//   } else if (navigator.getUserMedia) {
//     // 旧版API
//     navigator
//       .getUserMedia(constrains)
//       .then(success)
//       .catch(error);
//   }
// }
export default function FWatcher() {
  const videoRef = useRef<any>();
  const [videoStyle, setVideoStyle] = useState({ width: '360px', height: '360px',margin: '10% auto', });
  const openVideo = async () => {
    const devices = (await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='videoinput');
    // 媒体对象
    navigator.getUserMedia(
      {
        video: {
          deviceId:devices[1].deviceId
        }, // 使用摄像头对象
        audio: false, // 不适用音频
      },
      (stream: any) => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.autoplay = true;
          videoRef.current.playsinline = true;
          videoRef.current.srcObject = stream;
        }
      },
      (error: any) => {
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
      margin: '10% auto',
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
        <Decoration12 style={videoStyle} dur={5}>
          <div>
            <video ref={videoRef} autoPlay playsInline />
          </div>
        </Decoration12>
      </div>
    </div>
  );
}
