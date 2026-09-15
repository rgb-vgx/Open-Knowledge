So let's have a quick look

at the conductor UI so you can see what is available.

So we have in the home, the information about our cluster

and the top left, we can select a cluster, even manage them,

and you could add clusters if you wanted to

by just having your cluster name, the technical name ID,

and the bootstrap servers,

as well as any authentication method if necessary.

And we give you guides to connect to so many kinds of Kafka.

So we can select multiple clusters.

Here we have this one,

and in there we have a view around some index and state

and the recently viewed topics subjects and so on.

So if you go into topics,

you will find all the topics that you know.

For example, for the first topic, I can find all my records

with the key, the values, the timestamps, and so on.

I can click on a specific message

and get some details such as, for example, what was the key,

what was the value, as well as any headers

and metadata if necessary.

And I can, for example, reprocess a message.

So this is allowing you to send the message again

to the same or a new topic.

So some other stuff we can do is the produce window.

So here we can set up a key, we can set up a value,

and we can even generate it.

So if you can, for example, generate some string,

here we go, we have generated a random string

for the value and we can produce it.

And as you can see, the message has been sent,

but we can do a little more, I'm going to zoom out.

We can set headers if we wanted to.

We can set flow, for example,

we can send one record at a time.

We want to generate a random value and a random key,

and they're going to be strings.

And so what's going to happen is that we're going

to produce one record per second.

Now up and I need to repeat it of course.

So automatic and we say interval is one second.

So that means that here, every one second,

a record is going to be produced to our topic.

And this can be very handy if want

to test quickly your topic or your producers.

You can have a very quick producer right here in our UI.

We can have a look at the topic configuration.

So if you go into topics in here

and create a new topic, you can name it whatever you want.

Have any partitions and replication factor you want,

you can add labels, for example,

I will say this one is demo.

And we'll have a label, for example, development team dev.

And this is just a label that's gonna allow you

to filter it in the UI.

So lemme show you, and also you can fully customize

any settings if you wanted to for that topic,

but no need right now.

So let's create this topic.

Go back to our list of topics.

And as you can see now my demo topic right here is created.

And upon doing a refresh, we have access to here,

this tag of team dev.

So we can order our topics and group them

very easily, directly in this UI.

So lots to explore, but what else can I show you?

Schema registry is if you want to set up a schema registry

with Kafka right now we have non setups.

We can manage our consumer groups

and we can reset them, see the lags and so on,

directly from conductor, we can connect conductor

with something called Kafka Connect.

Again, this is not set up,

but all of this is done in the cluster configuration.

We have a Kafka gateway.

So this is to create more advanced rules

such as topic policies, field level encryption, audit,

and schema ID present.

And if you want, you can book a demo to see how that works.

You can manage all your brokers, you can see

how many brokers you have, the versions you have,

if you have a controller, et cetera, et cetera.

As well as deploy them in the graph if you want

to have actually alerting that we can enable as well.

Service accounts.

So this is to create accounts for your applications,

ksqlDB to manage ksqlDB directly from conductor,

chargeback for you to also get access to figuring out which

of your teams are using Kafka the most

and divide the cost by them.

And then you have self-service.

So you can register applications in Apache Kafka,

you can have a way to have requests for creating topics

and topic policies.

And finally, you can have rules as well.

So you can have very strict data quality rules

in case you need them.

So conductor is a lot more than just Kafka as you've seen.

But the basics of Kafka are covered of course as well.

But this really allows you to go from a simple dev UI

to a full production management system

for Apache Kafka in your company.

So that's it for an overview of the UI.

Now in the next lectures you may see the UI being a little

bit different, but I will use the core functionality

for topics and consumer groups.

So there should be enough for us.

So I hope you liked it

and I will see you in the next lecture.
