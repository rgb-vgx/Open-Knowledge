Hi, this is Stephane from Conduktor

and in this lecture we're going to have a look

at the behavior of our consumer as part of a consumer group.

We'll observe partition rebalance mechanisms,

and in the next lecture we'll go one step deeper

on these rebalance mechanism.

So right now let's have a look at our consumer reading

from a topic with three partitions

and we're going to have one, then two, then three consumers

in our group.

So let's get started.

Okay, so let's have a look

at how consumer rebalances work for my consumers.

So I'm going to use the same code

but this time I'm going to remove the log.info("Polling")

because we don't need it and this will make just some noise.

So let's go ahead and run this java application.

So we're going to run it.

And as you can see, it's being run

and we have some log lines when we join the consumer group.

We've seen this before

and as you can see no messages have been consumed.

We know this because we are consuming from the latest,

but we can, you know, confirm it

because if we go to consumer groups

and look at my-java-application,

we know that it is stable and the lag is three.

So that makes sense.

We know exactly the kind of behavior we're having.

So now let's do something interesting

and then we're going to actually start another instance

of consumer demo with shutdown.

And this is done by first exiting the presentation mode.

So oops, I'm going to exit the presentation mode

and then I'm going to go for my consumer shutdown

and I'm going to edit the configurations.

And by editing the configurations,

I can go on modify options and allow multiple instances

of my consumer demo with shutdown.

So this is what you have to do and this is why

in the beginning I made you modify running with gradle

versus running with IntelliJ.

So back into my presentation mode.

Okay, we're back in.

Back into my presentation mode, I can see the fact

that now I can run another consumer with shut down.

So, I ran it, so you can click on the arrow right here.

And so now we have two instances of our consumer

with shutdown, but the interesting thing now

is that we look at the logs of them

and if we look at this one,

we are seeing that a group is rebalancing.

This is due to the second consumer demo

joining with the same group ID.

And now we have some generation.

And now at the end there is added newly assigned partition,

java-0 and java-1.

So two partitions were added,

and for this one it joined the consumer group

and then it get assigned the demo_java-2 partition.

And then we have the offsets retrieved.

So that means that now this producer,

this consumer on the right hand side is partition two,

and this one is partition zero and one.

So how do we verify it?

Well, if I start my producer demo with keys

and I run my program right here,

this is going to produce some data across all partitions.

And we see that on the first one we read the partition one

and partition zero.

And on the second one we only read partition two.

So this works really great.

So now we can also clear the log again

and we're going to run the consumer demo with shutdown

one last time, so let's run again.

And then we have a third instance of our consumer demo.

And if we have a look here, again,

we see the same lag lines of logs.

So this time we have only one partition assigned,

so demo_java-1.

This one is also having demo_java-2.

And this one is having demo_java-0.

So I can clear the log lines again in here.

And of course if I run my producer demo with keys,

here is just partition one that got consumed,

here is just partition two,

and here is just partition zero.

And we can verify this as well by going directly

into our

Conduktor UI.

So if I go into the Conduktor UI right here

and I refresh this page,

we can see that three different applications

are reading from three different topics.

And these represents the three instances I have running

on my computer.

So it's extremely helpful.

And now I can also demo the shutdown

because well, if I clear the log of all these,

so I'm clearing the logs, clear the logs,

and clear the logs, and I decide to shutdown

this one for example, by clicking here on the exits,

we are entering into a clean shutdown.

But because it's a clean shutdown

my other consumers rebalanced and we can see

that this second one got assigned partition two

and this one got assigned partition zero and one.

And if I decide to exit this one again,

it's doing a clean shutdown.

And this one get assigned all the partitions

zero, one and two.

So that's it.

We've demonstrated how consumer groups are balancing works

at the Java level.

I hope you liked it and I will see you in the next lecture.
