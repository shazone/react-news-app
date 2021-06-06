import { useState,useEffect } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  table: {
    minWidth: 700,
  },
}));


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const App = () => {
  //state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); //default keyword
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);

  const classes = useStyles();


  //fetch news
  const fetchNews = () => {
    setLoading(true);
    fetch(url)
    .then(result => result.json())
    //.then(data =>console.log(data));
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  },[url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit =(e)=>{
     e.preventDefault();
     setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  };

  const showLoading = () => ( loading ? <BorderLinearProgress variant="determinate" value={50} /> :"");

  const searchForm = () => (
    
    <div style={{position:"flex", padding:"5px"}}>
      <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Your News Search Here" variant="outlined" value={searchQuery} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" className={classes.margin}>
          Search
        </Button>        
        {showLoading()}
      </form>       
    </div>
  );

  const showNews = () => (
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">Author</StyledTableCell>
            <StyledTableCell align="left">Published On</StyledTableCell>
            <StyledTableCell align="left">URL Link</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {news.map((n,i)=>  (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
              {i+1}
              </StyledTableCell>
              <StyledTableCell align="left">{n.title}</StyledTableCell>
              <StyledTableCell align="left">{n.author}</StyledTableCell>
              <StyledTableCell align="left">{n.created_at}</StyledTableCell>
              <StyledTableCell align="left"><a href={n.url}>Click For News</a></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>      
  );

  return (
    <div>
    <h2>Simple News App using (hn.algolia.com/api) with reactJs/material ui</h2>  
    {searchForm()}
    {showNews()}
    </div> 
  )  
};

export default App;
