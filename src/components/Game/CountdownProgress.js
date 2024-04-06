import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CountdownProgress({ totalTime, style, progressHeight, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + (100 / totalTime);
        return nextProgress >= 100 ? 100 : nextProgress;
      });
      setBuffer((prevBuffer) => {
        const nextBuffer = prevBuffer + (100 / totalTime) + 10;
        return nextBuffer >= 100 ? 100 : nextBuffer;
      });
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 1000);

    return () => {
      clearInterval(progressInterval);
    };
  }, [totalTime, progress]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          if (onComplete) {
            onComplete(); // call onComplete function prop
          }
        }
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const combinedStyles = {
    position: 'relative', // Set position for overlaying the text
    borderRadius: 10, // Set border radius for main progress body
    ...style, // Apply custom styles passed as a prop
  };

  let color = 'primary'; // default color
  if (progress >= 75 && progress <= 100) {
    color = 'error'; // red
  } else if (progress >= 50) {
    color = 'warning'; // warning
  }

  return (
    <Box sx={combinedStyles}>
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
        color={color}
        sx={{ height: progressHeight ?? 4, borderRadius: 10, border: '4px solid #2C2C2C'}}
      />
      <Typography
        variant="body2"
        color="text.primary"
        sx={{
          position: 'absolute',
          width: '100%',
          height: progressHeight ?? 4, // Set height used in LinearProgress if provided, otherwise fallback to default
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none', // Prevent the Typography from blocking clicks on the LinearProgress
          fontFamily: 'gumdrop',
          fontSize: '30px'
        }}
      >
        {`Time left: ${timeLeft}s`}
      </Typography>
    </Box>
  );
}

export default CountdownProgress;