Hi, this is Stefan from Conduktor,

and in this lecture we're going

to set up a Kafka broker using Linux in KRaft mode.

That means just alone without something called ZooKeeper.

So for this, we have two comments to run.

We're going to create a cluster ID

and format the storage using the kafka-storage.sh command.

And then we're going to start Kafka using the binaries.

So let's get started.

Okay, so now we're going to start Kafka.

For this, on the Kafka website under Get Started Quickstart,

we're going to scroll down,

and we're going to run these comments right here.

So let's clear our screen.

And the first thing we have to do

is to go into the Kafka folder.

And from there we're going to generate a cluster UUID.

This is necessary to just give an ID to our cluster.

So I copy this command,

and I paste it in.

All right, done.

Next, we need to format the log directories.

So the log directories

is where your Kafka data is going to be stored.

So this is an information stored

in this file called config/server.properties.

So let me cat it

so we can see what's inside.

And the important part in this file

is your configuration of Kafka,

but the very important line is around here,

which I will find right here,

so log.dirs=/tmp/kraft-combined-logs.

So this is where your Kafka data is going to be stored.

So if you lose access to this temp directory,

your Kafka data is going to be gone, but there's no need.

And for this tutorial and this course, this is enough,

but it's a setting you should know.

So when we run this command right here,

bin/kafka-storage-sh. format --standalone,

and then this cluster ID,

this is going to actually format this directory

I just showed you.

So let's clear our screen,

and we're going to paste our command.

And actually, not the right one.

So let's do again.

I do again.

Here, copy

and paste.

Press enter.

Okay, so now this has been done,

and now we can just start the Kafka server

with this one command.

So you can actually run it from anywhere.

So the only thing to notice is that you need

to reference this server.properties file.

So let's just run it.

Copy and paste it.

Press enter, and here we go.

My Kafka server is now started.

As you can see, it says Kafka version 4.0.0 for me,

and the Kafka server is started.

So that's perfect.

We have started Apache Kafka.

And now if we wanted to run any commands

against our cluster, we need to have a new window

and run the commands from there.

So this window must remain opened for Kafka to be running.

And if you wanted to stop Kafka,

you would just press Ctrl + C to stop Kafka,

and you'd be good to go.

All right, so that's it for this lecture.

I hope you liked it.

We started Kafka with one broker directly using the CLA,

and I will see you in the next lecture.
