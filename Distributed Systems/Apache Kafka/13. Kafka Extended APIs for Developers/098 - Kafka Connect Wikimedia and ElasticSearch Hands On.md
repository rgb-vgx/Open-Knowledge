Hi, this is Stephane from Conduktor,

and in this lecture we're going to have a look

at Kafka Connect.

So we will first run

a Kafka Connect Wikimedia Source connector

that I programmed myself to take data from Wikimedia

and insert it into Kafka.

And then we'll run a Kafka Connect

ElasticSearch Sink connector to send data into OpenSearch.

Overall, there are more than 80 connectors available,

and I will show you the website.

This is a demo to just show you how easy it is

to get started, and then we'll download

the Kafka Connect Wikimedia Source connector at this URL.

So let's get started.

So I am on the Confluent Hub,

and this is where you're going to find Kafka connectors.

So at the time of recording,

we have over 212 Kafka connectors.

You can really filter them by sink type,

source types and so on.

And then, for example,

here's a Zendesk Source connector, a Salesforce, and so on.

So we're looking for one called a sink connector

and this is the ElasticSearch Sink Connector.

So I can click on it, and as you can see,

I get straight into the download page

for the ElasticSearch Sink Connector.

So we get some installation information

some support information.

What I need to do now is just download this

using the download button, and this downloads a zip file.

The second thing you need to do

is to go into conduktor/kafka-connect-wikimedia,

and this is where I have written the code

for the Wikimedia connector and it's what we'll do.

It'll take data from Wikimedia into Kafka.

So to run it, very simple.

You click on this link to download the jar.

So we click here and we download the jar,

which will do the running of the Kafka Connect cluster,

connector, sorry.

And then under connector,

you're also going to download wikimedia.properties.

So take this file and then do a copy and paste.

Or if you go to raw, you can Ctrl+S,

and this will allow you

to download the wikimedia.properties file.

Okay, so we're good to go.

Then what I have to do

is to go into my Kafka installation directory, in here,

and we have multiple folders,

and I'm going to create a folder called connectors.

I will go, so now you can see the folder connectors

has been created right here.

And I will go into the connectors folder,

and currently there are no directories.

So we'll create one called kafka-connect-wikimedia.

And within this, I'm going to copy the file

that I've downloaded from before.

So let me do this.

I will copy the file.

So it was in my download.

And you can do this using your finder if you want.

And then it was the Wikimedia,

so kafka-connect-wikimedia jar, and I will copy it here.

So now if I look at it,

my Kafka Connect Wikimedia jar is properly copied.

I will also do the same for the Kafka Connect ElasticSearch.

So first I need to unzip, in my downloads,

the ElasticSearch folder.

So it was called, if I remember it correctly, let me check.

It was called Kafka Connect Confluent Inc.

Kafka Connect ElasticSearch 11.1., so I will unzip this.

I have cleared my screen.

Now if I look at it, my folder has been unzipped correctly.

I'm just going to rename it.

So I'll do a move to rename this

into kafka-connect-elasticsearch.

So within this Kafka Connect ElasticSearch now,

if I look at it, I have the Lib directory,

which is the interesting one for me.

And within this Lib directory,

I have all the jars that are necessary

to run this connector, okay?

So things are looking good here.

I'm going to keep it like this,

and so now I need to configure Kafka Connect.

So next I need to run these connectors.

And so to do so, we're going to use in the binary folder,

this command called connect-standalone,

and it's something you should be able to access, okay?

And then the connect-standalone command

needs to be referring connect-standalone.properties.

So going to create them.

And if you are in the bin folder,

you can do connect-standalone.sh

to get the exact same thing.

Okay, so these connect standalone properties

are in the code download section,

and I've created them under the config folder.

So don't worry too much about these settings.

I'm trying to keep things simple,

but we're going to get data as of JSON.

We connect to the local host 9092 for the bootstrap server.

And then the plugins path

is the most important thing you need to change.

You need to edit this to be equal to the path

of the connector directory we just created.

So if I go one level up into my connector directory

and do pwd,

this is the current working directory

that you need to copy and paste under plugins path.

Okay, so once this is done, you need to run the command,

and the command is outlined right here.

So to do so, I need to open a terminal.

So I'm going to open a terminal right here

just to figure out where my code is.

So I'm going to clear this,

and then I'm going to do a pwd to get my terminal.

That's perfect. I'm going to copy all of these into here,

and then I'm going to go into the 2-kafka-extended directory

and I'm good to go.

