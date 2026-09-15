Okay, so we are going to set up Kafka on Windows non-WSL2

but it can work but there are caveats you should know.

You cannot delete topics or you will have an error

and you can Google KAFKA-8811 to have a look.

And if you use it for more than a week

then a segment will be deleted.

And then you will have an error named KAFKA-1194.

So these errors are fatal errors

and you will not be able to recover Kafka from it

unless you clean all data in Kafka

and then restart Kafka fresh.

So my point is, if you're using Windows,

as soon as you are going to do some

important stuff in Kafka, things are going to crash

and you're going to complain to me.

So my recommendation is,

if you can please do the steps from before

using Kafka Windows WSL2

because this is the most stable way of doing Kafka,

else I recommend that you start Kafka within Conduktor.

This is why we built this feature

is to really help you avoid these issues.

For example, we disable topic deletion

and we make sure that data is kept for a long time.

So if you just want simplicity and I think you do,

then start Kafka within Conduktor

and you should be good to go.

Nonetheless, here is a tutorial showing you

how this is going to work.

Okay, so the first thing we have to do

is to install Java 11.

So I'm going to install Java 11

and then I will type Corretto

'cause we will install Amazon Corretto Java.

So we are going to go to the Downloads page

and then we're going to look for Windows X64.

And we'll use this one, the MSI,

download it and then I will run it.

So this will install Java JDK 11

which is going to allow me to start Apache Kafka.

So let's install it Next, Next, Next.

And we're good to go.

Yes, I would like to install Java

and we're good to go.

So how can we check if Java is installed?

Well, if you start a Command Prompt for example

and type Java -version, then you're going to get

open JDK version 11 and then it's gonna say Corretto,

so that means that Java has been successfully installed.

So this is quite nice.

We have one step down.

Next we need to go to Apache Kafka

and actually download Kafka.

So for this, you can just type download Kafka,

here and then choose version 3.1.0

and then choose Scala 2.13, you download it.

And then it's going to appear directly on your computer.

So once it's on your computer, go on your File Explorer

look at your Downloads

and you're going to have to extract it

which is going to be difficult on a Windows.

So we need to download something like WinRAR to extract it.

So I will install WinRAR as well

to be able to extract this thing.

So let's download it.

We'll open it, Yes, Install, OK, we're good to go.

Thanks you.

So now what we can do is go back to our Explorer,

go to our Downloads and then in our Downloads

we can find Kafka right here, perfect.

And we're going to right click

and do Extract to Kafka 2.13-3.1.0.

So Kafka is being extracted, this is great.

And let's try to find it, here it is.

So we have this, I'm going to,

there are two folders one in the other,

this is a bit weird but anyway I will just take this one.

I will Copy it, Cut it actually.

And then I'm going to go under C, the root

and I'm going to paste this in.

So it's important because I like to have Kafka

at the roots of my C Drive just for easy access, okay?

Okay, so next we're going to have to open

something like PowerShell or Command Prompt,

whatever you prefer

but I like PowerShell, so I will use PowerShell

and I will open it in here

and I will try to change the properties

to have a much bigger font so you can see everything.

Okay, perfect.

So we have PowerShell and from PowerShell,

we're going to start Kafka.

So how do we do this?

Well, first of all, we're going to have to navigate into C.

So we are in C and then we can navigate

within the Kafka directory.

So we are within it, okay?

So what we want to do is to start Kafka

and all the Kafka directories are in the bin folder.

So ls bin is going to show you

that within this directory we have been Bin

and we have all the Kafka binaries in here.

And then under Config,

we'll have all the Kafka configs, okay?

So we can run a command very simply

by doing bin\slash and then for example, kafka-topics.sh.

And this is nice, but in nuts actually .sh,

I made a mistake.

I'm way too used to Linux systems.

So it's not bin\kafka-topics.sh,

it's bin\windows\ and then kafka-topics.bat.

And this is because under Windows

the binary for Windows are under a Windows folder, okay?

So if you do this and press Enter,

then the command is going to work

and you can just allow access, this is fine.

The command is going to work and you get this output.

But what we'd like to do is to just do kafka-topics

from any place on our computer and for it to work, okay?

But it's not going to work out of the bats.

So what we can do for this to work

is to edit our path variable our environment variable.

So we go here and we type environment

and here we can edit the system environment variables.

So you click on then Environment Variables

and under Path we can edit it

and here we can add a new value and just paste it,

paste the full path of this.

So I'm going to copy this full path

all the way down to Windows, to New,

and then paste it here and then press OK.

So once the path is set, then what I have to do is just

open a new window of PowerShell.

So what I'm going to do is close this one

and then I'll go back here and open PowerShell again.

So why do you do this?

Well, because when we start this,

now I'm into any directory.

If I do kafka-topics, then the command is going to work

and I get the output of kafka-topics, so this is great.

And that was thanks to editing the path.

So anyway, back into my C and then Kafka directory,

so I can do zookeeper-server-start.

So we need to start Zookeeper first.

So zookeeper-server and then start, okay?

.bat or without bat if you want, it doesn't matter.

After that, we set out the path.

And then what I'm going to do is just

give a config to this file.

So I'll do config\zookeeper.properties

and I press Tab to complete, I press Enter.

And all of a sudden Zookeeper is started.

So this is great.

And next I can run another Windows PowerShell, okay?

I will go again into my C directory and then Kafka.

In here I'm going to run a kafka-server-start command

provide a config and this time

the config is going to be server.properties, press Enter.

And Kafka is now started.

So this worked, this is all good.

Kafka is started, Zookeeper is started

and you should be able to go along with this course, okay?

But just so you know after a week things will break

or after deleting a topic things will break

so do not delete topics for example.

Otherwise use a Conduktor to launch Kafka

and it will make your life a lot easier.

Nonetheless there you go, you can start Kafka.

You can even run Kafka commands, any Kafka command

now from PowerShell just by doing for example,

kafka-topics and so on.

So we're good to go, we have enough to get started

and I will see you in the next lecture.
