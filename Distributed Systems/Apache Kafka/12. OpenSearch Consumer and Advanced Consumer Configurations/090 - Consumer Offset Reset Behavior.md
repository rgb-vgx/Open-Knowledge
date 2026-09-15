Hi, this is Stephane from Conduktor

and in this lecture we're going to learn

about Consumer Offset Reset Behavior.

So the consumer is expected to read from a log continuously

and we've seen the process far enough now.

But, in case your application has a bug,

then your consumer can be down.

And by default, Kafka has a retention

of seven days for the data.

That means that if your consumer is down

for more than seven days, then the offsets it wants

to read from become invalid,

which brings us to the behavior

of the Consumer Offset Resets.

So we have auto offset resets called latest

that we've been using before,

which makes the consumer read from the end of the log.

We have auto.offset.reset=earliest

which is that the consumer will be reading

from the start of the log.

And then none, which will throw an exception

if no offset is found

because maybe you don't want to keep on processing,

maybe you want to maybe find a way to recover some data

before you start processing again.

Okay?

So now it sheds some light

into how this auto offset reset works.

Additionally, it's possible

for your consumer offsets to be lost.

So if you have an older version of Kafka than 2.0,

then in case the consumer has not read any new data

in one day, offsets are lost,

or if the consumer hasn't been reading data in seven days

for Kafka over 2.0, then the consumers offsets can be lost.

So this a setting you can control

with the broker setting, offset.retention.minutes

and it is something that I've seen many people adjust,

for example, to at least a month.

Now, to replay data for a consumer group

you need to first take all the consumers

from the specific group down,

then you use the kafka-consumer-groups command

to get the offsets of what you want,

and you restart your consumer.

Bottom line, I would suggest

that you set proper data retention period over seven days

if you need to and proper offset retention period.

You need to ensure

that the auto offset reset behavior is the one you expect

or want for your consumers.

And, in case of unexpected behavior,

use the replay capability in Kafka.

So that's it.

So now we'll show you in the next lecture

just to replay data for our consumer.

(computer clicks)
