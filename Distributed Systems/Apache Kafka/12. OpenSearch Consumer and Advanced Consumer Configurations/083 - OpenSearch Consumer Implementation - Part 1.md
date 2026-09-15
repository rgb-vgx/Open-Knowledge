Hi, this is Stephane Maarek from Conduktor.

And in this lecture, we're going to go ahead

and implement our open search consumer.

So let's click on open search consumer

and we have to start writing some code.

So typically what we want

is to first create an OpenSearch Client,

then we'll create our Kafka Client,

then we'll have our main code logic

and then we'll close things.

So at high level, this is what we want.

So to create an OpenSearch Client,

it's not very interesting for me to just go through that

because this is not Kafka related knowledge.

And honestly, the code is quite complicated

because sometimes we connect to a secure OpenSearch,

sometimes not.

So the recommendation is for you to copy this block of code

and paste it.

So this code that I wrote here

I will still walk you through it,

is to create an open search clients

also called the RestHighLevelClient.

So there's a connection string.

And if you're using Docker,

you should connect to http://localhost:9200.

If you're using Bonsai, I will show you how to edit this

right after when we start running some code.

So then we are extracting some information

and then we're building the RestHighLevelClient

based on the proper security here with our security,

so it's simple and here with security

so it's a bit more complicated.

So let's not waste any time on this.

This is all set up.

So the next thing we have to do now

is to actually create this client.

So we're gonna say RestHighLevelClient.

In the midst OpenSearchClient

= createOpenSearchClient

with this is the function that I just created right now.

We still need to have a lot logger

so let's create a logger.

So Logger log =

and we'll have an SLA four jLogger.Logger factory of course

.getLogger

and then OpenSearchConsumer.class.getSimpleName.

So we have access to our Logger on this OpenSearchConsumer

and we have our OpenSearchClient.

So before we go into all the Kafka parts

let's first deal a little bit

with how the OpenSearchClient works.

So what I'm going to do is that I'm going to say,

hey, we need to create the index on the OpenSearch

if it doesn't exist already."

So for this, we need to first to first

do our OpenSearch queries

and so to do so we have to use a CreateIndexRequest

to send that request of course.

So we'll name it, a createIndexRequest

and it's going to be a new CreateIndexRequest.

And we need to provide an index name.

For this, we're going to use "wikimedia" as our index name.

And now we need to actually execute that request.

So for this, you do clients.

So openSearchClient.indexes

to do a request on the index domain,

and then you do .create

and this takes a createIndexRequest as a result.

So let's have the createIndexRequest

and then some request options.

And for this, you can just type in default,

DEFAULT and press Enter

and you're good to go.

So this request right here

is going to create the wikimedia index.

So there is an error here.

It says that it can be into a IO exception.

So we are going to add throws IOException to the top.

And this, after this we need to close the OpenSearchClient

so we can do openSearchClient.close.

And this works, but something I like to do even more

is that we can do a try block in Java with a parenthesis.

And in the try block you just pass in the openSearchClient.

And that means that if the try block succeeds

or if it fails at the end no matter what

the openSearchClient is going to be closed by this block.

So it's a bit of a Java magic, but this works.

So, perfect, we're good to go.

So we are doing a CreateIndexRequest.

I'm going to run this code now

(mouse clicking)

and it exited properly.

So let's maybe add a little bit of logging.

So log.info and then "The Wikimedia Index has been created."

Let's run this again.

And we're getting an exception now.

Well, because the resource already exists.

So we need to have a little bit more logic in here.

So we need to check whether or not the things exist.

So for this, there is Client.indexes.exists

and we need to pass in a getIndexRequest.

So we'll do a new getIndexRequest

and it takes an index as a result, as an input.

So Wikimedia is my index.

And then again, the DEFAULT RequestOptions.

So this returns a boolean

and so I'll call it bool indexExists equals this

and it's not bool it's boolean.

And now I can say if the indexExists,

if it doesn't exist.

So if not indexExists, then run this code

else maybe do log.info "The Wikimedia Index already exists."

So let's run this code right here.

So it says "The Wikimedia Index already exists."

This is good.

And then let's practice running this against Bonsai.

So to do so let's go into the Bonsai URL

and then let's go onto Settings,

not here, excuse me

and go into Access, Credentials.

And in here I have some credentials with full access.

So you copy this entire URL right here

which contains your username, your password, and so on.

And I'm going to regenerate this at the end

so that you don't have access to my credentials.

So you copy this

and you paste this in all the way to the top of your code.

So I will have it here and I will comment this line.

So now a change, I have a long connection string,

based it right from Bonsai.

But this is going to allow me to run this code

right against Bonsai.

So let's run the main again.

And this time,

it should say that we are recreating the Wikimedia Index

because it was not created already on Bonsai

and cool, "The Wikimedia Index has been created."

So once we're there, what we've confirmed is that

we were able to start writing some code

start writing some API codes against OpenSearch

either locally or on Bonsai.

So we're good to go.

And now in the next lecture

we're going to spend some time writing our Kafka consumer

so that we can start processing some data from Kafka

and sending it into ElasticSearch or OpenSearch efficiently.

So that's it for this lecture,

I hope you liked it

and I will see you in the next lecture.
