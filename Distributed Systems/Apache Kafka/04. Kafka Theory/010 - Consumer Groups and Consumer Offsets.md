Hi, this is Stephane from Conduktor,

and in this lecture we're going to learn

about Kafka, Consumer Groups.

So when we have Kafka and we want to scale

we're going to have many consumers in an application

and they're going to read data

as a group and it's called a consumer group.

So let's take an example

of a Kafka topic with five partitions,

and then we have a consumer group

that is called Consumer Group Application,

it's just a name I give it.

And then that consumer group has three consumers,

one, two and three.

Then each consumer within the group

if they belong to the same group

are going to be reading from exclusive partitions.

That means that my Consumer 1

is going to read from partition zero

and maybe partition one.

My Consumer 2 is going to read

from partition two and partition three,

and finally my Consumer 3

is going to read from Partition 4.

So as we can see consumer one, two and three

are sharing the reads from all the partitions

and they read all from a distinct partition,

this way, a group is reading the Kafka topic as a whole.

So what if you have too many consumers

in your consumer group, more than partitions?

So let's take an example of a topic A,

with partition 0, one and two,

and then my consumer group application

has consumer one, two and three.

So in this case, we know that the mapping is simple

we have each consumer reading from one partition

and then if we add another consumer

into this consumer group and we can, it's possible

then that Consumer 4 is going to be inactive.

And that means that it's just going to be stand by consumer,

and it's not going to read from any topic partitions

and that's okay, but you need to know that it's normal.

That Consumer 4 is not going to help Consumer 1

to read from Partition 0, no, it's going to stay inactive.

And also you can have multiple consumer groups on one topic

so it is completely acceptable

to have multiple consumer groups on the same topic,

and let's take an example.

So we go back to our topic with three partitions

and then we have our first consumer group

that I've named Consumer Group Application 1,

and it has two consumers.

Now they're going to share their reads

from our topic partitions,

so Consumer 1 is going to read from two partitions,

and Consumer 2, just from one and that's fine.

And then we have a second consumer group application

and this one will have three consumers,

and each of them are going to be reading

from a distinct partition.

And then finally, if we have a consumer group three

with just one consumer, that consumer is going to be reading

from all topic partitions.

So as we can see,

it's fine to have multiple consumer groups on the topic,

then each partition will have multiple readers, right?

But within a consumer group,

only one consumer is going to be assigned to one partition.

And so why would you have multiple consumer groups?

Well, if you go back to the trucks example that I gave you,

we had a location service and a notification service

reading from the same data streams of trucks GPS,

well, that means

that we're going to have one consumer group per service.

So one consumer group will be for the location service,

and another consumer group

will be for the notification service.

Now to create distinct consumer groups

as we'll see, when we go to the programming section,

we're going to use the consumer property named group.id

to give a name to a consumer group,

and then consumers will know in which group they belong.

And these groups they're even more powerful

than what we think.

So in this group we can define consumer offsets,

what are they?

Well, Kafka is going to store the offsets

at which a consumer group has been reading.

And these offsets are going to be in a Kafka topic

named consumers offsets with underscores in the beginning

because it's an internal Kafka topic.

So let's take an example and we will understand

why consumer offsets are so important.

So we have this topic,

and what I represented right here vertically is an offset,

so we've been writing a lot in this topic

and now we have number 4258, all the way up.

So we have a consumer from within the consumer group

and is going to commit offsets once in a while.

And when the offsets are committed,

this is going to allow the consumer to keep on reading

from the offsets onwards.

And so the idea is that when a consumer is done

processing the data that is received from Apache Kafka,

it should once in a while commit the offsets

and tell the Kafka brokers to write

to the consumer offset topic,

and by committing the offsets

we're going to be able to tell the Kafka broker

how far we've been successfully reading

into the Kafka topic

and so this is why you do it once in a while.

While you do this well, because if your consumer dies

then comes back and then is going to be able to read back

from where it left it off,

thanks to the committed consumer offsets,

because Kafka is going to say,

hey in this partition two,

it seems you have been reading up to these offsets for 4262

then when you restart,

please will only send you data from this offsets onwards.

And this is thanks to consumer groups offsets

that we're going to be able to have some mechanism

to replay data form where we have crashed or failed.

So that means that we have different delivery semantics

for consumers, and we'll explore the those in detail

later on in this course.

But by default, the Java Consumers

will automatically commit offsets in an at least once mode.

But if you choose to commit manually,

you have three delivery semantics,

and I will explain those in details

later on this course again.

So we have at least once

which means that the offsets are going to be committed

right after the message is processed

and in case the processing goes wrong,

then there's a chance we are going to read

that message again.

So that means that we can have duplicate

processing of messages in this setting,

and so we need to make sure

that our processing is it idempotent,

that means that when you process again the messages

it will not impact your system.

The second option is to go to at most once

and the effect of this is that we commit offsets

as soon as the consumers receive messages

but then if the processing goes wrong

then some messages are going to be lost

because there won't be read again

because we have committed offsets sooner

than actually processing the message,

so that means that we see messages at most once.

And then exactly once

where we want to process messages just once.

So when we do Kafka to Kafka workflow

that means when we read from topic

and then we write back to topic as a result

we can use the transactional API, which is very easy to use

if you use the Kafka streams API as well, for example,

or if go from Kafka to an external system

then you need to use an idempotent consumer.

So this is just to introduce these concepts

we will explore them in depth

when we go into the programming section of this course

but just so you know,

based on how, and when you commit offsets

you're going to be either in at least once mode,

at most once, or exactly once mode.

All right, that's it for this lecture

on consumers and consumer groups, I hope you liked it,

and I will see you in the next lecture.
