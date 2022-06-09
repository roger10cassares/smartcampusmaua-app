import React from "react";
import styled from "styled-components/native"

interface CameraScreenContainerProps {
    readonly isPortrait: boolean;
  }

export const CameraScreenContainer = styled.View<CameraScreenContainerProps>`
  flex: 1;
  flex-direction: ${props => props.isPortrait ? 'column' : 'row'};
  flex-wrap: wrap;
  align-content: stretch;
`