import React from 'react';

export default function Title({ title, fontSize, margin }) {
  return <h1 className='text-3xl font-bold text-center mb-6'>{title}</h1>;
}