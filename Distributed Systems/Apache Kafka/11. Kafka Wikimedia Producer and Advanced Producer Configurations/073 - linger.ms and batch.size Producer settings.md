Hi, this is Stephane from Conduktor,

and in this lecture we're going to discuss

how to improve the batching mechanism of Apache Kafka.

So by default, when your Kafka producer is doing a dot send,

the records are going to be sent as soon as possible.

And the setting that we seen before,

"max.in.flat.request.per.connection=five",

mean that at most five message batches are being in flight

between the producer in the broker at most.

So it gives you some parallel accessible to you.

But after this, the messages have to be sent

while others are in flights, and Kafka is smart,

and therefore it's going to start to batch them

before the next send, okay?

So as long as all your connection

or your request in flights are busy,

then Kafka starts batching the messages.

The smart batching helps actually increase throughput

while maintaining very, very low latency.

So, on top of it, because you are batching your messages

you have an added benefit is that if you enable compression

then the compression is going to be higher.

So you have an added benefits.

So, batching is a good thing in Apache Kafka

because it helps improve throughput and compression,

and therefore, there are two settings that you can use

to influence the batching mechanism.

The first one is "linger.millisecond".

The default value is zero,

which is how long to wait until we send a batch.

And for example, if you said this to five milliseconds,

then you introduce a small delay,

a small latency of five milliseconds

but your Kafka producer is going to wait

up to five millisecond to add more messages

in the batch before sending it.

And the batch size is also saying that if a batch

is filled up before the "linger.millisecond"

has been achieved,

then send the batch.

And so we can increase the batch size

if we want larger batch sizes.

So, here's an example.

We have a producer batch, and we send 1, 2, 3 message,

but then we're going to wait up to "linger.millisecond"

to close the batch.

So this allows our producer to keep on adding messages

into the batch.

And then after, "linger.millisecond" is obtained,

then you're going to get one batch, one request.

And the max size of this batch is "batch.size".

And then, this is sent to Kafka,

maybe through a compression mechanism,

if you have enabled producer compression.

Okay, so now that we understand "linger.millisecond",

let's understand "batch.size".

So by default, it is 16 kilobytes,

and it represents the maximum number of bytes

that will be included in the batch.

And if you increase the batch size,

something like 32 kilobytes or 64 kilobytes,

it can help in increasing the compression, throughput,

and also efficiency of request

because you are sending less requests.

If you have a message that is bigger than the batch size,

it will not be batched and will be sent right away.

And the batch is allocated per partition you sent to,

so if you set it to a number that's too high,

you will waste memory, so be careful about that.

And you can monitor the average batch size metrics,

using the Kafka producer metrics when you start

to monitor your producers.

So to summarize, to get a high throughput producer,

we need to increase "linger.millisecond".

And then the producer will wait a few milliseconds

for the batches to fill up before sending them.

If we send batches that are full,

we need to also increase batch sizes to send larger batches

and be more efficient.

And then we need to introduce

some producer level compression

for more efficiency in the sends.

All in all, this is what the code should look like.

and we'll go in the hands on at point and implement it.

Okay.

I hope you liked this lecture

and I will see you in the next lecture.
