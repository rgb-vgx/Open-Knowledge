Hi, this is Stephane from Conduktor

and welcome to this section on the

Kafka Extended APIs for Developers as an introduction.

So the idea is that we did a lot of programming

and we have seen how Kafka Consumers

and Producers work in depth.

But they've been here for a long time,

and to me, they're considered low-level

because we are dealing with receiving

and sending each message.

But the Kafka &amp; Ecosystem has evolved

and there are some higher level APIs

that solve a specific set of problems.

For example, we can use Kafka Connect to solve the problem

of taking data from an external source

and sending it to Kafka,

or from Kafka into an External Sink.

If you want to do a transformation

from a Kafka topic to another Kafka topic,

instead of chaining a Producer and Consumer,

you can just use Kafka Streams.

And the Schema Registry is helping using schemas

in Apache Kafka.

So this section is just an introduction

and it's meant to give you an idea

of the depth of the Kafka Ecosystem.

And we'll see how we can leverage these components.

So we will put in place this architecture

where the Wikimedia data is going to be sent

to Kafka using a Source Connector,

the Kafka SSE Source Connector.

We'll use Kafka Streams to do a counter application

and compute some statistics on top of our dataset.

And we will be using Kafka Connect

ElasticSearch Sink to send data into OpenSearch.

So I hope you're excited

and we'll see you in the next lecture.
