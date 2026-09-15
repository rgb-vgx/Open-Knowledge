Okay, so now we are going to code

our first Kafka consumer.

We'll use the Java API, the basics.

So we're going to write a basic consumer

to receive data from Kafka.

We'll view some basic configuration parameters,

and we'll confirm that we receive data

from the Kafka producer written in Java.

So we'll look at the poll method

to get messages from the Kafka broker,

and we'll see that the poll method

will return data immediately if possible,

else will return empty and wait for a timeout

until it responds.

So let's have a look at it.

So let's go ahead and create our consumer.

So I'm gonna take my producer demo,

and then I will create a new file.

Call it ConsumerDemo, perfect.

And I am a Kafka consumer,

and I'm going to delete some stuff.

So I keep this, this is the connection to Kafka.

And then anything after this I will delete.

So we still have properties,

and if you want to connect your local host,

we just keep that line only,

if you want to connect to the Conduktor playground,

we add all these lines.

Okay, next we're going to add some consumer config.

So creates consumer configs,

and we first add what's called a key.deserializer,

and then we'll add a key value.deserializer.

So the producer was serializing,

and the consumer deserializes, that means

text divides and transform them into an actual object.

So therefore we need a stringDeserializer

at this time, .class.getName,

and this is the exact same thing

we're going to add to our value.deserializer.

So this is important because we need to set it to the values

based on the type of data that is being sent to our topic.

So if we have Avro data, then we need an Avro Deserializer.

If it's a string, it's a string deserializer and so on.

Another setting we need is to set the group id.

So the group ID context is called group.id,

and then we'll set it to groupId,

and we'll define a group ID variable in the beginning.

So I will have string groupId equals my Java application

because we're using Java right now,

and we want to create a new consumer group.

And by externalizing this at the top,

we can quickly change it.

Okay, and one last setting we need to know about

is called properties.setProperty,

auto.offset.reset, auto offset resets.

And this is important because it has three possible values,

none, earliest and latest.

So let me discuss them,

and then we'll choose the appropriate one.

None means that if we don't have

any existing consumer group, then we fail.

That means that we must set the consumer group

before starting the application,

so we don't want that.

Earliest means read from the beginning of my topic.

This corresponds to the minus minus from beginning option

when we looked at the Kafka CLI,

and latest corresponds to, "Hey, I want to read it

from just now and only read the new messages sent from now."

So because we wanna read the entire history of our topic,

we'll choose earliest.

So let's go ahead and create our consumer.

So I'm going to create a consumer right here.

And this is very similar to the producers.

So KafkaConsumer string, string

because we consume strings as part of our topics

for the key and the value.

I call this one consumer equals new Kafka consumer.

And then we need to pass in,

of course the properties we just created.

So we don't need these because they're optional.

So let me remove them, okay, perfect.

So next we need to pull for data.

And just before pulling to data,

we need to subscribe to a topic.

So the topic we're going to consume from

is the demo Java topic.

So I will do string topic equals demo_java, that's perfect.

And then underneath, I'm going to consume,

to subscribe the consumer to this topic

so that you can consume from it, so subscribe.

And then we need to pass in

a pattern or a collection of topics.

So we'll pass in a collection of topics.

So I have arrays as list

and then you can pass in as many topics as you want.

So you can say topic one and then topic two and so on.

But we only have one topic right now,

it's called the variable topic.

So we'll do it like this and you'll get a small warning here

because this is a topic of one.

So you can use as lists as singleton,

but you can add topics over time,

so we'll keep it as arrays, as lists.

Okay, so we are subscribed to the topic.

Now we need to retrieve data from the topic

because the consumers pull data from Kafka.

So we'll have a while true loop,

and this is an infinite loop.

We'll see how to be a little bit better

with infinite stuff in the in the future,

but right now we keep on polling for data infinitely,

and we're going to display a nice message saying

"Polling" to tell that our consumer is polling.

Next, we need to extract the consumer.poll,

and we need to pass in a duration

which is how long we're willing to wait to receive data.

So I will do duration of milliseconds 1000,

and this means that if there's data

to be returned right away,

this will complete in no time,

as soon as the data is received, we move on with the code.

But if Kafka does not have any data for us,

we are waiting to wait one second

to receive data from Kafka.

So this is not, this is in order not to overload Kafka.

So this returns actually a collection of records.

So it's called consumer records of type string, string,

and I'll call these one records,

which is a goal to this consumer.poll of millisecond 1000.

So now we receive records.

This could be an empty list, this could be many list,

but we can iterate over it.

So we'll do for consumer record this time

with only one with no S, of type string string,

and I call this one record.

And then call in record.

So this is for every record in my collection of records.

Then we're going to do something with this record.

And what we wanna do right now is just show it on the log.

So we'll do log.info and we'll extract the key.

