import useLmWebSocket from '@/utils/hooks/use-lm-websocket';
import BorderBox11 from '@jiaminghi/data-view-react/es/borderBox11';
import { Carousel, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { chunkArray } from '@/utils/utils';

const READY_STATE_OPEN = 1;
const PAGE_SIZE = 20;
export default function FKeyboard() {
  const [floorList, setFloorList] = useState<any[][]>([
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  ]);
  const [winHeight, setWinHeight] = useState(window.innerHeight - 85);
  const [sendMessage, lastMessage, readyState] = useLmWebSocket('wss://echo.websocket.org');

  const onChange = (index: number) => {
    console.log(index);
  };

  useEffect(() => {
    const listener = () => {
      setWinHeight(window.innerHeight - 85);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

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

  return (
    <BorderBox11 title="请选择要到的楼层">
      <div className="kb-container">
        <Carousel draggable afterChange={onChange} style={{ height: winHeight }}>
          {floorList.map((f, index) => (
            <div key={`kb-${index}`}>
              <Row gutter={[16, 16]} justify="start" align="middle" className="kb-panel">
                {f.map((d, i) => (
                  <Col span={6} key={`kb-item-${i}`}>
                    <div className="kb-item1">{d}</div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
      </div>
    </BorderBox11>
  );
}
