Hi, this Stephane from Conduktor,

and in this lecture,

we're going to run a Kafka Stream application.

So we know we have the wikimedia.recentchange topic

and the way it works, that we have a Kafka producer

that reads a stream from Wikimedia

and sends it into this topic.

Now we're going to run

a Kafka Streams application alongside,

and this Streams application

is going to compute some statistics on this topic.

It's going to compute if we have a bot, or not a bot,

it's going to compute the stats for each website

and compute a timeseries

of how many events we get per second.

So let's get started and run this Kafka Streams application.

Okay, so on the code course you have downloaded,

there is a kafka-streams-wikimedia directory

that I've created.

And if you're going to build.gradle,

we see that as a dependency,

there is kafka-streams: 3.1.0 that I've added.

This is what's necessary

to write a Kafka Streams application.

If we look in the code, this is way advance,

I have a course of course dedicated

to learning Kafka Streams, but this is what

a Kafka Streams application look like, okay?

So we still need to configure Kafka Streams.

So we see the same kind of properties

we've seen from before.

And then what I do is that I create a topology,

what's called topology,

and then when the topology is done,

I start it and run it.

Now each topology is pretty complicated,

and this is what I've created processors.

And so we have, for example, a topology

for computing whether or not something is a bot,

we have a topology for counting events,

and we have a topology for doing the website counts.

So these are quite complicated

and I don't expect you to understand

that all what these are doing, okay,

because it requires a full course to do it.

But the code is ready to be run,

and what we're going to do in this lecture

is just see the fact that yes,

there is some code for Kafka Streams

and we're going to run it.

You click here and you run your Wikipedia Streams processor

and your Kafka Stream application

is going to be processing

all the historical data that you have.

So you'll see a lot of log output as you can see right here

and it's going through a lot of stuff, as you can tell.

And to make sure

that it actually processes data in real time,

what we should do is that we should also run

our own Wikipedia producer

in the background as well, in parallel,

so that we know that everything is running in real-time.

So, let's run the WikimediaChangeProducer as well.

Perfect, so now we know that data

is being produced in real-time as well

and processed in real-time by our Streams application.

So to verify the output,

let's go into Conduktor and refresh this page.

Now we see 13 topics, and so we have a few output topics.

So we have the wikipedia.stats.bots

which represents how many bots

and non-bots we see over time.

So as you can see, we saw 9,000 bots and 20,000 non-bots

and this will get updated over time.

So, I'm going to wait a little bit to get a new update here.

And now as you can see, the values have been updated

for this topic, so this is good.

We can go into another topic,

for example, the timeseries topic.

This gives you information into,

as we can look at the events,

how many events we had in the last 10 seconds.

So we had 38 events in the last 10 seconds

and this is where the start time

and the end time of my window.

So this is what has been computed

by my Kafka Streams application.

As you can see, this changes over time.

So we had 38, 235, and so on.

So this gets updated

as we go along with the timeseries computation.

And finally, wikimedia.stats.websites

which gives you some statistics

around how many commons.wikimedia.org that we have, so 75,

and then eo, we have 1, en we have 27, and so on.

So this gives you the number of messages received

per sub website of Wikipedia, which is very, very handy.

And because this is a Streams application,

all the topics you see right here

are what's called internal topics.

They're topics created by our Kafka Streams application

to function correctly

because it persists data into Kafka,

and you don't have to worry

about too much the value of these.

These are internal topics because they end with -changelog,

repartition, and so on.

So that's it, we've run our first WikiStreams application.

Now there's a whole course dedicated

to understanding how that works,

but to just finish this hands-on,

just make sure you stop the producer

and just make sure you also stop the Streams application.

Alright, that's it, I hope you liked it,

and I will see you in the next lecture.