So the key is the record.key and we'll extract the value.

So value is and then record.value, perfect.

And I'm going to duplicate this line

because we can also extract the partition.

So record.partition and then the offsets.

So for the offset right here, I could do record.offsets.

So now we have this infinite loop

where we are going to be pulling,

waiting up to one second to reset from data,

and then set, showing the data on our console.

And we are reading from the beginning of our topic.

So now let's start our consumer and see what happens.

So we're going to run the consumerDemo.main

so it compiles, and then we'll get some log outputs.

So we'll see a lot of things happening.

So a lot of lag, but let's take it

one by one and decompose it.

So first the Kafka consumer starts, and as you can see,

any kind of settings we've set such as

auto, offset, reset is put to earliest

as the bootstrap servers is put to my Conduktor playground.

And then if you look at the group id,

it's called my Java application.

And the key deserializer is the string deserializer.

So all the configurations are correct.

And then let's scroll down and have a look

at what's happening,

so we are starting the consumer group,

and the first thing you see is polling.

So we are already here in the code and nothing is happening.

So we get the polling and the polling again,

and then we'll have polling, polling,

and that's after four pollings, we'll get some values.

So in the meantime,

the reason we don't receive values is messages

is because the consumer is doing its thing.

So if we look at the log of the consumer,

this is very interesting.

So the consumer is joining a group,

and it turns out that the group is joined.

This is called my Java application,

and it says that I found three partitions

for my topic called demo Java one,

demo Java two, and demo Java zero,

and no committed offsets have been found

for these partitions.

So therefore, because there is no committed offsets,

the setting auto.offset.reset kicks in,

and the strategy is earliest,

so because it's earliest it says

it's going to reset the offsets for partition demo_java-2

to a specific position,

and the position is offset zero, offset zero,

and so it's going to reset the offset as well here, offset 0

to the very beginning of my topic,

and as soon as it's done, well, as you can see,

we can start to consume data.

So we receive one big battery here for partition zero.

Then we receive a batch right here for partition two.

So you can see this lot of messages from partition two.

And this is because the consumer is extremely efficient.

So I'm scrolling down

until I probably will find something else.

So let me scroll down, we'll see

all the messages for partition two.

Then after a bit we have partition one.

And then after a bit, we have partition zero

because the consumer was doing one API call to partition 0,

get everything back one partition,

one API call to partition one,

get everything back and then partition zero,

get everything back because Kafka is very efficient.

And if things can be batched,

then the consumer can receive up to one megabyte of data

at a time from a broker.

So it's quite a lot of of data.

And then after all the data was pulled,

then we are in this infinite polling loop,

and it will keep on going until we receive new data.

So let me go into this polling loop,

and of course if I actually run

my producer demo with keys, for example right now,

and start sending some data with my producer demo with keys.

As we can see now,

the data has been received by the consumer.

So we can see the hello worlds, we can see the key,

the values if it's not null and so on.

And we can see the fact that

we've read from partition 2, 1, 0 ,

and then again before partition,

and again after partition 2, 1, 2 again, zero and one.

So it was reading and being efficient.

So we see how the consumer works at the moment.

And another thing we can notice is that

if I decide to exit my program,

it's exiting it to abruptly.

So we have, we'll create a way,

and this is the consumer demo that I wanna show you.

We'll create a way to get out of this while loop

in the clean way in the next lecture, okay?

So we are out of our consumer.

We haven't done a clean shutdown, but we're out of it.

But what I wanna show you is that let's produce,

let's restart first our consumer.

So I restart my consumer,

it's going to be using the same group id.

And now if I restart it, as we can see,

we are polling, polling, polling, polling, polling.

That's because we rejoin the group, okay?

And then by rejoining the group,

we have actually caught up on the previous offsets,

and we are not going to consume again

because we have committed offsets from before.

So this is actually the bit of code that's happening.

So it says here, setting offsets for partition zero

to offsets three set 27, to 14 and 535.

So this is the important part in here is that

"Yeah, we are rejoining the previous offsets,

so therefore we don't see any new data.

But of course if you stop this, okay,

and you have the producer demo key run in the background,

so just once to send some data, perfect.

And then we run the consumer demo again.

What's going to happen is that upon rejoining the group

which can take a little bit of time

because we don't have a clean shutdown yet.

This is why it's taking some time

to find the the offsets back.

But we'll see how to address this in the very next lecture.

So don't worry.

But upon retrieving and rejoining the group,

and having specific offsets,

then we're going to start to see the data

from the producer demo keys.

So it'll be any seconds now.

And yes, now it has found the data I wanted to,

so it took about 30 seconds,

but we'll see how to address this in the next lecture.

Okay, so that's it.

We have done our consumer.

I hope you liked it, and I will see you in the next lecture.
