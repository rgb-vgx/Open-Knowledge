Hi, this is Stephane from Conduktor

and here is an advanced lecture,

I don't blame you if you don't hang on until the end,

that describes how consumer work in Kafka

and what can happen when you run with them for a long time.

So you have a consumer group application

with three consumers and the consumers in a Consumer Group

they talk to something called a Consumer Group Coordinator.

And it's an acting broker and this is used to detect

whether or not your consumers are still up.

So there is a heartbeat mechanism, okay?

And there's a poll mechanism.

So the heartbeat thread is going to be your consumers

sending messages to the broker

once in a while saying they're still alive, okay?

And the poll thread is going to be other brokers

thinking your consumers are still alive

because they are still requesting data from Apache Kafka.

So these two mechanisms together capture a lot of issues

that can happen with your consumers

and so we'll have a look at these in details, okay?

But overall, it is very encouraged for you

to process data fast and pull often versus the opposites.

So let's talk about the consumer heartbeat thread.

So the heartbeat thread sends data to Kafka,

just a heartbeat, every once in a while

to tell the consumer is alive.

And by default, the interval of the heartbeat

is three seconds.

So you can control it

and it says how often to send heartbeats

and usually you set it to one third of session.timeout.ms.

Session.timeout.ms by default is 45 seconds in Kafka 3.0

and before it was 10 seconds.

And so the idea is that the heartbeats are sent

to the broker periodically and then if no heartbeat

is sent during the timeout millisecond,

then the consumer is considered dead, okay?

So you would set session.timeout.ms to something really low

for faster consumer rebalances

in the cases where your consumer

are exiting the group unexpectedly

and they stop sending heartbeats, okay?

So this mechanism, the heartbeat thread,

is used to detect the consumer application being done.

So if you want to have a consumer being killed

and then the group to rebalance very quickly,

I would set heartbeat for example, to one second

and I would set session.timeout.ms

to say, four seconds, for example and it would work.

So that's one mechanism

and the other one is the poll thread.

So we have the max.poll.interval.ms,

which is by default five minutes,

which is how long it's allowed between two poll

before thinking that the consumer is dead.

And this is very relevant for example,

when you have a big data framework

that uses a consumer for example, Spark

and the processing takes time.

So if your processing takes more than five minutes,

then Kafka is going to think that your consumer is dead.

So this is used to detect whether or not

there is a data processing issue

and for example, the consumer becomes stuck

in the processing.

So tweak for your needs.

If it's a very fast application,

maybe you want to set this max.poll.interval.ms

to 20 seconds but if it's a very slow application,

maybe you want 10 minutes, I don't know.

Then you have max.poll.records,

which is how many records you poll at a time.

So per poll request and so if your messages are very small,

you can of course increase it

but if your messages are very big, you need to decrease it

because it may take you too much time

to process the records.

So it's good for you to check it out

how many records are being pulled per request

and how big are your records

and how long it takes you to process these records.

Next there is fetch.min.bytes by default one,

which is how much data you want to pull

at least from Kafka on each request.

And if you increase this, it helps improve throughput

by decreasing the request number at the cost of latency

because you're saying,

hey, at least give me a megabyte of data

before returning data to my consumer,

otherwise I don't need it.

And fetch.max.wait.ms by default is half a second,

which is the maximum amount of time

the Kafka broker will block

before answering the fetch request

if there are not enough bytes

to fulfill in the fetch.min.bytes, okay?

So that means that if you search, for example,

fetch.min.bytes to one megabytes,

then even if one megabyte is not here,

it will take at most 500 milliseconds of latency

before the fetch request is returned to the consumer.

So all these settings can help you really like

tweak your consumer behavior.

Defaults are fine but if you ever get to this stage

then this lecture should help.

Next we have max.partition.fetch.bytes,

by default one megabyte,

which is the maximum amount of data per partition

that the server will return

and if you read from 100 partitions,

that mean you'll need at least 100 megabytes of RAM

so adjust it based on what you need.

And fetch.max.bytes, which is the maximum amount of data

returned for each fetch request

and if you have available memory,

then increase it to allow your consumer to read more data

in each request.

So these are advanced settings and only to be modified

if your consumer is maxing out on throughput

and you want to improve it, okay?

So that's it for this lecture, just a theory lecture,

I hope you liked it and I will see you in the next lecture.
