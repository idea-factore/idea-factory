Contract implementation v0.01 :)

* create governance token called IDEA
* allow LP's to deposite collateral (in the form of aave, most likely) into IDEA which will grant them a certain number of IDEA tokens
* These ideas tokens can then be used to vote on startups in order to distrbute the funding pool
* Ideas that are added, are stored as a subtoken of IDEA, with a price that will either be set through a bonding curve (where the max price has to be equal or below the total funding pool), or simply a percentage of IDEA, determined through voting and voting power
* Goal is that the value of startup (in terms of the subtoken) is expressed in terms of the amount of the amount of collateral that the startup is receiving but maybe it should be express in terms of the theoritical worth of the startup as determined by LP votes, and other users who buy the subtoken (unclear, probably outside scope)
* Ability for LP to retreive collateral from IDEA + a certain amount of interest that is accrued by being locked in. 
* Ability for all users and LP's who have invested in a startup to liqudate the startup if they feel the projects goals aren't being met (decided through vote). In this case, LP's and users would gain their capital back, along with contributors (outside scope?), but startup creators would lose and could have some sort of debt.

* some sort of credit delegation which im not sure about?



Contract Structure:

PoolCoordinator: contract to create pools, and add to pools
IDEAMinter: contract to mint and deposit IDEA tokens to a user, based on the amount that they have added
IDEA: contract for IDEA tokens. Inherits ERC20, ERC2917
FundingCoordinator: contract to send collateral to proper ideas
RewardPool: contract to store reward tokens and send them to proper users

### High Level Overview
Users create a pool.
Pools represent whatever the user wants, but they should typically represent either:

a) a specific problem to solve

b) a category of problems to solve

c) a specific idea that they want to create


User connects a wallet to our site and deposits funds onto our site.

These funds can be used in one of two (or more) key ways.

These funds can be added to an standalone idea, which is a part of an empty pool.

These funds can be added to an existing pool.

Governance Token (name TBD, maybe FACTORY? with symbol FACT?) :

This has a fluctuating value 

This will enable users to vote on where liqudity goes, depending on the pool

It also enables users to vote on liqudating an idea from the pool. Liqudation will return collateral to holders in form of either Governance or Lending Tokens


Lending Token (IDEA token):

This has a stable value

Lending tokens are granted when a user adds funds (1:1).

These tokens are then:

a) added to a standalone idea  (i.e empty pool)

b) Added to an existing pool (of ideas)


Governance Tokens are minted based on either the percentage of IDEA tokens added versus the TVL to a specific pool or the TVL acroos entire platform
Extra governance tokens are minted based on the time an IDEA token has been locked in and these are rewarded to:

a) LP's

b) idea creators

c) idea contributors







**Warning: ramblings below. proceed with caution**

Protocol for storing "ideas" on blockchain, enabling funding, contributing, and promotion of ideas.
 
How this would work:

User submits idea/project. That project is stored with a description

Other user tries to submit similar idea: Depending on similarity, it will either be rejected, or it will go to a vote by IDEA holders who will decide whether to allow it

These ideas will have a worth, determined by IDEA holders staking collateral/tokens on that idea. 

Ideas can fall into a variety of "pools" or areas

While collateral is staked to an idea, that collateral will earn interest. The interest is kept as a reward that will be payed out for succesful projects.

You can think of these ideas/projects as proposals to DAO, where token holders can vote on the proposals.


This would also allow a common platform for startups (whether crypto-related/tech-related/etc) to see if their idea is already being worked on, and the potential value of their idea as determined by the amount staked (and other factors). As well, people could contribute to an idea, and earn a stake/reward from that idea if their contribution is voted to be valuable by other stakers and the creator.

### Difference between this and below
This is simply an extension/abstraction fo the below idea. I guess they could be considered the same but I simply hadn't considered using the ideas to find out if an idea is being worked on.

Something that is very interesting to me, is using any form of collateral to stake on an idea. Something similar to balancer pools, where that pool is then staked to an idea and the success of the idea partially determines the interest earned
