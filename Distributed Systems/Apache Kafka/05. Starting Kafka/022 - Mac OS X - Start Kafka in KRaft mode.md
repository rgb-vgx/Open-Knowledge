Okay, so let's go ahead and now start Kafka.

So the way we do it is that on the Kafka website,

under Get Started, you'll find Quick Start

and you scroll down.

So we did get Kafka and we've unzipped it.

And now we need to first generate a cluster UUID.

So for this, we run this command

called KAFKA_CLUSTER_ID= this.

So the best thing to do is to cd into the Kafka directory.

So make sure you are in the Kafka directory right now.

And then we run this command.

So KAFKA_CLUSTER_ID=

and then we'll use the kafka-storage.sh command.

So we press Enter

and we're going to get a random UUID

stored in this variable.

And next, we need to format the log directory.

So we just copy again this command right here

and press Enter.

And now all the information

is going to be stored in a tmp directory.

And then finally, we start the Kafka server.

So this is going to start the Kafka server

with this file called config/server.properties.

So we can have a look at it real quick

using the nano command for example.

And this file is the configuration file for Kafka.

So it's a file you would have to modify

if you wanted to have more brokers, et cetera, et cetera.

We don't need right now but you can have a look at it.

And there's nothing you need to modify right here.

The only thing you should know

is that the logs dir is tmp/kraft-combined-logs directory.

So by default, everything will be written there.

And so if the tmp file is deleted

then you will lose your Kafka data.

But this is the one thing I would modify

if you want to have a more robust setup.

But for now, we're very happy with these defaults.

So let's exit this

and we're just going to start the Kafka server.

So now you can do it from this directory

by running this command again.

Press Enter and now Kafka should be started.

And when you're good to go,

it says Kafka Server started right here in the bottom

and you're good to go.

Now, when you have Kafka like this running,

you need to leave a window open

and if you wanted to run some commands,

you will need to open a new window for example

and this new window will be used to run the CLI command

against your Kafka broker.

So congratulations, you have started Kafka.

I hope you liked it and I will see you in the next lecture.
