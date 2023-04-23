import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Spinner animation="border" variant="dark" />
        <h3 style={{ color: 'black' }}>Curating your experience...</h3>
      </div>
    </div>
  );
};

export default LoadingScreen;
