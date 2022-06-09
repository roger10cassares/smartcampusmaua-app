import React from "react";
import styled from "styled-components/native"

interface MapScreenContainerProps {
    readonly isPortrait: boolean;
  }

export const MapScreenContainer = styled.View<MapScreenContainerProps>`
  flex: 1;
  flex-direction: ${props => props.isPortrait ? 'column' : 'row'};
  flex-wrap: wrap;
  align-content: stretch;
`