import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { themeOptions } from '../components/Theme'
import { TextField, Switches } from 'mui-rff'
import { Form } from 'react-final-form'

const useStyles = makeStyles((theme) => ({
  root: {
    justifyItems: 'center',
    minHeight: '65vh',
    minWidth: '100%',
    bottom: theme.spacing(7)
  },
  content: {
    position: 'relative',
    minWidth: '50vh',
    top: theme.spacing(7)

  },
  media: {
    height: 140,
    width: 300
  },
  search: {
    backgroundColor: theme.palette.primary.dark
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark
    },
    '&:active': {
      color: '#616161'
    }
  }
}
))

export default function Ideas ({ userProvider, ideaFactory, userAddress }) {
  const classes = useStyles(themeOptions)
  const [values, setValues] = useState(null)

  async function validate (values) {

  }
  return (
    <Container className={classes.root}>
      <Grid container direction='column' justify='space-around' alignItems='stretch' className={classes.content}>
        <Grid item>
          <Form
            initialValues={{
              proposal_bypass: true,
              name: '',
              symbol: '',
              description: ''
            }}
            onSubmit={(values) => {
              console.log(values)
              setValues(values)
            }}
            validate={validate}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Switches
                  label='Bypass Proposal System?'
                  name='proposal_bypass'
                  data={{ label: 'bypass', value: false }}
                  color='primary'
                />
                <TextField label='Name' name='name' required type='string' />
                <TextField label='Symbol' name='symbol' required type='string' />
                <TextField label='Description' name='description' required type='string' multiline />
                <Button type='submit' color='primary' variant='outlined'>
                  Create
                </Button>
              </form>
            )}
          />
        </Grid>
        {
        values &&
          <Grid item>
            <Typography variant='h6'>  You have submitted an idea with the following values! </Typography>
            <Typography variant='subtitle1'>Note: This is a WIP and is not currently a working feature</Typography>
            <Typography variant='body1'>
              Bypass Proposal System: {`${values.proposal_bypass}`}
            </Typography>
            <Typography variant='body1'>
              Name: {values.name}
            </Typography>
            <Typography variant='body1'>
              Symbol: {values.symbol}
            </Typography>
            <Typography variant='body1'>
              Description: {values.description}
            </Typography>
          </Grid>
      }
      </Grid>
    </Container>
  )
}
