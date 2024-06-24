import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/Create';
import CodeIcon from '@mui/icons-material/Code';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';
import './chatbox.css';


function Chatbox({ api_key }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState(true);

  const message = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }
    setTyping(true);
    setResult((prev) => {
      return [...prev, { question: query, from: 'user' }];
    });

    run(query);
    setQuery(''); // clear the input field after submitting
  };

  const genAI = new GoogleGenerativeAI(api_key);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async function run(question) {
    setTyping(true);
    const prompt = question;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    setResult((prev) => {
      return [...prev, { answers: text, to: 'bot' }];
    });
    setTyping(false);
  }

  return (
    <div className={`chatbox ${mode ? 'light-mode' : 'dark-mode'}`}>
      <header>
        <div className='icon-top'><AccountCircleIcon />
        &nbsp;&nbsp;<span>Chatbox AI</span></div>
        <div>
        {mode ? (
          <LightModeIcon
            className="my-icon"
            onClick={() => setMode(false)}
            sx={{
              marginLeft: 50,
              '&:hover': {
                transform: 'scale(1.2)',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          />
        ) : (
          <Brightness3Icon
           className="my-icon"
            onClick={() => setMode(true)}
            sx={{
              '&:hover': {
                transform: 'scale(1.2)',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          />
        )}
        </div>
      </header>
      <div className="chat">
        {result.length <= 0 ? (
          <div className="cards">
            <img src="src/assets/5208996.jpg" alt="logo" height="40px" width="40px" style={{ borderRadius: '50%' }} />
            <div className="card-content">
              <Card
                className="my-card"
                sx={{
                  width: 300,
                  transition: '0.3s',
                  '&:hover': { backgroundColor: mode ? '#e0e0e0' : '#424242' },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <SchoolIcon sx={{ marginRight: 3, fontSize: 20 }} />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Education:  Set goals and achieve them.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: 300,
                  transition: '0.3s',
                  '&:hover': { backgroundColor: mode ? '#e0e0e0' : '#424242' },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <AssignmentIcon sx={{ marginRight: 3, fontSize: 20 }} />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Create a personal webpage and start searching.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: 300,
                  transition: '0.3s',
                  '&:hover': { backgroundColor: mode ? '#e0e0e0' : '#424242' },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <CreateIcon sx={{ marginRight: 3, fontSize: 20 }} />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Develop a workout plan
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card
                sx={{
                  width: 300,
                  transition: '0.3s',
                  '&:hover': { backgroundColor: mode ? '#e0e0e0' : '#424242' },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <CodeIcon sx={{ marginRight: 3, fontSize: 20 }} />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Find optimized code solutions.                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
        {result.map((data, index) => {
          if (data.from === 'user') {
            return (
              <div className="user-message" key={index}>
                <p className="message">
                  <img src="src/assets/message_9364236.png" height="40px" width="40px" style={{ borderRadius: '50%' }} />
                  &nbsp;&nbsp;{data.question}
                </p>
              </div>
            );
          } else {
            return (
              <div className="bot-message" key={index}>
                <p className="message">
                  <img src="src/assets/5208996.jpg" height="40px" width="40px" style={{ borderRadius: '50%' }} />
                  &nbsp;&nbsp;{data.answers}
                </p>
              </div>
            );
          }
        })}
        {typing && (
          <div className="bot-message">
            <p className="message">
              <img src="src/assets/5208996.jpg" height="40px" width="40px" style={{ borderRadius: '50%' }} />
              &nbsp;&nbsp; typing...
            </p>
          </div>
        )}
      </div>
      <div className="input-field">
        <input
          type="text"
          placeholder="Enter your query"
          value={query}
          onChange={message}
          style={{ color: mode ? 'black' : 'white', backgroundColor: mode ? 'white' : 'black' }}
        />
        &nbsp;&nbsp;{!typing ? (
          <span onClick={handleSubmit}>
            <SendIcon />
          </span>
        ) : (
          <div className="loader">
            <img src={mode ? ('src/assets/loader2.gif') : ('src/assets/darkloader.gif')} height="30px" alt="loader" style={{ background: 'transparent' }} />            </div>
        )}
      </div>
    </div>
  );
}

export default Chatbox;
