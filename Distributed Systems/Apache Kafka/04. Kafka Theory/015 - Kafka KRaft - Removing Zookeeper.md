Hi, this is Stephane from Conduktor,

and in this lecture we're going

to learn about the Kafka KRaft mode.

So a little bit of history in 2020,

the Kafka project started to work

on removing the Zookeeper dependency from it.

It's called KIP-500.

Why, well, when Zookeeper was being used,

Kafka clusters were having some scaling issues

if you have over 100,000 partitions,

which is a lot of partitions.

But, by removing Zookeeper,

now Apache Kafka can scale to millions of partitions,

and becomes easier to maintain and set up.

It also improves stability.

It makes it easy to monitor, support, and administer Kafka.

You have a single security model for the whole system

because now you only have to deal with Kafka security,

and not Zookeeper security.

Also, there's just a single process

to start with Apache Kafka.

It gives you, as well, faster controller shutdown

and recovery time.

So Kafka KRaft is implemented as of Kafka 3.X version,

so 3.0 and so on,

but it has been production-ready only since Kafka 3.3.1.

So, KIP-833.

Also, Kafka 4.0 will be released only with KRaft support.

There's going to be no Zookeeper support

in the KRaft mechanism.

So with the KRaft architecture, if we look at the Zookeeper,

we have a Zookeeper Quorum

with a leader to handle our Kafka brokers.

But then with a Quorum controller,

there is only Kafka brokers

and one of them is the Quorum leader.

So we can see the simplified architecture.

Also, KRaft gives us performance improvements.

So this comes from a blog,

and as you can see the control shutdown time

as well as the recovery time after uncontrolled shutdown

is substantially better.

So, overall KRaft is a great improvement

and this is something we cover in this course

into how to launch a cluster in KRaft mode.

So that's it.

I hope you liked it, and I will see you in the next lecture.
