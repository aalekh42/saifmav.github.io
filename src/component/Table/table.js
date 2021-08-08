import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import app from '../../config/firebase-config';
import moment from 'moment'

const db = app.firestore()


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  images:{
    height: '100px',
    width: '100px'
  }
});


export default function BasicTable() {
  const classes = useStyles();
  const [data ,setData] = useState([])
    
  useEffect(() => {
    const fetch = async()=>{
      const latesData = []
      const response=db.collection('data');
      try{
        const newdata = await response.get();
        newdata.docs.forEach(item=>{
        let metadata = item.data()
        latesData.push(metadata)
        latesData.sort((a,b)=>b.createdAt-a.createdAt)
        })
      } catch(e){
        console.log(e)
      }    setData(latesData)
    }
    fetch();
  }, [])
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Old FileName</TableCell>
            <TableCell align="right">Uploaded By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((ele,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <img className={classes.images} src={ele.profile_picture} alt={ele.username}/>
              </TableCell>
              <TableCell align="right">{ele.filename}</TableCell>
              <TableCell align="right">{ele.username}-{moment(ele.createdAt).format('MMMM Do YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
