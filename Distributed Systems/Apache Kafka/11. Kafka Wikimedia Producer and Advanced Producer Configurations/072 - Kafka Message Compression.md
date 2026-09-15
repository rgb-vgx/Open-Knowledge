Hi, this is Stephane from Conduktor

and welcome to this lecture,

on message compression on the producer.

So usually your producers are going to send data

into Kafka and it is usually text-based.

For example, JSON data.

In this case it's going to be very important

to apply compression to the producer

because once you enable it,

the message is going to be smaller

and it's going to be faster,

so send it to Apache Kafka

and also smaller to store it on disk.

So compression can happen in different stages.

It can happen either at the producer level

and it doesn't require any changes in the brokers

or in the consumer, or you can set it

on the broker and it will show you the difference

between producer and broker compression.

So compression type can be of different values.

It could be none, the default,

gzip, lz4, snappy and zstd from Kafka 2.1.

And obviously compression is going to take

repeated values and compress them together.

And so the bigger, the batch of message you have

the more compression you're going to get

and the more effective this thing is going to be.

So there's a blog right here,

on Cloudflare which is comparing compression in Kafka,

I think you should read it if you're very interested.

Okay, so how does compression work?

So say a producer has a batch,

he wants to send to Kafka

and this batch contains 100 messages.

So message one all the way to message 100.

What's going to happen is that when you enable compression,

this batch of message is going to be compressed

as a batch of compressed messages,

which as you can see on this diagram,

produces a big decrease in size.

And so therefore when sent to Kafka

is going to be a lot quicker to be sent

and stored on disk.

So message compression has a lot of advantages as I said,

so you get a much smaller producer request.

You can get up to, for example, four times smaller requests.

It's going to be much faster to transfer data

over the network,

which is going to provide you with less latency,

better throughput as well as better utilization of disk

on Kafka, because the stored messages on disk

are going to be smaller.

The disadvantages of using compression

I think are minor in today's world.

The producer must commit some CPU cycles

to do some computation and perform a compression.

And the consumers must also commit some CPU cycles

to decompress messaged batch and read it.

Overall, I think you should consider first snappy

or lz4 for optimal speed and compression ratio

but the others may work as well too

for your data sets.

And then as we'll see in the next lecture,

we can consider tweaking two more settings

called linger.millisecond and batch.size

to force our producers to have bigger batches

and therefore have more compression and higher throughputs.

And I will show you how to make it work okay.

So whenever I have clients on Apache Kafka,

I always recommend them

especially when it's a high throughput stream

to enable compression in production.

And you have no idea how many problems

this one little setting solves.

So compression can also happen

at the broker level or topic-level.

So if you enable it at the broker level

it is applied to all your topics.

And if it's applied at the topic-level

it's just applied to one topic.

So you have different settings and this is a broker setting.

So you can set compression.type=producer

and it's a default.

That means that the broker is going to take

the compressed batch from the producer clients

and is going to write it directly

to the topic's log file without recompressing the data.

So it is optimal, but that pushes

the necessity of compression onto the producer.

You can also have compression.type=none.

In which case, all the batches

sent to Apache Kafka are going to be decompressed

by the broker which I think is a bit inefficient,

but why not?

You can, for example

set a specific type of compression for the settings.

For example, compression.type=lz4

and then some interesting behavior happens.

So if the compression type set on the topic

is equal to the one on the producer setting

then the data is not going to be recompressed.

It's just going to be stored

on disk as is.

But if you're using a different compression mechanism

on the producer side,

then the batch is going to be first decompressed

by the broker.

And then recompressed using the compression algorithm

specified for example lz4 in this example.

So just so you know,

if you enable broker-side compression

is going to consume extra CPU cycles.

So overall my best recommendation would be

for you to make sure that all your producers

are compressing the data on their end

and leave the broker default

to compression.type=producer.

But in case you have no control over your producers

but you still want to enable compression

then you can enable it on the broker side.

But just so you know,

the broker is going to consume a bit more CPU cycles

and that can have a performance impact.

So always make sure to test your decisions

before implementing them in production.

All right, that's it for this lecture.

I hope you liked it

and I will see you in the next lecture.
