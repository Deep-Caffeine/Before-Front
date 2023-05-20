"use client";
import axios from 'axios';
import { useState } from 'react'

interface Database {
  email: string;
  username: string;
  phone: string;
  birth: string;
  profile_url: string;
  level: number;
  sns: string[];
}

export default function Read() {
    const [data, setData] = useState<Database | null>(null);
  
    async function fetchRead() {
      try {
        const response = await axios.get('read_url'); 
        const jsonData: Database = response.data;
        setData(jsonData);
        if (response.status == 200){
           console.log('정상적으로 처리됨')
        }
      } catch (error) {
        console.error('에러발생 : ', error);
      }
    }

  return (
    <div>
      <button onClick={fetchRead}>Read</button>
      {data && (
        <div>
          <p>Email: {data.email}</p>
          <p>Username: {data.username}</p>
          <p>Phone: {data.phone}</p>
          <p>Birth: {data.birth}</p>
          <img src={data.profile_url} alt="Profile" />
          <p>Level: {data.level}</p>
          <p>SNS: {data.sns.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