So we have the config directory,

and within the config,

we get this connect-standalone.properties.

Okay, so the next thing you need to do

is to look at this Wikimedia Source connectors

.properties file,

and it says that it references

the Conduktor IO Wikimedia connector

that you just downloaded.

The topic is Wikimedia Recent Change Connect.

So this is a new topic we'll create

while we get data from the Wikimedia stream,

recent change stream, and then we can just run it.

So to run it, we go here, we copy this command,

and it should work.

So, by the way, just make sure that you're good,

so this works, okay?

And just make sure that you're good,

so that this file is here.

If you get a file not found error,

then this command for sure that I do above is going to fail,

and it's really not easy to look

into the logs of Kafka Connect.

So this is why I am telling you

to check this command first, okay?

So I'm going to clear this,

and I'm going to run this command.

And this is starting a Kafka Connect cluster locally,

and is going to run my producer.

So as you can see the producer is now running,

and we have now run our first

Kafka Connect Source connector.

So to verify this, I can go into my console,

refresh this page,

and we can see the Wikimedia Recent Change Connect topic.

And I can click on it

and look at the data in one of the values.

So if we have a look at it,

now the payload is a little bit different,

because we have this schema type string optional file.

So this is something that gets added by Kafka Connect.

And underneath payload,

we have a string of the entire JSON documents

coming out of Wikipedia.

So it's a slightly different thing

that you're going obtain with Kafka Connect,

and this becomes extremely helpful

when you use something like Avro, for example, as a schema

or JSON as a schema, which we don't right now

which is why you see this kind of weird payload.

But at least this shows you that Kafka Connect

was able to take data from the Wikipedia stream

and put it into your Apache of Kafka.

And what I had to do

is I had to program myself the Kafka Connector,

but once programmed, you only had to do some configuration

to do this kind of transformation,

which is the whole power of Kafka Connect.

And if you go now in the next step of this hands-on,

so we're going to take the Wikimedia Recent Change topic

that we created from before,

not the one from Connect, but the one from before,

and we're going to put that topic

into an OpenSearch cluster.

So I'm gonna go back in here,

and I'm going to stop this and clear my screen.

And now what I have to do

is to go to Kafka Connect ElasticSearch,

and we have, again, one of the command.

It's using the same connect-standalone.properties file,

but this time the config is elasticsearch.properties.

So if you have a look at it,

we are using the connector class io.confluent.

all the way to ElasticSearch Sink connector.

The topics we reach from is Wikipedia Recent Change,

which is the topic that we had created from before.

Key ignore true.

And then the connection URL is this one

and the type is kafka-connect.

So this only works

with currently ElasticSearch OpenSearch on Docker,

because I configure it to do so.

Bonsai doesn't currently work, but if there is a workaround,

I will show you in this video and edit this video.

Okay, so we have this.

We connect to a locally ready-made OpenSearch,

and then we just have some more configuration

for Kafka Connect.

So what I do now is that I will run this command,

so I will run this Connect standalone

and then I will paste it here.

Press Enter.

And if the connector is loaded properly, this is good.

So now we have this connector

and it created the index wikimedia.recentchange

in OpenSearch, and now it's actually sending data to it.

So we can verify this by going under my consumer groups

and find my Connect ElasticSearch Sink in here.

And as you can see the lag is already zero,

so it was a much more efficient implementation

of sending data from my Wikimedia topic into ElasticSearch

using this connector than writing my own.

Which is why it's always, I would say,

better to use Kafka Connect,

because someone may have done a much better job

at writing code to send data from Kafka to somewhere else,

for example, OpenSearch.

So all the data is now inserted into OpenSearch,

and we can verify it by doing a get query.

So I'm going to just un-command this and do a get query.

So I go into my OpenSearch dashboard.

So it's localhost and then 5601.

And I go to Dev tools.

I do a get of wikimedia.recentchange/_search.

And as you can see, yes, we are getting some data

directly coming from our connector into OpenSearch.

So it's pretty amazing,

and once you get the hang of it,

then it becomes very, very easy

to manage Kafka Connect and run connectors.

So this was just an intro though

and I know this can be a lot,

but I just wanted to show you a full flow.

Of course, I have a full course

dedicated to your understanding in learning Kafka Connect.

So it takes a few hours to actually master what I did,

but hopefully you get the idea of Kafka Connect.

Last thing I have to do is to just tap my connector,

and that's it for this lecture.

I hope you liked it, and I will see you in the next lecture.
