Hi, this is Stephane from Conduktor.

And welcome to this lecture

in which I'm going to introduce Kafka to you.

So let's first go

with company challenges regarding data integration.

So companies will have a source system,

for example, a database.

And at some point another part of the company

will want to take that data to put it into another system.

For example, a target system.

So the data has to move

from a source system to a target system.

And at first, it's very simple.

Someone who writes some code

and then take the data, extract it, transform it,

and then load it.

Now, after a while, your company evolves

and has many source systems

and also has many target systems.

And now your data integration challenges

just got a lot more complicated,

because all your source systems must send data

to all your target systems to share information.

And as we can see, we have a lot of integration.

So the previous architecture is that, for example,

if you have 4 source systems and 6 target systems,

you're going to have to write 24 integrations

to make it work.

And each integration comes with difficulty

around the protocol, because the technology has changed.

So maybe the data is going to be transported

over TCP, HTTP, REST, FTP, JDBC.

The data format.

So how is the data parsed?

Is it Binary, CSV, JSON,

Avro, Protobuf, et cetera, et cetera?

Data schema and evolution,

what happens if the data changes in shape overall

in your source or your target systems.

And then each source system will also have an increased load

from all the connections and the request

to extract the data.

So how do we solve this problem?

Well, we bring some decoupling using Apache Kafka.

So we still have our source systems and our target system,

but in the middle, will sit Apache Kafka.

What happens?

Now the source systems are responsible for sending data.

It's called producing for producing data into Apache Kafka.

So now Apache Kafka is going to have a data stream

of all your data, of all your source systems within it.

And your target systems,

if they ever need to receive data from your source systems,

they will actually tap into the data of Apache Kafka,

because Kafka is meant to actually receive and send data.

So your target systems are now consuming from Apache Kafka,

and everything looks

a little bit better and a little bit more scalable.

So if we go back to the same example,

what can be your source systems for example?

Well, it could be website events, pricing data,

financial transaction, or user interactions.

And all these things create data streams.

That means data created in real time,

and it is sent to Apache Kafka.

Now your target systems

could be databases, analytics systems,

email systems, and audit system.

So this is the kind of architecture we we'll implement.

Now, why is Apache Kafka so good?

Well, Kafka was created by LinkedIn.

And you should know LinkedIn.

It's a huge corporation.

And it was created as an open source project.

Now it's mainly maintained by big corporations

such as Confluent, IBM, Cloudera, LinkedIn, and so on.

It's distributed, has a resilient architecture,

and is fault tolerant.

That means that you can upgrade Kafka.

You can do Kafka maintenance

without taking the whole system down.

Kafka is also very good,

because it has horizontal scalability.

That means that you can add brokers over time

into your Kafka cluster.

And you can scale to hundreds of broker.

Kafka also has huge scale for messages throughputs.

So you can have millions of messages per second.

This is the case of Twitter.

Also, it's really high performance.

So you have really low latency.

Sometimes it's measured in less than 10 millisecond,

which is why we call Apache Kafka a real time system.

Kafka also has a really wide adoption across the world.

And if you're watching this video,

that means that you know Kafka is being widely adopted.

So over 2,000 firms are using Kafka publicly,

and also 80% of the Fortune 100 are using Apache Kafka.

Big names (indistinct) using Kafka are going to be

LinkedIn, Airbnb, Netflix, Uber, and Walmart,

but you don't need to be a mega corporation

to use Apache Kafka.

Now into the use cases, how is Apache Kafka used?

It's used as a messaging system, activity tracking system.

It's used to gather metrics from many different locations,

gather application logs.

It's used to be like the first use cases for Kafka.

More recently, it's used for stream processing,

and we'll see how to do that

using the streams API for example.

It's used to decouple system dependencies and microservices.

It has integration with big data technologies

such as Spark, Flink, Storm Hadoop.

And as I said, it's also used for microservices pub/sub.

So some more concrete example into how Kafka is being used.

So Netflix is using Apache Kafka

to apply recommendations in real time

while you're watching TV shows.

Uber is using Kafka to gather user taxi

and trip data in real time and compute and forecast demand,

also compute your pricing in real time.

And LinkedIn uses Kafka to prevent spam,

collect user interactions

to make better connection recommendations in real time.

So in all of that,

Kafka is only used as the transportation mechanism,

which allows huge data flows in your company.

So by now you should know what Kafka is

how it's used,

and why and how it came to be.

So that's it for this lecture.

I hope you liked it.

And I will see you in the next lecture.