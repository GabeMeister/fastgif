import styled from 'styled-components';

import AnimatedFadeIn from './styles/AnimatedFadeIn';

const ImagePreview = styled.img`
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  border-radius: 5px;
  background-color: red;
  max-height: 100px;
  ${AnimatedFadeIn}
`;

export default ImagePreview;