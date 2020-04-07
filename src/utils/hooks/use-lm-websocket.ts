import { useEffect, useMemo, useRef } from 'react';
import useWebSocket from 'react-use-websocket';

function useLmWebSocket(url: string) {
  const didUnmount = useRef(false);
  const options = useMemo(
    () => ({
      shouldReconnect: (closeEvent: any) => {
        return didUnmount.current === false; // useWebSocket will handle unmounting for you, but this is an example of a case in which you would not want it to automatically reconnect
      },
      share: true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }),
    [],
  );

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  });
  return useWebSocket(url, options);
}
export default useLmWebSocket;
