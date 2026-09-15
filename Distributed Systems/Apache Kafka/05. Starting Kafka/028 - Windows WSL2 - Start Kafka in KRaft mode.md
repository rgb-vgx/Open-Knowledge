Okay, so let's go ahead

and start Kafka.

For this on the Kafka website,

under quick start, I'm going to click here.

We did the step one of getting Kafka

and now we're going to start the Kafka environment.

So first thing we have to do

is to do a CD into the Kafka directory

to run these commands properly.

And we're going to first create a cluster UUID.

So you copy this command and you paste it, press enter,

and then that's good.

It's been run.

And now we need to format the log directories.

So this is where your Kafka data is going to be stored.

And there is a servers.properties file

that you need to look at.

So I'll do cat service.properties file.

And this file contains all your configuration

of your Kafka broker.

So it's a lot of things of course,

but the one important thing to look at is logs.deer.

And this is where your Kafka data is going to be stored.

So right now it's going to be stored

in temp craft combined logs.

So something to know, right now it's a temporary location,

but that's enough for this course.

But if you need to change this,

this will be the line to change.

So when, I'm going to click the screen.

So when we run this command,

the bin Kafka storage at SH command

and format the storage, this is what is going to format,

this directory in specific.

So now this has been run, the storage has been formatted,

and now we can just go ahead and start the Kafka server.

So we can run this command,

press enter, and as we can see,

Kafka is starting, so you get a lot of log output,

but at the end you'll get the Kafka version 4.0,

as well as the fact that the Kafka server is now started.

And that's it, Kafka is now started.

So if you need to run some C like command,

you need to keep this window open

and then you need to just restart Ubuntu

from a second window to run more commands.

But that's it, you have Kafka running

on this terminal window

and whatever command you need on this other one.

So I hope you like this lecture

and I will see you in the next lecture.
