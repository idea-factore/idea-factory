import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { NavCarousel, DashboardCard} from '../components';

const useStyles = makeStyles(()=> ({
    root: {
      display: "flex",
      justifyItems: "center",
      flexGrow: 1
    },
    card: {
        maxWidth: 450,
    },
    media: {
        height: 140,
      },
      paper: {
          background: '#616161'
      }
  }));
  
/**
 * TODO:
 * 
 * Home page should have:
 * Current days biggest gains/investment amount
 * Current Idea proposals (to vote on)
 * User count?
 * Pools with most users
 * Biggest Communities
 * Make currrent cards a carousel
 */
export default function Home() {
    const classes = useStyles();

    const data = [ {
        name: "Idea #1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci nibh, volutpat sit amet sem nec, viverra efficitur enim."
    }, {
        name: "Idea #2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci nibh, volutpat sit amet sem nec, viverra efficitur enim."
    }, {
        name: "Idea #3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci nibh, volutpat sit amet sem nec, viverra efficitur enim."
    }];

    const data2 = [ {
        name: "Community #1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci nibh, volutpat sit amet sem nec, viverra efficitur enim."
    }, {
        name: "Community #2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci nibh, volutpat sit amet sem nec, viverra efficitur enim."
    }, {
        name: "Community #3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci nibh, volutpat sit amet sem nec, viverra efficitur enim."
    }];
    return (
        <Paper className={classes.root}>
            <Grid 
                container 
                direction="column"
                justify="space-between"
                alignItems="stretch"
                spacing={7}
            >
            <Grid item>
                <NavCarousel />
            </Grid>
            {
            //Current biggest gains
            }
            <Grid item>
                <DashboardCard
                    title="Biggest Gains"
                    type="list"
                    data={data}
                />
            </Grid>
            <Grid item>
            {
                //Proposal Voting
            }
                <DashboardCard
                    title="Votes in Progress"
                    type="list-vote"
                    data={data}
                />
            </Grid>
            <Grid item>
            {
                //Proposal Voting
            }
                <DashboardCard
                    title="Biggest Communites"
                    type="list"
                    data={data2}
                />
            </Grid>
            </Grid>
        </Paper>
    )

}