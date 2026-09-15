So as an alternative

to using the Kafka batteries,

you can use brew.

And so the idea is that we'll install BREW on our computer,

then we'll install Kafka using brew

and that will automatically install the Java JDK

for you if you haven't done so already.

And then you can start Kafka using the binaries

provided with brew.

So let's get started.

Okay, so let's go ahead and install brew.

So I'm going to stop Kafka on the left hand side

by doing Ctrl C and clear my screen.

This window I don't need.

And here I'm just going to install Brew for Mac.

So you're going to click on Homebrew

and there's a command right here.

You're just copy it and you paste it.

And then this is going to ask for your password.

So you just enter your password and press enter.

And it's going to just install everything you need

to know to have brew.

So Brew is a way for you

to on your Mac if you don't know about it,

to quickly install packages

and software on your Mac using the command line.

So I'm going to wait for this to be done.

Okay, so brew is now installed on my computer.

If I type brew, I get command not found though

because I need to run these commands

to add home brew to your path.

So you're just going to run this one right here.

Then the second one right here

and the third one right here.

Okay, so I'm going to clear my screen

and now I'm gonna type Brew and Brew is working.

Alright, so CD to go back to my route, clear my screen.

And so I'm going to type brew install Kafka.

And this is going to go ahead and install Kafka for me.

So it's going to download Kafka

and any necessary libraries for me to run Kafka.

So this is a great setup because this will make sure

that your Kafka binary is running smoothly.

Okay, so now Kafka 4.0 has been installed

and what I need to do is to start my server

and also look at the server property.

So there's a few things you need to look about.

So the first one is that I'm going to show you

that the service, the properties file is in here.

So if you do nano

and then the file name, we are in the file name right here.

So it's in a different location as before.

It's very similar to the one we've seen.

But one thing we should look at again is the logs dear.

And as you can see now my home brew data for Kafka is going

to be stored in this directory

and it's not a temporary directory.

So this is a permanent solution to store your Kafka data.

So I'll just exit this file.

That's one difference, one key difference.

And then I'm going to clear the screen.

So what I need to do now is to edit my .ZSHRC file.

And I'm just going to add a comment here

by hiding this hash sign.

And this is to make sure that now we don't use the path from

the things we've done before but only from Homebrew.

So we just commented it out.

So Ctrl X, Y, enter to save,

and I'm going to just open a new window very simply.

And now if I type Kafka topics for example,

but without the .sh, as you can see now this is working

and this Kafka topics command is coming

actually directly from Homebrew.

So how do we make sure I'll do which Kafka topics that SH.

And it shows me

that this is using the home brew bin folder,

Kafka topics command.

So now that means that I can run Kafka topics

without that SH or any Kafka commands from any directory.

So now the last thing I have to do,

I'm going to click on go up just to make sure that I have

my comments and actually I lost it.

And now no need to actually format the storage

because this has been done for us already.

So the only thing I have to do now is to start Kafka.

So for this I'm going to do Kafka server start

and then I specify the command,

the configuration file.

So OPT, home Brew, ETC, Kafka server.properties,

we press enter, and now Kafka is starting

and has started automatically.

So that's it now we've used Brew, different commands,

but just remember them.

But we've seen two installation methods

to start Kafka on Mac OS, and we're good to go.

So that's it for this lecture, I hope you liked it

and I will see you in the next lecture.
