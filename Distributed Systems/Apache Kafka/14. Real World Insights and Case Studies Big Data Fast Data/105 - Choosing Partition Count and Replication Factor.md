Hi, this is Stephane from Conduktor.

And in this section,

we're going to have a look at real-world architectures

and ask ourselves real-world questions.

So the first one is around choosing

the partitions count and the replication factor.

So to me, they're the two most important parameters

when you create a topic

because changing them over time or changing them

has an impact on performance and durability.

So let's take an example.

Here is a topic with two partitions

and a replication factor of two.

What happens if you don't get

the parameters right the first time?

For example, if you have a partition count

increased during a topic life cycle,

you will break your keys ordering guarantee,

which is bad if you're using keys

to send data into Apache Kafka.

Also, if you increase the replication factor

during a a topic life cycle,

you're going to put more pressure on the system

because you get to have more network communication

and more disk space use.

Have a look, I'm adding one partition

and one partition here

because we just augmented the replication factor to three.

And as you can see well, more data space use

and of course I didn't represent it here,

but more replication happening.

So, how do we get these numbers right

from the get go?

So to choose the partition counts,

you have to figure out that each partition

can handle with throughputs of a few megabytes per second

and need to measure it for your setup.

So if you have more partitions

that means you have better parallelism, better throughputs,

you can also run more consumers in a group to scale.

Remember, you can only have a maximum number

equal in the consumer group that are active,

equal to the number of partition in your topics.

So high number of partitions means

possibly a high number of consumers.

You can also leverage more brokers

if you have a very large cluster.

But if you have more partitions,

you are going to have more elections to perform

in case of broker who goes down using Zookeeper,

if using Zookeeper and that problem is going to be solved

by using a Kafka on its own with craft mode.

But also more files opened on Apache Kafka.

So guidelines to choose the partition counts

is to me, the million dollar question

and intuitively, I would say

if you have a small cluster of less than six brokers

then choose three times the number of brokers.

If you have a big cluster, for example, over 12 brokers,

then choose two times the number of broker.

Overall, you need to adjust that number up,

if you need to know, if you know you need to have

a lot of consumers within a group

to be able to accommodate peak throughput in parallel.

So of course, test it out, test it out

and also adjust for producer throughput.

So if your producer is very high throughput

or is going to increase a lot in the next two years,

then have more partitions from the get go.

Overall, test, over time, test.

So each Kafka cell was going to have different performance,

based on the machine you have,

So test, test, test, test, and test,

and overall don't do the beginner's mistake

of being like, okay, I'll just create topics

with 1000 partitions every time and I'm good, right?

Don't do that.

Find the right partition's number for your topic.

Now for replication factor,

it should be at least two in production,

usually three in production

and maximum, sometimes four.

So the higher the replication factor,

the better durability of your system,

because N-1 brokers can fail,

and your data will still be out there.

Better availability for your system as well

because you have N-min.insync.replicas as availability,

if producer acks equals all, which is now the default

with Kafka 3.0 and over.

but the higher replication factor

the more replication you have,

and so higher latency

if acks equals all, because you wait for all the replicas

to acknowledge your rights.

Also, if you add a replication factor,

you going to use more disc space on your system.

So 50% more,

if you use a replication factor of three instead of two,

but overall, it's easy to ask this base

to add disk space overall today.

So guidelines is, I would set it to three to get started.

And for this, you must at least have three brokers

for that in production, but that is the baseline.

And if replication performance is an issue,

I would suggest to get a better broker

instead of less replication factor.

Never ever set it to one in production.

That is one of the biggest mistake I see.

Now from a Kafka cluster, overall perspective,

what is the guideline?

The total number of partitions in your cluster,

should be a maximum of 200,000 partitions, okay?

Which then hits the Zookeeper scaling limits.

It's still recommended, to have

up to 4,000 partitions per broker that's a soft limit.

That means that,

if you have 200,000 partitions in your cluster,

you may have 50 brokers overall in your cluster.

Now, when you use Kafka with craft

which is not yet production ready when I record this video,

but may come later on, the idea is that with craft

we can potentially scale to millions of partitions in Kafka.

And this is why craft mode was invented,

to go over the Zookeeper limits.

So if you need more partitions in cluster, you add brokers.

And if you need more than 200,000 partitions

in your cluster, and honestly,

it's rare for you to get there,

it will take you some time,

then you can follow the Netflix model

in which they just create more Kafka clusters

that are going to be independent.

Overall, as I said, don't do the beginner mistake

of creating every topic with 1000 partitions

just to achieve quote, unquote, high throughputs.

Start at a reasonable number,

test the performance, and go from there.

All right?

So hopefully that was helpful,

and I will see you in the next lecture.
