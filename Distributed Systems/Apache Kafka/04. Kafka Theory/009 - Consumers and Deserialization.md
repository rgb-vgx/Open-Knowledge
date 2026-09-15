Hi, this is Stephane from Conduktor

and welcome to this lecture on Kafka consumers.

So we've seen how to produce data into your topic

but now we need to read data from that topic.

And for this we're going to use consumers.

Consumers implement the pool model,

that means that consumers are going to request data

from the Kafka brokers, the servers,

and then they will get a response back.

It's not the Kafka broker pushing data

to the consumers, okay?

It's a pool model.

So we have an example

with three topic partitions that contain data,

and then one consumer may want to read

from topic A partition zero,

and is going to read the data just like this.

And another consumer may choose to read

for more than one topic partition,

so he may choose to read data again,

from partition 1 and partition 2.

So the consumers when they need to read data

from a partition, they will automatically

know which broker, which Kafka server to read from.

And in case a broker has a failure,

the consumers are again very, very smart,

and they will know how to recover for this.

Now the data of the read data being read

for all these partitions is going to be read in order,

from low to high offset,

so zero, one, two, three and so on within each partition.

So the consumer, the first consumer is going to read data

in order for topic A partition 0,

from the offset 0 all the way to offset 11.

Same for consumer 2,

that is going to be reading data in order for partition 1,

and in order for partition 2

but remember, there is no ordering guarantees

across partition 1 and partition 2

because they are different partitions, okay?

The only ordering we have is within each partition.

So now that consumers read messages,

they need to transform these bytes that they receive

from Kafka into objects or data.

So we have the key that is a binary format

and a value that is a binary format,

which corresponds to the data in your Kafka message.

And then we need to transform them to read them and put them

into an object that our programming language can use.

So the consumer has to know in advance

what is the format of your messages?

And this consumer in instance,

knows that my key is an integer and therefore is going

to use an integer Deserializer to transform my key

that is bytes into an integer.

And then the key object is going to be back

to one, two, three.

Same for the value,

we know that we need a Deserializer of type string

because this is what we expect to be in this Kafka topic,

and therefore, this Deserializer is going to take bytes

as an input and then create a string out of it.

So we're going to get back our value object, hello world.

So obviously, Deserializers are being bundled

with Apache Kafka and they can be used by your consumers.

So it could be for string including Jason, Integer, Floats

Avro, Protobuf and so on.

And as we see, we have a process of Serializer

at the producer side and Deserializer at the consumer side,

and the consumer needs to know in advance

what is the expected format for your key and your value?

That means that within your topic life cycle,

so as long as your topic is created,

you must absolutely not change the type of data

that is being sent by the producers,

because otherwise you're going to break your consumers

because they're going to expect for example,

integers and string, but you're going to change them

into Floats and Avro who knows, right?

And that will be a big problem.

So if you want to change the data type of your topic,

what you have to do is to create a new topic instead,

and in this new topic you can have whatever format you want,

and then your consumers will have to be reprogrammed

a little bit to read from these new topics

with this new format.

Okay, so that's it for consumers and consumer Deserializers,

I hope you like this lecture

and I will see in the next lecture.
