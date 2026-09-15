Okay, so now that's Windows WSL2 is started,

we can install a Kafka Broker with Zookeeper.

So it will look like this,

directly running on Windows WSL2.

So for this, it is very similar to the Linux instructions.

We'll be starting Zookeeper using the binaries

and then starting Kafka in another process

using the binaries, as well.

So let's get started.

Okay, so back on Windows,

I'm going to clear my screen,

and I'm going to apply the exact same instructions as here.

So for this we're going to start Zookeeper first,

and to do so, we need to run this command,

pointing to the configuration file of Zookeeper.

So it's very easy.

We're just going to copy this part right here,

paste it in, and the only thing that you change

is the path to the Zookeeper configuration file

because if I just do press enter right here,

I'm going to get an error saying that

I cannot find this file, okay.

It's because I have the wrong path.

So, just to clear it,

make sure you are using the correct Kafka version

in this command right here.

So we have kafka_2.13-3.1.0/config/zookeeper.properties,

which is a file that is downloaded directly

when you download Kafka.

So you press enter, and that's it.

Zookeeper is started in this terminal.

So what I can do now is I can start a new terminal

because we need to run Kafka in a separate terminal.

So we go ahead and scroll down,

and then we're going to open another Shell window

and copy this, okay.

And we will paste it in again here.

So this is going to start Kafka

using the kafka-server-start.sh command,

and we have to point it to server.properties,

which is a properties file

in the configuration of Kafka that we downloaded.

But again I need to change this zero for a one,

just to make sure that we have the correct property file.

So let's press Enter.

And here we go, Kafka is started now,

and we have Zookeeper here as well.

So we have both things started,

and we're good to go.

It's going to be stable on Windows.

And you need to keep both these windows open

to have Kafka up and running.

So this is pretty good.

And one last bit of information is that it swaps.

You can change the Zookeeper to property file,

or you can change the server to property file,

to edit the data dictionary,

the dictionary, the data storage space.

So I'm going to stop Kafka

and stopping Zookeeper, clear my screen; I will show you.

So if you go into your Kafka directory config

and then a zookeeper.properties,

in here we have a dataDir right here, this line,

which is right now /tmp/zookeeper,

which is good enough for what we need, okay.

But you can change it to any space you want on your machine.

And then, if you were to edit these server.properties,

so this is a configuration file of Kafka,

then you scroll down, and you will find

at some point a setting called logs.dirs.

And right now it's pointing to /temp/Kafka logs,

which works for me again.

But you can change this to anywhere you want

on your computer if you wanted to, okay.

Well that's it for this lecture.

We have started Kafka in Zookeeper,

and we need to obviously relaunch the comment

for it to work properly.

But congratulations, you have a stable Kafka version

on Windows WSL2.

All right, that's it.

I will see you in the next lecture.
