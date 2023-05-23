"use client";
import { UserDeleteResponseDto } from '@/types/delete';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';


export default function Popup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pw, set_pw] = useState<string>("");
  const [isS, set_isS] = useState<boolean>(false);
  const AUTH_API_BASE_URL = 'https://www.ideaconnect.online';
  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const fetchDelete = async () => {
    try {
      const response: AxiosResponse<UserDeleteResponseDto> = await axios.get(`${AUTH_API_BASE_URL}/auth`);
      if (response.status === 200) {
        alert('정상적으로 탈퇴 되었습니다.');
      }
      if (response.status === 401) {
        alert('인증되지 않아 해당 작업을 수행할 수 없습니다.');
      }
    } catch (error) {
        alert('탈퇴 요청 실패')
    }
  };

  const fetchAuthentication = async () =>{

    try{
      const response: AxiosResponse<Response> = await axios.post(`${AUTH_API_BASE_URL}/login`,{
        'id' : '쿠키에 저장되어있던 id',
        'pw' : pw
      })
      if (response.status === 200) {
        alert('인증에 성공했습니다');
        closePopup()
        set_isS(true);
      }
      if (response.status === 401) {
        alert('비밀번호를 확인해 주세요');
        
      }
    } catch (error) {
        alert('인증 요청 실패, 다시 시도해 주세요')
        closePopup()
    }
  }

  return (
    <div>
        {
            isS ? <button onClick={openPopup}>탈퇴하기(인증)</button> : <button onClick={fetchDelete}>탈퇴하기</button>
        }
      

        {isOpen && (
            <div className="popup">
            <div className="popup-content">
                <h1>본인 인증</h1>
                <p>확인을 위해 비밀번호를 입력해 주세요</p>
                <input type='password' onChange={(e)=> { set_pw(e.target.value) }}/>
                <button onClick={()=>{ fetchAuthentication() }}>제출</button><br/>
                <button onClick={closePopup}>닫기</button>
            </div>
            </div>
        )}

        <button onClick={()=>{isS ? set_isS(false) : set_isS(true)}}>2중 인증 상태 변경</button>
        <p>현재 인증 상태</p>
        {
            isS ? <p>인증 안됨</p> : <p>인증 됨</p>
        }
      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}