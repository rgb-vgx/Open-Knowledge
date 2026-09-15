Okay, so let's go over one last thing

which is the default partitioner for your producer.

So when your key is not null

then your data is gonna go through a partitioner logic

which decides how a record gets assigned to a partition

and this process is called Key Hashing,

which is the process of determining the mapping of a key

to a partition.

And in the default Kafka partitioner

the key are hashed using the murmur2 algorithm

and this is the formula.

And if we look at this formula,

we can see that the same key goes to the same partition

because the murmur algorithm it's predictable

and therefore the same key goes to the same partition

because the formula has the exact same inputs

and the exact same formula.

But if you look at the formula

we look at the fact that if you look at num partitions,

which is the right hand side part of this formula

and we increase it because we add partitions into our topic

then this entire formula is affected.

And therefore, once you add partitions into a topic

you are breaking the guarantee

that the same goes to the same partition.

So instead it's better to create a new topic

in these kind of instances.

So it's not necessary

and recommended to override the default partitioner logic,

but if you have a very advanced use case

where you want to have your own partitioner logic

for some reason

then you can do so by using the partitioner class parameter

for your Kafka producers.

So when the key is called null

then we have some interesting optimization.

So the default producer has two behaviors.

Number one, up to Kafka 2.3

we have the Round Robin behavior

that I will explain in the next slide

and for Kafka 2.4 and above

we have the Sticky partitioner

that I will explain in the slide after Round Robin.

The idea is that when we use the sticky partitioner

we're going to get a huge performance improvement

especially when you have, with high throughputs

and your key is null.

So how is the Round Robin partitioner working?

Say you have six messages that you send through a producer

and a topic with five partition.

So when you have an older version of Kafka

per your producer, less than 2.3

then what's going to happen

is that the message are going to go Round Robin.

That means the first one goes to partition one

then the second one partition two,

then the third one part three

and so on because the messages are distributed

and once you reached partition five

then it goes again to partition one and so on.

So this makes sense.

This is the behavior we expect

because we want messages to be spread

over all the partitions equally

but this results in more batches,

because you get one batch per partition

and you get one message per batch and this,

the batches are going to be much, much smaller.

So this is not a optimal behavior.

That means that you have more small batches,

more request and higher latency.

So instead on 2.4 and over the producer has implemented

a new default partitioner called the sticky partitioner

and it results in a massive performance improvement

because well the records are going to be sent

to the same partition as a batch,

and then move on to the next batch.

So this is a sticky partitioner,

is going to stick to a partition until the batch is full

or linger millisecond has elapsed

and then after sending the batch

the partition that is going to be sticky changes.

So if you have a look, there is batching happening here.

All the messages go to partition one

and then the batch will be opened

and all the messages will go to partition two

and then if there was a new batch

it'll be partition three and over.

So this leads to larger batches

and reduced latency because you have larger requests

and the batch size is more likely to be reached.

And over time you still get the same effect as Round Robin

because your messages are going to be spread evenly

across all partitions.

So if you look at the performance improvements

here is the latency being noticeably lower

on the sticky partitioner than the default partitioner.

And if you look at a lot of partitions,

for example if you look at three producers,

10,000 messages per second

and you look at, for example, a topic with 125 partitions

then you see the latency is much much, much, much lower.

So it is a big performance improvements

and the only thing you have to do of course

is to just upgrade your producer clients to 2.4 and above.

Okay so now that it's said, I hope you like this lecture

and I will see you in the next lecture

for some implementation of these performance improvements.
