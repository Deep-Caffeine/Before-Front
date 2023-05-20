"use client";
import axios, { AxiosResponse } from 'axios';
import Popup from '@/delete/popup';
import { useState } from 'react';

interface Response{
  'status' : number
}

export default function Home() {

  return (
    <main>
      <Popup></Popup>
    </main>
  )
}