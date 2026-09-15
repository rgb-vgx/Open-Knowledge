Okay, so let's start Kafka

with Conduktor on Docker.

To me, that's the easiest way to start Apache Kafka,

but we must first install Docker Desktop.

And the UI will help us speed up development.

So after this lecture, still follow how to install Kafka

on your operating system to use the CLI tools.

Okay, so on Google, type install docker desktop,

and then click on Get Docker Desktop.

So you will have explanation for all the systems.

So if you have a Mac, you can do Apple Silicon,

or Intel if you have an older Mac.

For Windows, you click on download.

And for Linux, you follow these instructions.

So these are well written out, these instructions.

For Windows, though, I wanna tell you something.

So you scroll down, and then there is a question,

should I use Hyper-V or WSL?

Well, it turns out

that I would strongly, strongly, strongly recommend

for you to use WSL.

That's because it comes with better compatibility with Kafka

and everything we do in this course.

And also you are going to use WSL anyway.

So when you install Docker Desktop, please use WSL.

Also for the IP version,

Kafka is going to be installing local host.

So you'll be able to access it

just the way I'm doing it in this course.

So that's very important for you,

to use the WSL 2 backend when installing Docker Desktop.

Then you go ahead and you start Docker Desktop,

and it would look something like this.

You may not have containers right now,

but you'll be good to go to get started.

Something I like to do in the settings

is to click on the Settings here,

and then you want to assign resources.

So under Resources, you can set a different limit

for CPU, memory.

I would recommend at least eight gigabytes of memory

and at least two vCPU.

But if you have a better machine,

you can always assign more,

but at least, yeah,

eight gigabytes of memory and two vCPUs.

Next, head to Google and type kafka stack docker compose,

and you will find on GitHub

our conduktor/kafka-stack-docker-compose repository.

And you should just download it.

So you can download it right here as a ZIP file,

or you can clone it if you know

how to clone things in GitHub.

So I will just download the ZIP to make it simple.

Next, you can open the entire repository.

And the one file we're interested into

is called conduktor-kafka-single.

So this is a Docker composed file

which has a PostgreSQL database.

It has conduktor console right here.

And finally, it has Kafka that we launch.

So you don't need to look at all these.

These are been pre-configured for you,

so no need to worry about it.

The only thing we have to do is to go to the README,

scroll down, and in the README,

we'll have under here a Single Kafka, KRaft mode,

plus Conduktor.

A command to run, and it's called docker compose.

So you're just going to run these command

to start your stack.

So copy this first command right here,

let's copy it, and then you paste it.

And this is going to download a lot of files.

So for me, it was quick

because I've already downloaded them.

But as you can see, everything is starting.

So you're gonna get a lot of log output

after you download the files.

But you should have a Kafka Server started

and then your console is also going to be started.

So when you do this,

you have to wait a little bit of course,

but you're gonna be able to access your UI in here.

So if I go to localhost8080,

I'm greeted to the Conduktor console.

So I already have an account, so stephane@example.com

and my password,

and then you are logged in to the Conduktor UI.

So you should see everything as healthy.

If not, don't worry.

It should, at some point, become healthy.

But the idea is that you have access to your Kafka Cluster.

So you can see on the top right

that you have My Local Kafka cluster.

If you go to Topics,

you'll be able to view the topics as a sanity check

where you could do is create a new topic,

call it demo_topic, press Enter, and go back to Topics.

If you see demo_topic in here being created,

that means that your Kafka is working.

So when you're good to go, you can also,

if you wanted to, delete this topic,

and then we'll have a clean Kafka.

So I'll just type the word DELETE, and we're good to go.

All right, that's it.

So we've successfully launched Apache Kafka on Docker,

and we have a UI as well to manage this,

which is going to be very handy.

This UI, as you see maybe in this course

is going to be a little bit different

from the one that's recorded in the next lectures.

But the reason is that this is a more updated UI,

but the functionality is exactly the same.

And I'm pretty sure that you'll be able to find your way

around where is the produce and the topic buttons

in this course, okay?

But that's it.

I hope you liked it and I will see you in the next lecture.
