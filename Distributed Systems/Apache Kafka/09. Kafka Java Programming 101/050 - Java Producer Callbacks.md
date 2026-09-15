Hi, this is Stephane from Conduktor,

and welcome to this lecture on Kafka producer

where we're going to use the Java API,

and we're going to look at callbacks from the Java API.

So, this is for us to understand from the producer itself

to which partition and offset the message was sent to.

And for this, we'll use the callback interface.

So, after this, we'll done that,

we'll have a look at something called the StickyPartitioner,

which is a very interesting behavior of the producer.

I will just show you the RoundRobin and StickyPartitioner.

And I will explain to you what this graph means in a second.

So, let's first have a look at creating our code.

So, let's have a look with callbacks.

But first, here, I'm going to say I am a Kafka producer

to just change a log.

We're good.

Next, I'm gonna take this ProducerDemo class

and duplicate it.

And this one is gonna be called ProducerDemoWithCallback.

All right, so my class has been created.

As you can see, the LoggerFactory got adapted

to change the class name.

So, that's perfect.

And what we're going to do

is that we're going to add a callback to our producer.

So, what is a callback?

Well, when we are taking the producer

and do producer.send, producerRecord,

if I do commence P, I see that I can also provide a callback

as a second argument.

So, this is what I'll do.

I'll do a comma and then new Callback and press Tab,

and the callback got included.

And now, I have a new function

called onCompletion that I can override.

So, this method has two arguments.

It has the RecordMetadata and possibly an exception.

So, instead of saying exception,

I'm just gonna say e, Exception e.

Okay.

So, what's going to happen is that this callback

is going to be executed every time a record is

successfully sent, or an exception is thrown.

So, this is why we also have an exception.

And so, how do we know if it's successful or not?

Well, we'll check that if e == null,

so that means there is no exception.

Then, of course, that we know

that the record was successfully sent.

And here, we can do some logging.

So, to know what is in this metadata object.

So, log.info, and then we pass on the string.

So, Received new metadata.

And then, I'm going to add in a new line,

so anti slash and n to add a new line,

plus and I'm going to keep on doing my code.

So, the topic is going to be metadata dot,

and here, we can get a lot of information

out of this metadata object as you can see.

So, metadata.topic plus,

and then a new line,

and then a plus again.

So, I'm going to duplicate this line a few times.

Okay. Perfect.

So, I have the topic that I'm going to show you.

I'm going to have the partition.

So, metadata.partition.

We're going to have as well the Offsets.

So, metadata.offsets.

We're going to have finally the timestamp.

So, timestamp is metadata.timestamp,

which shows you everything that there is to know

about this metadata object.

Now, I close in my parenthesis

and I add a semicolon at the end.

And we're good.

So, this is going to log

every time a record was successfully sent.

And then, I have an else.

And in this else, I'm going to have a log.error

and error while producing,

and with comma e to pass in the exception that happens.

Okay, so we are good now.

So, now, we have this onCompletion method

that we'll execute every time the record is sent.

So, why don't we go and run this program?

So, let's run our ProducerDemo.

And as we can see now, we receive new metadata

and we have topic, demo_java, partition 1, offset 14.

Okay, so you can run this more and more.

So, we keep on producing.

Now, we're producing to partition 0

and I can keep on producing.

Now, we're producing to partition 1

and I can keep on producing.

And as you can see,

the partition is random and it's changing every time.

So, I'm trying to show you partition 2,

but again, it's just random.

So, you may not see partition 2 at the moment.

So, now, let's produce multiple messages

at a time in our topic and see what the behavior.

So, just before the producer record,

we're going to have a for loop.

So, for int

i equals 0,

and then i less than 10.

So, we'll send 10 messages, i ++ to increment i.

Sorry, you open this brackets.

And we're going to take this entire code

for the producer record and the sending data.

Don't send the flush in the for.

So the flush is outside the for.

And in here, we're producing a new producer record.

So, the text is going to say hello world plus i,

so that we have the hello world one,

hello world two, hello world three, and so on.

And then, we're going to run this code.

