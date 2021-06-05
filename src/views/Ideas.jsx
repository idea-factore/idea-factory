import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { parseBytes32String } from '@ethersproject/strings'
import { BigNumber } from '@ethersproject/bignumber'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Image from 'material-ui-image'
import SearchBar from 'material-ui-search-bar'
import Button from '@material-ui/core/Button'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import { themeOptions } from '../components/Theme'
import { TextField } from 'mui-rff'
import { Popup, DashboardCard } from '../components'

const useStyles = makeStyles((theme) => ({
  root: {
    justifyItems: 'center',
    minHeight: '100%',
    minWidth: '100%'
  },
  content: {
    position: 'relative',
    minHeight: '100vh',
    top: theme.spacing(2)

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

// Move these contract calls to effector and make it a Effect or an Event
export default function Ideas ({ userProvider, poolCoordinator, ideaFactory, userAddress }) {
  const { address } = useParams()
  const [visible, setVisible] = useState(false)
  const [ideas, setIdea] = useState(null)
  const [pool, setPool] = useState(null)
  const [event, setEvent] = useState({})
  const classes = useStyles(themeOptions)

  const listener = (event) => {
    console.log('Event happened: ', event)
    setEvent(event)
  }
  poolCoordinator.contract.on('stakedToIdea', listener)

  // const createdChildPool = useEventListener(readContracts, "PoolCoordinator", "createdChildPool", localProvider, 1);
  useEffect(() => {
    // TODO this is inefficient, we should only fetch the ideas here
    const data = poolCoordinator.contract.getChildPoolData(address).then(data => { return { ...data } })
    console.log('Got data.', data)
    Promise.resolve(data).then((result) => {
      // setIdea(result.ideas);
      console.log('Setting pool', result)
      setPool(result)
      const ideas = result.ideas.map(id => {
        const values = [id, ideaFactory.contract.getName(id), ideaFactory.contract.getVotes(id)]
        return Promise.allSettled(values).then(value => {
          console.log(value)
          return {
            id: value[0],
            name: value[1],
            votes: value[2]
          }
        })
      })
      Promise.allSettled(ideas).then((res) => {
        console.log('Got result ', res)
        setIdea(res)
      })
    })
  }, [event, address, poolCoordinator, ideaFactory])

  const voteOnIdea = (values) => {
    console.log('Voting on idea: ', values)
    console.log(values.id)
    poolCoordinator.contract.connect(userProvider.getSigner()).stakeToIdea(address, BigNumber.from(values.votes), userAddress, values.id)
  }

  // add validation hear to check whether they have enough votes
  // will still need validation in contract though
  async function validate (values) {
    if (values.votes <= 0) {
      return { vote: 'Number of votes must be greater than 0' }
    }
  }
  return (
    <Container className={classes.root}>
      <Popup
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        title='Vote on Idea'
        onCreate={voteOnIdea}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <TextField label='Votes' name='votes' required type='number' />
            <Button
              autoFocus onClick={() => {
                setVisible(false)
              }} color='primary'
            >
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Create
            </Button>
          </form>
        )}
        validate={validate}
      />
      {
                  (ideas && ideas.length >= 1) &&
                    <Grid
                      container className={classes.content}
                      direction='column'
                      justify='flex-start'
                      alignItems='stretch'
                    >
                      <Grid
                        item
                        container
                        direction='column'
                        justify='flex-end'
                        alignItems='stretch'
                      >
                        {pool &&
                          <Grid item>
                            <Breadcrumbs aria-label='breadcrumb'>
                              <Link className={classes.link} to='/'>
                                Home
                              </Link>
                              <Link className={classes.link} to='/pools'>
                                Pools
                              </Link>
                              <Link className={classes.link} to={`/childpools/${pool.parent}`}>
                                {pool.name}
                              </Link>
                              <Typography color='textPrimary'>Ideas</Typography>
                            </Breadcrumbs>
                          </Grid>}
                        <Grid item>
                          <SearchBar
                            className={classes.search}
                            onChange={() => console.log('onChange')}
                            onRequestSearch={() => console.log('onRequestSearch')}
                            style={{
                              margin: '0 auto',
                              minWidth: '100%'
                            }}
                          />
                        </Grid>
                      </Grid>
                      {/**
                     * Use DashboardCard component?
                     */}
                      <Grid item>
                        <DashboardCard
                          header={false}
                          data={ideas.map(item => {
                            return {
                              name: parseBytes32String(item.value.name),
                              description: parseBytes32String(item.value.description),
                              actions:
  <span>
    <Button size='small' color='secondary' onClick={() => { setVisible(true) }}>
      Vote
    </Button>
    <Button size='small' color='secondary'>
      Learn More
    </Button>
  </span>
                            }
                          })}
                          type='list'
                        />
                      </Grid>
                    </Grid>
                }
      {
                   (ideas && ideas.length === 0) &&
                     <Grid
                       container
                       direction='column'
                       justify='flex-start'
                       alignItems='center'
                       className={classes.content}
                       spacing={3}
                     >
                       <Grid
                         item
                         container
                         direction='column'
                         justify='flex-end'
                         alignItems='stretch'
                       >
                         {pool &&
                           <Grid item>
                             <Breadcrumbs aria-label='breadcrumb'>
                               <Link className={classes.link} to='/'>
                                 Home
                               </Link>
                               <Link className={classes.link} to='/pools'>
                                 Pools
                               </Link>
                               <Link className={classes.link} to={`/childpools/${pool.parent}`}>
                                 {pool.name}
                               </Link>
                               <Typography color='textPrimary'>Ideas</Typography>
                             </Breadcrumbs>
                           </Grid>}
                         <Grid item>
                           <SearchBar
                             className={classes.search}
                             onChange={() => console.log('onChange')}
                             onRequestSearch={() => console.log('onRequestSearch')}
                             style={{
                               margin: '0 auto',
                               minWidth: '100%'
                             }}
                           />
                         </Grid>
                       </Grid>
                       <Grid item>
                         <Image src='/assets/empty.svg' className={classes.media} />
                         <p>Oh noes :( No Ideas found</p>
                         <p>Add an Idea on the Idea Page</p>
                       </Grid>
                     </Grid>
                }
    </Container>
  )
}
