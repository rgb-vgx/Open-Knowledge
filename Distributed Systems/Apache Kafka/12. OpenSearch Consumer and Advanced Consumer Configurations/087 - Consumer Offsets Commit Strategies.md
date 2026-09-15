Hi, this is Stephane from Conduktor

and we're going to have a look

at the consumer offset commit strategies available to you.

So there are two common patterns

for committing offsets in your application.

The first one is the easy one that we've been using so far

which is that enable.auto.commit is true.

And then we get a synchronous processing of batches

and this is what we've been doing in our code.

And this second one is to disable

enable.auto.commit and to manually commit offsets.

There may be some advantages there

but you need to be aware of the trade offs you're making.

So let's dive in.

So first let's do a deep dive

into the auto offset commit behavior.

So when using Java Consumer API behind the scenes

the offsets are going to be regularly committed

as you've seen before.

And this enables at-least-once reading scenarios by default

under certain conditions.

So these upsets are going to be committed whenever

the poll function is going to be called in your code.

And then the auto.commit.interval millisecond has passed.

For example, if auto.commit.interval millisecond

is five seconds and then auto.commit equals true,

that means that it will commit every five seconds

whenever we call .poll.

For this, we need to make sure that, of course,

all the messages were successfully processed

before we invoke poll again.

If you don't,

then there's gonna be some messages that are not going to be

in an at least one scenario.

And so you will lose messages in case your consumer crashes.

So in that rare case, if you do like to do this,

then you need to go and disable enable.auto.commit

and then you need from time to time to call commitSync

and commitAsync based on how far you've been processing.

This is quite advanced and I will not go over this, okay?

We go over either the strategy one or strategy two.

Strategy one is to have enable.auto.commit equals true

and two process stuff synchronously.

So I'm sharing this already, but let's do it again.

So we pull, then we start a timer.

We pull again, three seconds have elapsed.

We pull again, maybe six seconds total have elapsed.

And therefore automatically behind the scene

the consumer is going to asynchronously commit the offsets

for all the messages that were processed before the

in the last call to pull, okay.

This happens behind the scenes

and then the timer starts again, et cetera, et cetera.

So this is pretty good.

And so therefore our code should look like this.

We have a loop, then we do poll,

and then we do something synchronous

with this batch of data.

That means that the next time we call poll

then we have the guarantee for sure

that we have successfully processed our batch of data.

So this makes sense

and this is how your code should look like.

And this is what the code we have coded so far looks like.

So with auto.commit

the offsets are going to be committed automatically

for you at regular interval.

As I said, and again, I repeat myself

but if you don't use synchronous processing

you will be in at-most-once behavior.

Okay?

The next is, if you want to disable enable.auto.commit

and still do synchronous processing of batches.

Therefore it looks like this.

The batch is something that you accumulate

with consumer.poll.

And then if there's an isReady function, for example

if the batch is big enough, or if enough time is elapsed

then do something synchronous with the batch

and then commit your offsets asynchronously or synchronously

whatever you prefer.

In that case,

you're going to control whenever your offsets are committed.

And what is the condition for committing them?

For example, the batch could be a buffer.

You want to accumulate as many records as possible

into the buffer and then flush the buffer to database.

And then only when it is done successfully

then commit the offsets, okay?

So there's an other option you can do is to

disable auto.commit and store the offsets externally.

And this is very, very advanced, okay?

It's not something I'm going to demo you in the code

because then we need to have a manual consumer

and use the seek advanced API to start reading where

we need to read.

And then these offsets need to

be stored in the target database.

And it becomes quite advanced.

We also need to implement the ConsumerRebalanceListener

interface and so on.

So this is complicated.

And if you do go this route,

you're going to get exactly once processing

and you are going to have to commit

both the data and the offsets

as part of the single transaction in the target database.

So if you don't understand anything I'm saying

this makes sense.

It is quite advanced and this is not a strategy

I would recommend

unless you're knowing exactly what you're doing.

So what you should be doing instead is the strategy one

or two that I've shown you.

And I will go

in the next lecture to show you how to implement them.
