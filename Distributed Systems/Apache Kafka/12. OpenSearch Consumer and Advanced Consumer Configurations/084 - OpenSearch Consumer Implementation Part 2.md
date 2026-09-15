Hi, this Stephan from Conduktor,

and in this lecture, we are going to set up

our Kafka consumer and improve our code.

All right, so we need to create our Kafka clients,

and I will do this right next

to the rest high level clients, okay?

So here I have a consumer, a Kafka consumer,

and he's going to be consuming String, String.

And I'll call this one consumer,

and we kind wanna have a function as well called

create Kafka consumer that is going to do just that, okay?

To externalize and to keep our code a little bit clean.

So let's go ahead and create that function.

So I'm going to go right here

and click and create a private static function

which returns a Kafka consumer that I need,

so I'm going to copy this and paste it here,

and it takes new arguments.

We'll keep it very simple, okay?

So what we need to do is to set up a few things

for our Kafka consumer, but thankfully we already have that.

So if you go to Kafka basics, and then source, main, Java,

and then consumer demo, and we take these properties

and so on, then we have all we need.

So let's go back to our code, control tab,

and find the OpenSearch consumer.

I will paste this in.

So bootstrap server is correct.

The group ID could be Kafka consumer, for example,

consumer OpenSearch demo.

The topic we're going to be reading from,

we don't need it right here, so it's fine.

Then we have some properties.

So the bootstrap server is set.

The key serializer, value serializer is good.

The group ID config is good as well.

Auto offset resets earliest, let's set it to latest

to just only read the latest data by defaults,

so this way we don't have that much history.

So this is good, but you consider it as earliest as well.

It's just a matter of taste.

Then we have a consumer that is created

as a new consumer properties,

and I can just actually return that.

Okay, so our Kafka consumer is now created,

pretty much the same as some what we did,

and now it is available right here in our main function.

Cool, so now in the try block, you can actually also try

and add in the consumer in here

to have them both closed in case of exception.

So it's best practice in Java, you can do this.

Cool, so we have this, we have created our index,

and next what we need to do is to start consuming some data.

So to do so we do a while, and then while true.

We'll keep it very simple.

We'll not have any shutdown hooks right now,

just to keep things as simple as possible and just focus

on the consumer part into Elasticsearch or OpenSearch.

I will keep on saying this, by the way.

So what we need to do,

if you remember, is to get consumer records.

So they're gonna be of type String, String,

and I call these one records, and we'll do consumer.poll,

and the timeout will set this time duration

of millisecond, and I will set 3,000.

In case there is no data, let's just block on this line

for 3,000 seconds, that's fine.

Next we're going to get some records,

so we need to know whether or not we have some records.

So I'll have the record counts, called records.counts, cool,

and then we can log it.

We can say log.info, received,

and then record count, records.

Okay, so now that we have this,

we can actually send these records into Elasticsearch,

and to do so we can send them one by one,

so it's called an index request.

So let's do for consumer record,

and I'm doing it bad at first

just I know it can be triggered by this approach,

but step by step, okay?

So for each consumer record called record

in my collection of records, then what we want to do is send

the record into OpenSearch, great.

So to do so, we need to create an index request, okay?

To index some data.

So I'll name it index request,

and then we'll do a new index request,

and in here we need to pass in an index name.

So we have already created it from before, it's Wikimedia.

Then I will do a new line and I will do source,

and this is to specify what is the source of my data.

So it's actually comes from my record itself.

My Kafka record here is going to contain a value,

and the value is JSON documents,

and that JSON we're going to send into OpenSearch.

So therefore I do record and value,

which is what I'm passing,

and then we need to specify the type,

and here you type X content.JSON to tell OpenSearch

that we're sending some JSON data into OpenSearch.

Next, we need to send this request into OpenSearch,

so we do OpenSearch clients.index, and then we pass

in the index request as well as the default request options.

We can add a log, for example,

say inserted one document into OpenSearch.

Okay, so this is pretty good.

Now let's test our code and see if it works.

So let's run this, and we get an exception,

because the consumer is not subscribed

to any topics or assigned any partitions.

So this makes sense.

What I have to do is to actually go in here

and subscribe my clients.

So we need to do consumer.subscribe, collections.singleton,

and then pass a V topic,

which is Wikimedia.recent change.

Perfect, so here we subscribe the consumer.

And one last thing we should do actually,

from this we're going to get a response,

so it's an index response, okay?

And this response equals this.

This response as an ID, and so we can just have the ID here.

So instead of having this,

we can have just the response that get ID, and why?

Well, we just know that we are sending some data

into a consortium, we get back the ID,

it gets inserted with, okay?

So this is pretty good, now let's run this.

So the consumer is starting,

and then it's going to subscribe to the topic.

And so far, we're going to receive zero records,

receive zero records, and so on.

Well, this makes sense because,

well, if we have a look at it,

we are reading from the latest,

and so we have a lag of zero.

To verify this, I can go into Conduktor

under consumer groups and see that

for my consumer OpenSearch demo, the lag is zero.

So what I can do to create some data is to run my producer.

So if I go into Kafka producer Wikimedia, find it,

I can actually run this one, and run it continuously.

So it's going to be running.

The data is now inserted into Kafka,

and if I go into my OpenSearch consumer,

as you can see, some data is written

into OpenSearch very quickly, which is quite nice.

So I can stop the consumer,

and as you can see, yes, some data is written as we speak

with different IDs, which is, I think, pretty impressive.

And if you go into Conduktor and look at the consumer groups

and have a look at the lag, so it's 552,

but the more I refresh it, the more the lag is increasing,

because while we are producing,

and it will decrease when we launch a consumer.

So I'm going to keep on refreshing now,

so we have this lag of 6,000 and so on,

but the more I refresh, the more the lag decreases.

We're at 3,000 and so on because we're catching up

with the topic and we're committing offsets.

So there was an exception.

We'll have to deal with this exception later on,

but at least from a high level, everything is working.

And if I get one of these ID, for example, this one,

I can go into my dev tools,

and I can do a get into my Wikimedia index, okay?

And then we can do ID this.

And if I'm remembering correctly,

this going to give me my false, so let's have a look,

and of course, it's not this.

It's _doc, and then the ID, so let's try again.

Here we go, so we have Wikimedia_doc, then the ID,

and we can see the fact that under source,

we have the entire JSON document that went

from Apache Kafka into OpenSearch.

So really nice, everything is working fine.

And then this exception right here,

we'll deal with it later on.

So there's an OpenSearch status exception,

so what I'm going to do is just a very simple try block

to fix this, so I'm going to take these requests,

and I'm going to do try in this whole block,

and just try it, and then catch any exception E,

and we'll just do nothing, okay?

Just very simple.

We're going to improve this code anyway later on.

So right now this works.

And so if I just run my OpenSearch consumer,

then everything should be working as is.

It should not crash, and we should like keep on sending data

into Elasticsearch quite very quickly, as you can see.

So this is pretty good.

We have a very good way of already sending

some data into Elasticsearch, so this is pretty good,

and I will see you in the next lecture to improve this code.
