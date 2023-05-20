import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';
import Read from './read/read'

export default function Home() {
  return (
    <div>
      <Read/>
    </div>
  )
}
