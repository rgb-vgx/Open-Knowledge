Hi, this is Difen from Conduktor and

in this lecture we're going to learn about how

to reset offsets using the Kafka consumer group's Command.

So we've seen that consumers read from a consumer group

and then they commit offsets once in a while

which allows them to restart the reads

from where the offset was last committed.

So in this example we'll start and we'll stop at

console consumer.

We'll reset the offsets

and then we'll start console consumer again

and see the outcome.

So let's describe the consumer group

we have created from before.

So, if we have a look at my first application,

currently we see that the lag is two, two, and one.

So if we consume, we'll be consuming five messages.

But we can also, for example,

reset the offsets of this application

to the very beginning to read all the messages.

So the Kafka consumer groups has a thing

called reset Offsets.

So minus, minus reset Offsets.

And then we can set to earliest,

which is the earliest the data exists in the topic.

And then we specify dry run to know what

the assignment will be, but we don't run it yet.

So if we do this, minus, minus, and then a dry run,

as you can see, and this is for first topic but

we are consume actually the third topic.

So if we do a dry run for this, as you can see, it says

that the new offsets is going to be zero, zero, and zero.

Which makes sense because that's the beginning of my topic.

So to fix type we need the execute flag.

So instead of minus, minus, dry run

we do minus, minus, execute.

Which is going to actually execute resetting the offsets.

So if we have a look right now, do minus, minus, execute.

And now the new offsets are zero.

So instead of using the CLI, we can use for example

this console consumer to have a look.

And if we have a look right here, as you can see

on Conduktor, we see now that the lag is greater than zero

because while we have reset to the beginning.

So, now we know where we are.

And so, of course we would get the exact same result

by using the consumer groups command to describe our group,

so my first application, and we'll find the exact same lag

as before.

So this makes sense.

And now of course, if we run a console consumer,

that's called my first application that has been reset

and we read this topic, third topic, we'll see that

because we have reset the offsets, then we read

all the messages again.

So if we run a describe on the group now,

because the consumer has been run, now the lag

is zero everywhere and we can verify this right here.

So the one thing you should know is that the resets

cannot happen when the consumer is running.

So the consumer must be off and no consumers is

part of the group to reset the offsets.

So for this, let's just stop

this consumer and we

can also choose to reset the Offsets directly from the UI.

So, we can choose the topic we want, the partitions we want,

and the strategy we want.

So lots of options and I do earliest

and now we're back to offsets refreshed at zero.

So, just two ways of doing things again

but you can get very funky with this CLI.

And if you have a look at the Kafka

consumer groups documentation, you'll see

that you have a lot of different arguments you can set

to latest to an offset, to a daytime, to current.

You can set the shift by and so on,

so lots of different options

but usually it becomes quite complicated to use the CLI.

And this is why a UI may become preferable

when resetting offsets

because you actually get a lot more information

into what you want to do

and be very specific about what happens.

It allows you to iterate faster.

All right, that's it.

So we've seen consumer offset resets.

I hope you liked it, and I will see you in the next lecture.
