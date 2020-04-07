import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

export interface KeyBtnProps {
  children: React.ReactNode;
  clickedList: number[];
  data: number;
  onKeyClick: (k: number) => void;
}
const KeyBtn = (props: KeyBtnProps) => {
  const { children, clickedList, data, onKeyClick } = props;
  const [classNames, setClassNames] = useState('kb-item');
  useEffect(() => {
    if (clickedList) {
      const isActive = clickedList.includes(data);
      setClassNames(classnames('kb-item', isActive ? 'kb-item-selected' : ''));
    }
  }, [clickedList]);

  return (
    <>
      <div
        className={classNames}
        onClick={() => {
          onKeyClick(data);
        }}
      >
        {children}
      </div>
    </>
  );
};
export default KeyBtn;
