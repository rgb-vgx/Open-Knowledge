Hi, this is Stephane from Conduktor

and in this lecture we're going to implement

a high throughput producer.

So we'll add snappy message compression in our producer,

and snappy is going to be very helpful

if your messages are text-based

and they are for our use case.

For example, if you have log lines or JSON documents

and we have JSON documents.

Snappy, I like it because it has a good balance

of CPU to compression ratio,

but test whether the algorithm is good for you

and make your own decisions.

We'll also increase the batch size to 32 kilobytes

and we'll introduce a small delay

with linger.ms to 20 millisecond,

and we'll also check which partitioner

is being used for our code.

At the end, our code is going to look like this,

so let's get started.

Okay, so let's launch our producer while it is this,

and we are going to have a look at

the default value set for these settings.

So I'm going to stop this.

Okay, stop, stop, stop.

Okay, so if we have a look at it,

the batch size is 16 kilobytes.

Then we have the compression.type, it is none,

and linger.ms is zero.

And if you have a look at the partitioner.class,

it is called the DefaultPartitioner,

and if we have a look and just type DefaultPartitioner,

we're going to import it and then go in this class.

You see it implements the sticky partitioning

because there is a sticky partition cache and so on.

So this is the newer type of partitioner

I just told you about.

Okay, so back here, I'm going to remove this

cause we don't need it.

And next we're going to set

some high throughput

producer configs.

So we're going to do

properties.setProperty

producerConfig.linger_ms to be 20.

This is to add a little bit of delay.

Then we're going to add the batch_size_config.

We said is going to be 32 kilobytes,

so 32 times 124,

and this must be a string.

So we're going to do integer.toString

and parse in this number,

so here we go and parse in this number.

And lastly, we need to enable compression.

So the compression_type is going to be

equal to snappy because I like it.

So what I want to show you is that

even though we enable these settings,

the consumer is going to work equally well.

So let's start a consumer

on the wikimedia.recentchange topic,

and now we're going to relaunch this producer

and let it produce a little bit of data.

So it's launching, it's producing some data.

Cool, I can stop it.

So if we look at the settings,

batch size is now 32 kilobytes, that is the case.

Compression.type is snappy,

and linger.ms is 20 milliseconds,

so we're trying to be a bit more efficient.

Now, if I go here,

I look at the fact that's indeed

the data was received by my console consumer

without any changes, we didn't modify any setting.

We didn't specify the fact that our data was compressed,

that it was in a batch and so on.

So the consumer does all the magic behind the scene, okay?

So fairly simple by adding these settings

at the expense of 20 millisecond of delay at most,

we're going to get a lot more efficient producer, okay?

Well, that's it for this lecture,

I hope you liked it,

and I will see you in the next lecture.
