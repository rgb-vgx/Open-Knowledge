Hi, this is Stephane from Conduktor

and just a quick lecture to show you,

to conclude the section,

and find out which API is right for you.

So, let's take an example.

If you have a source database

and your data already is somewhere

and you want to put it into Kafka

you would have to think about using Kafka Connect Source.

If you want to produce the data directly into Kafka,

for example, because the data originates from your trucks

and you wanna send it directly into Kafka

as your source of truth, then you would use a Kafka Producer

which is what we've been programming.

Then to do Kafka to Kafka transformations

you would use Kafka Streams,

which is a library that we just saw,

or KSQL DB, which is a database

that allows you to do SQL queries on top of Kafka

by also leveraging internally Kafka Streams.

Then if you wanted to send data into a target

for storage and for analysis later on

then Kafka Connect Sink would be your main API.

But if you have for example,

the final goal of just sending an email

and then it goes away.

Then a Kafka Consumer would be a perfect API for you.

And behind the scenes, obviously, you would use something

like schema registry to make sure your data is correct

and your data types are going to be accurate

alongside your pipelines.

So hopefully this diagram makes sense.

And this is, if you understand it,

you've basically understood Kafka

in terms of an architecture perspective.

And I'm very proud of you.

All right, that's it.

I will see you in the next lecture.
