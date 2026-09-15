Okay, so if you just run Kafka on WSL2,

you may get an issue, at some point in this course,

based on a networking bug on WSL2.

So let me show you what the bug is and how to solve it.

So you have started Zookeeper,

and then you have started Kafka on WSL2,

and everything is working.

And if you try to launch a, for example,

kafkatopics.sh commands,

and you'll see them later on, okay.

In this course, I just wanna show you one of them,

and you say, I want to go to Kafka,

so localhost:002, and you run all these commands,

then this is going to work.

I see there's no errors and so on.

Everything was working fine.

But then if you run these commands outside of the Ubuntu,

so, for example, if you run this command

on PowerShell, after having installed the

Kafka topic utility on your Windows desktop, for example,

and try to run this command,

as you can see

you're gonna get a lot of these node not available errors.

So this is because of the issue I wanna tell you about

and this will happen

if you run on PowerShell, a command line

if you run from Java, or if you run from Conduktor.

So all these things we can fix.

So when you do encounter this bug

please go back to this lecture and do the following fixes.

So the option, number one we have

so we have to stop the broker.

So let me stop the broker right now on this one.

So,

okay, the broker is now stopped.

So the first we can do is to disable IPv6.

So this is an IPv6 issue and

running these two commands will disable IPv6.

So let me clear that thing.

So you can paste the command in here and then press enter.

You may be prompted for entering your route user password.

Then when this command is run, you can see

you'll see the net IPv6, conf disable all IPv6 one.

So that means that this was run correctly

and you run also the second command,

and by disabling IPv6, we're going to solve that issue,

and it doesn't change your thing for the course.

So when both these things are done, so you will go

and edit the file server, config/server.properties

And in this file, you will scroll down

and you may find the listeners one,

so you edit the listeners and you have plain texts

and then you add localhost 9 0 9 2. Okay.

So you keep it like this.

Then you save this file.

So now this file's been properly edited and

you can verifying by running a cat command

to make sure that indeed

when we go to find the file right here,

listeners equals plain text local host 9 0 9 2.

So we're good.

Now we're going to run again, the Kafka start command.

So we run the Kafka start command,

and we know that things have been properly edited

because if we look at the settings called listeners in here

so you scroll up and find listeners

you see it says plain text, localhost 9 0 9 2.

So we're good.

And then from here, if I run the Kafka Topics command

As you see it it's completed without any error.

So that's fixed my networking issue.

So that's one way of doing things,

and it works fine, if when running.

So let me show you the other errors it can get.

So I'm going to stop this.

If you get an error while running this command

to disable IPv6, then don't worry if it doesn't work,

that means that IPv6 is not enabled

for your VM and that's fine.

And therefore, you just need to do the things that I said

around modifying your "server.properties" file

just to change that configuration.

So this is good.

There's one way of doing things.

And if you prefer not to disable, IPv6

you can do something else.

So in here you can

I'm going to re-enable these networking settings.

So I'll set them to zero and I'll set the other one.

So this is the other one, this one to zero clear.

And I'm going again to edit my server, that properties file.

And for listeners this time

I'm going to go into the recommendation link from here

that we have on Conduktor I.O.

And in listeners, you, instead of having localhost,

you add this, and this is called

the loop back address for IPv6.

So you go back in here and, you, instead of localhost,

So let's edit this,

instead of localhost you have

this loop back address right here.

Then you save your file.

Then you start your server.

So using the same command as before

and now for things to work in your Kafka topics command

your bootstrap server is not localhost anymore.

It is the actual Lu back server,

So what I just copied right now,

press enter and things work again. Okay.

So these are the two main fixes.

If it still doesn't work,

you can look at this page to see how to fix it again.

And if it still doesn't work anymore, okay

if there's still no way to make it work

then what we would suggest is

for you to have a look at running Kafka, not on WSL2

but running Kafka on Windows directly or through Conduktor.

But that's it for this lecture.

I hope you liked it.

This is a troubleshooting error lecture.

I hope you liked it.

And I will see you in the next lecture.
