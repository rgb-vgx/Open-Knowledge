Hi, this Stephane from Conduktor,

and in this lecture,

we're going to practice using the Kafka console producer

to start producing data into our Kafka topics.

So we're going to practice two use cases.

We're going to practice without sending keys.

So the key will be null

and the data will be distributed across all partitions

or we can produce with keys

to have the same key always go to the same partition.

So let's have a look right now.

So let's practice using the Kafka console producer.

For this, go into your code

and open the file named one Kafka console producer.

So again, we'll run the same commands

both on Conduktor platform and local host.

They're very similar.

So first things first,

if you don't have any topics which I don't right now,

I will go ahead and create my first topic

with one partition

and we use one partition,

to demonstrate a special behavior.

I will let you know later.

So my topic,

first topic is now created

and the next thing we have to do is to produce to it.

For this,

we're going to use the Kafka console producer Command.

So you can look at its documentation

by just typing the Command,

and then you'll have access

to the full documentation right here.

But in this lesson,

I'm going to teach you the most important one.

So let's go back to our console producer

and have a look at what we do.

So we're going to copy and paste this entire Command.

So the first part of the Command,

the producer, config player,

playground config,

allows you to connect to a secure cluster

and the bootstrap server is specifying where the cluster is.

And then we just specify minus, minus topic,

first topic,

the Command is a little bit simpler

when you connect to an unsecure cluster.

So if you have a bootstrap server,

at local host 9092

and then topic, first topic, you're good to go.

Okay, so let's go ahead and run this Command.

And when you launch your console producer,

you're going to have this Chevron on the left hand side

which tells you that you're ready to produce.

So I'm just going to say hello world.

And then I'm going to say my name is Stephane from Conduktor

and then I love Kafka.

And every time you press enter,

this is actually going to send a message into Kafka

and this is where you have a new Chevron.

And to just stop sending messages into Kafka,

just press control C and you're out of the console producer.

Now, we will see how to consume messages

in the next lecture when you look at the console consumer.

But if you wanted to do a quick shortcuts,

you can go into the UI

and then you can have a look at the fact that the messages

have been consumed here

with, "Halo World my name Stephane from Conduktor

and I love Kafka."

So this is a confirmation

that our console producer has worked, of course.

Next, we can actually enhance our producer.

And when we start specifying properties

to enhance his behavior,

to change batching and so on,

we can use the producer property argument.

So in this example,

I'm producing with properties

and the property acks equals all.

Just specify that every message

should be acks by all brokers.

So again, you won't see anything producer side that changes.

But in the backend,

if you say some message that is acked,

of course the message is going to be acked by all brokers

the way we learned about it

just for fun and then learning.

Okay, so we've specified six messages right now

and these three have been acting of course

because all my brokers are up, everything worked just fine.

Another behavior you should have a look at

is producing to a non-existent topic.

So in this example,

I have the same Command as before

but I produced to the topic called, "New topic."

And if you have a look at my topic list

as you can see right now,

there is no new topic.

There's only one called, "First topic."

So if you produce to a non-existing topic,

you're going to have a different behavior

based on different clusters.

So for us, as you can see,

there's a chevron.

So it seems like everything is fine

but if I type Hello Wold,

you're going to have a sort of timeout

or you're going to have a sort of error.

And this is because we don't allow you

to produce to a topic that doesn't exist.

And as you can see,

we get an error message

saying that the topic is not in the metadata.

So it was never created.

We can verify this behavior

by running a Kafka topics Command with a list,

and to look at the fact that

we only have first topic in here.

So this is a different behavior you'll observe

because if you try the exact same Command

but on your Kafka boots,

your Kafka on local host that you've just created

with a default configuration

and you say, "Hello world,"

you see two warnings saying,

"Leader not available."

Because it actually is no leader

for the topic that get auto created.

So you may see once or twice

but then after twice or three times of these error,

the topic will have been created

and the topic will have a leader.

And so therefore this hello world worked.

And you can verify this

because while if you do a list of topics,

as you can see,

we can find the new topic that'll get auto created.

And you should describe that topic in case of auto creation.

It will have, for example, one partition.

Partition count equals one,

because this is the default you set for your Kafka cluster.

So what you can do is that

you can actually go and edit

some configs in the server.properties file.

So the file used to start your Kafka server with

and you can add for example,

number of partitions equals three.

And by default,

if you send messages

to a non-existing topic again,

then you will have three partitions by default.

This is to make it a little bit easier

for you to start with Kafka,

but to be fair,

and the best practice is

and this shows be on many, many different clusters

that auto topic creates will be disabled.

And you are strongly encouraged

to create the topics ahead of time,

which is why we have disabled it

on the Conduktor playground.

So try to get used to it.

Lastly, we can also produce using keys.

So if you have a look at our first topic right now

and we have a look at some messages

as we can see, the key is null.

So key null,

value learning key null value

just for fun and so on.

Because by default,

when we send a message using the console producer,

it's going to send the null key.

But we can actually produce with keys,

and we've seen that when we produce with keys,

the same key will go to the same partition,

and that's the behavior we will verify later on.

So if we have a look here,

the producer with keys,

I send this,

I copy this entire Command

and we have a look at the arguments right now.

So the topic is still first topic,

so something that already exists for us

and the property is parse key true.

So the key is going to be sent

as part of this console producer

and the property is key.separator is colon.

So that means that when you produce messages,

what is left of the colon is the key,

and what is right of the colon is the value.

So let's press enter.

We'll have example, key example value

and here is name Stephane.

So in different keys and different values.

And if we have a look now in the playground

and refresh this page,

I'm going to just refresh this view right here.

As you can see now,

the key is name,

the value is Stephane

and the key is example key.

And the value is example value.

Now, I can't really show you the same key

goes to the same partition right now

because we only have one partition.

So all the messages will go to that one partition

but we will see this behavior later on.

And when you use such a producer

where you have a key separator,

of course if you just send something without a colon,

you're going to get an exception,

because while you haven't found any key separator.

So that's it for this lecture.

We've seen how the Kafka console producer works.

I hope you liked it and I will see you in the next lecture.
