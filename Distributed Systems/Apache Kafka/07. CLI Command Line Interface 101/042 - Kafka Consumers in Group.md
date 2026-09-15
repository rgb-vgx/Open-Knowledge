Okay, so now that we've seen

how the Kafka Console Consumer works

we're going to be able to start them in a consumer group

and we'll learn about the group parameter.

And it's going to show us how partitions are divided

amongst multiple CLI consumers.

It is actually a really cool demo.

So here is a reminder of what we're trying to expose.

So we have, for example, five partitions

and then three consumers,

and each consumer is consuming from a different partition,

they're all distinct.

So that's the behavior we're going to try to explore

by creating multiple consumers within the same group.

So let's get started.

Okay, so now let's have a look

at file number 3 called kafka-consumer-in-group,

and we are going to first create a topic named Third Topic

with three partitions.

This way we can start afresh.

Okay, so my topic has now been created

and what we're going to do is that we're going to consume

from this topic, so I copy this part,

but we add one last argument, which is the group parameter

which specifies a group ID for our console consumer.

So by doing minus minus group my-first-application

we tell Kafka

and the console consumer that we are using a consumer group.

And this is the first time we're actually doing it.

So we press enter

and nothing happens because well,

we need to start producing into our topic.

So again, we start a console producer

and we use the RoundRobinPartitioner

to make sure we send messages across different partitions.

This is the only way to observe this behavior

from a learning perspective.

But remember, no production here.

So we have launched this producer

and if I do a test, as you can see

the message test is appearing in my console consumer.

So this is great.

And what we're going to do now

is that we're going to launch another consumer

as part of the first group because right now,

if I obviously send messages,

these messages are going to be received

by that one console consumer.

But what I'm going to do now is to fold this a little bit

and start a console consumer.

But on the right hand side, so with the same command, okay,

we consume from the third_topic

but the group is my-first-application.

So we have now two consumers in the same group.

And if we have a look here, I say hello

and then world, and then last.

As we can see, the hello

and the last went to my first consumer

and the world went to my second consumer.

This is because we have a consumer group,

and it turns out that this consumer

gets two partitions assigned

and this one get one partition assigned

and we can push this behavior to having a third consumer.

So we are doing a third consumer as part of the group

(keyboard keys clicking)

and now it has joined the group.

So again, if I start to send messages, so one, two

and then three, as we can see, the one got here

the two got here, and the three got here.

So the messages get spread all across my consumers.

And that really shows the power of Kafka

because now we have a producer producing

to different partitions

and consumer consuming from different partitions.

And so as I keep on sending messages into Kafka over time

and depends how fast I do it, of course,

but they will be spread across all my consumers.

And just for the experiment, if I do one more consumer

on this consumer group on the same topic,

now we have four consumers for three partitions.

And it turns out that, well,

it's what we call not impossible case

but the one consumer will never be reading data

and the other ones may.

So this one right here is not assigned any partition

so it's not receiving any messages

which is why you're not seeing it read right now.

So just stop a consumer and then things will rebalance.

So if I just send a, b

and c, as you can see,

each of these consumer received one message.

If I shut down now, this consumer right here,

a rebalance happens again.

So d, e and f,

and as we can see, d,

and e got here and f got here.

And if I of course stop this consumer altogether

and just keep one consumer,

g, h, i,

these messages all go to the same consumer.

So we've seen really how that works with consumer groups.

On top of it, if I keep on producing,

as you can see, there's no more consumer, okay in my group,

but I keep on producing.

I produce, for example, j, k, okay, so more messages,

if I restart my consumer as part of this group,

because it is part of the group

and there has been some messages we need to catch up on

these messages are going to be right.

So j and k, not necessarily in this order for you

because we consume across multiple partitions

but these messages get sent to my consumer

because it was catching on,

catching up on the lag it had from before.

And to finish, if we start a consumer from-beginning

as part of a different group,

so this time, the group name is my-second-application

which is different from my-first-application

and I read this from the beginning,

I'm going to be reading all the messages in my topic

since the beginning and we're done.

And what if you run the same command again?

So we read from a group that already existed, but we specify

from-beginning, let's see, press enter.

And as you can see, nothing happens

because from-beginning is an argument

that is only helpful

when there has never been a consumer offset

that has been committed as part of the group.

So you're saying, "hey, for this new group,

start from the beginning."

But now that we've actually used

the my-second-application as a group

and that we've read data in Kafka, as you can see,

we don't use the from-beginning argument, it doesn't work.

And so this will not be taken into account

and we'll just be reading

from where consumer offsets were last committed.

So hopefully you've seen all the core behaviors

of Apache Kafka in this lecture

and you really understand consumers

and consumer groups because that's the core of it.

And I hope you like this lecture,

I will see you in the next lecture.
