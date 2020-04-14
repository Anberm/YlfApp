import useLmWebSocket from '@/utils/hooks/use-lm-websocket';
import { lmTimeOut } from '@/utils/utils';
import BorderBox11 from '@jiaminghi/data-view-react/es/borderBox11';
import { Carousel, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import KeyBtn from './btn';
import Decoration12 from './decoration12';

const READY_STATE_OPEN = 1;
const PAGE_SIZE = 20;
const BOX_TITLE = '请选择要到的楼层';
export default function FKeyboard() {
  const [videoStyle, setVideoStyle] = useState({
    width: '660px',
    height: '660px',
    margin: '10% auto',
  });
  const [boxTitle, setBoxTitle] = useState(BOX_TITLE);
  const [clickedList, setClickedList] = useState<number[]>([]);
  const [floorList, setFloorList] = useState<any[][]>([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  ]);
  const [winHeight, setWinHeight] = useState(window.innerHeight - 85);
  const [arrived, setArrived] = useState(false);
  const [sendMessage, lastMessage, readyState] = useLmWebSocket('wss://echo.websocket.org');

  const onChange = (index: number) => {
    console.log(index);
  };

  useEffect(() => {
    const listener = () => {
      setWinHeight(window.innerHeight - 85);
    };
    calculateWidth();
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  const calculateWidth = () => {
    const winWidth = document.body.clientWidth;
    const w = Math.floor(winWidth * 0.4);
    setVideoStyle({
      width: `${w}px`,
      height: `${w}px`,
      margin: '10% auto',
    });
  };

  // useEffect(() => {
  //   if (readyState === READY_STATE_OPEN) {
  //     sendMessage(
  //       '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]',
  //     );
  //   }
  // }, [readyState]);
  // useEffect(() => {
  //   if (lastMessage) {
  //     const arr = chunkArray(JSON.parse(lastMessage.data), PAGE_SIZE);
  //     setFloorList(arr);
  //   }
  //   return () => {

  //   };
  // }, [lastMessage]);

  const onKeyClick = (data: number) => {
    const isInclude = clickedList.includes(data);
    if (!isInclude) {
      setClickedList([...clickedList, data]);
    }
    setBoxTitle(`到${data}层`);
    setArrived(true);
    lmTimeOut(() => {
      setBoxTitle(BOX_TITLE);
      setArrived(false);
    }, 1000 * 2);
  };

  const arriveFloor = () => {};

  return (
    <BorderBox11 title={boxTitle}>
      <div className="kb-container">
        {arrived && (
          <Decoration12 style={videoStyle} dur={2}>
            <div className="arrived-tips">B</div>
          </Decoration12>
        )}
        {!arrived && (
          <Carousel draggable afterChange={onChange} style={{ height: winHeight }}>
            {floorList.map((f, index) => (
              <div key={`kb-${index}`}>
                <Row gutter={[16, 16]} justify="start" align="middle" className="kb-panel">
                  {f.map((d, i) => (
                    <Col span={6} key={`kb-item-${i}`}>
                      <KeyBtn clickedList={clickedList} data={d} onKeyClick={onKeyClick}>
                        {d}
                      </KeyBtn>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </BorderBox11>
  );
}
