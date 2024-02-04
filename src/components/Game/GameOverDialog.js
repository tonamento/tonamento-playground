import React, { useEffect } from 'react';
import { Dialog, DialogContent, Box, DialogActions, DialogTitle, Button } from '@mui/material';
import Gameover from '../../img/gifs/Gameover.gif';
import html2canvas from 'html2canvas';

function GameOverDialog({
  open,
  player,
  points,
  position,
  claimableRewards,
  onConfirm,
  confirmButtonText = 'Confirm',
  setConfettiStatus
}) {

  useEffect(() => {
    setConfettiStatus(true);
  }, []);

  const handleShareButton = () => {
    html2canvas(document.querySelector('.dialog-info'), {
      useCORS: true
    }).then((canvas) => {
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob);
        
        // Fetch the ImgBB API for uploading the screenshot
        try {
          const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=20510160bf653b606d9a5458464d300e`, {
            method: 'POST',
            body: formData,
          });

          const imgbbResult = await imgbbResponse.json();

          if (imgbbResult.data.url) {
            // The returned URL from ImgBB to be inserted into the tweet
            const imageUrl = imgbbResult.data.url;
            const tweetText = `I just played as #${player} in Tonamento Games. I won ${points} points!\nCheck out my points ${imageUrl} \n\n@Tonamento #Tonamento #game #web3`;
            // Creating a Twitter URL to share the content
            const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

            // Open Twitter URL in a new tab
            window.open(twitterShareUrl, '_blank');
          } else {
            console.error('Failed to get the image URL from ImgBB');
          }
        } catch (error) {
          console.error('Failed to upload the image', error);
        }
      });
    });
  };

    const getPositionSuffix = (position) => {
      switch(position) {
        case 1: return '1st';
        case 2: return '2nd';
        case 3: return '3rd';
        default: return `${position}th`;
      }
    };

  const getMedalEmoji = (index) => {
    const medals = {
        0: <img width="20" height="20" style={{verticalAlign: 'middle'}} src="https://img.icons8.com/emoji/48/1st-place-medal-emoji.png" alt="1st-place-medal-emoji"/>,
        1: <img width="20" height="20" style={{verticalAlign: 'middle'}} src="https://img.icons8.com/emoji/48/2nd-place-medal-emoji.png" alt="2nd-place-medal-emoji"/>,
        2: <img width="20" height="20" style={{verticalAlign: 'middle'}} src="https://img.icons8.com/emoji/48/3rd-place-medal-emoji.png" alt="3rd-place-medal-emoji"/>
    };
    return medals[index] || null;
};

  return (
    <Dialog open={open} maxWidth="xl">
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', width: '25vw', height: '66vh', borderRadius: 3 }}>
        <img
          src={Gameover}
          alt="Game Over"
          style={{ width: '100%', height: '250px', display: 'block', margin: 'auto', borderRadius: 4 }}
        />
        <Box className="dialog-info" p={1} sx={{borderRadius: 4}}>
          <DialogTitle sx={{ fontFamily: 'avenir', fontWeight: 800, backgroundColor: '#1976d2', color: '#ffffff', borderRadius: 3, marginTop: 1 }}>
              Game is over #{player}
          </DialogTitle>
          <DialogContent sx={{ fontFamily: 'avenir', fontWeight: 200, backgroundColor: 'orangered', color: '#ffffff', borderRadius: 3, marginTop: 1, padding: '8px !important', overflow: 'hidden' }}>
            You scored: {points} points! <br/>
            Your rank in leaderboard: {getPositionSuffix(position)} {getMedalEmoji(position - 1)} <br/>
            Your claimable rewards: {claimableRewards}
          </DialogContent>
        </Box>
        <DialogActions sx={{ display: 'inline-flex', fontFamily: 'avenir', color: '#ffffff', borderRadius: 3, marginTop: 0.5, marginBottom: 1 }}>
          <Button
             onClick={handleShareButton}
             sx={{ fontWeight: 700, margin: '0px 3px', width: '100%', backgroundColor: 'crimson', color: '#ffffff', borderRadius: 3, fontFamily: 'avenir', padding: '10px !important' }}
             variant="contained"
           >
              Share it! <img width="30" height="30" src="https://img.icons8.com/glassmorphism/48/experimental-share-2-glassmorphism.png" alt="Share icon"/>
          </Button>
          <Button
            onClick={onConfirm}
            sx={{ fontWeight: 700, margin: '0px 3px', width: '100%', backgroundColor: 'blue', color: '#ffffff', borderRadius: 3, fontFamily: 'avenir', padding: '10px !important' }}
            variant="contained"
            autoFocus
          >
            {confirmButtonText} <img width="30" height="30" src="https://img.icons8.com/emoji/48/wrapped-gift.png" alt="Gift icon"/>
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default GameOverDialog;