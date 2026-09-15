Hi, this is Stephane from Conduktor,

and welcome to this section on producer retries.

So when you have failures to send data

from the producer to Apache Kafka

then developers are expected to have a little bit of codes

to handle these exceptions,

otherwise the data will be lost.

And example of failures could be for example

not enough replicas,

when there's not enough replicas due

to the mini in-sync replicas setting

alongside acts equals all.

But if you don't want to handle these failures

at least on the retries side

there is a retries setting.

And it's zero for Kafka less than two zero

version two, zero

or it's a very very high number for Kafka over 2.1.

And so we are using a recent Kafka,

but you still should know that

if you're using an older version of the clients

then retries could be zero.

And then there is also a retry backoff which is saying

how much time to wait before the next retry.

And by default, this setting is 100 milliseconds.

So the producer is going to retry infinitely

quote and quote infinitely until something happens.

And this thing that happens is a producer timeout.

So if you set retries to very high number

then the retries are not infinite

they're bounded by a timeout

and since Kafka 2.1,

there is an intuitive timeout you can use

which is called delivery timeout millisecond

and it's 120,000 as a default value

which is equals to two minutes.

And this delivery timeout millisecond takes over

a lot of time out that happened from before.

So this is a very simple timeout saying that

from the moment you do send

up until it is received by Kafka,

all of this is bounded

by a delivery timeout of 120,000 milliseconds.

So in this graph don't look at the, in between timeouts,

just remember that this delivery timeout

takes over everything else.

And if they are not acknowledged

within this delivery, timeout, millisecond

then the records will be failed.

So it's important for you to understand

for the old version of Kafka,

that if you're not using an idempotent,

which is a producer, I will show you in the next slide.

Then in case of retries you have the chance

that messages will be sent out of order

because when you retry

well messages are kept on being retried,

but this is solved by idempotent producer

that I'm going to show you in the next lecture.

So if you rely on key-based ordering

then that could be an old issue

especially for the old versions of Kafka.

And as I said, I like to warn you about

all the versions of Kafka

because sometimes people don't update their Kafka version

and they see behaviors that are not taught in this course.

For this, there is another setting called

the max.in.flight.requests.per.connection

and this default value is five.

But in case you have an older version of Kafka

and you have retries you need to set it to one

to ensure key based ordering

although that may impact your throughput.

But when you have Kafka higher version, for example,

higher than 1.0 then you can use idempotent producers

and you will be good to go.

So I will see you in the next lecture

to discuss what these producers are and how they work.
