Hi, this is Stephane from Conduktor

and welcome to this section on the Wikimedia Producer

and producer configurations.

So we're going to first set up the project

to be able to take data from Wikimedia in a Kafka producer

into Kafka.

And we'll have a look at the recent change stream.

We'll have a look at a few demos as well available to us

to see the kind of transformations we're going to do.

We will set up Java libraries

for our project in this lecture

just to get started.

So we'll set up OKhttp3

as well as Okhttp-eventsource

and all these things should be enough

for us to start writing our code.

Okay, so the first thing we're going to do

is go to this URL to see the recent changes of Wikimedia.

And actually you see this page

keeps on being updated and it goes really, really fast.

And this is a stream,

a real-time stream accessible from your web browser

of all the changes happening in Wikimedia in real time.

So as you can see

it's quite a fairly high throughput type of data stream.

And this is the one we're going to use

to send data into Apache Kafka.

So I'm quite excited about showing this one to you.

And then in the second page, I'm going to go

and I'm gonna close this one.

This is a CodePen.

So this is a simple of a code that can be running

in the web browser in JavaScript.

And I'm going to zoom out a little bit for you.

So this is the code in JavaScripts and HTML.

And then in here we get some around some stats.

So this is the same stream we show you from before

but we have information

around how many wikis we get per second.

So this is an average of 29 per second.

We get also a distribution

of which pages are affected by these changes.

So en.wikipedia.org is the highest change.

Okay. But we have, for example

wiki.data.org as well changing, we have, for example

fr.wikipedia.org, that's changing and so on.

So these are some very interesting stats.

And at some point we will be playing

in Kafka Streams to get some of these stats available to us.

So I just wanted to show you that this stream

of data could be also analyzed in real time,

for example like this.

And a last way to analyze this stream

in real time, just to, again

visualize this stream of data is to go to this websites.

And this is going to show you over time

a chart of the type of events that are going to happen.

So is it a categorization event, an edit

edit log or new, okay.

Was it posted by a bot or not by a bot?

So, about 50/50 right now.

Is it a major edit or a minor edit of these pages?

And it's mostly major as we can see.

And we can look at the number of edits over time.

So I like this stream because it's quite high throughputs.

It's also real time.

It's on data that you may have already seen.

Okay. And it gives you some information around the website

the size of edits.

Is it a small edit, or is it a large edit,

and the invent arrival delay in seconds versus, you know

when it was posted on Wikipedia

and when it ended up in the stream.

So this is just to show you the fact

that this stream of data can be analyzed in websites

and we're going to actually write a Kafka Producer for it.

And I wanted to give you a taster of how things worked.

Okay. So the next thing we're going to do is to set

up our project.

Okay. So we are going to set up our project.

And so for this, I go back to Kafka beginner's course,

I right click, and then I will do 'New' and then 'Module'

and we will create a new module for project.

So it's a grade of project of 11.

SDK correlate to 11.

So, this is good.

And the name of the project is Kafka Producer, Wikimedia.

Okay. For the artifact coordinates, I am good with these.

I will click on finish.

So as we can see, a new module was created

and within it a builder grade of file was created as well.

Okay. So we're good to go.

Now we need to add some dependencies in our grade of file.

So the first thing we need to set

up for dependencies are going to be the ones we had

from before.

So you have to actually take the one from Kafka basics.

I can copy this dependency block right here

and paste it because, well,

we need only to have Kafka clients SLF4J-API

and SLF4J simple,

but we need two more event source dependencies, okay.

To actually read this stream from a Java code.

So how do we do this?

Well, what I'm going to do is first get the okhttp3.

So I will type in this and we get this library,

so okhttp, okay,

I'm going to click on it and get one of the latest versions.

So 4.9.3 that I know works well,

so I'll copy it,

and then I will paste it in here.

Great.

And the last one I need to, to get is also the

okhttp eventsource,

which is going to allow me to grab this stream.

So let's go back to okhttp3.

Maybe it's not here, so I'll just type it.

So, okhttp eventsource.

Here we go.

So I like this one and I will take the latest version.

So, 2.5.0, copy this

and paste it.

Okay. So we're good to go.

Now, finally, we're just going to create one file.

Okay. Just to make sure that things are set up.

So let me close these files that I don't need,

and I will go into main Java.

And here you need to be quite careful.

So this source directory is not the one we want.

We want the source from within

the Kafka Producer Wikimedia.

I made the mistake in a recording.

So I'm doing it again.

Excuse me.

So you're going to 'Java New' and then 'Java Class.'

And the name is io.Conduktor.demos.kafka.wikimedia.

And then I will name one WikimediaChangesProducer

In the class. Okay. We got it.

Then we add the main method and we run our code.

So our code is being run properly.

This is great.

And then the last thing I need to check is to

go to build a Gradle.

And right now I don't see the little Gradle elephants

to refresh it, but if you have the elephant,

you click on it to refresh it

and this will pull in your dependencies.

Okay? Okay.

So now that we have everything good

we are to just get started with the implementation

of the producer and I will do this in the next lecture.
