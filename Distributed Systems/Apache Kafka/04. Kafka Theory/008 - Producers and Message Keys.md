Hi, this is Stephane from Conduktor,

and in this lecture, we're going to learn about producers.

So we've seen that topics, whole data,

but for topics to have data written to it,

well, we need to write a Kafka producer.

And so the producers are going to write

to the topic, partitions.

So remember, we have partition zero

for my topic named topic A,

then partition 1, partition 2,

and the writes happen sequentially with data Offsets.

And then your producer is right before that

is going to send data into your Kafka topic, partitions.

So the producers know in advance

to which partition they write to,

and then which Kafka broker, which is a Kafka server has it.

We'll learn about Kafka brokers very, very soon.

So that means that the producers know in advance

in which partition the message is going to be written.

Some people think that Kafka decides at the end,

the server which partition data get written to,

this is wrong.

The producer decides in advance

which partition to write to and we'll see how.

And then in case A, Kafka server

that has a partition as a failure,

the producers know how to automatically recover.

So there's a lot of behind the scenes magic

that we'll explain over time that happens within Kafka.

So we have load balancing in this case

because your producers, they're going to send data

across all partitions based on some mechanism,

and this is why Kafka scales,

it's because we have many partitions within a topic

and each partition is going to receive messages

from one or more producers.

So now producers have message keys in the message.

So the message itself contain data,

but then we can add a key and it's optional,

and the key can be anything you want,

could be a string, a number, a binary, et cetera, et cetera.

So you have two cases.

In this example, I've taken a producer

that is writing to a topic with two partitions.

So if the key is null,

then the data is going to be sent round robin.

So that means that it's going to be sent to partition zero

then partition one, then partition two and so on,

and this is how we get load balancing, okay?

Key equals null means that the key was not provided

in the producer message,

but if the key is not null,

that means that the key has some value.

It could be again, a string, a number, a binary,

whatever you want.

And the Kafka producers have a very important property,

that is that all the messages that share the same key

will always end up being written to the same partition,

thanks to a hashing strategy,

and that property is very important in Apache Kafka.

So when we specify a key,

this is when we need message ordering for a specific field.

So remember your example with trucks beforehand.

We had trucks and it would be good for us

to get the position of each individual truck in order.

So in that case,

I'm going to provide truck ID as my key of my messages.

Why?

Well, then for example, truck ID 123,

which is an ID of one of my trucks

is going to be always sent to partition zero,

and I can read data in order for that one truck.

And truck ID 234 is always also to be sent

to partition zero,

and which key ends up in which partition is made,

thanks to the hashing technique

that I will tell you right after.

And then for example, another truck ID,

for example 345 or 456

will always end up in partition one of your topic A.

So the key is part of a Kafka message.

And here is what a Kafka message looks like

when it's created by the producer.

So we have the key and it can be null as we've seen,

and it's in binary format.

Then we have the value,

which is your message content.

It can be null as well,

but usually is not,

and it contains the value of your message.

Then we can add compression onto our messages.

So do we want them to be smaller?

If so, we can specify a compression mechanism,

for example, gzip, snappy, lz4 or zstd.

Then we can also add headers to our message,

which are optional list of key value pairs.

Then we have the partition

that the message is going to be sent to

as well as its Offsets.

And then finally, a timestamp

that is either set by the system or by the user.

And this is what a Kafka message is,

and then it gets sent into Apache Kafka for storage.

So how do these messages get created?

So we have what's called a Kafka Message Serializer.

Because Kafka is a very good technology,

and what makes it good

is that it only accepts series of bytes

as an input from producers,

and it will send bytes as an output to consumers.

But when we construct messages, they're not bytes.

So we are going to perform message serialization.

And doing serialization

means that we are going to transform your data,

your objects into bytes,

and it's not that complicated,

I will show you right now.

And then these Serializers

are going to be used only on the value and the key.

So say for example, we have a key object, okay?

So it's going to be the truck ID, so 123,

and then the value is just going to be a string,

hello world.

So these are not bytes just yet,

they are objects within our programming language,

but then we're going to specify the key Serializer

to be an integer Serializer.

And what's going to happen

is that Kafka producer is smart enough

to transform that key objects, 123

through the Serializer into a series of bytes,

which is going to give us a binary representation

of that key.

And then for the value object,

we're going to specify a string Serializer,

as you see the value

and the key Serializer in this instance are different.

And so that means that it's going to be smart enough

to transform the string, hello world

into a series of bytes for our value.

And now that we have the key

and the value as binary representations,

that message is now ready to be sent into Apache Kafka.

So Kafka producers come with common Serializers

that help you do this transformation.

So we have string,

including the JSON representation of the String,

Integer, Floats, Avro, Protobuf and so on.

We can find a lot of message Serializers out there.

So just for the curious about those who want to understand

how the message keys are hashed,

and this is more advanced, okay?

Just for those who are curious,

if you're not, you can skip this,

but there is something called a Kafka partitioner,

which is a code logic that will take a record, a message

and determine to which partition to send it to.

So when we do a send,

the producer partitioner logic

is going to look at the record

and then assign it to a partition,

for example, partition one,

and then it gets sent by the producer into Apache Kafka.

And the process of key hashing

is used to determine the mapping of a key to a partition,

and in the default Kafka partitioner,

then the keys are going to be hashed

using the murmur2 algorithm,

and there is a formula right here

that you're going to know, of course, okay?

But it means that it's going to look at the bytes

of the key, apply the murmur2 algorithm,

and then figure out, thanks to it,

what is going to be the target partition.

This is just to stress the fact that

producers are the one who choose

where the message is going to end up,

thanks to the key bytes, okay?

By hashing the key.

That's it.

It's just for those that I know

want some advanced content sometimes,

but if you don't understand this,

this is completely fine as well,

just remember everything that was said before.

All right, that's it for this lecture.

I will see you in the next lecture.
