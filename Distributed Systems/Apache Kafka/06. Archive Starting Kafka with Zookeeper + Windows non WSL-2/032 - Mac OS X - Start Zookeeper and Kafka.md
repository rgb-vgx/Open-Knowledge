Hi, this is Stephane from Conduktor.

And in this lecture

I'm going to show you how to start Kafka with Zookeeper.

So we'll have a Kafka cluster of one broker

and one Zookeeper,

for this we'll first start Zookeeper

using the Kafka binaries,

and then we will start Kafka using the Kafka binaries,

but in another process.

So let's have a go at it.

Okay, so back here, we're going to start Kafka,

so to do this, I'm going to have two terminal windows

that I'm going to place on the right of my screen

and the left of my screen.

I will clear them both, okay?

And so on the left hand side, I will start Zookeeper,

and on the right hand side I will start Kafka.

So we need to first start Zookeeper,

so for this will use

the Zookeeper server start.sh command, okay?

And if a press Enter, it says, okay, it doesn't work

because it needs to have a Zookeeper.properties filed to it.

Now, thankfully this Zookeeper.properties file

is available from within the Kafka binaries,

so in Kafka we have the bin but also within config,

we have zookeeper.properties.

And if we at the content of this file,

and I'll zoom in a little bit,

this is what's called a properties file

and it tells Zookeeper how to get started.

So we won't modify anything right now,

we'll just keep it as is, okay?

But what I'm going to do

is just go and type Zookeeper server starts, okay?

Start.sh and then I will have the full path to Zookeeper,

so tilt Kafka and then config

and then Zookeeper.properties, okay?

So this full command right here

is what I'm going to do to start Zookeeper.

And you can find the reference of this command

on the write up on Kafkademy, okay?

And you'll find this command actually right here,

so if I scroll down,

here is the start Zookeeper command, okay?

So you'll find it here.

So once this is started,

you have this lines of logs

and that means you're good to go. So now what you have to do

is to keep this terminal window open, okay?

And then on the right hand side terminal,

we're going to start Kafka.

So again, there is a Kafka server start.sh command

available to you.

And in here we have to pass in a server.property file.

And so to pass in this server.property file,

what I'm going to do is just again

path in passing the full path to it,

so Kafka server start.sh,

and then tilled Kafka then config

and then server.properties.

So this command right here is going to start Kafka,

and again, you commend you can find

on the Kafkademy websites.

So as soon as you have this,

well, you have a Kafka started,

okay, the server has started

and then Zookeeper started as well,

and then congratulations

you have Kafka started on your computer, on your Mac.

Now you need to make sure

that you are going to keep both these terminals open

because if you stop one of these,

then Kafka is going to stop.

So these terminals have to remain open

for the rest of your course,

and this is why sometimes it's nice to use Conduktor

to start Kafka because at least

you don't need to manage two terminal windows, okay?

So once we've done that, we're good to go,

we have started Kafka with Zookeeper and that's awesome.

And then one last optional thing you can do,

and then I will leave it to you.

Is that if you go, you can change the Kafka

and Zookeeper data storage directory.

So you could edit the Zookeeper.properties file

and the server.properties file,

and then within it, there is a line called data dir,

and you can have whatever path you want

for your Zookeeper data.

And in Kafka, you have a logs dir file,

and you can set whatever you want for your Kafka data, okay?

But right now I'll use the defaults

which is temporary files, but that's good enough for me.

All right, let's it for this lecture,

I hope you liked it, and I will see you in the next lecture.
