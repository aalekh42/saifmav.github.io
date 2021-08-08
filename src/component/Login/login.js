import {useEffect, useContext} from 'react'
import { Container, AppBar, Button, Toolbar, Typography, Paper  } from '@material-ui/core'
import { signInWithGoogle } from '../../services/firebase'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../provider/userProvider'
import { makeStyles } from "@material-ui/core/styles";
import './login.css'

const useStyles = makeStyles(() => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  title: {
    textAlign: "center",
    fontFamily: "fantasy",
  },
  paper: {
    textAlign: "center",
    color: "black",
    width: "20%",
    marginTop: "50px",
    margin:"auto",
    padding:"40px",
    alignItems:"center",
    justify:"center"
  },
}));

const Login = () => {
  const classes = useStyles();
  const user = useContext(UserContext)
  //const [redirect, setRedirect] = useState(null)
  
  useEffect(() => {
    if (user) {
      console.log("ðŸš€ ~ file: login.js ~ line 36 ~ useEffect ~ user", user)
      //setRedirect('/app')
    }
  }, [user])
 // console.log("ðŸš€ ~ file: login.js ~ line 41 ~ Login ~ redirect", redirect)
  if (user) {
	  return(
    <Redirect to="./app"/>
	)
  }

  return (
    <>
      <Container maxWidth='lg'>
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
           Welcome Page
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.papertitle}>
            Welcome
          </Typography>
          <Button onClick={signInWithGoogle} variant="contained" color="primary">
            Login with Google
          </Button>
        </Paper>
      </main>
      </div>
      </Container>
    </>
  )
}

export default Login;