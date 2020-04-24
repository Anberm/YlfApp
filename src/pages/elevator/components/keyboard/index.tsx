import useLmWebSocket from '@/utils/hooks/use-lm-websocket';
import { lmTimeOut, chunkArray } from '@/utils/utils';
import BorderBox11 from '@jiaminghi/data-view-react/es/borderBox11';
import { Carousel, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import KeyBtn from './btn';
import Decoration12 from './decoration12';
import { queryFloor } from '@/services/floor';

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
  const [floorList, setFloorList] = useState<any[][]>([[1, 2, 3, 4, 5]]);
  const [winHeight, setWinHeight] = useState(window.innerHeight - 85);
  const [arrived, setArrived] = useState(false);
  const [floorSend, floorMsg, floorState] = useLmWebSocket(
    'ws://127.0.0.1:8201/app/sch/tofloor ',
  );
  const [dataSend ,dataMsg, dataState] = useLmWebSocket(
    'ws://127.0.0.1:8202/app/sch/changedata ',
  );
  const clickedRef = useRef<number[]>(clickedList);
  const onChange = (index: number) => {
    console.log(index);
  };

  useEffect(() => {
    const listener = () => {
      setWinHeight(window.innerHeight - 85);
    };

    queryFloor().then(f => {
      console.log('33333333333');
      console.log(f);
    });

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

  useEffect(() => {
    console.log(floorMsg);
    if (floorMsg) {
      // const arr = chunkArray(JSON.parse(lastMessage.data), PAGE_SIZE);
      // setFloorList(arr);
    }
    return () => {};
  }, [floorMsg]);

  useEffect(() => {
    console.log(dataMsg);
    if (dataMsg) {
      // const arr = chunkArray(JSON.parse(lastMessage.data), PAGE_SIZE);
      // setFloorList(arr);
    }
    return () => {};
  }, [dataMsg]);

  const onKeyClick = (data: number) => {
    const isInclude = clickedList.includes(data);
    if (!isInclude) {
      setClickedList(c => {
        const l = [...c];
        l.push(data);

        console.log(l);

        return l;
      });
    }
    setBoxTitle(`到${data}层`);
    setArrived(true);
    lmTimeOut(() => {
      setBoxTitle(BOX_TITLE);
      setArrived(false);
      setTimeout(() => {
        arriveFloor(data);
      }, 1000 * 6);
    }, 1000 * 2);
  };
  const arriveFloor = (data: number) => {
    setClickedList(c => {
      const l = [...c];
      const index = l.findIndex(e => e === data);
      l.splice(index, 1);
      console.log(l);
      return l;
    });
  };

  return (
    <BorderBox11 title={boxTitle}>
      <div className="kb-container">
        <Decoration12 style={videoStyle} dur={2} className={arrived ? '' : 'arrived-hidden'}>
          <div className="arrived-tips">B</div>
        </Decoration12>

        <Carousel
          draggable
          afterChange={onChange}
          style={{ height: winHeight }}
          className={arrived ? 'arrived-hidden' : ''}
        >
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
      </div>
    </BorderBox11>
  );
}
