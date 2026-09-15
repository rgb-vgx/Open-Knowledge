Hi, this is Stephan from Conduktor,

and welcome to this lecture on using the Kafka topics CLI.

So we have a Kafka cluster,

and we know that it's made out of topics, and so

therefore we're going to do topic management using the CLI.

We're going to create Kafka topics.

We're going to list Kafka topics, describe Kafka topics,

increase the number of partitions in a Kafka topic,

and finally, we're going to delete a Kafka topic.

But if you are on Windows non WSL two,

then please do not delete the topic,

otherwise, things will crash fatally for you, okay?

So let's get started and practice.

Hi, this Stephan from Conduktor,

and in this lecture we're going to learn how to use

the Kafka topic CLI to create and delete and list topics.

And these files you can find in the section two

of this course called code download,

and you can download the code and unzip it,

and you'll be good to go.

So in this tutorial and for the CLI, I'm going to show you

how to do it on the Conduktor platform,

but all the instructions

for all these files right here are available

for the Conduktor platform right here,

and the very same instructions are available

if you wanted to decide to use Kafka on your local host.

The reason why I'm going to use the Conduktor platform is

because we created a UI in this mixed learning visual.

So as such, I strongly recommend to follow the same way

as me, but again, you can do everything on a local host.

It will be the exact same commands on top of it.

This allows you to understand how to connect

to a secure cluster, which is something

you most likely will have to do at some point

in your Kafka journey, so why not start now?

So the first thing we have to do is to create

a configuration file with these configuration right here.

So I will copy this properties,

and what I have to do is to create a playground config file,

so that file needs to reside

exactly where you're going to run your CLI command.

So for me, it resides in this directory,

so I'm going to just do code to open my code editor,

and then I'm going to create a file

called playground.config.

You can do this any way you want, but as you can see,

this just opened this playground config file,

and I'm just going to paste what I have before and save it.

So make sure it is three lines only, so one, two, and three,

and then you'll have your username

and your password in there.

So that's the first step,

and then now you can go ahead and run some commands.

So the first thing is that we're going to look

at the Kafka topics command.

So it can be .sh, and then you'll get this blurb

of documentation, which means everything is working,

or this could be Kafka topics without .sh,

based on your operating system,

and again, you'll get the blurb of text.

So one of these two should work.

If not, please use the full path,

and I described this in the previous video.

So the first thing I'm going to do is to show you

the anatomy of a command.

So if I paste this in, the first part is Kafka topic.sh,

which represents the command itself.

Then we have command config playground.config,

which is the file I just created in this directory,

and this is to pass on additional connection property

to Kafka, which is necessary

when you connect to a secure Kafka cluster.

And then you have the bootstrap server option

with the actual bootstrap server you're trying

to connect to, which represents the URL of where Kafka is.

So if you try to do this command right here,

you will have an issue.

This when you have an issue,

it just shows the documentation just right now,

and you will know why there is a problem.

So if I scroll back up, if I scroll back up in here

and I look at it, it says that the command is wrong

because it must include at least one action,

which is list, describe, create, alter, or delete.

And these options are pretty much shown

in the documentation of the CLI,

so of course, you're going to learn these options

with me today, but in case you see the documentation

as an output of your command,

that means that you're missing some options.

So let's remove this.

So now let's actually create our first topic.

So I'm going to copy the entire command right here

and do the minus, minus create, and then minus, minus topic,

and then name first topic.

So this will create my first topic.

I press enter, and it works.

And just to show you just once on local host

you can do the exact same thing,

so let's create our first topic on local host.

And this time there is no command config.

You can just go ahead with bootstrap server,

local host 9092, because it is an unsecure connection.

We can do the same,

create our topic, and the topic is created.

But the thing is, when you use local host,

you cannot view what's happening,

so again, for you to get the best learning,

I recommend you use the playground, because

in the playground you can go under the console home,

make sure you choose my playground on the top right,

and then you have first topic,

and as you can see, I just created it and it appears.

So it's a really nice way to get visual feedback

of your actions, which can help you a lot

during your learning.

Okay, so we know now how to create a topic,

but there is a new option,

so as you can see, this topic get created

with three partitions, as you can see in the UI.

And if I paste this command here now, actually,

now we can also specify the number of partitions.

And it's always good to be very explicit

about what you're trying to create.

