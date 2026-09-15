Hi, this is Stephane from Conduktor,

and in this lecture,

we're going to set up the Kafka binaries on Linux.

So even if you've used Conduktor and Docker to start Kafka,

you need to set up the Kafka binaries on your Linux machine

because we're going to use it

to start running the Kafka CLI commands.

So first, we'll install Java JDK version 21.

Then, we'll download Apache Kafka from this URL.

Then, we'll extract the content on Linux

and set up the $PATH environment variables

for easy access to the Kafka batteries.

So, let's get started.

Okay, so let's go ahead and type install Amazon Corretto.

We scroll down.

We click on this website.

We're going to scroll down.

We'll choose the latest LTS version,

which is Corretto 21 for me.

On the left hand side, there is Linux.

And then, you can click on install on Debian-based,

RPM-based and Alpine Linux.

So I'm using Ubuntu right now,

which is Debian-based Linux.

And so it gives me the commands to run

to just install Corretto properly.

So I'm going to copy those

and I'm going to open a terminal,

paste this first command in.

So, let's do it again.

I'm going to just copy this one

and paste it.

Let's do it again,

copy and paste.

Okay, here we go.

So that's a good first step.

Then, once you've added the repo,

you can install Corretto

by running this one command.

So we're just going to copy this command again.

And for my first command,

I just need to also enter the password.

So then, let's go again.

We go to copy this command right here and paste it.

This is going to install Corretto.

And next we verify our Java version

by doing the Java -version.

And if you get Corretto here, you're good to go.

That means you're set up.

If not, you can scroll down in here.

And there is a way for you to run a command

called sudo update-alternatives

java and javac

to make sure that you're using Corretto.

This is a command,

I'll show you what the output is.

You run it in here if you need to,

and you can choose the version of Java you need.

But right now I've only have Corretto,

so that's perfect.

All right, so Java Corretto is installed

and now I can move on to Kafka.

So how do we do this?

We're going to go into the Kafka websites,

go to Apache Kafka downloads,

click on this page.

We want the release 4.0 or over,

and we want the binary downloads.

So I'm just going to click on binary download here

and click on this file.

And then, I'm just going to open files right here.

So my file has been downloaded and it has been unzipped,

and now I'm going to be able to have a look in it.

So as you can see,

I have multiple folders so that's perfect.

And I'm going to move this one level up.

So back into the command line 'cause we're in Linux,

we'll do a cd Downloads

and we're going to move this file called,

this directory one level up.

So now it's gone.

And if I go one level up,

I can find my Kafka directory.

So that's perfect.

So in this Kafka directory, in our Home,

we have this Kafka directory.

In there, we have multiple files,

but one of them that's interesting to us is the bin.

The bin contains the binaries

of all the Kafka commands that we need.

And so we need to add this to our path

because right now to run a Kafka command,

you will need to type in the full path to it.

So the Kafka folder/bin/ for example,

kafka-topics.ch.

And then, it runs the command.

But if you just type kafkatopics.sh

and press Enter,

it says command not found.

So we wanna fix this.

So for this, very simple,

we just have to edit the path.

So step number one is we need to edit

our file named .bashrc.

And in there at the very bottom of it,

we're going to add PATH="$PATH:

and then we need the full path to the Kafka binaries.

So let's just open a new window,

go to our Kafka bin folder,

type in pwd,

and you can copy like this, the full path,

and then paste it in.

So this is perfect.

We do Control + X, Y, and Enter to save this file.

And now if I close my terminals

and I just go ahead

and open one more time a terminal,

if I type now kafkatopics.sh,

as you can see,

my command is now running.

So this allows us to run any CLI

from anywhere on your computer

by setting up the path.

So that's it, we've installed Amazon Corretto,

so we have a Java version on our computer.

We've installed the Kafka binaries

and we've set up the path.

So we're good to go to run any Kafka CLI.

Just remember that for this setup,

you need a .sh every time we use it.

And we're good to go.

If you launch Kafka using Conduktor

and Docker in the previous lecture,

then you're good to go as well.

If you haven't done so,

I will show you in the next lecture

how to start Kafka manually on your Linux computer.

All right, that's it.

I hope you liked it

and I will see you in the next lecture.
