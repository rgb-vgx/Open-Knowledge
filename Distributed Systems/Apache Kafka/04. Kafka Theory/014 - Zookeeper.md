Hi, this is Stephane from Conduktor.

And in this lecture,

we're going to learn about Zookeeper.

So, Zookeeper has been how Kafka was able to

function all the way up until today,

but it's slowly disappearing

and it's going to be replaced.

So you, what you may hear Zookeeper a lot

in the Kafka community today,

and I will explain you everything you need to know

in this lecture and the next.

So, first let's look at Kafka with Zookeeper.

So, Zookeeper, are managing Kafka brokers

and Zookeeper is a software.

And Zookeeper is going to

keep a list of your Kafka brokers.

Zookeeper is also going to be very helpful for Kafka

because whenever we have a broker going down,

we need to perform a leader election

to choose new leader for partitions,

and Zookeeper is going to help with this process.

Also, Zookeeper is going to send notifications

to Kafka brokers in case of changes.

For example, when a new topic is created

when a Kafka broker goes down, or comes up,

deletion of topics and so on.

So, Zookeeper has a lot of the Kafka metadata.

And Kafka all the way

up until version two.whatever

two.X, two.eight

it cannot work without Zookeeper.

So, Zookeeper has been since the beginning of Kafka,

a companion to Kafka brokers,

and you cannot launch Kafka without launching Zookeeper.

But now starting with Kafka 3.x,

you can have Kafka work on its own without Zookeeper,

it's called the Kafka Raft mechanism instead.

So, it's Kraft or Kafka Raft.

And if you wanna read more about it

just go on Google

and type KIP K-I-P 500.

And then, in version Kafka four.whatever

you will not have Zookeeper anymore.

So, right now the community is transitioning to

making Kafka work with Zookeeper correctly,

and then, at some point,

migrate and move without

a, to a Zookeeper less Kafka.

So, that means that Kafka with Zookeeper

is necessary right now.

And so we still need to learn about Zookeeper

because you are going to see it in production a lot.

So, Zookeeper by design is going to operate

with an odd version of servers.

So, you either you have one Zookeeper

or three Zookeeper, or five Zookeeper,or seven Zookeeper

Never more than seven usually.

And Zookeeper also has a concept

of leaders and the rest are followers.

So, one for writes and the rest for reads.

And something you may read on the internet

but it's old information,

and I still see it.

So, it's information for you to know Kafka consumers

in the old versions of Kafka

used to store consumer offsets on Zookeeper.

But now, as we know, they store consumer offsets

on the internal Kafka topics named consumer offsets.

So Zookeeper does not hold any consumer data, okay.

Starting with Kafka version zero point 10.

And I know this looks old,

but it's still super important

for me to say it because you have no idea how

many people still get that wrong.

So if you look at Zookeeper,

we may have an example here with three Zookeeper servers.

The second one is the leader,

and then the brokers are connected to Zookeeper,

and that's how they get their metadata.

I'm not giving you too much information

about Zookeeper because you don't need to know that much.

All right.

So the question is

should you use Zookeeper?

If you are managing Kafka brokers,

the answer is yes.

Until Kafka 4.0 is out and ready,

then you should not use Kafka

without Zookeeper in production.

Okay. But I'm going to still show you

in the hands on,

how to start Kafka without Zookeeper,

for you to have a play.

But remember, it is not production ready yet.

And then for your Kafka clients.

So Kafka clients over time,

they have been migrated to leverage the brokers

as the only connection endpoint instead of Zookeeper.

But before you used to connect your producer to Zookeeper

you used to connect your consumer to Zookeeper.

You used to connect your administration client

to Zookeeper and so on.

And so you may see the Zookeeper option.

And on the online literature,

you may see Zookeeper being written out elsewhere.

Okay.

But, if you're doing the most recent version of this course,

then you should not use Zookeeper anymore.

Okay?

All the Kafka clients and CLI tools have been migrated

to only leverage Kafka brokers as a connection end points.

Okay, so even consumers that shouldn't connect

to Kafka brokers because to Zookeepers, excuse me.

And then since Kafka 2.0, 2.2

the Kafka topics command also as well

references Kafka brokers and not Zookeeper.

And this is very important because the community

did an effort to migrate all the comments before

from Zookeeper to Kafka.

Because when we are going to have Kafka without Zookeeper,

then the clients will not have any issues,

because they don't expect Zookeeper to be here.

So also the reason why Zookeeper is going away is

that because Zookeeper is less secure than Kafka.

And so that means that you should protect Zookeeper

if you use it to only accept connections from Kafka brokers

but not from Kafka clients.

So all in all, as a summary

if you wanna be a great, and I'm teaching you to be great,

a great modern day, Kafka developer,

never ever use Zookeeper as a configuration

in your Kafka clients.

If you do it, I will look at you and be mad.

Okay. And if you write a program as well, do not connect

to Zookeeper, only connect to Kafka,

But thankfully

I'm going to teach you the right way in this course.

All right.

So that's all you need to know for Zookeeper.

I hope you liked it.

And I will see you in the next lecture.
