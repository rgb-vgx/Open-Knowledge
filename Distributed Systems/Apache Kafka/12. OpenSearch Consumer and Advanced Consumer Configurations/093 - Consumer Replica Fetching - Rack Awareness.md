Hi, so here is another theory lecture.

And in this one, we're going to look at the default behavior

with partition leaders of the consumers.

So we've seen this before,

we know that the consumer reads by default

from the leader of your partition.

But if you have multiple data centers

you'd probably have maybe a high latency

and also high network charges

because well, your consumer may be

in a different data center from your broker, okay?

So, if you have the same AZ, for example,

the same data center in AWS, a cloud computing platform

then you have no cost, but if they're different AZs

then there's a cost for moving the data

from one AZ to the next.

Therefore it becomes very interesting to look

at Kafka Consumer Replica Fetching.

So since Kafka 2.4,

it is possible for you to configure your consumers

to read not from the leader replica

but from the closest replica.

Two reasons, it may improve latency

and also decrease network cost if using the cloud.

So this is an example.

So we have three data centers and a partition

with a replication factor of three,

and replication may happen

or will happen between your brokers.

So no matter what, you're going to pay some money

to replicate data between your partition leader

and your ISRs because the network

is going to go across two data centers.

But then your producer produces to the leader partition,

but your consumers instead of reading from the leader

and incurring again some cost to replicate to pull the data

from another data center.

A consumer in Data Center 2 can then read from the ISR

in Data Center 2 and incur no cost.

So it'll be free of charge and of course the reader will be

with lower latency because your consumer

and your broker 102 are in the same data center.

So this applies for consumer in Data Center 3

and a consumer, for example, in Data Center 1.

So as you can see with this setting

we have lower network cost and lower latency as well.

So, how do you set up Consumer Rack Awareness?

So you need to tell your brokers

that they must be on version 2.4 and need to tell them

which rack ID they're on,

which represents the ID of the data center,

which if you're using AWS is the AZ ID.

So for example, on the AWS

the AZ ID is going to be usw2-az1.

Then you need to set up a replica selector class

and you set it to RackAwareReplicaSelector.

And then your consumers have to have client.rack

as a setting, also to be equal to the same data center

that they're launched on.

And therefore, once the consumers are authenticating

to Kafka, thanks to the replica selector class,

the consumers will be reading from the replica

that is closest to them, okay?

So that's it just to theory lecture

because I cannot demonstrate this behavior.

But I hope you liked it

and I will see you in the next lecture.
