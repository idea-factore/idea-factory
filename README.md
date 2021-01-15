# idea-factory

## Overview
idea-factory is going to be a crypto-based startup incubator/crowdfunding platform.
Anyone can submit an idea, and anyone can contribute to an idea (much like github)
Users will earn crypto based on:
1. The "worth" of the idea they submitted
2. The "worth" of the work they contributed

For the scope of the marketmake hackathon, the project can simplified to this:

A decentralized funding pool for startups using Aave and potentially other sponsers. The funding pool will be determined by the amount of collateral put into the governance token, IDEA. The price of IDEA will be roughly based on (totalAmountOfCollateral/totalLP's) to get an average collateral amount (subject to change). This will give LP's a certain amount of IDEA based on the collateral put in, with the base value of IDEA rising as higher amounts of collateral are deposited (i think).
This collateral will then be distributed among startups, using a voting system. The exact details of this I haven't quite figured out yet. The thought process is that by depositing collateral into IDEA (using aave), LP's are granted a certain amount of votes, with voting power. LP's use these votes to distribute their collateral amoung startups. Startups will have a subtoken which will either express the worth of the idea to LP's, or the actual amount of collateral that the startup will receive from LP's. 



One thing to think about, which is most likely outside the scope of this hack, is the exact mechanism of credit delegation to startups, as well as whether the funds are available immediately, or whether there is a certain "funding period" (much like gitcoin) where funds are only rewarded at the end of the funding. The reasoning for this is that, in the early stages of this when the amount of ideas are low, LP's will most likely either not have any ideas they like, or will change their mind quite often about how their collateral should be distrbuted. By allowing a funding period, we would then express value of an idea as potential collateral received, so that it is fine if it flucates. As well, the actual amount of subtokens wouldn't be distrbuted right away. Just some thoughts.


The other big thing that is also outside the scope is the idea of contributors to ideas. This is a key idea in this project, that I think elevates amoung other potential solutions. By allowing contributors to ideas, we both make it easier for anyone to add an idea as well as making it easier to raise the value of your idea. These contributors then earn a certain number of subtokens, which gives them a vested interest in the long term success of the project. But again, that is most likely outside the scope of this hack.

## Purpose
The main purpose and motivation behind this project is to make it easier for people to both fund their ideas and bring their ideas to life.
There are a decent number of successful startups but what about the potential startups that never got off the ground because the person behind the idea didn't have 
the neccessary skills or knowledge, or they didn't have funds, or they weren't business savy, etc. This project will 

a) Allow users to get critizism on their idea/gauge idea popularity

b) Allow developers/UI artists/business/whoever to find projects to contribute to

c) Allow users to bring their ideas to life and earn from those ideas before the idea is in market

Obviously, not every idea is perfect or marketable or valuable but this project will help filter out the ideas that are marketable/perfect/valuable and make it easier for those ideas to become successful


## How it works

**NOTE that this is all subject to change**

Base token is called IDEA:

functions: 

* can deposit collateral into IDEA, withdraw etc (which, when using AAVE, mints or burns new IDEA tokens)

* can create a subtoken with a starting value of 0% of IDEA value (or the value of collateral in IDEA). 

* This subtoken is supposed to be for an idea but I guess it in theory could be for whatever. LP's or owners of IDEA, can vote on the subtoken which will increase the perecentage or ratio value based on voting power of LP
* NON-LPS can buy this subtoken which makes you an LP of the subtoken? maybe? or somemthing like that. Irregardless, it supports the development of whatever the subidea is for. 
* Users can also contribute to the subtoken, which will give that user a certain amount of the subtoken based on voting by all holders of subtoken and LP's which voted for subtoken as well as the creator of subtoken. 
* If the subtoken isn't going anywheres, LP's and holders of subtoken can vote to liquidate the subtoken and gain back money + interest (based on amount of time they staked subtoken?)

* Uses Aave, and probably chainlink or something idk, maybe ens

## Goals

* Incentivize idea sharing and contributing
* Help build ideas from the ground up, no matter whose idea it is

## Tools/Platform

I haven't decided on tools or platform yet. Language will most likely be js