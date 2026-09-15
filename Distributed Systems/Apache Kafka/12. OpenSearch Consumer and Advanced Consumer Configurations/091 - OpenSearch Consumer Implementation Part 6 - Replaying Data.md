So let's go ahead

and just add the necessary code

to gracefully shut down this piece of consumer.

So if you go back into our kafka basics,

and then we go to ConsumerDemoWithShutdown,

we can copy the part around the shutdown.

So we have the thread right here

that I'm gonna go back and copy

right underneath my consumer.

So we have a reference to the main thread.

Then we have a try already.

So we have the try around the while.

So this is perfect.

So what we need just is the part around the catch.

So let's catch some exceptions.

So back into my OpenSearchConsumer,

at the very bottom of my try, which is right here,

I'm going to paste things.

So in case of a WakeUpException,

the consumer starts to shut down.

Another exception.

then we'll print it to the log.

And here, we finally close the consumer.

And we may as well close the openSearchClients.

So let's do this dot close to close both my clients.

And now this should be enough to have the closing logic

and have a graceful shutdown.

So if I run my consumer right now,

and then we'll be able to play with some offsets.

So if I run the consumer right now,

as you can see,

I receive some records.

So let me wait until I'm fully caught up with the log.

And now I receive 0 record.

So I'm fully at lag 0,

so I can exit my program.

And as you can see,

now we have a clean shutdown of our consumer.

So that means we can go in Conduktor, for example,

or you could use a CLI.

And you can refresh this.

You can see that the group is empty.

And we can reset offset.

So we've seen before how to reset offset

to the earliest to have lag 0,

which will allow us to reprocess the entire topic.

But we can play, we can play with latest,

so latest will be the exact same offsets

we are at right now,

because we are at the end of the topic.

We can also have a specific offset,

for example, offset 500.

Or we can do a shift by to shift by 500 or a daytime.

So let's do shift by and say 500 as a minus,

so minus 500.

So now it's going 500 back for many different offsets.

So we'll reset.

And we can do the exact same thing, of course, with the CLI.

But it's a little bit quicker visually with the interface.

So now we have a overall lag of 1,500.

And of course, if I restart my consumer,

what's going to happen

is that I'm going to consume these messages.

So as you can see, 500, 500,

and then one more time, 500.

And then I'm back at 0.

So my offsets have been fully committed.

And I've caught up with the data.

And if I refresh this, the lag is now 0.

And we know that this is a safe operation to rewind,

because the way we inserted data

into Elasticsearch, OpenSearch

was by using an idempotent operation,

because we leveraged the ID field from the record itself.

So that's it for this lecture.

I hope you liked it.

And I will see you in the next lecture.
