Hi, this is Stephane from Conduktor

and in this lecture I'm going to show you

how to write your first Kafka producer using Java API.

So we'll just write a very basic code to send data

to Apache Kafka.

We'll view some basic configuration parameters

and we'll confirm that we received the data

in a Kafka Console Consumer.

So let's get started.

So we are going to create our first producer.

So for this we first need to create the producer properties

then we need to create the producer.

Then we need to send data

and finally flush and close the producer.

And we'll have a look at all these steps, of course,

in this video, so right now it's just the commands

just to see what we're going to build.

Next, we need to create a logger.

So private static final

Logger and log equals

LoggerFactory.getLogger

and then (ProducerDemo.class.getSimpleName()).

So anytime I was getting the code completed,

I just press the tab button

and I press the tab button as well on LoggerFactory

which made me import the org.slf4j.LoggerFactory.

This is important because this is what you need

to have in this course.

And then if I click on the logger

as you can see there is a question mark

because you need to import the logger as well.

So you do alt and then enter,

which brings up this menu

and you do import class and the class is imported.

So next we can replace this system.out.println

by log.info

and we press play to run this demo

and we'll see if our logger is working.

So once you run this you will get a producer demo,

hello world as an output.

That means that everything works.

If you don't see this,

the issue is that maybe you go in build.gradle

and you haven't replaced test implementation

by implementation.

So you need to make it happen

and you need to make sure you've imported slf4j-api

and slf4j-simple and use the latest version if you can.

Okay, so this is working fine.

Next we have to create our producer properties.

So producer properties is the configuration of our producer.

So we do Properties properties=new Properties().

And every time I do a tab, it auto-completes

and if need be it will import the necessary packages.

I won't say this over and over again

but I just type things and I press tab.

All right, so next we need to set properties.

So properties.setProperty()

and this is the key and this is the value.

So whenever you create a property and you set it,

you need to say for example, that the bootstrap servers

is going to be a goal to 127.0.0.1:9092.

So this is the kind of things that we've set

with the (indistinct), to we're setting up

the bootstrap servers but now as you can see,

we can also set it it directly from within Kafka,

our program.

And so this is if you want to connect unsecurely

to a local host, of course,

but you may want to also connect to your playground.

So this is a really good opportunity

to know how to configure it.

So back into the Conduktor home

I'm gonna go under my playgrounds

and I'm going to copy the connection properties

to my playground.

So I copied them all right here

and then I paste them.

And here are my properties themselves being set.

So the first one is the security protocol.

So I just do cmd+D to duplicate my line.

Okay, so this is how I have duplicated this

to go a little bit quicker.

And so we set the security protocol to be equal

to sasl.jaas.

We need to set the sasl.jaas config

right here to be equal to this entire blob of text,

including the last semicolon.

So make sure you have everything copied and pasted.

And when you see, when you paste,

so this was like in between quotes,

when you paste it, as you can see

the in-between quotes will get escaped automatically.

So leave it as it is.

This is IntelliJ doing something nice for us.

And then lastly, the sasl.mechanism is PLAIN.

So let's enter this as PLAIN

and we're good.

So these have been included.

And lastly, my bootstrap servers, of course,

I need to set them.

So I will set my bootstrap server

to be equal to my cluster on playgrounds.

So here with these properties we are connecting

to our secure clusters.

So here is connect to local hosts

and here is connect to Conduktor Playground.

And this is very important for you to see it.

So if you want to keep on using local host,

you just keep the first line

and you can just delete those or comment them.

And if you want to use Conduktor playground

and I will be using Conduktor playground

just to have the niceness of an UI

to just show you what is happening in Kafka,

then please keep the last four and you can just comment

this line right here.

So for me it's comment and slash

which sets a comment right here and I'm good.

So now these code are going to work the same way

on you know, local host and the Conduktor playground.

So no worries here, but I wanted to show you this

because now you know how to connect to a local host server

but also knows how to connect to a remote server

and add security properties to your producer.

So next we need to specify how the producer

is going to behave.

So regardless of what you did before,

here we are going to set producer properties.

And before this was just connecting to the broker.

So now the properties is going to be setProperty

and we have two things to do.

So we have the key.serializer config and here's the value.

And if I duplicate this line

we also have the value.serializer.

So because in Kafka when you use a producer,

you pass in some information

and at first there will be a string

and that will be serialized into bytes

by this key.serializer and the value.serializer

before being sent to Apache Kafka.

So as such, what I'm going to put here

is the StringSerializer.