So in this example, I create a topic called second topic,

and it has five partitions.

So let's press enter, and the topic is created.

And of course, if I go in the console and refresh this,

now I see three partitions and five partitions.

So we have visual feedback again

that things worked as expected.

Now there's something called the replication factor.

So replication factor is a way to replicate topics

onto multiple servers for disaster recovery purposes

and high availability.

And what you have learned is that you cannot have

a replication factor higher than the number

of brokers you have.

So it turns out that if you try to create a topic

with a replication factor on of two, for example,

on local hosts, this is going to fail, why?

Well, because on local hosts, as you can see,

there's an error saying that

the replication two is larger than the number

of available brokers, one, and so therefore,

you cannot create a topic with an RF,

a replication factor higher than the number of brokers.

And so therefore, the only way to make it work

on local host with the setup we have is to use

a replication factor of one, and that's fine.

But in the cluster we have online on Conduktor,

it turns out that if you're a bit curious and go

to the brokers here, as we can see, we have 39 brokers.

Now, that may be different for you,

but we'll have more than one.

So you have 39 brokers,

and that means that we can use a replication factor

that allows our topic to be fully distributed.

So back into our topic now on Conduktor,

you can actually run this command.

And what happens if you try to do replication factor of two?

Well, this is going to work,

but actually, it's not gonna be two.

It's still going to be three,

and the reason is on Conduktor platform,

we've decided to just make it constant

so that all the topics created have a replication factor

of three, which is optimal.

So even if you try to create one

with a replication factor of one, it will say no.

It will have to be a replication factor of three.

So if you go onto the third topic,

as you can see, there's a replication factor

of three right now that is shown.

Now, in case you have a UI,

it's actually very simple to list topics.

You just go and you can see them all,

but how do you do this when you don't have a UI?

Well, for this we can use the Kafka topics

and then minus minus list command,

which is going to simply list your topics

one by one in this UI.

As you can see, I have my first,

my second, and my third topic.

Now, how do you get details into your topics?

Well, you can use the describe option,

and the describe option goes alongside the topic argument.

So I have my minus, minus, topic, first topic, and then

minus, minus, describe, and it's going to describe

my topic itself, which means that

every single partition is going to give me

a bit more information.

So here what I see is that my topic is named first topic.

We have three partitions and a replication factor of three.

You get some additional information

about potential configurations,

and then here we have a topic with three partitions,

so each line represents one partition, and as you can see,

there's leader 31 and then replicas 31, 15, 5,

and then ISR 31, 15, 5, and you may have

some different numbers here, but what does it mean?

Well, if you remember, I told you that when you have a topic

and it is distributed, it is on different broker IDs.

So this means that my partition zero in here has

the broker number 31 as the leader,

and the replicas represent 31, number 15, and number five,

which makes it a replication factor of three.

And because all my replicas are in sync,

it says ISR in sync replicas of also 31, 15, and five.

And my partition one right here has the leader of 14,

and the replicas of 14, one, and nine, which is really cool,

because thanks to this,

we really see the distribution of our topic

onto different brokers, in this example, nine brokers

to be exact, which is really, really nice.

And if you try to run the same describe topic command,

but on your local host,

so I don't know if I've created this topic, I forgot.

Yes, there it is, so my first topic is created.

As you can see, you see something

a little bit less interesting,

because we have first topic partition zero,

leader zero, replica zero, ISR zero,

so don't mix up the numbers.

Partition zero is the idea of the partition,

whereas leader zero, replica zero,

and ISR zero represents the broker ID zero

that holds this topic partition.

But again, you won't see any replication with one broker.

So that's good,

and then finally, how do we delete a topic?

Well, very simply, you go and run the Kafka topics command

and you have the topic name

and the option minus, minus, delete,

which is going to delete a topic.

So in this example, I can delete my second topic,

and if I refresh this, as you can see, it is gone.

But also I can quickly go back into here.

I can choose to delete my topic

by just using the UI one more way

so you don't have to remember all the commands,

and I can even delete my first topic.

So we have seen a lot.

We've seen how to use the CLI on a local host.

We've seen how to use the CLI on the Conduktor platform.

And Kafka topics CLI is something you'll use a lot

if you don't have a UI,

or any kind of UI can help you speed up your processes.

All right, that's it for this lecture.

I hope you liked it, and I will see you in the next lecture.
