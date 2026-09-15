Hi, this is Stephane from Conduktor,

and in this lecture we are finally going to learn

about the Kafka brokers.

So, a Kafka cluster is an ensemble

of multiple Kafka brokers,

and a broker is just a server, okay?

But in Kafka, they're called brokers

because they receive and send data.

So, a Kafka broker is going to be identified with an ID,

which is an integer.

And so for example, we're going to have Broker 101,

Broker 102, and Broker 103 in our cluster.

Now, each broker is going to contain

only certain topic partitions.

That means that your data is going to be distributed

across all brokers,

and we will see how in the next slide.

And then there is a very specific aspect in Kafka

that I will describe as well in the next slides,

which is called that's after you connect

to any Kafka broker, also called a bootstrap broker,

then the clients or the producers or the consumers

will be connected and know how to connect

to the entire Kafka cluster,

because the Kafka clients have a smart mechanics for this.

So that means is that you don't need to know in advance

all the brokers in your cluster,

you just need to know how to connect to one broker,

and then your clients will automatically connect

to the rest.

That means that your Kafka cluster

can be made of as many brokers as you want.

And a good number to get started

is going to be three brokers,

but some big clusters are going to have

over 100 brokers in them.

And in this example,

we just chose to number brokers starting at 100,

arbitrary because, well, this is just easier for me

to talk about brokers with number 100

and then topic partitions with zero, one, and two,

that's why.

Okay, so let's talk about how brokers

and Kafka topics and partitions are related,

and let's take an example in which we have

a Topic-A with three partitions

and a Topic-B with two partitions.

And then we have three Kafka brokers,

Broker 101, 102, and then 103.

So, Broker 101 is going to have the Topic-A, Partition 0,

then Broker 102 is going to have the Topic-A, Partition 2,

and this is not a mistake.

And then Broker 103 is having Topic-A, Partition 1.

So as we can see,

the topic partitions are going to be spread out

across all brokers in whatever order.

And then for Topic-B,

then we have Topic-B, Partition 1 on Broker 101,

and Topic-B, Partition 0 on Broker 102.

So in this example, we see that the data is distributed

and it's normal that Broker 103 does not have

any Topic-B data partition

because the two partitions have already been placed

on our Kafka broker.

And this is the power of Kafka.

In this example, as we see,

the data and your partitions

is going to be distributed across all brokers,

and this is what makes Kafka scale,

and what's actually called horizontal scaling,

because the more partitions and the more brokers we add,

the more the data is going to be spread out

across our entire cluster.

And we're noting the fact

that the brokers don't have all the data, okay,

the brokers only have the data they should have.

So let's talk about this broker discovery mechanism

I just told you about.

So each Kafka broker in your cluster is called

a bootstrap server.

So let's take an example of five brokers

in your Kafka cluster.

And I just represented Broker 101 as a bootstrap,

but all of them are actually bootstrap servers.

And you will see the bootstrap server arguments coming back

when you use the command line interface

or the Java programming.

This is why I'm explaining this to you right now.

So that means that in this cluster,

we only need to connect to one broker

and then the clients will know how

to be connected to the entire cluster.

So our Kafka client is going to initiate a connection

into Broker 101, as well as a metadata request.

And then the Broker 101, if successful,

is going to return the list

of all the brokers in the cluster,

and actually more data as well,

such as which broker has which partition,

but more on that later.

And then the Kafka client is,

thanks to this list of all brokers,

going to be able to connect to the broker it needs,

for example to produce or to consume data.

So that means that each broker in your Kafka cluster

is pretty smart and it knows about all the other brokers,

all the topics, and all the partition.

That means that each broker has all the metadata information

of your Kafka cluster,

and this is how clients connect to a Kafka cluster.

All right, that's it.

So in this lecture we've seen brokers in depth,

I hope you liked it,

and I will see you in the next lecture.
