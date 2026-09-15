Okay, this is Stephane from Conduktor

and we have our group and still some data to read.

So let's go into our code.

And what we're going to do is around offsets commits.

So if we run this code right here

just as is, and I'll press stop.

We have a look at the fact that

we have enabled auto commit equals true.

And then the auto commit interval milliseconds equals 5,000.

That means that every five seconds,

the offsets are going to be committed.

So I'm going to run this and show you.

So it's running, so 1, 2, 3, 4, 5, the lag has gone down.

1, 2, 3, 4, 5, the lag is going down again.

And then every five seconds you'll see the lag going down.

So this means that the auto offset commit interval

is about five seconds.

So back in my code, I've stopped the consumer.

So we start some data to product to process.

And what I'm going to do now is that

I'm going to commit offsets manually.

So what I have to do is to do enable auto offsets config,

and we'll have this one as false.

So as soon as I do this,

the consumer is not going to commit offsets automatically.

So let me show you what happens.

So I'm going to run my consumer,

and is going to consume thousands of messages, okay?

So I'm going to let it run for a while and wait for it

to you see consuming all these records,

and insert them into elastic open search,

although it's not very efficient, and we'll have a look at

the performance improvement right after this, okay?

But if I go into my code,

my Kafka, my Conduktor right here,

and refresh, this has changed because it was from before.

But actually it doesn't change.

The lag doesn't change at all.

But if I look at my consumer right now,

it doesn't receive any more records

because it has cut up with the end of the topic.

So even though I am at the end of the topic,

of course if I refresh, the lag is still the same, why?

Well, because we don't have any more auto offsets committed,

so therefore the offsets are not going to be committed.

So therefore, if I stop my consumer, so you see,

it says your records, if I stop it and then rerun it,

then you'll see very soon it's going to read again

all the data I have.

So one moment is going to synchronize into the group.

It takes sometimes like a few seconds.

So let's wait,

and these things can happen,

and I'll leave it running cuz it's good

because of a consumer timeout.

So because my consumer did not gracefully shut down

because I just pressed the stop button,

and we don't have the graceful shutdown code,

then it takes a while for the old consumer to be timed out,

and then for this one to come on in.

So it takes a while.

So here we go it to cover.

And now as you can see, we are reprocessing the same data.

So obviously something wrong here,

we need to start committing offsets.

And so therefore we need to change our code a little bit.

So we are going to go right here,

we have while true then we are receiving some records.

We are consuming these records,

we are inserting them into open search.

And so I would say that after the whole batch is consumed,

then we can commit offsets.

So commit offsets after the batch is consumed.

And in that case, what I need to do is just

consumer.commit Sync or Async whatever, I'll do sync

so that the offsets are synchronized,

synchronously committed,

and then I will do log that info,

"Offsets have been committed.", perfect.

So now if I, so we can get this line of log.

I'm going to comment this log.info, response.getId,

and run my code again.

And so we're going to be consuming data

from the topic, okay?

Received 500 records,

and then we get offsets have been committed,

then offsets have been committed and so on.

So that means that yes, offsets are being committed,

and of course if I go into the consumers group view,

and refresh, now the lag is zero.

And now we have stopped reading records, so we're good.

So obviously the assets shouldn't be committed

unless there was something to commit.

So I could probably improve my log line,

but you get the idea.

And if we look at the consumer code itself,

we are in at least once

because what we do is that we commit the offsets

only after we've successfully processed the entire batch.

And so therefore we are in at least one strategy, all right?

So that's it for this lecture, I hope you liked it,

and I will see you in the next lecture.
