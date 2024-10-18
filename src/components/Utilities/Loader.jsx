import React from 'react';
import { InfinitySpin, RotatingLines } from 'react-loader-spinner';

export const Loader = () => {
  return <InfinitySpin visible={true} width="150" color="#4fa94d" ariaLabel="infinity-spin-loading" />;
};

export const ProductUploadLoader = () => {
  return <RotatingLines
  visible={true}
  height="96"
  width="96"
  color="grey"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
};
