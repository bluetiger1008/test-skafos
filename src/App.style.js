import styled from 'styled-components'

const Desk = styled.div`
  p.point-1 {
    position: fixed;
    left: 100px;
    top: 50px;
  }

  p.point-2 {
    position: fixed;
    right: 100px;
    top: 50px;
  }

  .btn__replay {
    position: fixed;
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
  }
`

export { Desk }
