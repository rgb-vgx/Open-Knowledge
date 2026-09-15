So let's run our code.

And to do so we must first create this

wikimedia.recentchange topic.

So, you can use the CLI or I'm going to use a Conduktor ui.

So I'm going to create this topic

of three partitions and a replication factor

of one because we are only running one Kafka broker.

So my topic is now created

and what I'm going to do now is just run this code.

So you can click on the play button here

and let's see what happens when the log output comes.

Okay, so if we have a look here

we have the producer configuration that is looking fine.

And then in our log we're starting to get an event

source client using this URI, so we're starting to read

from the stream and then as we read from the stream

we get a lot of info log

around all the data that is being sent to Apache Kafka.

So as you can see the stream is quite fast

and it's happening in real time.

And so therefore if I go into my consumer

and I refresh right now, as you can see, I read 738 records.

This is my topic size so far,

how many partitions I have and so on.

And all the data is here.

So it's sent with a null key.

So it's distributed across all partitions.

And if I click on the value,

I get some information about the data itself.

So I can look at the Schema and whatever the data contains.

So the type, the title, the user

whether or not it's a bot and so on.

So quite a lot of things I have to say.

And then the server name that it belongs to.

So this is really cool 'cause we have this consumer running

and I can refresh it to get more data.

So as you can see my topic size is getting bigger

and bigger over time.

So we are at 1.7 megabytes now.

And this is running.

Alternatively, you can also use a Command Line Interface

to read our topic.

So in here I can do a Kafka-console-consumer command

and then I can connect to my bootstrap server local hosts.

I don't need all these properties so I can just delete them.

And the topic I'm gonna read from is the Wiki PJ topic.

So let's get back at the name of it.

So it's Wikimedia that recent change.

So we're going to read this not

from the beginning because we're streaming.

So it's going to actually read

from whatever is being sent right now.

And once we are tapped into the topic, as you can see

it's streaming data, so it's barely usable using a CLI.

And then you do control c2 stop.

This is why we, we built, this is to for you to

have time to read the data and to have a look at it.

But now we see that both the console consumer

and Conduktor is working and our producer

of course is working all against local hosts.

That's pretty handy.

Now to just exit, just click on the exit button

and we are good with running this producer.

All right, that's it.

I hope you liked it.

And in the next lecture we're going to see how

we can optimize the throughput of this producer.

So see you there.
