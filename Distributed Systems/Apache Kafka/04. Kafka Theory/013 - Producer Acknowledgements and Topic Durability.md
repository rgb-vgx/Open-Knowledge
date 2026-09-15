Hi, this is Stephane from Conduktor,

and I just want to introduce one more topic

on producer acknowledgements that we'll explore

in depth later on this course

but I just want to introduce the concept to you right now.

So we have the producers sending data

into our brokers, okay?

Now, we know that brokers have the topic partitions.

And so the producers can choose

to receive acknowledgements of data rights.

That means to have the confirmation from the Kafka broker

that the write did successfully happen.

So we have three settings, and we have acks=0,

which means that the producer is not even going to wait

or ask for an acknowledgement.

That means that we have a possible data loss

because if a broker goes down, we won't know about it.

Then we have acks=1, which means that the producer

is going to wait for the leader of a partition.

And this is very important,

that we understand now what a leader is.

So, it's going to wait for the leader broker to acknowledge.

And that means we have limited data loss

and I will go over this in details

later on this course, but just introduction.

And then what we have acks=all,

in which we require the leader, as well as all replicas,

in sync replicas, to acknowledge the write

which is going to provide you a guarantee

of no data loss under certain circumstances.

Okay?

So that means also that we can now understand

the concept of Kafka topic durability.

So, if you have a Kafka topic with a replication

factor of three then the topic

can withstand two brokers loss.

So in this example,

I didn't take three brokers, I took two brokers, okay?

Three brokers in a replication factor of two.

And we saw that when we lost broker 102

we still had the topic data available

to us because it was on other brokers, okay?

So as a general rule,

if you choose a replication factor of N, N being a number,

then you can permanently lose up to N-1

broker and still have a copy

of your data somewhere in your cluster.

And that is a very important feature of Kafka,

and we'll learn about it more in-depth

and how this relates to acknowledgements

when we go into the producer advance section.

All right, that's it for this lecture, I hope you liked it.

And I will see you in the next lecture.
