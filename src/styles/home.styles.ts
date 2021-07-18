import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  h1 {
    text-align: center;
    margin: 40px 0;
  }

  form {
    display: flex;
    justify-content: center;

    input {
      margin-bottom: 40px;
      height: 40px;
      width: 250px;
      border: 0;
      background-color: #ffffff;
      border-radius: 5px;
      padding: 0 20px;
      font-size: 16px;
    }
    
    button {
      height: 40px;
      background-color: #111111;
      font-weight: bold;
      color: #ffffff;
      padding: 0 10px;
      border: 0;
    }
  }
    
  p {
    text-align: center;
    font-weight: bold;
  }
`

export const MoviesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  
  > div {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    @media(max-width: 760px) {
      width: 100%;
    }
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
`