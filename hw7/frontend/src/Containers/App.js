import Header from './Header';
import Body from './Body';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
`;

function App() {
  const [table, setTable] = useState(false);
  const [rows, setRows] = useState([])

  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Header setRows={setRows} setTable={setTable} />
        <Body rows={rows} setRows={setRows} table={table} setTable={setTable}/>
      </StyledPaper>
    </Wrapper>
  );
}

export default App;
