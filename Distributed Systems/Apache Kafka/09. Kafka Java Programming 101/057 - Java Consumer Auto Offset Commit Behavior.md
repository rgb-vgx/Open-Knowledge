So one thing that we've been getting

for granted is around the consumer offsets

and in the Java Consumer API,

whenever you poll regularly

then offsets are going to be regularly committed as well.

And this enables at least once reading scenarios

by default under certain conditions.

So when are the offsets going to be committed?

Well, whenever you call poll in the consumer

and then the setting auto commit interval

millisecond has elapsed.

For example, if you have by default

auto commit interval millisecond equals 5,000

and enable auto commit equals true

then it will commit every five seconds.

So, for example, if you want to be in at least one setting,

you need to make sure that all the messages you receive

from Kafka are successfully processed

before you call poll again.

If you don't, then you're not in an at least one scenario

because you can go into a scenario where you commit

before you actually successfully process the message.

And in the rare case

you actually disable enable auto commit

then you're going to have a separate thread to commit

once in a while and you can call commit sync

or commit async but this is advanced

and this is why I don't show this

in this course or in this part of the course.

Okay. But I wanna show you

that behind the scenes the offsets are being committed.

So let me just explain the behavior very quickly.

So you have consumer and enable auto commit

equals true as well as auto commit

interval millisecond equals 5,000

in the Kafka broker, so the consumer is going to call poll

and then the timer is going to start.

So the Kafka broker may return some messages.

Then we do poll again.

We get more messages from the broker

and so on, maybe three seconds of elapsed in total.

Then we call poll again

and then three more seconds have elapsed.

So six seconds total from when the timer has started

and we still get some data from Kafka.

We process it.

And then behind the scene there's going

to be a commit async because, well, it's been more

than five seconds then we have called the last poll.

And, therefore, offsets are automatically

going to be committed behind the scene

from the last successfully processed batch.

Okay. And then the timer starts again

and then it goes again into the same loop and so on.

So this is what happens behind the scene for your consumer.

And this is what I wanted to show you.

So let's take the example of the consumer demo

with shut down and we'll have a look

at a few properties of this consumer.

So the first one is the auto commit interval millisecond

of five second, and then the enable auto commit equals true

which means that in my consumer loop

upon calling dot poll every five seconds, we're going to

I mean, after five seconds and the next time

we call that poll,

we're going to asynchronously commit offsets.

And we know we are in an at least one setting

because we are actually consuming records

and then processing them before we call poll again.

So we are doing the things correctly

and this is at least once.

Okay. So that's it for this lecture.

I hope you liked it and I will see you in the next lecture.
