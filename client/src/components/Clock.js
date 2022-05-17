import React from 'react';
import RLC from 'react-live-clock';


const format = 'ddd Y-MM-DD (YYDDDD) HH:mm:ss z';

export default function Clock() {
  return <div style={{minWidth: '320px'}}>
    <RLC format={format} ticking /> local (L)
    <br />
    <RLC format={format} ticking timezone="UTC" /> (Z)
  </div>;
};
