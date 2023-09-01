'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isModalOpen, setModalOpen] = React.useState(false);

  const onSubmit = data => {
    if (data.username === 'helloworld' && data.password === 'Qwer!234') {
      console.log('로그인 성공:', data.username);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f0f0f0',
      }}
    >
      <h1 style={{ marginBottom: '20px', color: '#333' }}>로그인 페이지</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '300px',
          padding: '20px',
          background: 'white',
          borderRadius: '5px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register('username', { required: true })}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
          {errors.username && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              아이디를 입력해주세요.
            </p>
          )}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">패스워드</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register('password', { required: true })}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
          {errors.password && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              패스워드를 입력해주세요.
            </p>
          )}
        </div>
        <button
          type="submit"
          style={{
            background: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            padding: '10px',
            cursor: 'pointer',
          }}
        >
          로그인
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        style={{ content: { width: '300px', margin: 'auto' } }}
      >
        <p>아이디 또는 패스워드가 올바르지 않습니다.</p>
        <button
          onClick={() => setModalOpen(false)}
          style={{
            background: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            padding: '8px',
            cursor: 'pointer',
          }}
        >
          닫기
        </button>
      </Modal>
    </div>
  );
};

export default App;
