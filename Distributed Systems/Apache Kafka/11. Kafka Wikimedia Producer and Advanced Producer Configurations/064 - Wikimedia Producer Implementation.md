Okay, so in this lecture

I'm going to implement the Kafka producer for Wikimedia

and this was quite advanced, I would say Java knowledge

but if you're a good programmer

you should be able to follow along,

if not, you can just follow along.

You can even get the code that is already ready

and we will use that code

for the future sections of this course.

Okay, where it will not be as much Java programming.

Okay, so in the meantime let's go ahead

and implement this producer.

So to get started with the producer

we need to first reference the bootstrap servers.

And so Kafka for me is running at 127 0 01

9092.

Okay.

Then we need to just like before

create producer properties.

And so what I can do is I can go into my basics file,

find my producer demo and just copy this entire Blob

right here all the way until here.

So we'll copy it, we'll paste it.

I'm going to fold that 'cause I don't need it.

So we create the producer properties

and in here I'm just going to reference

my bootstrap servers.

Okay.

So here we have created our Kafka producer

and we will probably need it later on, okay.

Next we're going to create a string

which is going to contain the topic we wanna send data to

and it's called Wikimedia

dot recent change

which is the name of the stream that we are using.

So this is the producer part, and now we need to actually

create what's called an event handler

and an event handler is coming

from this event source library we just pulled in, okay.

And this is what's going to allow you to

handle the events coming from the stream

and then send them to the producer.

So here I'm going to create an event handler

and we need to actually implement a class

that will implement this event, handler interface.

So I will have a to-do here, okay.

To implement this class, then we need to pass in the URL.

So we're going to do string URL

of where we are getting the string from.

This URL is the one that I got for you, okay.

And next, once we have this

we should be able to pass in this URL to an event source.

So we're going to do event source dot builder

to build our event source, okay.

Which is a builder and this is just standard

(indistinct) three event source type of documentation.

So this is why I'm doing it

but this is not Kafka related knowledge.

So it's a new event source dot builder

and in it, you pass in a handler and a URL.

So the handler is very easy.

It is the event handler we created from before

that we're going to implement very, very soon

which is where all the magic happens as well as passing

the URI dot creates URL to create a URI from a URL.

Okay.

Once we have this, we need an event source.

So because we have a builder from before

which is named event source and it's equal to builder.build.

Okay, this is a common Java pattern.

And then finally, when we're done

we need to start the producer in another thread

and we'll use event source dot start.

And this is going to allow us to start

this whole event handling.

Okay, so we have things going

and now we just need to implement the real magic of this

which is the event handler.

So right now we're saying, Hey, you build an event source

using this handler and this URL, and then you start it.

So this handler is going to actually receive events now

and we need to handle these events.

So to do so what I have to do is to go

and create my events source handler.

So to do this I'll do new Java class

and I will call this one Wikimedia change handler.

Okay.

And this file needs to extend or implement, excuse me

the event handler.

So let's go ahead and do this.

So we're going to go into this public class

and I will do implements event handler.

So this is an event handler

and as you can see, this was imported.

And so we'll go ahead, do option and then implement methods

and I will implement all these methods right here

one by one.

So I'll do, okay.

So how do we do this?

And by the way, this is Wikimedia.

So I'm going to just rename this file, excuse me

I'm going to right click, refactor and rename file

and I'm going to just remove this typo.

Okay.

So we're going to have to implement onopen, onclosed

onmessage, oncomment and onerror.

And some of these methods of course,

we do not want to implement.

And so if we have a look at the producer right here,

we actually have created a Kafka producer in here

and we need to pass in this producer

into this class to be able to use the producer,

usually in the onmessage,

because whenever we receive a message

we want to do Kafka producer that send message.

So to pass in an object from one class to another in Java

you need to implement a constructor.

So fairly easy, we're going to implement

a constructor right here.

So there'll be a public constructor.

So Wikimedia change handler

and is going to take a Kafka producer of type string string

as an input that I will name Kafka producer

and then also a topic to where to send to.

And therefore, because we need to have that,

we need to also have these accessible from within my code.

So we'll have a Kafka producer string string

