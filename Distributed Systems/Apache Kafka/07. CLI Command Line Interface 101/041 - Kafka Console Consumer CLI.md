Hello, this is Stephane from Conduktor,

and in this lecture we're going to learn how to use

the Kafka console consumer CLI.

So we know that consumers can read, from partitions,

the data in order,

and as well in the group, we'll see this later on.

And so we're going to practice an example

to read a Kafka topic.

So we'll consume from the tale of the topic.

That means only new messages.

We'll also consume from the beginning of the topic

to see all the stuff from the beginning.

And, finally, we're going also show options

to see both the key and the values

in the output of our consumer.

So let's get started.

So let's go ahead and practice the Kafka console consumer

so we can reproduce with the CLI where we saw with the UI.

So in this example,

we're going to use this command right here.

So you can always type the command to see the documentation

but we'll learn the most important options right now.

So we have the topics in one partition

but I want to create a second topic

with three partitions to show different behaviors,

if the data is distributed or not.

So if we have a look now,

the second topic is created

using the "kafka topics" command,

and we're going to consume that topic.

So right now we don't consume the first topic yet.

Right now let's just consume the second topic.

So when we launch this "console consumer" command,

as you can see the second topic is being consumed

but nothing happens.

That's because we haven't sent any messages into the topic,

and you will observe the same behavior.

So if I do the same command with the first topic,

as you can see, still no messages are being consumed

because we consume from right now,

not from the previous messages,

but we'll see how to consume from the beginning

in a few seconds.

Let's do it again.

We are going to consume right here,

and I'm going to start a command

in the bottom to start producing.

So I have my consumer on top and my producer in the bottom.

You can open a different terminal for you,

for me, it's a shortcut,

Command, Shift, D for my special terminal or school item.

But you can just open another terminal window

and achieve the exact same behavior.

Let's do a console producer,

and we're going to pass in a few important things.

So number one, we produce to the second topic,

the topic we just created.

And number two, we pass in a producer property

called the "partitioner" class,

and this is called a "RoundRobinPartitioner".

The reason I'm using this round robin partitioner

is because I want to produce to one partition at a time,

and change every partition.

If you do not use this round robin partitioner,

There have been

so many optimizations built in into Kafka right now

that you will keep on producing to the same partition

up until you send about 16 kilobytes of data,

and then you will switch partition,

which is very difficult to demonstrate

as a teaching mechanism

but is great for production settings.

But because we are learning Kafka,

and I want to show you what happens

when you produce to multiple partitions,

I'm going to be using this round robin partitioner.

But, again, do not use this in production.

This is most likely

the most inefficient partitioner you can ever find.

So we are in this round robin partitioner,

and now if I just send a message, "Hello World.

My name

is Stephane.

It's working."

As you can see, while we see the messages appear

in the console consumer.

So that's pretty cool.

So to just stop a consumer, you do Control, C,

and, again, if I run the same command and press "Enter",

as you can see, nothing happens

because you need to actually be sending messages

again to the topic.

So

"one",

"two",

and "three".

And, of course, these messages are appearing in my consumer.

So you may be asking me,

"How do we consume from the beginning?"

Well, there is an option called "Consume from beginning".

So let's run this right now

and press "Enter".

So as you can see, we have the messages appearing.

So all the messages I sent are here, there's six messages,

but it turns out that they're not in the same order

I sent them.

So as you can see,

the "three",

for example,

and the "two" were out order from the "one".

But that's actually normal.

It's because I have three partitions.

And so the data is only read in order by partition.

I will show you this in a second

to show you the partition number

so we can observe that behavior,

but for now, just accept this.

And if you

just do

consume the first topic instead

from the beginning

you're going to find all the messages I've sent in order

because there's only one partition.

And because there's one partition,

you will have everything in order but you don't scale.

In Kafka you want to scale,

and so therefore you need multiple partitions,

and the producer will produce to different partitions.

And we will consume from different partitions

with different consumers at the same time,

another behavior we'll see in the next lecture.

So to go back to our example with the second

topic with three partitions,

let's go ahead and try to display the partition number.

So for this, we have this entire command right here

that I'm going to describe to you in a second.

And so in here what we do

is that we are actually going to

use a formatter,

and the formatter is using the default message formatter.

And this is to format the output of the CLI command.

And first property is "print timestamp true"

to know when the message get received.

Second is "print key true" to print the key

because we don't see the key right now

in the default console consumer.

"Print value true" to also get the value of course

and "print partition true"

to get the partition number the message got assigned to.

Finally, we use "from beginning"

to read the messages from the beginning.

So let's press "Enter".

And we have some interesting information.

So now it makes more sense as to the output we got

because well, the message, "My name is Stephane."

get assigned to partition 2,

and the message "two" get assigned to partition 2,

and so therefore I see them in order

from within the partition 2.

And then "It's working." and the message, "three"

gets sent to partition 0,

and "Hello Wold." and "one" gets sent to partition 1.

So, again, remember that we get ordering per partition,

and that makes sense.

And this is why it's good to remember this in Kafka.

You don't get full ordering because that makes no sense.

You get ordering per partition.

And this command we just ran allows you to see this.

And this is similar if you went into the UI

and you are looking at the topic called "Second topic".

So let's refresh this page and look at "Second topic".

And you could filter by partition, for example,

and just look at partition 0 and "Apply",

and we'll find only two messages.

And if you click on a specific message right here,

you can look at the metadata,

and you see that it's partition 0 of set 1.

So that's very helpful,

and hopefully that allows you to understand the behavior

of producers and consumers.

And, of course, well, if I keep on producing to my topics,

so

"another one",

"yet another",

and then "last one", as you can see for these messages,

they get sent to partition 1

and then partition 2 and then partition 0.

All right.

So that's it for this lecture. I hope you liked it.

And I will see you in the next lecture.
