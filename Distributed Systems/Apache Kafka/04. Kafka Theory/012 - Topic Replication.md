Hi, this is Stephane from Conduktor,

and in this lecture,

we're going to learn about

the Kafka Topic Replication Factor,

and what it implies for your consumers and your producers.

So topics in Kafka,

when you're doing stuff on your own machine,

they can have a replication factor of one,

but usually when you are in production

that means you're having a real Kafka cluster,

you need to set a replication factor greater than one,

usually between two and three and most commonly at three.

So that way, if a broker is down,

that means a Kafka server is stopped

for maintenance or for a technical issue.

Then another Kafka broker still has a copy

of the data to serve and receive.

So let's take an example to understand this better.

We have Topic-A,

it has two partitions and a replication factor of two.

So we have three Kafka brokers,

and we're going to place partition zero of Topic-A

onto broker 101,

partition one of Topic-A onto broker 102.

So this is the initial.

And then because we have a replication factor of two

then we're going to have a copy of partition zero

onto broker 102 with a replication mechanism,

and a copy of partition one onto broker 103

with again, a replication mechanism.

So as we can see here, we have four,

obviously, units of data because we have two partitions,

and replication factor of two.

We can see that brokers are replicating data

from other brokers.

So what does that mean?

We go back to this.

What if we lose broker 102?

Okay, well, as we can see, we have broker 101,

and 103 still up and they can still serve the data.

So partition zero and partition one are still available

within our cluster and this is why we have

a replication factor.

So in case of replication factor of two,

to make it very simple,

you can lose one broker and be fine.

So next we have replicas, okay.

And so therefore we have a leader for a partition,

and at any time only one broker can be a leader

for a given partition.

And the rule is that producers can only send data

to the broker that is the leader of a partition.

So if we go back to this diagram we had from before,

I added a little star on the leader of each partition.

And we can see that broker 101

is the leader of partition zero,

and broker 102 is the leader of partition one,

but broker 102 is a replica of partition zero,

and broker 103 is a replica of partition one.

So the others brokers replicate the data.

And if the data is replicated fast enough

then each replica is going to be called an ISR.

An ISR means in-sync replica,

as opposed to out of sync replica.

So if the data is replicated well

then they are synchronized in terms of the data replication.

Okay, so this is very important,

because there is a very important aspect of leaders.

So by default,

and this is default behavior with leaders,

your producers are going to only write

into the leader broker for a partition.

So if the producer knows it wants to send data

into partition zero,

as we've seen from the previous mechanism,

and we have a leader and a ISR then the producer knows

that it should only send the data into the broker

that is the leader of that partition.

And that is a very important Kafka feature.

And the Kafka consumers,

they're going to read that default only

from the leader of a partition.

So that means that the consumer will only request data

from the leader broker 101.

That means that broker 102 in the previous example

is a replica just for the sake of replicating data,

and in case the broker 101 goes down

then it can become the new leader,

and serve the data for the producer and the consumer.

That is the default behavior.

But as we'll notice in Kafka,

and Kafka has evolved a lot since I've been teaching it,

over five years of teaching Kafka,

and has evolved a lot.

And there's been new features added over time.

And because actually many companies use older versions

of Kafka and sometimes way older versions of Kafka,

I'm going to specify what has changed across time

for newer Kafka versions.

And even if I know you're only used

the latest Kafka version,

for example, 3.0,

whatever is happened before or after.

I still have to tell people what is the new features,

and when they did appear, okay.

So there is a new feature called

the Kafka Consumer Replica Fetching,

which happened as part of Kafka 2.4,

which allows consumer to read from the closest replica.

So we have the broker 101,

which is leader of partition zero

receiving the data from the producer is going

to replicate data into the ISR partition zero

of broker 102.

And then it's possible for our consumer

to read from the replica itself, okay.

Why?

Well, this may help to improve latency,

because maybe the consumer is really close to broker 102.

And also maybe it's going to help decrease network cost,

if using the cloud,

because if things are in the same data center

then you have little to no cost.

We'll see this in details when we get

to the programming section,

but I just wanted to introduce that concept to you

that is now possible.

So that's it for this sector.

We've learned about brokers and replication factors,

and now leaders and what it means

for producers and consumers.

So I hope you liked this lecture,

and I will see you in the next lecture.