So, each producer record

is going to be sent as part of the producer

and we're going to get this onCompletion with the metadata.

So, let's run this code and see what happens.

So, my code is not being run,

and if we have a look at the partition number,

it is always number 1.

So, 1, 1, 1. And it's always number 1.

And if you try to rerun this code,

you may get another partition.

You may get partition 0, partition 1, partition 2.

In this case, I have partition 0,

but it's always going to be the same partition

for all these messages.

And this is due to what's called this StickyPartitioner.

So, I was showing you these two little diagrams.

So, what I've been telling you all along

is that the producer sends data at RoundRobin.

That means that the first message will go to partition 1,

the second to partition 2, partition 3, and so on.

And we've actually observed behavior quite a bit.

But somehow, now what's happening is that our producer

is using what's called a StickyPartitioner,

which is actually a performance improvements.

So, what's going to happen is that if you send six messages

in this example, but 10 in our code,

if you send six messages very quickly,

the producer is smart enough

to be now batching these messages

into one batch to just make it more efficient.

So, maybe the first three message, if sent rapidly enough,

will go to the same batch in partition 1.

And then, once this batch is sent,

then the other two, the next three messages

will be sent to partition 2

as one batch, which is more efficient

than sending one message for partition,

because this requires as many batches as messages

and it's very not efficient for your producer.

So, this is the behavior

of my producer with a UniformPartitioner.

And how do we know that it's using the UniformPartitioner?

Well, if I go into

my Kafka log and look at this,

whenever you start a producer,

you're going to have all this information being logged.

And if you scroll down and look at the partitioner class,

you see it equals to null,

meaning that we are going to use the default partitioner.

And this applies only of course when we don't specify a key,

which we are not specifying right now.

So, I want to show you how this behaves.

So, we want to see how we switch

between different partitions.

And so, for that, I need to change a few things.

First of all, I need to produce 30 messages at a time.

So, I will have i equals 30,

so that my batch is a little bit bigger.

So, we produce 30 messages at a time.

And in between each produce of a batch,

I'm going to have a small thread that sleep

and then 500 milliseconds.

And this is set in red, so I can just do Alt option.

And then, I'm going to surround with try/catch.

So, we're going to sleep for 500 milliseconds.

And what I wanna do is repeat this multiple times,

so that we send multiple batches.

So, I can have another for loop.

So, for int j equals 0

and j less than 10 and j++.

Oops. In here.

I'm going to copy this entire blob of code in here. Perfect.

So, here, we're saying, hey,

you're going to do 10 times this.

And for each time you do this,

you're going to create a batch of 30 records.

And then, you're going to wait 500 milliseconds

between each send.

And finally, to demo how this works,

I need to also set a smaller batch size,

because this new partitioner

really does play with batch size.

So, I will set the property batch.size

and I will set it to 400 like a really low value

just to demonstrate to you the behavior.

So, now, we have this producer

is still using the UniformStickyPartitioner,

but now we send a lot of batches.

And if I run this code right now,

we're going to send a lot of messages into Apache Kafka,

but hopefully, we should start seeing

the behavior we wanna see, and we start to seeing it.

So, this is perfect, I'm going to show you,

but if you look in your logging,

the log may go very quickly.

But I can look at the fact

that it was partition 2, now it's partition 0.

And I scroll down.

We have partition

2 again.

I scroll down, partition 0.

And then, partition 1.

So, it's really going between different partitions.

And finally, but I would never recommend it in production,

but if you wanted to exhibit the behavior

of just going to every different partitions,

you can set your property.

So, property.setProperty,

and then the partitioner class

to be the RoundRobinPartitioner.class.getName.

And this will make your messages

go to different partitions for every batch.

And this is what we've been seeing

when we are using the CLI,

but I would not recommend using this.

And also I will keep this commented.

And same for the batch size.

This is just to demonstrate the behavior,

but you would never go

for a smaller batch size in production,

you would keep the Kafka default of 16 kB of batch size.

All right, that's it.

I hope you like this lecture

and I will see you in the next lecture.
