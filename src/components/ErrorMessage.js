import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import AnimatedFadeIn from './styles/AnimatedFadeIn';

const ErrorMsg = styled.div`
  ${AnimatedFadeIn}
`;

const ErrorMessage = () => {
  return (
    <ErrorMsg>
      <Typography variant="subtitle1" color="secondary">Error occurred while fetching :/</Typography>
    </ErrorMsg>
  );
};

export default ErrorMessage;