I will press tab to do auto complete

and to import again my class in here.

So StringSerializer.class.getName().

And similarly, here I will use again

the StringSerializer.class.getName().

That means that our producer is expecting strings

and these strings will be serialized

using the StringSerializer which is a class

provided with the Kafka clients.

Next we create the producer.

So I'm going to create a Kafka producer

and then you open the chevrons and you have string, strings.

So what does that mean?

That means it's a Kafka producer

of which the key is of type string

and the value is of type string

which matches the StringSerializer and the value.serializer.

So KafkaProducer&lt;String, String&gt;

and then I'll call this one a producer

equals new KafkaProducer.

And then you have the properties that you pass in.

So as you can see, these things are grayed out.

So they can be removed

because it's called an explicit argument

versus an implicit arguments.

So you can leave things like this,

it is completely equivalent.

So we've created a producer object

from a Kafka producer class by passing in the properties

and the properties tell how to connect to Kafka

and how to serialize values and keys.

Alright, great.

Next, we need to actually create a producerRecord.

So what is a producerRecord?

It is a record that we're going to send to Kafka.

So as such, it's a producerRecord.

Then the key is of type string

and the value is of type string.

So I type these two out.

I call this one a producerRecord= new producerRecord().

And here if we do commands P, we get the constructor

of this producerRecord.

So we have lots of different options.

We can just specify a topic and a value.

We can specify a topic, a key, and a value,

a partition, a key.

As you can see you have a lot of different options

but to keep it very simple right now,

I'm going to produce to the demo_java topic.

So this is the topic name, comma,

and then the value is going to be hello world.

So here we see something very interesting.

As you can see IntelliJ helps us understand

what the argument means.

And so it says topic demo_java and value hello world.

But this is not written out by (indistinct).

This topic thing is not actual code.

This is just IntelliJ telling me what this is about.

So it's a nice UI feature of IntelliJ

but again my only thing that I put in here is demo_java.

This is a common mistake

for those who do not understand Java very well.

Okay, so now that this producerRecord is created,

we're saying, hey, this is going to go

to the demo_java topic and the value is hello world.

So next we need to send the data.

So we do producer and the call is called send

and the constructor is taking a producerRecord as an input.

So let's enter the producerRecord

and close our line with semicolon.

Then I'm going to flush the producer

so I can just do producer.flush().

And this is actually tell the producer

to send all data and block until done.

So this is synchronous operation

whereas sending data was asynchronous

and then we can close the producer.

So let me copy this command right here,

producer.close().

So it turns out that actually when you do producer.close(),

it will also call producer.flush() before doing it.

But I wanted to highlight the fact

that producer.flush() exists as an API if you need to.

So when you send data as a producer,

it sends it asynchronously.

So if I'd never entered these two lines,

my program would've just completed

without having let the producer the chance

to send data to Kafka.

But by telling it to flush it, it was sending the data out

to Kafka and then by closing it, we got able to make sure

that everything was flushed before we finished our program.

So it turns out that when you have a real program,

of course, you will just flush it very, very rarely

and you will close it before your program exits.

But over time, of course, when you do .send(),

data will be sent because your producer

will keep on running.

So before we run this program

we need to of course create this demo_java topic.

So multiple options, you can use a CLI

and that could be great practice

but I'm going to be using the console

because it's a little bit quicker.

So I go and I create this topic called demo_java.

So up to you, if you use the platform

you can do it the same way as me

or if you want to use a CLI, it's amazing practice.

So try it out.

So demo_java, I created with three partitions.

I create this topic and now I'm going to just send data.

So I'm going to send the producerRecord.

So let me run this code.

And as we can see, we see a lot of log outputs.

So this is obviously going to be a lot

and we're going to have a look at it in the future lectures

about what that means.

But it turns out that my program was probably successful.

So, how do we verify this?

Well, two options.

We can go in our topic and as you can see right here,

we have the null hello world that appeared

or refresh this page if you need to be convinced of this.

Or you can go and use a kafka-console-consumer.

Okay, so let's have a look.

I'm going into my config, so I use playground.config.

Yes, the bootstrap-server is good.

The topic I'm reading from, I don't need a group

so I'll remove the group.

The topic I'm reading from is called demo_java

and I wanna read from the beginning,

so this is something you can do as well.

And press enter.

And as you can see, I get my hello world back.

All right, so we have processed one message,

we've read our entire topic, and we were able

to produce the first message from our producer in Java.

So I hope you liked it

and I will see you in the next lecture.
