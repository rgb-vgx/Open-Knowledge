Hi, this Stephane from Conduktor

and in this lecture we're going to have a look

at the Kafka consumer groups CLI because

in this lecture we're going to see how we can reset, delete

and so on, manage these consumer groups.

So we've seen in a previous lecture that we had

multiple consumer groups reading from the same topic.

It was possible.

And we've also shown

that consumer groups can within spread the reads.

So this makes sense.

So in this lecture we're going

to list the existing consumer groups.

We're going to describe one consumer group

and then we're going to delete a consumer group.

So let's get started.

So let's open this file named "4 consumer groups"

and we'll have a look at the Kafka consumer groups CLI.

So again, as usual, the documentation can be done

by entering the command itself.

And so the first thing we're going to do

is list all our consumer groups.

So as you can see in here, we have two consumer groups,

my first application and my second application.

But this is something you can do visually as well.

Here you can see I have my first application

and my second application in the Conduktor platform.

So this is the whole purpose

of having a UI is to save a bit of commands.

So what happens if we describe one specific group?

So let's go ahead

and describe the group called "my second application".

And I'm going to fold this a little bit.

And as we can see here, we see

that my second application is reading from the topic.

Third topic, partition zero, and

that the current-offset is 14

and the log-end-offset is also 14

and therefore the lag is 0.

So that means that my consumer group has fully caught

up with my topic, but we can see these numbers changing

and you can get the same kind of information by clicking

on my second application and get some details here.

Okay, but so if we want to create a console producer

so let's go and recreate our producer

so "Kafka console producer",

and we produce to the third topic.

And then just send A, B, C, D, E.

Okay, so this has sent more messages into my topic

and this will have created some lag

for my existing customer consumer group.

So if I run this command right now and look at the output

as we can see now, the log end offset is 16 and 14 and 27.

So on three different partitions.

And we have a current offset committed of 14, 13, and 25

and therefore the lag is 2, 1 and 2.

So there has been some lag for my consumer group now

because messages haven't produced

but not yet consumed and committed.

So now if I stop this console producer and I start a console

consumer again on my second application, what we expect is

that we will be reading five messages

because that's what the lag was.

So we see these five messages right here,

and if I leave the consumer running and do a describe again

of my consumer group, as we can see the lag is now zero

but there's been some data.

So the consumer ID has been now filled

and this is very, very long.

But as you can see, this console consumer right here

is consuming these three partitions.

And it's something you can also see in UI settings.

So if you refresh this page and look at this one.

So as we can see, we can see

that this console consumer right here has been assigned

from this host, these three partitions.

So this helps, this makes sense.

And what happens if you start another console consumer?

So let's start another one on the same group.

Ah, this is a consumer group command.

So no, let's start a console consumer.

Here we go.

So now we have two consumers as part of the same group.

And if I do a consumer group CLI

as we can see in here, you will see it.

So partition 0 has ID B46, partition 1 has ID B46

and partition 2 has ID FA1.

So that means that this consumer FA1,

this new one is consuming partition 2

whereas this consumer right here, B46

has partition 0 and partition 1 assigned to it.

And this is why we see messages being spread out

between different consumers when we read.

And this is again a behavior you will see

by going into the UI.

Now we can see two different consumers,

with two different IDs

are consuming different sets of partitions.

So that's a pretty cool thing to demonstrate.

And now we understand why things are happening

and how we can describe what is happening.

So one last behavior I want to show you is

that when you start a console consumer

but you don't describe a group.

So in this example I'm going to have a console consumer

but in this command right here, I use the topic, third topic

from the beginning, but I don't specify a group ID.

So my console consumer is actually going

to read all of my topic.

This is expected.

And now if we do a consumer groups command,

but we are going to do a list,

to list all the existing consumer groups

as we'll see, we'll find console consumers in there.

So these groups are here for a little bit of time

but after a while they're going to be removed

because there are temporary consumer groups.

But just so you know, this is the kind

of output you would expect when you're using consumer groups

on the console without group IDs, but they're temporary ones

and after a while they will be gone.

So do not leverage these consumer group IDs always

when you want a consumer topic,

leverage the consumer groups you have predefined.

Okay? So that's it for this lecture.

I hope you liked it and I will see you in the next lecture.
