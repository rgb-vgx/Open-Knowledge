Hi, this is Stephane from Conduktor

and we're just going to look at all the things we learned

in the Kafka theory section.

So we've seen that a Kaf Cluster

can be made of multiple brokers,

for example, I have nine brokers in my cluster.

And we've seen within the cluster,

we've seen the concept of topics, partitions, replication,

we've seen the partition leader and in-sync replicas

and we've seen the Kafka internal offset topic.

Now for producers, we've seen that they take data

from the source system and whatever you want

and then they send data into a batching Kafka.

We've seen the concept that round robin,

that means that the data is distributed

across all partitions in a topic.

Key based ordering, that means that when we specify a key,

then the same key is going to end up in the same partition.

And then acks strategy,

so we had an introduction to acks equal zero, one and all,

to discuss how much acknowledgement we want

when we write to a Kafka Cluster.

Okay, next we've seen the consumers,

so we've seen how consumers operate in the consumer group,

how they store offsets into a consumer offsets topic,

we've seen different conception modes such as at least one,

at most once or exactly once.

And then finally we've seen that Kaf Cluster

is managed right now by Zookeeper,

where there is leader follower concept in Zookeeper,

as well as broker management, metadata management.

And we've also seen how the fact

that the community is transitioning from using zookeeper

to using just a Kaf Cluster in craft mode, okay.

So that's it for this lecture.

I hope you like the whole theory section

and I will see you in the next lecture.
