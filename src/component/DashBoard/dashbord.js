/* eslint-disable react-hooks/rules-of-hooks */
import {useContext, useState, useEffect} from 'react'
import Table from '../Table/table'
import Upload from '../Upload/upload'
import { Redirect } from 'react-router-dom'
import { Container, Grid, Grow, AppBar, Typography, Button,Toolbar } from '@material-ui/core'
import { UserContext } from "../../provider/userProvider";
import { logOut } from "../../services/firebase"
import useStyle from '../../style'

const dashbord = () => {
    const classes = useStyle()

    const user = useContext(UserContext);
    const [redirect, setredirect] = useState(null);
  
    useEffect(() => {
      if (!user) {
        setredirect("/login");
      }
    }, [user]);
    if (redirect) { 
      <Redirect to={redirect} />;
    }
  return (
    <>
          <AppBar position="static">
          <Toolbar>
          <Grid item xs={6} sm={10}>
                <Typography variant="h6" >
                  Dashboard
                </Typography>
              </Grid>
              <Grid item xs={4} sm={1}>
              <Typography >
                  {/* Hello,{user.displayName} */}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={1}>
                <Button color="inherit" onClick={logOut}>Logout</Button>
                
              </Grid>
              {console.log("logout ",logOut)}
          </Toolbar>
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justifyContent='space-between' alignItems='stretch'>
              <Grid item xs={12} sm={7}>
                <AppBar
                  className={classes.appBar}
                  position='static'
                  color='inherit'
                >
                  <Table />
                </AppBar>
              </Grid>
              <Grid item xs={12} sm={4} alignItems='stretch'>
                <AppBar
                  className={classes.appBar}
                  position='static'
                  color='inherit'
                >
                  < Upload/>
                </AppBar>
              </Grid>
            </Grid>
          </Container>
        </Grow>
     
    </>
  )
}

export default dashbord;
