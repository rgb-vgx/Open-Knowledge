Hi, this is Stephane from Conduktor.

And so, now let's have a look

at Delivery Semantics in Apache Kafka.

So we have first At most once.

And at most ones is when offsets are committed

as soon as the message batch is received.

And if the processing goes wrong,

then the messages will be lost

because they won't be read again.

So let's have an example.

So we are reading a batch from our consumer

from our consumer group.

And then right after reading this batch,

we commit the offsets.

Then we start to process data,

for example, sending an email.

So we send it for this one,

this one, this one.

And then all of a sudden,

this consumer from the consumer group goes away.

What happens is that this message and this message

are not being processed.

Because the consumer crushed before processing them. .

So the consumer restarts.

And when it restarts it's going to read

from where the data was last committed.

That means that the data is going to be read

from here here and so on.

So that means that indeed in this case,

we have not processed two messages

because we crushed and we committed offsets too early.

So this is why this message mechanism to read

is called at most once.

Because each message is going to be seen

or processed at most once.

Never twice, but sometimes zero.

Then we have at least once.

And at least once is when messages are committed

after the messages are processed.

And in case the processing goes wrong

then the messages are going to be read again.

And therefore,

because we have a chance of reading messages twice,

then we need to make sure the processing is idempotent.

That means that when you process the same message twice,

you don't impact your systems.

So let's have a look again

we have a topic and a consumer from a consumer group.

We're going read a batch

and then we're going to process the data.

So we read this batch and so on.

And then we commit the offsets.

So this is the normal use case.

Then we keep on reading and processing the offsets,

everything goes good.

And then the consumer crushes.

When it crushes, is going to restart.

And then we're going to read again

from where the offsets were last committed.

Therefore, we're going to see

and process again these messages and so on.

So as you can see in this instance,

three messages are read and processed twice.

Therefore we are in an at least one setting

and this is why we need to make sure

our processing is idempotent.

Okay, so if we have a look at the summary

of delivery semantics,

we've at most once,

where we see messages at most once.

We have at least once, which is preferred,

where we see messages at least once, maybe twice.

And we need to make sure the processing is idempotent.

And we'll see how to do this in the next lecture.

And obviously, the dream goal is to be in exactly once.

And this is achieved only when you take data from Kafka

and put it back into Kafka,

using the Transactional API.

And this is quite easy to do using the Kafka streams API.

If you're doing Kafka to a sync,

for example to open search,

then you need to use an idempotent consumer

and I will show you how.

So the bottom line is,

I think for most processing applications that you have,

you should use at least once processing.

We'll see how to do it.

And we need to ensure that our operations

or transformations are idempotent .

So that's it for this lecture.

Now I will see you in the next lecture

for some implementation.
