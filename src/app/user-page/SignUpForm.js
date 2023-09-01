'use client';
import React, { useState, useRef, useContext, useReducer } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

// 모달 컨텍스트 생성
const ModalContext = React.createContext();

// 모달 리듀서
const modalReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
        title: action.payload.title,
        content: action.payload.content,
        onConfirm: action.payload.onConfirm,
        onCancel: action.payload.onCancel,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
        title: '',
        content: '',
        onConfirm: null,
        onCancel: null,
      };
    default:
      return state;
  }
};

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();

  const [modalState, dispatchModal] = useReducer(modalReducer, {
    isOpen: false,
    title: '',
    content: '',
    onConfirm: null,
    onCancel: null,
  });

  const openModal = (title, content, onConfirm, onCancel) => {
    dispatchModal({
      type: 'OPEN_MODAL',
      payload: { title, content, onConfirm, onCancel },
    });
  };

  const closeModal = () => {
    dispatchModal({ type: 'CLOSE_MODAL' });
  };

  const handleSignUp = event => {
    event.preventDefault();
    if (!validateUsername(username)) {
      openModal('유효성 오류', '아이디를 입력해주세요.', null, closeModal);
      return;
    }

    if (!validatePassword(password)) {
      openModal(
        '유효성 오류',
        '패스워드가 유효하지 않습니다.',
        null,
        closeModal,
      );
      passwordRef.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      openModal('유효성 오류', '이메일 형식을 확인해주세요.', null, closeModal);
      emailRef.current.focus();
      return;
    }

    // 모든 제약 조건 통과, 회원가입 처리
    console.log('회원가입 성공');
  };

  const validateUsername = username => {
    return username.length > 0;
  };

  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            회원가입
          </Typography>
          <TextField
            label="아이디"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <TextField
            type="password"
            label="패스워드"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            inputRef={passwordRef}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <TextField
            label="메일"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            inputRef={emailRef}
            sx={{ width: '100%', marginBottom: 2 }}
          />

          <Button
            onClick={handleSignUp}
            variant="contained"
            color="primary"
            fullWidth
          >
            회원가입
          </Button>
        </Paper>
      </Container>

      {/* 모달 컨텍스트 제공 */}
      <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
        <Modal />
      </ModalContext.Provider>
    </div>
  );
};

// 모달 컴포넌트 생성
const Modal = () => {
  const { modalState, closeModal } = useContext(ModalContext);

  return (
    <Dialog open={modalState.isOpen} onClose={closeModal}>
      <DialogTitle>{modalState.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{modalState.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {modalState.onCancel && (
          <Button onClick={modalState.onCancel} color="primary">
            취소
          </Button>
        )}
        {modalState.onConfirm && (
          <Button onClick={modalState.onConfirm} color="primary">
            확인
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const App = () => {
  return (
    <Router>
      {' '}
      {/* Router 컴포넌트를 감싸줍니다. */}
      <div>
        <h1>회원가입 페이지</h1>
        <SignUpForm />
      </div>
    </Router>
  );
};

export default App;
