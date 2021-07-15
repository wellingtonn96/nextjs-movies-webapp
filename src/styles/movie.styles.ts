import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin: 60px 0;
  }
  
  div {
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div {
      padding-bottom: 40px;
      justify-content: center;

      span {
        margin-top: 60px;
        color: red;
        font-size: 18px;
        font-weight: bold;
        text-align: center; 
      }

      p {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
`