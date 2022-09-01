import styled from 'styled-components'

export const Page = styled.div`
  min-width: 380px;
  max-width: 800px;
  background-color: #4abdac;
  margin: auto;
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;

  h1 {
    padding-left: 2px;
  }

  .tab-view {
    padding: 0px 2px;
  }
`

export const Navigation = styled.div`
  background-color: white;
  display: flex;
  padding: 2px 0px;

  a {
    display: block;
    text-decoration: none;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px 5px 8px 5px;

    :hover {
      background: #ff7954;
    }
  }

  .NavigationTab {
    margin-bottom: 5px;
    margin-right: 5px;
    margin-top: 10px;
    background-color: #fc4a1a;
  }

  #LoginInfo {
    padding: 10px 5px 5px 5px;
    width: 100%;
    margin-right: 0px;

    button {
      min-width: 70px;
    }
  }
`

export const AppName = styled.div`
  h1 {
    font-size: xxx-large;
    line-height: 20px;
    margin-bottom: 9px;
  }
  margin-bottom: 0px;
  border-bottom: ;
`

export const Button = styled.button`
  font-variant: all-small-caps;
  background: ${(props) => props.color || '#f7b733'};
  min-width: 120px;
  border-style: solid;
  border-width: 1px;

  :hover {
    background: ${(props) => props.hoverColor || '#ffca5c'};
  }
`

export const Table = styled.table`
  tr:nth-of-type(odd) td {
    background: #4b998d;
  }
`

export const BlogEntry = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  border: solid;
  border-width: 1px;
  margin-bottom: 5px;
  border-radius: 3px;

  a {
    display: block;
    text-decoration: none;
  }

  :hover {
    background: #6ec7ba;
  }
`

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  max-width: 300px;
`

export const BlogFormDiv = styled.div`
  padding-bottom: 2px;
`

export const BlogInfoDiv = styled.div`
  padding-left: 5px;

  .blog-info {
    padding-left: 0px;
    margin-bottom: 15px;
  }

  #blog-likes {
    button {
      min-width: 70px;
    }
    margin-top: -20px;
    font-size: 90%;
  }
`

export const NotificationDiv = styled.div`
  font-size: 16px;
  color: green;
  background: palegreen;
  border-radius: 5px;
  border-style: solid;
  padding: 5px;
  marginbottom: 10px;
`

export const LoginFormDiv = styled.div`
  padding-bottom: 5px;
  padding-left: 2px;
`
