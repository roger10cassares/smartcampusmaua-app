import React from 'react';
import { Camera } from '../../components/Camera'
import { useScreenInfo } from '../../hooks/useScreenInfo';
import { CameraScreenContainer } from './styles';


export const CameraScreen = () => {
  const orientation = useScreenInfo().isPortrait;
  
  return (
    <CameraScreenContainer isPortrait={orientation}>
      <Camera />
    </CameraScreenContainer>
  )
}