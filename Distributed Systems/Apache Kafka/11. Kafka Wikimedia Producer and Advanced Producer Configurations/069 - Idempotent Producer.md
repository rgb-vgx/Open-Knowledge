So let's review what is an idempotent producer?

So when a producer is sending data into Apache Kafka

they can be duplicate messages due to network errors.

So let's have an example.

Here's what a good request looks like.

We produce data into Apache Kafka,

Apache Kafka commits the data into the log

and Apache Kafka sends back an acknowledgement

to our producer.

From that point on words, all good, right?

But what if you have a bad request

or duplicate requests, what happens?

We produce it out to Kafka.

Kafka commits the messages on the log and sends back an ack.

But this ack never reaches our producer

maybe because of a network error.

Therefore the producer never receives an ack

and say this is weird.

I'm going to retry my produce

because we have a retry setting, right?

So the produce is retried, Kafka sees it as a new request.

So it will commit a duplicates message

and then sends back the ack.

So from a producer perspective,

only one request made it to Kafka and was acked,

but Kafka actually committed two messages.

For this we can use an idempotent producer.

So starting from an old version of Kafka,

this idempotent producer does not introduce duplicates

on network errors, right?

Well, because on a good request, everything is the same,

but for a duplicate request, even though you have an ack

that never reaches your producer

and the same produced request is retried,

Kafka is smart enough to say,

hey this looks like a duplicates produce request,

therefore I'm not going to commit twice

but I'm still going to send you back the ack

for you to think that the request was successful.

So this is the whole power of idempotent producer

and they're quite powerful.

So there a must to guarantee a stable and safe pipeline.

And since Kafka 3.0, so it took a little bit

of time between 0.11 and 3.0,

they are becoming the default.

Okay, and I definitely recommend to use them,

even before 3.0, but they're not the default

for Kafka list and 3.0.

So when you set up an idempotent producer,

automatically the retries are going to be set

to the max value.

The max in flight request are going to be one

for Kafka 0.11, or five for Kafka 1.0.

And also, even if you set max in flight request to five,

then the ordering is going to be kept.

And if you're curious about the implementation detail

just Google Kafka 5494, okay.

And also acts are going to be equal to all.

So these settings are going to be automatically applied

after your producer has started

if you don't set those manually.

So in your producer code, you can just set producer

props dot enable, idempotence, true, and you're good to go.

So this is super important for you to understand

because while defaults are sharing in Kafka all the time,

but you need to improve the behavior.

And in case you're not using Kafka 3.0,

then you can set those manually to force your Kafka producer

to use the good values that we know,

that have the good behavior.

So I will see you in the next lecture

just to summarize everything we learned.
