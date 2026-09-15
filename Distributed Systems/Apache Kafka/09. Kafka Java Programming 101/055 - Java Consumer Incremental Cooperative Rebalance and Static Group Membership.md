Okay, so let's talk about consumer groups

and partition rebalance strategies.

So whenever you have consumers joining

and leaving a group, partitions are going to move.

And when partitions move between consumers

it's called a rebalance, okay.

These rebalance happens whenever a consumer leaves

or joins a group.

And it also happens, for example,

if an administrator adds new partition into a topic.

So as like an example,

we have three partitions and two consumers into a group.

And then what happens is that's something

we've seen right away, right before,

is that a new consumer joins this group.

And so the whole question is how do these partitions

get assigned to the consumers and what happens?

And based on, well, the strategies

the outcomes can be different and you may be surprised.

So the first one, and it's called a eager rebalance

and it's one of the default behavior.

And so the eager rebalance has it like this.

So consumer three joins the group

and then all consumers are going to stop,

it's called eager.

So all consumers stop

and they will give up their membership of partitions.

That means that no consumer is reading from no partitions.

Then all consumers are going to rejoin the group

they were in and get a new partition assignments.

So that means that all these consumers are now

going to get new partitions

assigned to them like this, okay.

But it is quite random.

And during a short period of time

then the entire consumer group has stopped processing.

So it's called the stop the world event.

And there's no guarantee that your consumers

are going to get back the partitions that they used to have.

So these are two problems.

Number one, maybe you want your consumers to

get back the same partitions they had before.

And number two

maybe you don't want some consumers to stop consuming

if they were reading from the same partition.

You don't want this stop the world events.

So therefore there is something called a

cooperative rebalance, and this is quite recent in Kafka,

also called incremental rebalance.

So instead of reassigning all partitions to all consumer

the strategy is to reassign a small subsets

of the partitions from one consumer to another.

And the consumers that we do not have

any reassigned partitions

they can still process the data uninterrupted,

and it can go through several iterations

to find a stable assignment,

hence the name incremental.

This avoids these stop the world events

where all consumers stop processing data.

So let's take an example.

We have two consumers with three partitions.

One just joins the consumer group.

Now the incremental rebalance is smart

and says, hey look at this.

I only need to revoke partition two.

And so therefore consumer one and consumer two

can keep on reading from partition zero and one.

And then after this,

the partition two is going to be assigned

to my consumer three

and in part consumer three can start reading partition two.

So this was less disruptive.

It allowed us to keep on reading from the part the topics

and only assign one partition to the consumer three.

So this is quite handy

and gives you a lot more stability for your consumer group.

So how can you use the cooperative balance?

Well, in the Kafka Consumer

there's a setting called the partition assignment strategy.

And the default is, or used to be sorry,

view RangeAssignor, which assigns partition

on the per topic basis and can lead to imbalance.

And then there's RoundRobin.

It's also an eager type of assignment.

And all the partition across all topics are assigned

in a round robin fashion, which is really good for balance

because all the consumers will have plus minus one

the same number of partitions.

And you have StickyAssignor

which is balanced just like RoundRobin

in the beginning, okay

and then it will minimize partition movements

when a consumer joins

or leaves the group in order to minimize movements.

So these three partition, these three strategies

are eager strategies.

That means that every time you use them

there's going to be a stop the world event

and it's going to be just breaking your consumer group

for a little bit of, for a few sec.

And if your consumer group is big

then it can take a while to reassign all the partitions.

Therefore, the newer cooperative rebalance mechanism

you can use is called the CooperativeStickyAssignor.

So StickyAssignor is a strategy I just showed you

where it minimizes the number of partition movements

between consumers in order to minimize

the number of movements of data, okay.

But this time it supports the cooperative protocol

and therefore the consumers can keep

on consuming from the topic

if the partition hasn't been moved for them.

So the CooperativeStickyAssignor is really the best I think.

But the default in Kafka 3.0 is now a list of assignor.

It's RangeAssignor comma CopperativeStickyAssignor.

And that means that it will only use

the RangeAssignor by default,

but then if you remove the RangeAssignor,

then it will use the CooperativeStickyAssignor

by just rolling,

by just doing a single rolling bounce, okay.

So I'm gonna show you how to do this right now.

If you use Kafka Connect then you know what Kafka Connect is

cooperative rebalance enabled by default.

And if you use Kafka streams, then again, it is turned

on by default using the StreamsPartitionAssignor.

Okay, so let's have a look at one last thing,

before we go into the practice.

It's called the static group membership.

So we've seen here that whenever consumers join

or leave the group, there is going to be a

a rebalance triggered because Kafka says that, okay

we need to absolutely have all the partitions

being read by all the consumers.

But it is first all for you to say that,

hey, when a consumer leaves

then do not changes assignments, okay.

So the reason why first, when it leaves and comes back

there's a reassignment is that it gets a new member ID,

'cause it leaves then upon signing up,

boom, here's a new member ID for you.

But if you specify a group instance ID

as part of the consumer config

then it makes the consumer a static member

and you need to figure out

what you want to put in this config.

But what happens is that if you, for example

have a consumer one with ID equals consumer one,

a consumer two with ID equals consumer two

and a consumer three with ID equals consumer three, okay.

Then in case consumer three leaves the group

then partition two is not going to be reassigned

because consumer three was a static member.

And so if the consumer joins back

within the session time at millisecond,

then the partition two will be reassigned

to the consumer automatically without triggering rebalance.

So this allows you, for example

to restart your consumer and not be a

and not be worried that a rebalance

is going to happen, okay.

But if your consumer is away for more than

session time at milliseconds

then a rebalance is going to happen

and partition two is going to move over

two different consumers.

So it's up to you, whether or not

you wanna use this feature

but it's quite helpful when you have something

like Kubernetes and so on.

Also, this is very helpful

if your consumers need to maintain a local cache

and local states, because if you have this

then you avoid rebuilding the cache

by making sure that your consumers are assigned

to a specific set of partitions, okay.

So that's it for the rebalance protocol.

I know it can be quite complicated

but these are improvements of Kafka made recently.

And I'm going to show you how to

use the cooperative sticky rebalance, okay.

So I'll see you in the next lecture.
