So let's demonstrate the cooperative part.

So we are going to com copy this

and it's called Consumer Demo Cooperative.

Okay. So we are going to just run this code once

and see one line of code that is of interest to us.

So let's run this.

And if we scroll back up,

we look at the partition assignment strategy.

We have the range assignor

and then we have the cooperative sticky assignor.

But this will have precedence

because it is first and this supported by all my consumers.

Therefore

we want to use this cooperative sticky assignor type

of partition assignment strategy.

So super easy, we go in the code and we add one

more consumer config and we set the property

called partition assignment strategy

to be equal

to this

cooperativestickyassignor.class.getName.

And this will just set this now to be only equal to that.

So let's, let's verify this.

So, we are going to stop and rerun.

So, we're going to run a new time our program

and here we can verify at the top,

that the partition assignment strategy gets set

to cooperative sticky assignor.

All right, so if you scroll down now,

we see that the log is a little bit different

because now we have the assigned partition to

be the three partitions and added partitions were three.

And so we have a different log lines

because we're using a different kind

of partition assignment strategy

with a different class of assignor.

So this will make a lot

of sense when we run this program multiple times.

So again, let me just exit presentation mode.

I'm going to edit this

and allow multiple instances of this program.

Okay, so let's run this one one more time.

So this is the second time I run it.

And if we have a look at the log,

now we can see

that this one

had three partitions and then

as a new one get added, we had a new assignment where

only demo_java-2 get removed, but this was incremental

and demo_java-2 get removed, but we were still consuming

from partition zero and partition one.

And if you go right here, nothing was assigned but

upon having a rebalance that was sticky, then

we are being assigned demo_java-2.

And so again, if I recreate another instance of this,

as we can see we currently have zero partitions

but then very soon we're going to get demo_java-1.

And if we have a look at the first program,

well, it was having a demo_java-1 right here

and then it scrolled down and it got removed.

So now we only have demo_java-2

but if we have a look at this one right here,

well nothing happened

to it because the assigned partitions

and are currently owned partitions did not change.

And so this was going to keep

on reading from this partition.

So, I really like this cooperative sticky assignor

because it really shows that you can be a bit nicer

in your rebalance of consumers

and I think this will become the default

at some point for consumers in the future.

And so if you wanted to have a look at static assignments,

you would need to have a look

at the group instance ID config

which is null for everything.

So you would need to set the group instance

ID config and set a different value

for every single every single consumer.

So this is something complicated to demo right now,

so I'll comment it and we don't need it

but this is the strategy for static assignments.

Okay, that's it for this lecture.

We've seen the cooperative practitioner strategy.

I hope you liked it and I will see you in the next lecture.
