Hi, this is Stephane from Conduktor.

And in this lecture,

I'm going to show you what is the schema registry

and why we need it.

So, Kafka is very efficient because it takes bytes

as an input and then publishes them to consumers.

Okay, so there is no data verification done.

Your producers just produces a series of zeros and ones

and then your consumers read these zeros and ones.

And then the producer to produce these zeros and ones

they will use a serializer and the consumer to consume them,

they will use a deserializer.

But what if the producers starts sending bad data?

For example, a different format.

Or what if the fields get renamed?

What if the data format changes from one day to another?

Then on-consumers will break

because they are not aware of this

they expect a specific deserializer

and then they will crash on runtime

because while the deserializer is failing.

That means you need a schema registry.

We need data to be self describable.

We want to be able to evolve data over time

without breaking the downstream consumers.

So we need schemas and a schema registry.

And schema describe how the data looks like.

So, what if the Kafka Brokers themselves were verifying

all the messages they receive?

It would break what Kafka, what makes Kafka so good

because Kafka doesn't even read or parse your data.

So there is no CPU so it doesn't try to interpret it.

It just takes bytes as an inputs

without even loading them into memory.

It's called zero copy.

So Kafka just takes in bytes and distributes bytes.

And so as far as Kafka is concerned,

it doesn't care if you have an integer,

a string, whatever you want Kafka just takes it in.

So Kafka cannot do the guard dwell

of being a schema registry.

So instead the schema registry

needs to be a separate components

and the producers and consumers

will need to be able to talk to the schema registry.

The schema registry should be able to reject bad data

before it is sent to Kafka.

And a common data format must be agreed upon

by the schema registry.

So that data format needs to support schema.

It needs to support schemas evolution

to change the schema over time,

and it needs to be lightweight.

So you have schema registry

and then you Apache Avro as the data format.

But now you also have Protobuf and JSON schemas

also supported by the schema registry.

So if you look at a pipeline without a schema registry,

it looks like this.

Source, sensor producers sends to Kafka,

sends to consumer, sends to targets.

Here, we don't have a concept of schemas.

But if we have a schema registry, things will change.

So, the schema registry will store the schemas

for your producer and your consumer.

It will be able to enforce backward forward

and full compatibility on topics.

If you want to evolve your schemas

and you can decrease the size of the payload

sent to Kafka.

How? Let me show you.

So we have Kafka now, and we have also a schema registry

that is separate components.

Now the producer before sending to Kafka,

will send the schema in the schema registry

if this schema is not yet inserted.

Then the schema registry is going to validate

the schema itself with Kafka.

And then if all good,

then the producer is going to send avro data to Kafka.

But the schema is externalized in the schema registry.

Now, when a consumer reads data from Kafka,

it's first going to receive avro data,

and the deserializer will say,

well, you need a schema to read the data with.

So the consumer is going to retrieve the schema

from the schema registry.

The consumer can now produce your object

and you can write to your targets.

So, this one little optimization actually is very efficient

and very useful.

So using a schema registry has a lot of benefits

but it implies you need to set it up well,

make sure it's highly available because it becomes

a critical component of your architecture.

And then you need to of course change the producer

and consumer code but actually,

it becomes even easier to use them.

Apache Avro as a format is awesome

but has a learning curve.

And you can also learn alternatively Protobuf or JSON schema

but nonetheless, you have to learn something.

The schema registry is distributed by confluent.

For example, it's free and source available.

And that means it's not open source

but the source is available.

A little bit different.

And there are other open-source alternatives

that may exist out there in the wild

but I don't have references here.

Okay?

Now, it takes time to set up a schema registry

and we don't cover the usage

in this course of the schema registry

but we're still going to do a small demo.

Okay?

So hopefully you understand the need of a schema registry

and I will see you in the next lecture for a demo.
