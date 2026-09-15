Hi, this is Stephane from Conduktor

and we're going to learn about Producer Acknowledgements

or the acks setting.

So we see that producer sends data into our Kafka cluster

which hosts specific topic partitions

and then the rights are sequential.

But when producers send data into the brokers,

they can choose to receive

some acknowledgements of data rights.

They're basically acknowledgements of receipts.

So, we have acks equals zero

and that means that the producer

is not going to wait for an acknowledgements,

which is a possible data loss

and actually doesn't even request a acknowledgement

and we'll see this why it leads to data loss

in the next slide.

We have acks equals one,

to wait for broker leader acknowledgements

which presents limited data loss opportunities

and I will show you why as well in the future slide

and then we have acks equals all

or also minus one is the same value,

which is that the leader and the replicas

have to acknowledge the data rights

which leads to no data loss.

So let's have a look at all these settings in detail.

So first acks equals zero.

So when you have acks equals zero,

the producer consider messages as successfully written

the moment they are sent to the broker

without even waiting for the broker to accept it all.

And so that means that the producer sends data to the leader

and then the leader does the writes.

But if somehow the brokers goes offline

or some kind of exception happens,

we'll not know and we'll lose data.

So acks equals zero

is useful where it's potentially okay to lose messages

such as when you, for example, do metrics collection

and some people also argue that even in metrics collection

you don't wanna lose data

and people use acks equals zero sometimes

because it produces the highest throughput setting

because, well, the overhead on the network is minimized,

but it is only for very, very specific use cases

that acks equals zero would be acceptable to you

where it's okay to lose data.

So then we have acks equals one

and when acks equals one,

the producer consider messages as successfully written

when the message was acknowledged only by the leader broker,

which is the default setting

from Kafka version 1.0 to version 2.8,

so it used to be the default for a very, very long time.

And the producer sends data the leader,

the leader writes the data actually

and then responds to every request successfully,

say yes, "I have successfully written the data."

And then the data gets written over time like this.

So the leader response is requested,

but we have no guarantee of replication.

Only the leader has the data

and the replication is a background process

and so we don't know if the data has been replicated.

That means that if our leader broker

goes offline unexpectedly

but the replicas haven't gotten the chance yet

to replicate the data,

then we'll have a data loss

and if an ack is not received though,

the producer may go into a retry for the request

to actually try to write the data successfully.

So acks equals one gives us more overhead, of course,

on the types of requests,

but also more safety

because now we want the leader

to acknowledge the right

but we don't have the guarantee

the data is successfully replicated

so there is a potential data loss.

So this used to be the default from version 1.0 to 2.8

and it was accessible,

but people are evolving

towards getting the safest kind of guarantee

when writing you Apache Kafka

and this is provided by acks equals all

also interpreted as acks equals minus one.

Okay, all and minus one are the same value.

So when acks equals all,

the producers consider the messages

are successfully written,

when the message is accepted

by all in-sync replicas, so ISR.

Which is a default value for Kafka 3.0 and over

because this is the highest guarantee.

So let's take an example.

We have a Kafka broker,

a cluster with three brokers.

One of them is the leader for partition zero

and the other two are replicas,

so we have a replication factor of two

and our producer is using acks equals all.

So what happens?

The producer sends the data to the leader.

The leader will send it to the replica for replication

which will acknowledge the write to the leader broker.

Same for broker 103,

it will have the replica data

and acknowledge the writes

and then the broker 101 says, "Okay, we're good."

We can acknowledge the write as well.

There is some synchronization happening

that I'm going over really quickly

because you don't need to know how it works

and then you have the response back from the leader

saying, "Hey, all the ISRs acknowledge your writes

therefore you can acknowledge the writes as well."

And the data gets written this way.

So behind this complicated mechanism,

we're getting the certainty

that all the ISR in your cluster will have the data

when it's successfully written and the ack is received.

So this setting, acks equals all,

actually goes hand in hand with another setting

called min.insync.replicas.

That means that the leader replica,

when you do a write with acks equals all,

is going to check if are enough in-sync replicas

in your cluster to safely write the message

and this is controlled by the setting min.insync.replicas.

I will show you in a second.

So if you have min.insync.replicas,

which is the default,

then it's okay as long as the only the broker leader

successfully acknowledges your writes.

If you have min.insync.replicas equals two,

and this is a broker setting

or a topic setting by the way,

then it means you have at least the broker leader

and one replica to successfully ack

before returning a successful ack to the producer.

So let's take an example with min.insync.replica equals two

and a replication factor of three.

So we have the same diagram as before, but, for example,

if you have set min.insync.replica equals two

for your brokers or your topic, then what happens?

If broker 102 and broker 103 are down,

then the producer sends data to the leader

and says, "Hey I would like to write

to at least two replicas."

But the only replica available is the leader.

So we have min.insync.replica available is one,

but the setting says that it should be two.

Therefore, the broker 101

is going to respond to the producer

and say, "There are not enough replicas

and therefore is going to generate an exception.

So acks equals all is great,

but to get the safest data guarantee,

it's recommended to have a replication factor of three

and the min.insync.replica equals two

because this guarantee

that at least one other replica can get your data

and therefore, if that replica doesn't exist,

then the leader part, the broker is saying

I'd rather not accept the right then risk losing data.

And so is a producer responsibility to wait

for the replicas to come back up

before setting the data.

So this is quite a common setup

in companies that want the safest

and highest guarantee in terms of replication. Okay?

So this brings us into Kafka topic availability.

So if we consider a replication factor of three

and we have acks equal zero or acks equals one

as long as we have 1 partition up and running

and it's considered in-sync replica

then the topic is going to be available for rights.

So we can keep on writing to the leader.

If we have acks equals all

and we set min.insync.replica equals 1, which is a default

then that means that the topic

must have at least one partition up as an ISR

and that in includes the leader.

And so we can tolerate two brokers

going down in that setting, okay.

But if we have min.insync.replica equals two

which was the setting I should show you before.

Then we must have at least two ISR up

to be having a successful right.

And so we can consider that at most one broker is down.

Therefore, if only one broker is down

we still have the guarantee that two brokers available,

two take the rights.

And so we have the safest guarantee.

So, if we have min.insync.replica equals three

that doesn't make any sense

because if you have a replication factor of three

and min.insync.replica equals three

then we don't tolerate any broker going down at all

which is not how Kafka was designed.

So in summary, if you have acks equals all

and the replication factor

of Nandmin.insyc.replicas equals to M

then we can tolerate N minus M brokers curves going down

for topic availability purposes.

And by availability that means available for rights, okay.

Reads regardless are still going to happen.

So, the most popular combination

is going to be acks equals all

and min.isync.replicas equals two

which is going to give you good data durability

and good data availability, of course

with the replication factor of three.

And with these settings,

you can withstand at most the loss of one Kafka broker.

All right.

So that's it for this very, very important setting.

I hope you liked it.

And I'll see you in the next lecture.
