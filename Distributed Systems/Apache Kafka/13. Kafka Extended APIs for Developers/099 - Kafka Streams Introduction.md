Hi, this is Stephane from Conduktor.

And in this lecture,

we're going to do a small and quick introduction

into Kafka Streams.

So we know that our Kafka Cluster

currently has a topic called wikimedia recentchange.

And we want to perform some computation on it in real time.

For example, we want to count the number of times

a change was created by a bot versus a human,

or analyze the number of changes per website.

For example, if it's ru.wikipedia.org, or en.wikipedia.org.

Also we want to know the number of edits

on the 10-seconds slice as a time series.

So we could use for this, a Producer and a Consumer,

and you can achieve it but it's gonna be very low level,

not developer friendly, and very not easy to do.

Instead we can use a Kafka Streams Application.

So your Kafka Streams Application

is going to be reading from this topic.

You can write your DSL.

So we'll write some code for Kafka Streams Application,

and then it will be outputting the stats for the bots,

the stats for the websites,

and the stats for your timeseries.

So it looks magical, right?

But what is Kafka Streams?

It's an easy data processing and transformation library

that exists within Kafka.

So you can do Data Transformations.

You can do Data Enrichment.

You can do Fraud Detection.

You can do Monitoring and Alerting.

Pretty much anything you want.

You write it as a standard Java application.

You don't need to create a separate cluster

to deploy the Standard Java Application.

It's highly scalable, elastic and fault tolerant.

Provides you Exactly-Once transformation capability

because it's a Kafka to Kafka workflow

and it will leverage the transactional API.

And it's one record at a time processing.

There is no batching.

It works for any application size,

and it's super easy to write.

Now it takes a whole course to learn Kafka Streams,

but in the next lecture

I will already wrote a Kafka Streams Application

that we're just going to run and observe its behavior.

So I hope you liked it

and I will see you in the next lecture.
