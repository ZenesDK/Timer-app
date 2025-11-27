import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [inputSeconds, setInputSeconds] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStart = () => {
    const sec = parseInt(inputSeconds);
    if (sec > 0) {
      setSeconds(sec);
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setSeconds(0);
    setInputSeconds('');
    setIsActive(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h1>Таймер обратного отсчёта</h1>
      
      <div className="time-display">
        {formatTime(seconds)}
      </div>

      <div className="controls">
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
          placeholder="Введите секунды"
          min="1"
          disabled={isActive}
        />
        
        <button 
          onClick={handleStart} 
          disabled={isActive || !inputSeconds}
        >
          Старт
        </button>
        
        <button 
          onClick={handlePause} 
          disabled={!seconds}
        >
          {isActive ? 'Пауза' : 'Продолжить'}
        </button>
        
        <button onClick={handleReset}>
          Сброс
        </button>
      </div>
    </div>
  );
};

export default App;