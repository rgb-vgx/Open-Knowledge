Hi, this Stephane from Condukter

and in this lecture we're going to see how to start Kafka.

Now starting Kafka is one of the most complicated thing

to do, but I try to make it simple for you.

So there are different kinds of lectures in a section,

and I give you the order in which to watch them in this PDF.

I'll just open it for you in a few seconds,

but it gives you instructions for Mac, for Linux,

for Windows, if you have Docker or not.

But I'll give you as well my most recommended way

to start Apache Kafka.

So it's a big challenge, but I've created a Docker file

that will start Kafka for you

as well as Conduktor the platform.

This is our UI to help you use Kafka a lot easier.

So yeah, I will show you how

to install Docker if you don't have it,

and how to use one command

to just start Kafka and Conduktor at the same time.

If you don't want to use Docker,

I will still provide you alternatives for MacOSX.

So how to start Kafka without ZooKeeper,

which is now the default way in Kafka 4.0 and over.

Also, how to install Kafka using Brew.

I'll show you alternative for Linux,

again using Kafka without ZooKeeper and for Windows as well.

How to use Windows WSL2 to start Kafka without ZooKeeper.

On plain windows,

it's not recommended, there's lots of issues.

So I only recommend to use Windows WSL2,

but I'll show you how to install it.

And if you wanted to have a old setup of Kafka

with Kafka and ZooKeeper,

I will also have these videos for you

on how to start Kafka and ZooKeeper for Mac and Linux.

But if you do any of these alternatives, Mac, Linux,

or Windows, you will not have a UI.

Okay, to have a UI and I will be using a UI in the course.

It's very great for learning.

I do recommend to use the Docker method

that I will show you in the next lecture.

So how to start Kafka?

Well, we'll start Kafka with Docker

and you'll have a UI like this

to manage your topics, your cluster, and so on.

Everything will be accessible locally

on 127. 0. 0.1:9092.

But don't worry, I will show you the commands.

We will also nonetheless install the Kafka binaries

from the Apache Kafka website on your computer.

This way you can interact

with the cluster using the command line interface.

And this setup with Docker comes with one Kafka broker only,

which is perfect for development purposes.

If you wanted to set up a whole cafe cluster,

this is a big setup nowadays.

You have online cloud solutions which do this

for you on the cloud.

But also if you want to do this on premises,

there is a dedicated course for this on how to configure it.

Okay, so here are the Kafka installation steps.

So for Docker, we'll first install

and launch Docker on your computer.

It could be Windows, MacOSX, or Linux,

and it's to work If you wanna Kafka UI

we'll start Kafka in Conduktor with one command.

And then we still need to install the Kafka CLI tools

using the binary.

So you still need to watch a video on how

to install the CLI tools using the binaries for Mac,

for Linux, or for Windows.

But once you've done this, you're good to go.

If you don't wanna use Docker

and don't want a UI,

then you're going to be using the binaries.

So we'll still install the Kafka CLI tool

using the batteries or using Brew.

And then we'll start Kafka using the batteries for Mac.

Same for Linux, we'll just install the binaries

and then start Kafka using these binaries.

And for Windows,

so Windows 10 version 2004 or higher,

or Windows 11, we'll install WSL2.

Then we'll install Kafka using the binaries.

And finally, we'll start Kafka using the binaries.

If you have an old version of Windows,

I really hope you don't because this is a pain.

You will have issues

because non-WSL Kafka is not supported.

And so I recommend for you to use the Docker method,

install Docker and you'll be good to go.

Otherwise, you will have issues.

All right, that's it for this lecture.

I hope you liked it and I will see you in the next lecture.
