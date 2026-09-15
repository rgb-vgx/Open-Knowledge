So finally here's one lecture

that you're probably not going to use in the beginning

or at all in your Kafka life.

And I hope for you not to.

But I'm still going to have it there.

So it's advanced.

If you wanna skip it, that's fine.

And we're actually not going to implement it.

So it's to describe two settings called

max.block.ms and buffer.memory.

So if the producer becomes very, very, very high throughputs

and the broker cannot respond fast enough to these requests,

the records are going to be buffered in memory

on your producer.

And the buffer size of buffer.memory is 32 megabytes.

It is the size of the send buffer.

And that buffer is going to fill up over time

when the broker is too busy.

And then if the broker becomes less busy,

it's going to empty back down

when the throughputs at the broker increases.

So the idea is that this buffer is here

to queue up messages before sending them into Kafka.

Now we can obviously increase the buffer memory

if we fill it up too much.

So if the buffer is full, all the 32 megabytes of it,

then next time you do .send() on your producer,

it will start to block.

That means that it will block at a send of code.

It will not be a synchronous anymore.

It will not return right away.

It will just block your code

to prevent the buffer from filling up.

And then goes a new setting in place.

So if the send method is blocking,

then max.block.ms is going to be 60,000.

That means that for 60 seconds,

it's okay to be blocked on send.

If the buffer is not unblocked after all this time.

So if the buffer is still not emptied out

after we have sent the message,

then the send message is going to throw an exception.

So either the producer has fill up his buffer

and the broker is not accepting new data

and 60 seconds has elapsed.

And if you hit an exception

that means that your brokers are down or really overloaded

and they cannot respond to any types of request.

And so you need to have a serious look

at your programs and so on, okay.

So this was just to show you,

now let me show you in the code where this would happen.

So here is the max.block.ms as well as the buffer memory,

I would not change the settings at all.

And then what's going to happen is that

in your WikiChangeHandler right here,

on the kafkaProducer.send, so this method right here,

right now I wrote it's asynchronous.

But if the buffer is full,

then this method is actually going to block

and is going to block your program just

to make sure that Kafka in the meantime has some chance

to catch up with your entire buffer, okay.

So it's good for you to know nothing to do.

And it's quite an intense lecture I would admit,

but I have to just say that in case something comes up

you can refer to this video and you're good to go.

Okay, so let's say for this lecture, I hope you liked it

and I will see you in the next lecture.
