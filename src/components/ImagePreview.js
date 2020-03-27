import styled from 'styled-components';

const ImagePreview = styled.img`
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  border-radius: 5px;
  background-color: red;
  max-height: 100px;
  animation: fadein .7s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default ImagePreview;