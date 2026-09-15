So let's do an introduction to Kafka Connect.

So for example

you think you're not the first person out there

that is gonna try to find a way to get data

out of Twitter or Wikimedia

or maybe you're not the first person in the world

who's trying to send the data into a database, for example

from Kafka to PostgreSQL or ElasticSearch

or MongoDB or open source or whatever you want.

And the bugs you'll have,

maybe someone else will have them as well

and have them fixed before.

So Kafka Connect comes in

because it's all about reusing code

and reusing connector to simplify your life.

So why Kafka Connect?

Well, developers in the end

they kinda want to import data always from the same sources.

So Databases, JDBC, Couchbase, GoldenGate

you can read them all here, okay

and there's obviously a lot more.

And programmers usually want to store data

in the same targets, the same sinks.

So S3, ElasticSearch, HDFS, JDBC, and so on.

So this is where Kafka Connect comes in

where you use a source connector

to get data from a source and a sink connector

to send data into a sink.

Now, the architecture looks like this

so we'll have a Kafka cluster made of brokers

and topics and partitions.

Those sources can be diverse.

It can be Twitter, Wikimedia, Postgres, MongoDB

and we'll create a connect cluster made of workers.

And these workers are going to take data from the source

and send it into our Kafka cluster.

The same connect workers can also be used

to deploy sink connectors and create tasks for that

where they're going to read data from our Kafka cluster

and then send it to those sinks we want.

For example, MySQL, ElasticSearch, Amazon S3

Redis and so on.

So at a high level

we're going to have Kafka Connect source connectors

to get data from common data sources,

sink connectors to publish data in common data stores.

And it's a very easy way as you'll see in the demo

for non-experienced devs to quickly get the data reliably

into Apache Kafka.

It becomes part of your ETL pipeline

so extract, transform and load.

And scaling is made easy

from small pipelines up to company-wide pipelines

by adding connect compute capability

into your connect cluster and your tasks.

So this is the idea

that other programmers may already have a very good job

of doing a Kafka Connect connector.

So it's reusable code, and you should just leverage that.

So don't try to implement your own connector.

Find first, if there is a connector for you

because these connectors on top of it

they achieve fault tolerance.

They achieve idempotence, distribution

and ordering of the bat.

And for you, that is of course

something you may want to leverage.

All right, that's it for the intro Kafka Connect

I will see you in the next lecture.
