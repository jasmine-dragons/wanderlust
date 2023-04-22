import { NextPage } from 'next';
import { useEffect } from 'react';
import io from 'socket.io-client';

let socketHandler;

const SocketTest: NextPage = () => {
  const socketInitializer = async () => {
    await fetch('/api/socket');
    socketHandler = io();

    socketHandler.on('connect', () => {
      console.log('connected');
    });
  };
  useEffect(() => {
    socketInitializer();
  }, []);
  return <div>Hi</div>;
};

export default SocketTest;
