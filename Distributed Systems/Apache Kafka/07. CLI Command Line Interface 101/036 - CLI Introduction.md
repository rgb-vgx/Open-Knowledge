Hi, this is Stephane from Conduktor

and welcome to this section on the Kafka CLI.

So we are going to use the Kafka CLI

to practice in this section.

And as we saw, the CLI comes bundle with the Kafka binaries

and so if you have set up the path variable correctly

from the Kafka setup, as I showed you,

then you should be able to invoke the CLI commands

anywhere on your computer, okay.

So you can do something like Kafka topics

and then it will reply with the command results.

So if you have installed Kafka using the binaries

then your command should be ending in dot SH.

For example, Kafka topics dot SH.

So this is if you're using Linux or Mac,

or if you have downloaded the Kafka binaries

on windows WSL2

then it's Kafka topics dot bat for windows, non WSL2

and then Kafka topics without anything

with homebrew and apt or something like this.

So if you follow the last video, you already know

if you should use dot SH, dot bat or nothing

and I will be using one way.

Of course, you have to adapt the commands

based on your operating system.

Now also we're going to use the bootstrap server

option everywhere, not the minus minus zookeeper option

because zookeeper is going away

and all the commands starting

at Kafka three are updated to use Kafka.

So that means that the Kafka topics command

should be using the boots trap server

local host 9 0 92, for example

instead of using the zookeeper option,

even though the zookeeper may still be available to you.

So in case you're having errors with the CLI,

that means that maybe the path wasn't set up correctly.

And if you still don't manage to set the path correctly

then what I suggest is for you to full path

to the Kafka binaries.

So you invoke the Kafka topics

directly from the full path to it,

and then the command should work.

So let me show you in an instant.

Okay, so I am in my root directory as you can see.

And what I can do is that I can do, for example

Kafka topics and then press enter.

And it's because I set up Kafka using brew.

and therefore my command is working, okay.

Maybe on your system is going to be Kafka topics dot SH

for me doesn't work because obviously

it's not registered as is.

And for windows it's going to be maybe windows without WSL2

It's going to be Kafka topics dot bat

which of course doesn't work on my Mac okay.

So if you do type Kafka topics dot sh

and you expect dot sh to be right, for example

and you get a command not found, then don't stress, okay.

Find your Kafka directory.

So it's Kafka 2 13, 3, 1 0, for example,

then bin and then in the bin directory

you're going to get the full path to your executable.

So Kafka topics dot sh.

And then if you enter then this command is going to work

and you're good to go okay.

So if you did not set up the path correctly

try to go back maybe to the previous videos

to set it up correctly.

If not, then just use the full path

and you're good to go for this course okay.

So that's it for this lecture.

Now let's get started with the CLI.

I will see you in the next lecture.
