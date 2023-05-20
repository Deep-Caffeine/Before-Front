"use client";
import axios, { AxiosResponse } from 'axios';

interface Response{
  'status' : number
}

export default function Home() {

  const fetchDelete = async () => {
    try {
      const response: AxiosResponse<Response> = await axios.get('delete url');
      console.log(response);
      if (response.status === 200) {
        alert('정상적으로 탈퇴 되었습니다.');
      }
      if (response.status === 401) {
        alert('인증되지 않아 해당 작업을 수행할 수 없습니다.');
      }
    } catch (error) {
      console.log('실패');
      console.error(error);
    }
  };

  return (
    <main>
      <button onClick={()=>{ 
        fetchDelete();
       }}>Delete</button>
    </main>
  )
}