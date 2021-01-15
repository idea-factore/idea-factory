# idea-factory

## Overview
idea-factory is going to be a crypto-based startup incubator/crowdfunding platform.
Anyone can submit an idea, and anyone can contribute to an idea (much like github)
Users will earn crypto based on:
1. The "worth" of the idea they submitted
2. The "worth" of the work they contributed

## Purpose
The main purpose and motivation behind this project is to make it easier for people to both fund their ideas and bring their ideas to life.
There are a decent number of successful startups but what about the potential startups that never got off the ground because the person behind the idea didn't have 
the neccessary skills or knowledge, or they didn't have funds, or they weren't business savy, etc. This project will 

a) Allow users to get critizism on their idea/gauge idea popularity

b) Allow developers/UI artists/business/whoever to find projects to contribute to

c) Allow users to bring their ideas to life and earn from those ideas before the idea is in market

Obviously, not every idea is perfect or marketable or valuable but this project will help filter out the ideas that are marketable/perfect/valuable and make it easier for those ideas to become successful


## How it works

Base token is called IDEA:

functions: 

* can deposit collateral into IDEA, withdraw etc (which, when using AAVE, mints or burns new IDEA tokens)

* can create a subtoken with a starting value of 0% of IDEA value (or the value of collateral in IDEA). 

* This subtoken is supposed to be for an idea but I guess it in theory could be for whatever. LP's or owners of IDEA, can vote on the subtoken which will increase the perecentage or ratio value based on voting power of LP
* NON-LPS can buy this subtoken which makes you an LP of the subtoken? maybe? or somemthing like that. Irregardless, it supports the development of whatever the subidea is for. 
* Users can also contribute to the subtoken, which will give that user a certain amount of the subtoken based on voting by all holders of subtoken and LP's which voted for subtoken as well as the creator of subtoken. 
* If the subtoken isn't going anywheres, LP's and holders of subtoken can vote to liquidate the subtoken and gain back money + interest (based on amount of time they staked subtoken?)

Other functions or caveats:

Base token value will be determined by


      totalValueOfContributions/amountOfContributions
Or something similar, not completly sure yet.

Subtoken value will be a percent of the totalContributionvalue divided by the amount of votes, but will also take into account the voting power of said votes

Subtokens can vote to liquidate for one reason:

1) Project isn't going anywhere (this burns all tokens and gives money back to holders based on the amount of subtoken +interest

But holders of the subtoken can "liqudate" their position by turning the subtoken back into x amount of base token. For certain scenarios, this provides a benefit but will overal be discouraged:
1) The creator thinks their idea should be worth more: If the creator thinks that their idea is better than others, they can liqudate their subtokens back into base token, which increases the value of the base token. This has the impact that all subtokens can potentially increase their value. The creator can earn back those tokens by recontributing to their creation? Same with contributors, potentially? This doesn't burn those tokens (i guess) but swaps them and redistrubtes them back into the subtoken pool.

The base amount of subtokens is undecided. I guess zero, but new coins are minted on voting and the creator and contributors are given a certain amount based on some magic algorithm

* Uses Aave (duh), and probably chainlink or something idk, maybe ens



## Goals

* Incentivize idea sharing and contributing
* Help build ideas from the ground up, no matter whose idea it is

## Tools/Platform
Aave, maybe UMA, ens, chainlink uniswap are all potentials