that is named Kafka producer and a string topic in my class

and we're going to say this dot Kafka producer

equals Kafka producer, which is standard Java code

and this dot topic equals topic.

So now we have passed in a Kafka producer

and a topic into these change handler

and they can be referenced from within our code, okay.

The last thing I want to do is to

have a private static final

logger and actually doesn't need to be static,

it can just be a private final logger

and then I will name it log

and it's coming from the logger factory, get logger

and then the name of a class

that's class, dot get simple name.

This is so we can start logging some stuff, okay.

And actually I need to make sure that

this logger is actually implementing

the correct logger which is the logger from SLF4J.

Okay, we good to go.

So we have this log

and we can use this log when we need to.

So when we have onopen, this is when the stream is open.

Do we need to do anything?

Not really.

So I will have nothing here, okay.

Because we don't need to do anything.

When the stream is closed, what should happen?

So that means that we're closing reading from the stream

and therefore a good thing to do

would be to actually close our producer as well.

So we'll do Kafka producer dot close

to actually close our producer.

Okay.

And because there is no exception

we can actually remove this block right here

because we don't throw any exception in these cases.

Okay.

Next, the important part is on the message.

So onmessage means that the stream has received a message

coming from the HTTP stream

and so therefore we want to send it

through the Kafka producer.

So what we need to do is use some asynchronous code

just like we saw from before.

And we're going to do Kafka producer dot send

and here we need to specify a producer record.

So we'll do new producer record

and then we need to specify a topic.

So this is the topic we retrieved from before

as well as specify a string value.

Well, it makes, it is good because we get

a message events out of this method.

So if you look at the message event object,

if we do get data, we are actually getting

the data of the object as a string,

which is exactly what we need.

So here, we're saying, whenever we receive

a message from the stream

and this message is a message event

then get the data from it

which is the actual content of the message,

create a producer record to send to this topic

and do Kafka producer dot send.

And because I want you to see the fact

that we're sending some stuff, we can do log dot info

and we can actually do message event dot get data.

So the data itself is going to be put into the log

so we can see in real time that we are receiving messages

and therefore asynchronously, we are sending it

through the Kafka producer to Apache Kafka.

So this is the whole magic of this code.

Oncomment nothing here as well, it doesn't matter

and I can remove this exception

and I can also remove here this exception.

And then in case of error, well, we're just going to log it.

So log dot error, error in stream reading

and we pass in the preferable just to get some information.

Okay, maybe we want to stop reading,

maybe we want to close the producer,

terminate it but for now I'm good

and I'm not expecting any errors anyway.

So we have this Wikimedia change handler

and this is something that gets invoked whenever

the stream finds a new message.

So to summarize the important part is here.

Whenever we receive a message, we log it

and then we pass it to our Kafka producer.

So now that we have implemented our event handler

we can actually use it in our change producer code.

So that means that here the event handler we need

is going to be a new Wikimedia change handler

and the constructor takes a Kafka producer out of it.

So I can use my producer

and a string topic so I can use my string topic.

So as we can see here, we have our code just to summarize.

We create our producer

and we define the topic we wanna send data to.

We then pass this into a change handler

the producer and the topic

and I could have created my producer and my topic there

but I liked it to, I like to do it in my main.

And then this gave us a event handler.

And then we used this and a URL to create an event source

and this event source whenever

new messages are happening in here

are going to pass them into the event handler we have.

So we do event source that starts

and it's going to start its own thread to process

and so therefore I need to block my code here

because if I don't block my code

then everything is going to just hang, to finish sorry,

and this is going to be bad because well,

the main thread is just going to stop

and so all the threads are going to stop as well.

So to do so, to do it very simply we can,

for example produce for 10 minutes

and block the program until then.

And so we can do time unit

dot minutes

dot sleep and then 10.

We're gonna say, Hey I want to block for 10 minutes

and while this is happening,

while my other thread is going to produce to Apache Kafka.

So with this, I can add an exception

to the method signature.

So now my main throws an interrupted exception

and we are good.

So now this means that our code is ready

and we are ready to try it and run it.

So I will see you in the next lecture

to run this code and analyze the results.
