Hi, this is Stefan from Conduktor

and in this demo we're going to add a shutdown hook

to our consumer code.

And this is going to allow us to just properly shut

down the consumer just like we did previously

properly shut down the producer.

Let's duplicate this consumer demo

and I'll call this one "Consumer Demo With Shutdown".

Okay, so we are done.

We are going to keep the same Java application for now.

We're going to keep the properties all the way.

This is perfect.

We are gonna keep the consumer

but now we're going to actually just

before the subscribe creates what's called a shutdown hook.

So the first thing we need to do is to get a reference

to the main thread, the current thread.

So what we do is that we do final thread,

main thread equals thread dot current thread.

And this is a reference

to the thread that is running my program.

So this is the main thread

because we are in the main method right now.

So it's a reference

because we'll be using it in a few seconds.

And then we add the shutdown hook.

So to add a shutdown hook, it's very easy,

we'll do run time dot get run time dot add, shutdown hook.

And this is a standard Java method.

We need to pass in a new thread called the hook.

So new thread.

And then I'm going to open

up the brackets and we'll do public void run to

actually create this run method instead of a thread.

So what is the thread that is going to run

when we have a shutdown?

And the thread we're going to run is

that first of all, we're going to say, "Hey,

we detected a shutdown because we have to take a shutdown."

Let's exit by calling consumer dot wakeup

and we'll see what the wakeup method is and how it works.

But this is the the trick to exit the while loop.

So once we do this, let's do actually a consumer dot wakeup.

And when we do a consumer dot wakeup,

what's going to happen is

that the next time we will do consumer dot poll in our code

this is going to throw a wakeup exception.

And this wakeup exception is what we want to be catching.

So consumer dot wakeup is on the catch.

And so once we allow and we tell the consumer, "Hey,

you should throw an exception next time."

Some code is going to execute after the while loop.

So what we wanna do is to not finish our program just yet,

we want to make sure that this shutdown hook is now waiting

for the main program to finish.

So here we'll join the main thread to allow the execution

of the code in the main thread.

And to this we'll do a main thread dot join.

Now we need to try catch this.

So I will surround it with try catch.

So for me it was alt enter and then we have surrounded it

with a try and catch statements.

So to summarize, upon getting a shutdown hook

we call consumer dot wake up

which will trigger an exception

in our consumer on this line of code.

And then we will join the main thread

to wait for all the code

in this page to be completed and have no more execution.

So because we know that this consumer is going

to throw an exception on the dot pole method,

we need to have a try around everything.

So let's try around

and we'll even add the consumer dot subscribe in there.

So we'll try and we'll close it here.

So on the try block we are trying

and I will just have more space.

So we try and we try this entire block of code and we know

that at some point consumer dot poll is going

to throw a wake up exception.

So we catch a wake up exception E, and this is expected.

So log the info, "consumer is starting to shut down".

This is because this is expected

and so it's not an exception we wanna react to,

we expected it because this is a shutdown, but

in case we catch an exception E that we don't know about.

So this is an unexpected exception

then we can have a log that error,

"unexpected exception in the consumer".

And then we can pass

in the exception itself to see what is happening.

And no matter what, if we have a unexpected exception

or a wakeup exception, you wanna

have a finally block to actually shut down your consumer.

So we do consumer dot actual close

to actually well close the consumer

and this will also commit the Offsets.

Good to know.

And then finally we'll do like log dot info,

the consumer is now gracefully shut down.

Okay, so let's summarize because this

was a bit of improvement.

So we are creating a reference to the main thread.

We add a shutdown hook, we wake up the consumer

in the shutdown hook, and then we join the main thread so

that the code after the try gets run, then the consumer

on that poll throws the wake up exception, which is saying,

"Hey, the consumer is starting to shut down."

We go into the final block, we close the consumer,

which is going to gracefully close any connection to Kafka

and allow our group to rebalance, gracefully, by the way.

And this will also commit Offsets.

And finally we will have a final message saying,

"The consumer is now gracefully shut down."

So let's run our code now.

So let's go ahead and run the consumer demo with shutdown.

And we're going to see what happens

when we try to exit our consumer.

So in this case, we are joining a group

and now our consumer is polling, polling, polling, polling.

But if I click on here on exit,

it's going to send a shutdown.

So as you can see, thread zero, which is a new thread,

not the main thread is saying, "Hey, I detected a shutdown

let's exit by calling consumer dot wake up."

So we were right here in the shutdown hook.

That makes sense.

And then the consumer that wake up got called.

We went into poll,

which triggered an exception because now we see

that the main thread is saying,

"Consumer is starting to shut down."

So we were right here.

Then we go and close the consumer.

And this is what you see right here.

As you can see, this is called a graceful shutdown

of the consumer because now we're

revoking the previously assigned partitions.

We are resetting generation and so on.

We're leaving the group.

This is all the things that happen.

Then the metrics shut down,

the app info bar that's there also shuts down.

And finally, when Kafka has done all its thing,

we display one final message called, that says,

"The consumer is now gracefully shut down."

And that's it.

We have successfully stopped our Kafka consumer gracefully,

which is key to understanding what's going

to happen in the next lecture

because we're going to demonstrate consumer

in consumer groups.

So that's it.

I hope you liked it and I will see you in the next lecture.
