import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  h1 {
    text-align: center;
    margin: 40px 0;
  }


  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    
    > div {
      width: 20%;
      display: flex;
      flex-direction: column;
      padding: 10px;
    }
  }
`