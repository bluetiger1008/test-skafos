import styled from 'styled-components'

const CardContainer = styled.div`
  position: fixed;
  width: 250px;
  height: 365px;
  transition: all ease 1s;
  cursor: pointer;

  ${(props) =>
    props.position === 'player1'
      ? `
      left: 100px;`
      : `
      right: 100px;
    `}

  top: ${(props) => props.positionTop}px;

  ${(props) =>
    props.isFlipped &&
    `
    top: 50%;
    ${
      props.position === 'player1'
        ? 'left: calc(50% - 250px);'
        : 'right: calc(50% - 250px);'
    };
    transform: translateY(-50%);
    z-index: ${props.zIndex};
  `}

  .react-card-flip {
    height: 100%;

    .react-card-front {
      background-color: #2c8f79;
      border: 5px solid #2f3748;
      box-sizing: border-box;
    }

    .react-card-back {
      img {
        width: 250px;
        height: 365px;
      }
    }
  }
`

export default CardContainer
