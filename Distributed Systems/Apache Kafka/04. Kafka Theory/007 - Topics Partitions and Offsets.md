Hi, this is Stephane from Conduktor,

and welcome to this first lecture

on a topic named Kafka Topics.

So, Kafka topics are a particular stream of data

within your Kafka cluster.

So Kafka cluster can have many topics.

It could be named, for example logs, purchases,

twitter_tweets, trucks_gps, and so on.

So, a topic in Kafka is a stream of data.

And if you wanted to make a parallel to databases,

well, a topic is similar to what a table would be

in a database, but without all the constraints.

Because you send whatever you want to a Kafka topic,

there is no data verification.

And it will explain to you what it means later on.

So you can have as many topics as you want

in your Kafka cluster.

And the way to identify a topic in a Kafka cluster

is by its name.

That's why I have logs, purchases,

twitter_tweets truck_gps,

those are all names for my Kafka topics.

So, these Kafka topics support any kind of message formats.

And then, you can send, for example, Json, Avro,

text file, binary, whatever you want.

The sequence of the messages in a topic,

is called a data stream.

And this is why Kafka is called a data streaming platform,

because you make data stream through topics.

You cannot query topics.

So topics are similar to table database,

but you cannot query them,

instead to add data into a Kafka topic,

we're going to use Kafka Producers.

And to read data from a topic,

we're going to use Kafka Consumers.

But there is no querying capability within Kafka.

Okay, so these topics, they're general,

but you can divide them into partitions.

So, a topic can be made up of for example, 100 partitions.

But in my example,

I'm going to have a Kafka topic with three partitions,

partition zero, one and two.

Now the messages sent to Kafka topic

are going to end up in these partitions,

and messages within each partition are going to be ordered.

So, my first messages into partition zero

will have the id zero, one and then two,

and then all the way up to nine.

And then as I keep on writing messages into my partition,

this id is going to increase.

So this is the same case when I go and write data

into partition one of my Kafka topic,

the id will keep on increasing and so on.

So, the messages in these partitions where they are written,

they are getting a id,

that's incrementing from zero to whatever.

And this id is called a Kafka partition offset, okay?

So you will hear me saying offsets a lot in this course.

So as we can see, each partition has different offsets.

Now, Kafka topics are also immutable.

That means that once the data is written into a partition,

it cannot be changed.

So, we cannot delete data in Kafka,

you cannot update data in Kafka,

you have to keep on writing to the partition.

Okay, so now let's take an example of trucks_gps

to make more increase.

So say you have a fleet of trucks and each truck has a GPS,

and the GPS reports its position to Apache Kafka.

Then each truck will send a message to Kafka

every 20 seconds, for example,

and each message will contain some information

such as the truck id and the truck position,

for example the latitude and the longitude.

So we have a bunch of trucks

and are going to be data producers,

and they will send data into a topic,

a Kafka topic, named trucks_gps

that will contain the positions of all trucks.

So the topic send the data into the trucks_gps topic

and then because the topic is made of partitions

as we've seen,

we choose to create a topic with 10 partitions.

Now that's an arbitrary number,

and I will will tell you how later on in this course,

how to select the number of partitions for your topic.

So once this topic is created in Kafka,

well, we have a use case, right?

For example, we want to have consumers

that will consume that trucks_gps data

and send it into a location dashboard.

So we can track the location of all our trucks in real time.

Or maybe we also want to have a notification service

consume the same stream of data.

And that notification service will, for example,

send notifications to the customers

when the delivery is closed.

So, this is why Kafka is very helpful

because well multiple services are reading

from the same stream of data.

Okay, so now let's note some important things

about topics, partitions and offsets.

So once a data is written to a partition

it will not be changed.

It cannot be changed that that's called immutability.

It's very important you understand this.

Data in Kafka is only kept for a limited time.

And the default is one week, although that is configurable.

That means that after one week, your data will disappear.

And the offsets only have a meaning

for a specific partition.

As you can see, the offsets are repeated across partitions.

So offset three in partition zero represents a message,

but it doesn't represent of course the same data

as offset three in partition one.

And the offsets are not going to be reused

even if previous messages have been deleted, okay?

It keeps on increasing incrementally one by one,

as you send messages into your Kafka topic.

Now, that means also that the order of messages

is guaranteed only within a partition

but not across partitions.

And that is very important to understand,

and I will repeat this later on this course again, okay?

But what this means is that,

well the messages within each partition,

they have offsets increasing,

so that means the are in order.

And we read them in the order of the offsets.

But then across partitions, we have no control, Okay?

So if we need ordering, we'll see how we can achieve this.

And then the data when sent to a Kafka topic,

is going to be assigned to a random partition, okay?

For example, zero, one or two, in this example.

Unless you provide a key,

and I will show you what this does when we have a key.

And in a Kafka topic,

you can have as many partitions as you want, okay?

We have three, sometimes 10, sometimes 100.

And again, we'll see how we can determine

what is the right number of partitions for our topic.

Okay, so that's it for this lecture.

We've seen what are Kafka topics, partitions

and offsets that hold messages.

And we've seen already some specificity aspects about Kafka.

So, I hope you liked this lecture

and I will see you in the next lecture.
