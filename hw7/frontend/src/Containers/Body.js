import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { TableContainer, TableCell, TableBody, TableHead, TableRow, Table, TableSortLabel } from '@material-ui/core';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 100px;
  padding: 2em;
  overflow: auto;
`;

const headCells = [
  {
    id: 'name',
    th: true,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'subject',
    th: false,
    disablePadding: false,
    label: 'Subject',
  },
  {
    id: 'score',
    th: false,
    disablePadding: false,
    label: 'Score',
  },
];

function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.th ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Body = (props) => {
  const {rows, setRows, table, setTable} = props

  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);
  const [tab, setTab] = useState(0);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);

    const {
      data: { datas },
    } = await axios.get('/api/query-cards', {
      params: {
        type: "name",
        queryString: name,
      },
    });
    console.log(datas)
    setTable(true);
    setRows(datas);
  };

  const handleQuery = async () => {
    const {
      data: { messages, message, datas },
    } = await axios.get('/api/query-cards', {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (!messages) {
      addErrorMessage(message);
      setTable(false);
    } else {
      addRegularMessage(...messages);
      setRows(datas);
      setTable(true);
    }
  };

  const handleTabChange = (event, newValue) => {
    addCardMessage("");
    setTab(newValue);
    setTable(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Wrapper>
      <Tabs 
        value={tab} 
        onChange={handleTabChange} 
        indicatorColor="secondary"
        textColor="inherit"
        centered
      >
        <Tab label="Add" />
        <Tab label="Query" />
      </Tabs>
      {
        tab === 0 ? 
        <>
          <Row>
            {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
            <TextField
              className={classes.input}
              placeholder="Name"
              value={name}
              onChange={handleChange(setName)}
              />
            <TextField
              className={classes.input}
              placeholder="Subject"
              style={{ width: 240 }}
              value={subject}
              onChange={handleChange(setSubject)}
              />
            <TextField
              className={classes.input}
              placeholder="Score"
              value={score}
              onChange={handleChange(setScore)}
              type="number"
              />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!name || !subject}
              onClick={handleAdd}
              >
              Add
            </Button>
          </Row> 
          <ContentPaper variant="outlined">
            {messages.map((m, i) => (
              <Typography variant="body2" key={m + i} style={{ color: m.color }}>
                {m.message}
              </Typography>
            ))}
          </ContentPaper> 
        </>:
        <Row>
          <StyledFormControl>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={queryType}
                onChange={handleChange(setQueryType)}
              >
                <FormControlLabel
                  value="name"
                  control={<Radio color="primary" />}
                  label="Name"
                />
                <FormControlLabel
                  value="subject"
                  control={<Radio color="primary" />}
                  label="Subject"
                />
              </RadioGroup>
            </FormControl>
          </StyledFormControl>
          <TextField
            placeholder="Query string..."
            value={queryString}
            onChange={handleChange(setQueryString)}
            style={{ flex: 1 }}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={!queryString}
            onClick={handleQuery}
          >
            Query
          </Button>
        </Row>
      }   
      {
        (table && rows.length > 0) ?
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
          />
          <TableBody>
            { stableSort(rows, getComparator(order, orderBy))
              .map((row) => (
              <TableRow
                key={row.subject}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center" >
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.subject}</TableCell>
                <TableCell align="center">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : 
      (tab === 1 ?
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper> : <></>
      )
    }
    </Wrapper>
  );
};

export default Body;
