import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';
import Read from '../pages/user/read'

export default function Home() {
  return (
    <div>
      <Read/>
    </div>
  )
}
