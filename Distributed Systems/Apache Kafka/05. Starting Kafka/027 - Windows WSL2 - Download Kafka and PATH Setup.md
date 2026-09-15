Okay, so now that WSL2 is installed,

we're going to install Java JDK version 21 on our Ubuntu.

Then we're going to download Apache Kafka

under Binary Downloads, extract the content on WSL2,

and set up the path for easy access to the Kafka binaries.

Okay, so, the first thing we're going to do

is to install Java,

so for this, I'm gonna install Java Correto.

We are going to click on this link.

Production-ready version of Correto.

And then we're going to download Correto 21.

And then on the left-hand side, you go on Linux

and you click on install on Debian-based, RPM-based Linux.

So, we're using actually Debian-based

because we have Ubuntu.

So, what I can do is I can just click

on this command right here

and paste it here and press Enter.

And it's asking for my password,

so I need to enter my password.

So, make sure you enter your password.

Otherwise, this gets stuck.

All right, so we can do, next, this command

to install Java 21.

So, you paste it, press Enter.

And now, this installs all the required packages for us

to have Java installed on WSL2 on our Ubuntu.

So, now, if we do java --version,

as we can see, we get a version 21 from Correto,

so we have Java installed.

So, the next thing is to install Apache Kafka,

so I'm going to type install apache kafka,

and then go to the Download Kafka section.

I will choose a release for example, 4.0.0 or above.

And then I will right-click on Binary download,

copy the link, and then I will do wget

and then paste the link.

So, this is going to download this file

and then we have to unzip it.

And then one last command is tar, T-A-R, -xvzf,

and then just the path of this archive.

Press Enter.

It's going to unzip everything.

And after I do ls to get my files.

As we can see, we have this Kafka right here

that's available to us.

So, this is excellent.

Now, in this directory, the Kafka directory, we have bin.

And in bin, what we have

is all the binaries of Kafka,

so this is what we're going to run through in our command.

So, right now, what we can do

is that we can type the Kafka directory,

bin, and then for example, kafka-topics.sh.

And this is going to start the kafka-topics CLI utility.

As you can see, it gave me this output.

But what we want to do is to have

the kafka-topics.sh command available from anywhere.

And right now, it says command not found.

So, we have to do is to edit our path.

So, how to do, though?

So, first of all, we're gonna go

into the bin directory of Kafka and type pwd.

So, this is where it is stored

and this is what I'm going to copy.

And then I'm going to open a new...

Actually, I will just stay within Ubuntu.

I will go two levels up,

so I'm back in my home directory

and I'm going to do a nano

on the file named .bashrc.

And this file is the file we're going to edit

and we're going to add a path modification,

so scroll all the way down in that file.

And then at the bottom, you say path = "$PATH:,

and then you paste the full directory

to your binary of Kafka.

So, once you have this line of code right here, you exit.

Yes.

And we're going to source,

so reload bashrc.

This is something you just do once.

And now, this will be automatically done

by the way when you restart an Ubuntu window.

But now, if I type kafka-topics.sh,

as you can see, from any directory,

now I have access to my Kafka command.

So, that's it. We have installed Kafka on WSL2 on Windows,

we have access to the CLI command

from anywhere, thanks to the path.

And so, we're good to go for this course.

So, either you have launched Kafka using Docker Compose

and you're good to go

and you can now use the CI commands,

or if you want to launch Kafka directly on WSL2,

I will show you how to do this in the next video.

So, that's it. I hope you liked it,

and I will see you in the next lecture.
